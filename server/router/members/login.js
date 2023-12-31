//login.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const secretText = process.env.REACT_SECRET_TEXT;
const refreshSecretText = process.env.REACT_REFRESH_SCRET_TEXT;
const db = require("../../config/database");
const bcrypt = require("bcrypt");

const refreshTokens = [];
router.use(express.json());
router.use(cookieParser());

router.post("/login", (req, res) => {
  const user_id = req.body.id;
  const user_pw = req.body.password;
  console.log('Received user id:', user_id); 

  // DB에서 사용자 조회
  db.query(
    "SELECT * FROM users WHERE user_id = ?",
    [user_id],
    async (error, results) => {
      if (error) throw error;
      console.log('Query results:', results);

      if (results.length === 0) {
        return res.status(401).send({ message: "존재하지 않는 아이디입니다" });
      }

      const user = results[0];
      // 비밀번호 확인
      const passwordMatch = await bcrypt.compare(user_pw, results[0].user_pw);

      if (!passwordMatch) {
        return res.status(401).send({ message: "잘못된 비밀번호입니다" });
      }
      const accessToken = jwt.sign({ id: user.user_id,role: user.user_role }, secretText, {
        expiresIn: "30m",
      });
      console.log('Access token:', accessToken);
      // JWT 를 이용해 refreshToken 도 생성
      const refreshToken = jwt.sign({ id: user.user_id }, refreshSecretText, {
        expiresIn: "7d",
      });
      console.log('Refresh token:', refreshToken);

      refreshTokens.push(refreshToken);
      console.log('Refresh token:', refreshToken);

      // refreshtoken 을 쿠키에 넣어주기
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      db.query(
        "INSERT INTO refreshTokens (user_id, token) VALUES(?,?)",
        [user.user_id, refreshToken],
        (error, results) => {
          if(error) throw error;
          console.log(`Refresh token saved in DB` , results);
        }
      )

      // Add user_role to the response
      res.json({ accessToken: accessToken, userRole: user.user_role });
    }
  );
});

function authMiddleware(req, res, next) {
  // Token 을 Request header 에서 가져온다
  const authHeader = req.headers["authorization"];
  console.log("Request headers:", req.headers);
  console.log("Authorization header:", authHeader);
  // Bearer kjdsanfkwnefkq.dsfnioawenfjl.adsfnklwnkf
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401); // client error 발생시켜주기

  // Token 이 있으니 유효한지 확인하기
  jwt.verify(token, secretText, (err, user) => {
    if (err) return res.sendStatus(403); //client error
    console.log('Verified token:', token); 
    req.user = user;
    next();
  });
}

// refresh Token 요청 cookie
router.get("/refresh", (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(403);

  const refreshToken = cookies.jwt;
  if (!refreshTokens.includes(refreshToken)) {
    return res.sendStatus(403);
  }
  // token 이 유효한 토큰인지 확인
  jwt.verify(refreshToken, refreshSecretText, (err, user) => {
    if (err) return res.sendStatus(403);
    // accessToken 을 생성하기
    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      secretText,
      {
        expiresIn: "30m",
      }
    );
    res.json({ accessToken: accessToken, userRole: user.user_role });
  });
// DB에서 refreshToken 검색
db.query(
  "SELECT * FROM refreshTokens WHERE token = ?",
  [refreshToken],
  async (error, results) => {
    if (error) throw error;
    console.log('Query results:', results);

    if (results.length === 0) {
      return res.status(403).send({ message: "유효하지 않은 토큰입니다" });
    }
});
});

router.post("/change-password", authMiddleware, async (req, res) => {
  const { oldPassword, newPassword, accessToken } = req.body;
  console.log("Request received:", req.body);
  console.log("Payload:", req.body);
  console.log("accessToken:", accessToken);

  try {
    const user = await getUserFromId(req.user.id);
    console.log("User data:", user);
    const passwordMatch = await bcrypt.compare(oldPassword, user.user_pw);
    console.log("Password match:", passwordMatch);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "기존 비밀번호와 일치하지 않습니다." });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await updateUserPassword(req.user.id, hashedNewPassword);
    res.status(200).json({ message: "비밀번호 성공적 변경되었습니다" });
  } catch (error) {
    console.log("Error:", error);
    console.log("accessToken마지막줄", accessToken);
    res.status(500).json({ message: "서버오류입니다" });
    console.log("accessToken마지막줄", accessToken);
  }
});

const getUserFromId = (userId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM users WHERE user_id=?",
      [userId],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      }
    );
  });
};

const updateUserPassword = (userId, newPassword) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE users SET user_pw = ? WHERE user_id=?",
      [newPassword, userId],
      (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      }
    );
  });
};

module.exports = router;
