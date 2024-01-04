const express = require("express");
const router = express.Router();
const db = require('../../config/database');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const authMiddleware = require("../../middlewares/auth-middleware");
const refreshSecretText = process.env.REACT_REFRESH_SCRET_TEXT;
const refreshTokens = [];

router.use(cookieParser());

router.delete("/withdrawal" ,authMiddleware , async(req, res) => {
  const user_id = req.user.id;

  db.query(
    "DELETE FROM users WHERE user_id = ?",
    [user_id],
    (error, results) => {
      if (error) throw error;
      if (results.affectedRows > 0) {
        db.query(
          "DELETE FROM refreshTokens WHERE user_id = ?",
          [user_id],
          (error,results) => {
            if(error) throw error;
            res.status(200).json({ isSuccess: "성공적으로 탈퇴되었습니다." });
          }
        )
      } else {
        res.status(404).json({ isSuccess: "존재하지 않는 사용자입니다. 회원탈퇴중 에러가 발생했습니다" });
      }
    }
  );
});


module.exports = router;