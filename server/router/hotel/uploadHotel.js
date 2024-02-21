
// server/router/hotel/uploadHotel.js
require('dotenv').config();
const express = require("express");
const router = express.Router();
const db = require("../../config/database");
const multer = require("multer");
const { v4: uuid4 } = require("uuid");
const path = require("path");
const authMiddleware = require("../../middlewares/auth-middleware"); 
const UploadMaxImages = 5;
const AWS = require('aws-sdk');
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')
const multerS3 = require('multer-s3');
// AWS 설정
const bucketName = process.env.AWS_BUCKET_NAME;
console.log("BUCKET NAME : : " , process.env.AWS_BUCKET_NAME);

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})
const s3 = new AWS.S3();
// AWS S3 버킷에서 객체 목록 가져오기 함수
async function getBucketObjects(){
  const params = {
    Bucket: bucketName,
  };
  
  try {
    const response = await s3.listObjectsV2(params).promise();
    const objects = response.Contents;
    console.log("Objects in the bucket:", objects);
  } catch(error) {
    console.error('Error retrieving bucket objects', error);
  }
}
// 이미지 저장
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  }),
  fileFilter: function (req, file, cb) {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB
  }
})

  router.post('/uploadHotel', authMiddleware, upload.any("hotelImages"), async(req, res) => {

  if (req.files.length > UploadMaxImages) {
    return res.status(400).json({ error: `최대 ${UploadMaxImages}개의 이미지 파일만 업로드 가능합니다.` });
  } 
  const { 
    hotelName, 
    hotelInfo,
    hotelSubInfo,
    maxGuests, 
    hotelType,
    hotelregion, 
    hotelAddress, 
    price, 
    user_id 
  } = req.body;
  console.log("Request files", req.files);

  // user_role Db에서 가져오기
  db.query(
    "SELECT * FROM users WHERE user_id = ?",
    [user_id],
    async (error, result) => {
      if (error) throw error;
      if (result.length > 0 && result[0].user_role === "hotel_admin") {
        // 권한 확인 변경
        // const hotelImages = req.files.map((file) => file.path); Multer 가 파일을 local 에 저장할 때 사용하는 속성.
        // 이 속성은 업로드된 파일이 로컬 파일시스템에 저장된 위치를 나타낸다. 
        const hotelImages = req.files.map((file) => file.location);
        // file.location 은 multer-s3 가 파일을 aws s3에 저장할 대 추가하는 속성이다. 
        // 이 속성은 업로드된 파일의 s3 url 을 나타낸다. 이를 통해 웹에서 해다 파일에 접근 할 수 있다.

        const newHotel = {
          hotelName,
          hotelInfo,
          hotelSubInfo,
          maxGuests,
          hotelType,
          hotelregion,
          hotelAddress,
          price,
          hotelImages: JSON.stringify(hotelImages),
          user_id,
        };

try {
  await db.query("INSERT INTO hotels SET ?", newHotel);
  console.log("Hotel inserted into database");

  // AWS S3 버킷 객체 목록 가져오기
  await getBucketObjects();

  res.status(200).send({ isSuccess: "호텔 정상 등록되었습니다." });
} catch (error) {
  console.error("Error inserting hotel into database:", error);
  res.status(500).send({ error: "호텔 등록 중 오류가 발생했습니다." });
}
} else {
console.error("hotel_admin 만 hotel 등록 가능합니다");
res.status(403).send({ isSuccess: "hotel_admin 만 hotel 등록 가능합니다" });
}
}
);
});

module.exports = router;