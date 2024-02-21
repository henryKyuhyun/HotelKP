import styled from 'styled-components';

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em;
  background-color: #f5f5f5;
  border-radius: 10px;
`;

export const FormTitle = styled.h2`
  color: #333;
  font-size: 1.8em;
`;

export const ErrorText = styled.p`
  color: red;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  
  h1{
    text-align: center;
    margin-top: 1rem;
  }
`;

export const InputGroup = styled.div`
  margin-bottom: 1em;
`;

export const Label = styled.label`
  font-size: 1.6rem;
  display: block;
  margin-bottom: 0.5em;
`;

export const Input = styled.input`
  padding: 0.5em;
  width: 100%;
`;

export const TextArea = styled.textarea`
  padding: 0.5em;
  width: 100%;
  height: 300px;
`;

export const SubmitButton = styled.button`
  padding: 0.5em 1em;
  background-color: #fc5946;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const IntroBtn = styled.button`
  display: inline-block;
  background-color: #FC5946;
  color: white;
  padding: 10px 20px;
  border-radius: 24px;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #fff;
  }

`;
