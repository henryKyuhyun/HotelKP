const express = require("express");
const router = express.Router();
const db = require("../../config/database");
const authMiddleware = require("../../middlewares/auth-middleware"); 

router.delete("/deleteHotel/:hotel_id", authMiddleware, async (req, res) => {
    const {hotel_id} = req.params;
    const user_id = req.user.id;

    try {
      const [rows] = await db.query("SELECT * FROM hotels WEHRE hotel_id = ? AND user_id = ?" , [hotel_id, user_id]);
      if(rows.length ===0) {
        res.status(404).json({error: "NOT FOUND OR NOT AUTHORIZED"});
        return;
      }

      await db.query("DELETE FROM comments WHERE hotel_id = ?", [hotel_id]);
      await db.query("DELETE FROM likes WHERE hotel_id = ?", [hotel_id]);
      await db.query("DELETE FROM payments WHERE hotel_id = ?", [hotel_id]); 
      await db.query("DELETE FROM hotels WHERE hotel_id = ?", [hotel_id]);
  
      res.status(200).json({ hotel_id: Number(hotel_id) });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Database deletion error' });
    }
  });
  
  module.exports = router;