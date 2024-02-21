require('dotenv').config();
const express = require("express");
const Router = express.Router();
const db = require("../../config/database");
const multer = require("multer");
const authMiddleware = require("../../middlewares/auth-middleware"); 
const UploadMaxImages = 5;
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

const oldImages = process.env.REACT_APP_OLD_IMAGES;

// AWS 설정
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})
const s3 = new AWS.S3();

// AWS S3 버킷에서 객체 삭제 함수
async function deleteBucketObject(key){
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key : key
  };
  try {
    const response = await s3.deleteObject(params).promise();
    console.log('OBJECT DELTED', response);
  } catch(error){
    console.error("ERROR DELETING BUCKET OBJECT" , error);
    throw error;
  }
}
// 이미지 저장
const upload = multer({
  storage: multerS3({
    s3:s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read',
    metadata: function(req,file,cb) {
      cb(null, {fileName : file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
    }),
    preservePath: true,  // 이 부분 추가

    fileFilter: function (req, file, cb) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    },
    limits: {
    }
  })
  const util = require('util');
  const uploadAnyPromise = util.promisify(upload.any()).bind(upload);  // 이 부분 추가
  const queryPromise = util.promisify(db.query).bind(db);  // 쿼리를 프로미스로 변환
  
// multipart/form-data 요청의 본문을 req.body에 바로 저장하지 않습니다. 대신, multer는 req.body를 비우고, 업로드된 파일들의 정보를 req.files 배열에 저장합니다
// 이 때문에, multer 미들웨어가 실행된 후에는 req.body가 비어 있습니다. 따라서 req.body에서 hotelName 등의 값을 해체 할당하면, 모두 undefined가 됩니다. 이는 서버 로그에서 볼 수 있는 request bodY!!!! {} 메시지의 원인입니다.
// 이 문제를 해결하려면, multer 미들웨어가 실행되기 전에 hotelName 등의 값을 req.body에서 해체 할당해야 합니다. 이를 위해, 새로운 미들웨어를 만들어 multer 미들웨어가 실행되기 전에 실행하도록 할 수 있습니다. 이 미들웨어는 req.body에서 hotelName 등의 값을 해체 할당하고, 이 값들을 req 객체의 다른 속성에 저장합니다. 그런 다음, multer 미들웨어가 실행된 후에는 이 값들을 다시 사용할 수 있습니다.
// multipart/form-data를 사용하여 HTTP 요청을 보낼 때, 본문의 일부 데이터는 req.body가 아닌 req.files에 저장됩니다. 그래서 multer 미들웨어가 실행된 후에는 req.body가 비어 있어도 됩니다.

// 따라서 미들웨어에서 req.body에서 데이터를 추출하는 대신 multer 미들웨어가 실행된 후에 req.files에서 데이터를 추출해야 합니다.
Router.put(
  "/editHotel/:hotelId",
  authMiddleware,
  async (req, res, next) => {
    const user_id = req.user.id;

    const hotelId = req.params.hotelId;  

    await uploadAnyPromise(req, res);
    req.temp = req.body;

    const { hotelName, hotelInfo, hotelSubInfo, maxGuests, hotelType, hotelregion, hotelAddress, price } = req.temp;
    const hotelImages = req.files.map((file) => file.location);
    try {
      // 사용자 존재 여부 확인
      // const result = await queryPromise("SELECT * FROM users WHERE user_id = ?", [user_id]);
      const result2 = await queryPromise("SELECT hotelImages FROM hotels WHERE hotel_id = ?", [hotelId]);

      if (result2.length > 0) {
        const oldHotelImages = JSON.parse(result2[0].hotelImages);
        for (let i = 0; i < oldHotelImages.length; i++) {
          console.log("Current image URL: ", oldHotelImages[i]);
          const oldImageKey = oldHotelImages[i].split(oldImages)[1];
          console.log("Extracted Key: ", oldImageKey);
          await deleteBucketObject(oldImageKey);
        }
      }
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

      // const result3 = await queryPromise("UPDATE hotels SET ? WHERE hotel_id = ?", [newHotel, hotelId]);
      res.status(200).json({ message: "호텔 정보가 수정되었습니다.", hotelImages: hotelImages });
    } catch (error) {
      return next(error);
    }
  }
);

Router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: err.message });
});

module.exports = Router;
