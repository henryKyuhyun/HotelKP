import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { StyledForm, StyledInput, StyledLabel, StyledSelect, StyledTextarea, SubmitButton, UploadContainer } from '../components/pagestyles/UploadHotelPageStyle';

const UploadMaxImages = 5;


export default function UploadHotelPage() {
  
  const[hotelName, setHotelName] = useState("");
  const[hotelInfo, setHotelInfo] = useState("");
  const [hotelSubInfo, setHotelSubInfo] = useState("");
  const [maxGuests, setMaxGuests] = useState('0');
  const [hotelType, setHotelType] = useState("motel");
  const [hotelregion, setRegion] = useState("seoul");
  const[hotelAddress, setHotelAddress] = useState("");
  const[price, setPrice] = useState("");
  const[hotelImages, setHotelImages] = useState([]);
  const[error, setError] = useState("");
  const[user_id, setUserId] = useState(null);
  const navigate = useNavigate();

  const token = sessionStorage.getItem("accessToken")

  // useEffotct Hook 을 이용해서 component 가 마운트될 때 로그인된 사용자의 정보를 로컬 저장소에서 가져와 사용자 아이디 저장.
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (savedUser && savedUser.id) {
      setUserId(savedUser.id);
    }
  }, []);
  //이미지 추가 , 유효성 확인
  const onImageChange = (e) => {
    let selectedImages = [];
    selectedImages = Array.from(e.target.files);
    selectedImages.filter(file => {
      if (!file.type.includes('image')){
        alert('해당파일은 이미지 파일이 아닙니다.');
        return false;
      }
      return true;
    })
    setHotelImages(selectedImages);
  };
  
  // User가 양식제출시 서버에 등록. 
  const handleUpload = async(e) => {
    e.preventDefault();
    
    const validImages = hotelImages.filter(image => image.type.includes('image'));

    if (validImages.length !== hotelImages.length) {
      alert('모든 파일은 이미지 형식이어야 합니다.');
      return;
    }

    // 업로드 가능한 이미지 개수 확인
    if(hotelImages.length > UploadMaxImages) {
      alert(`최대 ${UploadMaxImages}개의 이미지 파일만 업로드 가능합니다.`);
      e.target.value = null;
      return;
    }

    const formData = new FormData();
    formData.append("hotelName", hotelName);
    formData.append("hotelInfo", hotelInfo);
    formData.append("hotelSubInfo", hotelSubInfo);
    formData.append("maxGuests", maxGuests);
    formData.append("hotelType", hotelType);
    formData.append("hotelregion", hotelregion);
    formData.append("hotelAddress", hotelAddress);
    formData.append("price", price);
    
    hotelImages.forEach((image, index) => {
      formData.append('hotelImages', image);
    });

    formData.append("user_id", user_id);

    try{
        const response = await axios.post("http://localhost:4000/api/uploadHotel", formData, {

        headers:{
          Authorization: `Bearer ${token}`,
          'Content-Type':'multipart/form-data',
        }
      });
      if(response.status === 200){
        navigate("/");
      } else{
        setError("호텔 등록이 실패했습니다")
      }
    } catch(error){
      setError(`Error uploading hotel: ${error.response.data.isSuccess}`);    }
  };


  return (
    <UploadContainer>
      <StyledForm onSubmit={handleUpload}>

        <StyledLabel htmlFor='hotelName'> 숙소 이름</StyledLabel>
          <StyledInput
          type='text'
          id='hotelName'
          value={hotelName}
          onChange={(e) => setHotelName(e.target.value)}
          required
          /> 
      
        <StyledLabel htmlFor='hotelInfo'>상세정보</StyledLabel>
          <StyledTextarea
          id='hotelInfo' 
          value={hotelInfo} 
          onChange={(e) =>setHotelInfo(e.target.value)}
          placeholder='숙소, 편의시설, 기타 주의사항등을 설명해주세요'
          required
          />
      <StyledLabel htmlFor='hotelSubInfo'>호텔 부가정보</StyledLabel>
          <StyledTextarea
          id='hotelSubInfo' 
          value={hotelSubInfo} 
          onChange={(e) =>setHotelSubInfo(e.target.value)}
          placeholder='예: 침실 1개, 침대 2개, 욕실 1개'
          required
          />

        <StyledLabel htmlFor='maxGuests'>최대 게스트 인원</StyledLabel>
          <StyledInput 
            type='number' 
            id='maxGuests' 
            value={maxGuests} 
            onChange={(e) => setMaxGuests(e.target.value)}
            required
          />

        <StyledLabel htmlFor='hotelType'>숙소 유형</StyledLabel>
          <StyledSelect 
          id='hotelType'
          value={hotelType} 
          onChange={(e) => setHotelType(e.target.value)}
          required>
            <option value="motel">모텔</option>
            <option value="hotel">호텔</option>
            <option value="pension">펜션</option>
          </StyledSelect>
          <StyledLabel htmlFor='hotelregion'>숙소 지역</StyledLabel>
          <StyledSelect
            id='hotelregion'
            value={hotelregion} 
            onChange={(e) => setRegion(e.target.value)}
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

        <StyledLabel htmlFor='hotelAddress'>숙소 주소</StyledLabel>
          <StyledInput
          type='text' 
          id='hotelAddress' 
          value={hotelAddress} 
          onChange={(e) => setHotelAddress(e.target.value)}
          required
          />

        <StyledLabel htmlFor='price'>숙소 요금</StyledLabel>
          <StyledInput 
          type='number' 
          id='price' 
          value={price} 
          onChange={(e) => setPrice(e.target.value)}
          placeholder='/박'
          required
          />

        <StyledLabel htmlFor='hotelImages'>숙소 사진</StyledLabel>
          <StyledInput 
          type="file" 
          id="hotelImages" 
          accept="image/*" 
          onChange={onImageChange} 
          multiple
          required
          />
        

        <SubmitButton type="submit">등록 완료하기</SubmitButton>
      </StyledForm>

      {error && <p>{error}</p>}
    </UploadContainer>
  );
}