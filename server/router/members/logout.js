const express = require("express");
const router = express.Router();
const db = require("../../config/database");
router.use(express.json());

// logout
router.post("/logout", (req,res) => {
  const {userId} = req.body;
  // db에서 refreshToken 삭제
  db.query(
    "DELETE FROM refreshTokens WHERE user_id = ?",
    [userId],
    (error,results) => {
      if (error) throw error;
      console.log('Refresh token deleted from DB:', results);
    }
  );
  res.send({ message: "로그아웃되었습니다" });
})

module.exports = router;
