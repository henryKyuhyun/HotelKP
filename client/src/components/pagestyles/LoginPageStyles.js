import styled from "styled-components";

export const CustomContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #ffffff;
  /* width: 100%; */

  @media only screen and (max-width: 1024px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

export const LoginFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width :100%; 
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  @media only screen and (min-width:1025px) and (max-width: 1920px){
    width: 60%;
  }

  @media only screen and (max-width:1024px) {
    width: 80%;
  }
`;

export const FormControlContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 1rem;
  width: 90%;
`;

export const FormTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 1rem;
  text-align: center;

  @media only screen and (min-width:1025px) and (max-width:1920px){
    font-size :20px;
  }
  @media only screen and (max-width:1024px){
    font-size :18px;
  }
`;

export const FormLabel = styled.label`
  font-size :1.6rem ;
  margin-right:1rem ;
  width:100px ;

  @media only screen and (min-width: 1025px) and (max-width: 1920px){
    font-size: 1.4rem;
  }

`;


export const FormInput = styled.input`
  margin-left: 1.5rem;
  padding: 0.5rem;
  font-size: 16px;
  border: solid #ced4da;
  border-radius: .4rem;
  width: 50%;

  @media only screen and (min-width:1025px) and (max-width:1920px){
    font-size :14px;
    padding:.45rem; 
    margin-left :1.35rem ;
}

@media only screen and (max-width:1024px){
    font-size :12px;
    padding:.4rem; 
    margin-left :1.2rem ;
}
`;


export const SubmitButton = styled.button`
  padding: 0.5rem;
  margin-top: 0.5rem;
  font-size: 1.6rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;
