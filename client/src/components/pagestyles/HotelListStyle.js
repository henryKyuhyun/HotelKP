
import { Link } from "react-router-dom";
import styled from "styled-components";

export const HotelListContainer = styled.div`
  padding: 5rem; 
  background-color: #f9f9f9;

  .span {
    text-align:center;
    color:red;
  }
`;

export const HotelListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`;


export const HotelContainer = styled.div`
  position: "relative";
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px 20px 0px 20px;
  margin-bottom:30px;
  border-radius: 5px;
  height: auto;
  width: 100%;
  @media (min-width: 480px) {
    width: calc(50% - 10px);
  }

  @media (min-width: 768px) {
    width: calc(33.3333% - 10px);
  }

  @media (min-width: 1024px) {
    width: calc(20% - 10px);
  }
`;

export const ImageLeftButton = styled.button`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #2d1106;
  font-size: 30px;
  background-color: #fff;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  line-height: 15px;
  font-weight: 700;
  opacity: 0;

  &:hover {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #2d1106;
    font-size: 30px;
    background-color: #fff;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    line-height: 15px;
    font-weight: 700;
  }

`;

export const ImageRightButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #2d1106;
  font-size: 30px;
  background-color: #fff;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  line-height: 15px;
  font-weight: 700;
  opacity: 0;

  &:hover {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #2d1106;
    font-size: 30px;
    background-color: #fff;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    line-height: 15px;
    font-weight: 700;
  }

`;

export const HotelImageWrapper = styled.div`
  position: relative;
  height: 40%;
  overflow: hidden;

    &:hover {
      ${ImageLeftButton}, ${ImageRightButton} {
        opacity: 0.8;
    }
  }
`;
export const HotelImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
  border-radius: 10px;
`;

export const HotelName = styled.h3`
  font-size: 1.6rem;
  font-weight: 500;
  margin: 10px 20px 10px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 230px;
`;

export const HotelAverage = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 500;
  margin: 10px 20px 10px 0;

  .span{
    margin-right: 10px 20px 10px 0;

  }
`;


export const HotelAddress = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 230px;
`;

export const HotelPrice = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  margin-bottom: 10px;
`;

export const ViewDetailsLink = styled(Link)`
  display: inline-block;
  margin-top: 2rem;
  margin-right: 7px;
  background-color: #FC5946;
  color: white;
  padding: 10px 20px;
  border-radius: 24px;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #000;
  }
`;


// ComparisonButton
export const ComparisonContainer = styled.div`
  width: 100%;
  background-color: #fafafa;
  padding: 20px;
  box-shadow: 0px -2px 5px rgba(0,0,0,0.1);
`


export const ComparisonTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 10px;
  width: 30%;
`;

export const ComparisonButton = styled.button`
  padding: 10px 20px;
  background-color: #1671f9;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #125dcf;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const HotelCardPart = styled.div`
  width: 30%;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin-top: 20px;

  h2 {
    font-size: 1.6rem;
    font-weight: 500;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.4rem;
    margin-bottom: 10px;
  }
`;

export const Line  = styled.div`
  width: 100%;
  border-bottom: 2px solid #e3e3e3;
  margin-bottom: 50px;
`;

export const HotelSortContainer  = styled.div`
  display: flex;
  padding: 0 20px;
`;

export const HotelSortButton = styled.button`
  padding: 10px 20px;
  margin: 5px;
  font-weight: 700;
  border: 2px solid #FC5946;
  border-radius: 45px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #FC5946;
    color: #fff;
  }
`;
