import styled from "styled-components";
import Modal from 'react-modal';


export const ChangePWBtn = styled.button`
  flex-grow: 1;

div{
  flex-grow: 1;
  text-align: center;
  align-items: center;
  display: flex;
  padding: 9px 30px;
  border-radius: 40px;
}

&:hover {
  background-color: #4666d8;
  border-radius: 40px;
  color: #fff;
}
`;

export const FormStyle = styled.form`
  padding: 6%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;


export const StyledModal = styled(Modal)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 50%;
  height: auto;
  background: #fff;
  border-radius: 10px;
  border: 1px solid black;
  padding: 20px;
`;

export const PStyled = styled.p`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 20px;
`;

export const LabelStyle = styled.label`
  font-size: 1.8rem;
  font-weight: 700;
`;

export const InputStyle = styled.input`
  margin: 15px 0 10px;
  padding-left:1.5rem;
  border-radius: 40px;
  width: 100%;
  height: 45px;
`;

export const DivisionLine = styled.div`
  border-top: 1px solid #111;
  margin: 50px 0px;
`;

export const ConfirmPWBtn = styled.button`
  background-color: blue;
  color: white;
  font-weight: 700;
  font-size: 2rem;
  border: 1px solid black;
  border-radius: 50px;
  width: 20rem;
  height: 5rem;
  align-self: flex-end;
`;

export const ErrorMsg = styled.div`
  color: red;
  font-weight: 900;
`;