import styled from "styled-components";
import { FaRegHeart } from 'react-icons/fa';
import { FaRegCreditCard } from "react-icons/fa";
import { MdOutlineModeComment } from "react-icons/md";
import { HiOutlinePencilSquare } from "react-icons/hi2";


export const MypageLayout = styled.div`
  padding: 5rem; 
  background-color: #f9f9f9;

    h1{
        margin-bottom: 2rem;
    }
`;

export const MypageInfo = styled.div`
  border: 2px solid #e3e3e3;
  border-radius: 1rem;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: center;
`;

export const InfoItemBox = styled.div`
  padding: 0 20px;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: center;
`;

export const InfoItem = styled.div`
    margin: 0 10px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* margin: auto; */
    flex-wrap: nowrap;
    justify-content: center;

    span {
        white-space: nowrap;
        align-items: center;
        margin: 0 2rem 1rem 0;
        font-size: 2rem;
        font-weight: 500;
        line-height: 2rem;
      }

      strong{
        font-size: 23px;
        font-wight: 700;
      }
`;

export const InfoBox = styled.div`
  height: 40px;
  background-color: #E5DCC5;
`;

export const ActivitySelectBox = styled.div`
  width: fit-content;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 20px 0;

  h2 {
    margin-bottom:2rem;
    white-space: nowrap;
    font-size: 20px;
    font-weight: 700;
  }

  div{ 
    font-size: 20px;
    font-weight: 500;
    white-space: nowrap;
  }
`;

export const ActivitySelectItems = styled.div`
  display: flex;
  margin-right: 3rem;
  border: 1px solid #eceef9;
  border-radius: 40px;
  background-color: #F7DBA7;
`;

export const ActivitySelectItem = styled.div`
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
    background-color: #F49D6E; 
    border-radius: 40px;
    color: #fff;
  }
`;

export const HeartIcon = styled(FaRegHeart) `
    margin-right: 5px;
    background-color: #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    padding: 4px;
    font-size: 10px;
    ${ActivitySelectItem}:hover & {
        color: initial; 
    }
    
`
export const CreditCardIcon = styled(FaRegCreditCard) `
    margin-right: 5px;
    background-color: #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    padding: 5px;
    ${ActivitySelectItem}:hover & {
        color: initial;
    }
`
export const CommentIcon = styled(MdOutlineModeComment) `
    margin-right: 5px;
    background-color: #fff;
    width: 40px;
    height:40px;
    border-radius: 50%;
    padding: 5px;
    font-size: 5px;
    ${ActivitySelectItem}:hover & {
        color: initial;
    }

`
export const PencilIcon = styled(HiOutlinePencilSquare) `
    margin-right: 5px;
    background-color: #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    padding: 5px;
    font-size: 5px;
    ${ActivitySelectItem}:hover & {
        color: initial;
    }

`
export const ActivityContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5rem 0;
  background-color: #fff;

  h2 {
    padding: 1.5rem;
    background-color: #E5DCC5;
    color : #fff;
  }

`;

export const HotelCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;  
`;


export const HotelDesc = styled.span`
    padding: 30px 20px;
    font-size: 15px;
    font-weight: 700;
`;
