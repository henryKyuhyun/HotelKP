import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StyledForm, StyledInput, StyledLabel, StyledSelect, StyledTextarea, SubmitButton, UploadContainer } from '../pagestyles/UploadHotelPageStyle';


const UploadMaxImages = 5;

export default function EditHotel() {

  const {hotelId} = useParams();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("accessToken")  

  const[hotel, setHotel] = useState({
    hotelName: "",
    hotelInfo: "",
    hotelSubInfo: "",
    maxGuests: "",
    hotelType: "",
    hotelregion:"",
    hotelAddress: "",
    price: "",
    hotelImages: [],  //이미지 수정용
  })

  useEffect(()=>{
    async function fetchHotel(){
      try{
        const response = await axios.get(`/api/hotel/${hotelId}`);
        setHotel(response.data);
      } catch(error){
        console.error(`호텔 데이터 가져오는데 실패하였습니다 ${error}`);
      }
    }
    fetchHotel();
  },[hotelId]);

  const handleImageChange = (e) =>{
    let selectedImages =[];
    selectedImages = Array.from(e.target.files);
    selectedImages.filter(file => {
      if(!file.type.includes('image')) {
        alert('해당파일은 이미지 파일이 아닙니다.');  
        return false;
      }
      return true;
    });
    setHotel((prevHotel) => ({
      ...prevHotel,
      hotelImages: selectedImages,
    }));

  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setHotel((prevHotel) => ({
      ...prevHotel,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // 업로드 가능한 이미지 개수 확인
    if(hotel.hotelImages.length > UploadMaxImages) {
      alert(`최대 ${UploadMaxImages}개의 이미지 파일만 업로드 가능합니다.`);
      event.target.value = null;
      return;
    }

    const validImages = hotel.hotelImages.filter(image => image.type.includes('image'));
    if (validImages.length !== hotel.hotelImages.length) {
      alert('모든 파일은 이미지 형식이어야 합니다.');
      return;
    }

    const formData = new FormData();
    formData.append("hotelName", hotel.hotelName);
    formData.append("hotelInfo", hotel.hotelInfo);
    formData.append("hotelSubInfo", hotel.hotelSubInfo);
    formData.append("maxGuests", hotel.maxGuests);
    formData.append("hotelType", hotel.hotelType);
    formData.append("hotelregion", hotel.hotelregion);
    formData.append("hotelAddress", hotel.hotelAddress);
    formData.append("price", hotel.price);
    // formData.append("hotelImages", hotel.hotelImages);
    hotel.hotelImages.forEach((image, index) => {
      formData.append('hotelImages', image);
    });
      try {
        const response = await axios.put(
            `/api/editHotel/${hotelId}`,
            formData, // FormData를 전송합니다.
            { headers: { 
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data"
            }
          }
        );

        console.log(formData);

      if (response.status === 200) {
        alert("호텔정보 수정이 완료되었습니다.")
        navigate(`/`);
      } else {
        alert("호텔 정보를 업데이트하지 못했습니다.");
      }
    } catch (error) {
      console.error(`호텔 정보 업데이트 실패: ${error}`);
    }
  };

  return (
    <UploadContainer>
      <StyledForm onSubmit={handleSubmit}>

        <StyledLabel htmlFor='hotelName'>숙소 이름</StyledLabel>
        <StyledInput
          type="text"
          id="hotelName"
          name="hotelName" 
          value={hotel.hotelName}
          onChange={handleChange}
          required
        />

        <StyledLabel htmlFor='hotelInfo'>상세정보</StyledLabel>
        <StyledTextarea
          id="hotelInfo"
          name="hotelInfo" 
          value={hotel.hotelInfo}
          onChange={handleChange}
          required
        />

      <StyledLabel htmlFor='hotelSubInfo'>호텔 부가정보</StyledLabel>
      <StyledTextarea
        id='hotelSubInfo' 
        name="hotelSubInfo"
        value={hotel.hotelSubInfo} 
        onChange={handleChange}
        required
      />

      <StyledLabel htmlFor='maxGuests'>최대 게스트 인원</StyledLabel>
      <StyledInput 
        type='number' 
        id='maxGuests' 
        name="maxGuests"
        value={hotel.maxGuests} 
        onChange={handleChange}
        required
      />

        <StyledLabel htmlFor='hotelType'>숙소 유형</StyledLabel>
        <StyledSelect
          id="hotelType"
          name="hotelType"
          value={hotel.hotelType}
          onChange={handleChange}
          required
        >
          <option value="motel">모텔</option>
          <option value="hotel">호텔</option>
          <option value="pension">펜션</option>
        </StyledSelect>

        <StyledLabel htmlFor='hotelregion'>숙소 지역</StyledLabel>
        <StyledSelect 
        id='hotelregion'
        name="hotelregion"
        value={hotel.hotelregion} 
        onChange={handleChange}
        required>
        <option value='seoul'> 서울 </option>
        <option value='busan'> 부산 </option>
        <option value='daegu'> 대구 </option>
        <option value='incheon'> 인천 </option>
        <option value='gwangju'> 광주 </option>
        <option value='daejeon'> 대전 </option>
        <option value='ulsan'> 울산 </option>
        <option value='gangwon'> 강원 </option>
        <option value='gyeonggi'> 경기 </option> 
        <option value='gyeongnam'> 경남 </option> 
        <option value='gyeongbuk'> 경북 </option> 
        <option value="jeonnam"> 전남 </option> 
        <option value="jeonbuk"> 전북 </option> 
        <option value="jeju"> 제주 </option >
        <option Value="chungnam" > 충남 </option >
        <option Value="chungbuk" > 충북 </ option >
        </StyledSelect>

        <StyledLabel htmlFor='hotelAddress'>숙소 위치</StyledLabel>
        <StyledInput
          type="text"
          id="hotelAddress"
          name="hotelAddress"
          value={hotel.hotelAddress}
          onChange={handleChange}
          required
        />

        <StyledLabel htmlFor='price'>숙소 요금</StyledLabel>
        <StyledInput
          type="number"
          id="price"
          name="price"
          value={hotel.price}
          onChange={handleChange}
          required
        />

        <StyledLabel htmlFor='hotelImages'>숙소 사진</StyledLabel>
        <StyledInput
          type="file"
          id="hotelImages" 
          name="hotelImages" 
          accept="image/*" 
          onChange={handleImageChange}
          multiple
          required
      />

        <SubmitButton type="submit">저장</SubmitButton>
      </StyledForm>

    </UploadContainer>
  );
}