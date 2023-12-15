import { Link } from "react-router-dom";
import styled from "styled-components";

export const HotelListContainer = styled.div`
  /* padding: 0 30px; */
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`;

export const HotelContainer = styled.div`
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

export const HotelImageWrapper = styled.div`
  position: relative;
  height: 40%;
  overflow: hidden;
`;

export const HotelImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
`;

export const HotelName = styled.h3`
  font-size: 1.6rem;
  font-weight: 500;
  margin-bottom: 10px;
`;

export const HotelAddress = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  margin-bottom: 10px;
`;

export const HotelPrice = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  margin-bottom: 10px;
`;

export const ViewDetailsLink = styled(Link)`
  display: inline-block;
  margin-top: 2rem;
  background-color: #1671f9;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #125dcf;
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