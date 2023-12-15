import styled from "styled-components";

export const UploadContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
  flex-direction: column;
`;

export const StyledForm = styled.form`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5rem;
`;

export const StyledLabel = styled.label`
  margin-bottom: 0.5rem;
  font-size: 0.5rem;
  font-weight: bold;

  @media (max-width:1024px) {
    font-size: 1rem;
  }
  @media (min-width:1025px) and (max-width:1920px) {
    font-size: 1.3rem;

  }
  
  @media (min-width:1921px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid black;

  @media (max-width:1024px) {
    margin-bottom: 3rem;
  }
  @media (min-width:1025px) and (max-width:1920px) {
    padding: 1.5rem;
    width: 90rem;
    margin-bottom: 5rem;
  }
  
  @media (min-width:1921px) {
    padding: 1.8rem;
    width: 150rem;
    margin-bottom: 8rem;
    font-size: 2rem;
  }
`;

export const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid black;

@media (max-width:1024px) {
    margin-bottom: 4rem;
    height: 15rem;
  }

@media (min-width:1025px) and (max-width:1920px) {
    width: 90rem;
    height: 30rem;
    padding: 3rem;
    margin-bottom: 5rem;
  }
  
@media (min-width:1921px) {
    width: 150rem;
    height: 40rem;
    padding: 4rem;
    margin-bottom: 8rem;
    font-size: 2rem;
  }

`;

export const StyledSelect = styled.select`
  width: 100%;
  padding: 1rem;
  margin-bottom: 2rem;
  border: 1px solid black;

  @media (max-width:1024px) {
    margin-bottom: 4rem;
  }
  @media (min-width:1025px) and (max-width:1920px) {
    width: 90rem;
    margin-bottom: 5rem;
  }
  
  @media (min-width:1921px) {
    width: 150rem;
    margin-bottom: 8rem;
  }

`;

export const SubmitButton = styled.button`
  padding: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    transform: scale(1);
    background-color: #0056b3;
  }

  @media (max-width:1024px) {
    font-size: 1.6rem;
  }
  @media (min-width:1025px) and (max-width:1920px) {
    font-size: 2rem;
  }
  
  @media (min-width:1921px) {
    font-size: 3rem;
  }

`;