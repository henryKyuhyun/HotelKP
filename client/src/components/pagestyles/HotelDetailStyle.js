import { Link } from "react-router-dom";
import styled from "styled-components";
import Modal from 'react-modal';

export const HotelLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 25px;
  background-color: #fff;
`;

export const MainImg = styled.img`
  width: 50% !important;
  height: auto;
  object-fit: cover;
  display: block;
  margin: 0 auto;
`;
export const AdminInfo = styled(Modal)`

`;



export const HostBtn = styled(Link)`
  font-size: 1.6rem;
  border: 1px solid black;
  padding: .6rem 1rem;
  border-radius: 10px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  font-weight: 600;
  transition: 0.25s;
  background-color: #FB5946;
  color: #fff;

  &:hover{
        background-color: #000;
    }
`;

export const HotelContiner = styled.div`
  flex: 1;
  padding:30px;
  font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif !important;
  font-weight: 500 !important;
  font-size: 1rem !important;
  line-height: 1.25rem !important;
`;

export const HotelHeader = styled.div`
  display:flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding:10px;
  line-height: 3rem;
  position: relative;
  margin-bottom: 20px;  
  border-bottom: 2px solid #e3e3e3;  

  h1 {
    margin-right:10px;
  }
  div {
    display:flex;
    align-items: center;
    justify-content: space-between;
    
    span {
      margin-right:10px;
    }
  
  }
`;

export const HeaderLeft = styled.div`
`;

export const HeaderRight = styled.div`
`;



export const HotelPrice = styled.p`
  font-weight: 900 !important;
  font-size: 1.3rem !important;
  color: #FB5946;
`;



export const HotelSubInfo = styled.div`
    padding:20px;
    list-style-type: decimal;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
    position: relative;
    margin-bottom: 20px;  
    border-bottom: 2px solid #e3e3e3;  
`;

export const HotelInfo = styled.div`
    padding:30px;
    font-size: 1.3rem;
    line-height: 2rem;
    position: relative;

    h2{
      font-size: 1.4rem;
      margin-bottom: 1.5rem;
    }
    button{
      color: black;
      font-size: 1.4rem;
      font-weight:600;
    }
    
    ::after{
      content:'';
      display:block;
      width:100%;
      border-bottom: 2px solid #e3e3e3;
      position: absolute;
      left:1%;
      bottom:0;
    }
`;

export const HotelCommentInfo = styled.div`
    padding:30px;
    font-size: 1.3rem;
    line-height: 2rem;
    position: relative;
`;

export const Line  = styled.div`

width: 100%;
  border-bottom: 2px solid #e3e3e3;
`;

export const CancelButton = styled.button`
    background-color: #000;
    color: #fff;
    border-radius: 10px;
    padding: 1rem 2rem;
    margin: 2rem;
    font-weight: 600;
    white-space: nowrap;

    &:hover{
      background-color: #FB5946;
    }
`;

