// // client/src/pages/IntroductionPage.jsx
// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import { ErrorText, Form, FormContainer, FormTitle, Input, InputGroup, Label, SubmitButton, TextArea } from '../components/pagestyles/IntroductionInputPageStyle';

// export default function IntroductionPage(){
//   const [photo, setPhoto] = useState(null);
//   const [introText, setIntroText] = useState('');
//   const [error, setError] = useState('');
//   const token = useSelector(state => state.auth.token);
//   console.log("Current token:", token);
//   axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
//   const userRole = useSelector((state) => state.auth.userRole);

//   useEffect(() => {
//     console.log("Current token:", token);
//   }, [token]);

//   useEffect(() => {
//     console.log("Current user role:", userRole);
//   }, [userRole]);


//   const handlePhotoChange = (e) =>{
//     setPhoto(e.target.files[0]);
//   };
  

//   const handleIntroTextChange=(e)=>{
//     setIntroText(e.target.value);
//   };

//   const handleSubmit = async (e)=>{
//     e.preventDefault();
//     console.log("Token at the time of request:", token);

//     try{
//       // FormData 객체
//       const formData = new FormData();
//       formData.append('photo',photo);
//       formData.append('introText', introText);

//       // 업로드서버에
//       await axios.post('http://localhost:4000/api/myprofile', formData,{
//       });      
//     }catch(error){
//       if (error.response && error.response.data && error.response.data.message) {
//         setError(error.response.data.message);
//       }else{
//         setError('서버오류발생')
//       }
//       console.error(error);

//   };
// };

// return (
//   <FormContainer>
//     <FormTitle>자기소개</FormTitle>
    
//     {error && <ErrorText>{error}</ErrorText>}

//     <Form onSubmit={handleSubmit}>
//       <h1>고객들에게 회원님을 소개해주세요 기회는 단한번 수정은 불가!</h1>
//       <InputGroup>
//         <Label htmlFor="photo">사진:</Label>
//         <Input type="file" id="photo" onChange={handlePhotoChange} />
//       </InputGroup>
//       <InputGroup>
//         <Label htmlFor="intro-text">소개글:</Label>
//         <TextArea id="intro-text" value={introText} onChange={handleIntroTextChange} />
//       </InputGroup>
//       <SubmitButton type="submit">저장</SubmitButton>
//     </Form>
//   </FormContainer>
// );
// }

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ErrorText, Form, FormContainer, FormTitle, Input, InputGroup, Label, SubmitButton, TextArea } from '../components/pagestyles/IntroductionInputPageStyle';

export default function IntroductionPage(){
  const [photo, setPhoto] = useState(null);
  const [introText, setIntroText] = useState('');
  const [error, setError] = useState('');
  const token = useSelector(state => state.auth.token);
  console.log("Current token:", token);
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  const userRole = useSelector((state) => state.auth.userRole);

  useEffect(() => {
    console.log("Current token:", token);
  }, [token]);

  useEffect(() => {
    console.log("Current user role:", userRole);
  }, [userRole]);


  const handlePhotoChange = (e) =>{
    setPhoto(e.target.files[0]);
  };
  

  const handleIntroTextChange=(e)=>{
    setIntroText(e.target.value);
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    console.log("Token at the time of request:", token);

    try{
      // FormData 객체
      const formData = new FormData();
      formData.append('photo',photo);
      formData.append('introText', introText);

      // 업로드서버에
      await axios.post('http://localhost:4000/api/myprofile', formData,{
      });      
    }catch(error){
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      }else{
        setError('서버오류발생')
      }
      console.error(error);

  };
};

return (
  <FormContainer>
    <FormTitle>자기소개</FormTitle>
    
    {error && <ErrorText>{error}</ErrorText>}

    <Form onSubmit={handleSubmit}>
      <h1>고객들에게 회원님을 소개해주세요</h1>
      <InputGroup>
        <Label htmlFor="photo">사진:</Label>
        <Input type="file" id="photo" onChange={handlePhotoChange} />
      </InputGroup>
      <InputGroup>
        <Label htmlFor="intro-text">소개글:</Label>
        <TextArea id="intro-text" value={introText} onChange={handleIntroTextChange} />
      </InputGroup>
      <SubmitButton type="submit">저장</SubmitButton>
    </Form>
  </FormContainer>
);
}