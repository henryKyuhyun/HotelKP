import styled from "styled-components";

export const CustomContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #ffffff; 
  font-family: 'Helvetica Neue', Arial, sans-serif;
`;

export const LoginFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 550px;
  padding: 2rem 4rem;
  background-color: #ffffff;
  border: 1px solid #dbdbdb;
  border-radius: 1px;
  box-shadow: 0 1px 1px rgba(0,0,0,0.1);
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

export const FormControlContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 1rem;
  width: 100%;
`;

export const FormLabel = styled.label`
  display: none;
`;

export const FormInput = styled.input`
  display: block;
  padding: 9px 0 7px 8px;
  width: 100%;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  background-color: #fafafa;
  font-size: 12px;
  line-height: 18px;
  color: #262626;
`;

export const SubmitButton = styled.button`
  display: block;
  width: 100%;
  padding: 5px 9px;
  margin-top: 1rem;
  background-color: #0095f6;
  border: none;
  border-radius: 4px;
  color: #ffffff;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  &:disabled {
    background-color: #b2dffc;
  }
`;


export const FormSelect = styled.select`
  display: block;
  width: 100%;
  padding: 9px 0 7px 8px;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  background-color: #fafafa;
  font-size: 1.6rem;
  line-height: 1.8rem;
  color: #262626;
`;