import styled from "styled-components";
import { Link } from "react-router-dom";

export const NewsLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 10px 10px;
  // align-items: center;

  @media (min-width: 768px) { 
    align-items: center;
    gap: 30px;

  }

`;

export const NewsTitle = styled.h1`
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 8px;
`;

export const NewsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0;
  list-style-type: none;

  @media (min-width: 768px) { 
    flex-direction: row;
    gap: 50px;

  }
`;

export const NewsItem = styled.li`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%; 
    height: 1px;
    background-color: #E6EBF2;
  }

  @media (min-width: 768px) {
    &::after {
      display: none;
    }
  }
`;

export const NewsLink = styled(Link)`
  display: flex;
  text-decoration: none;
  color: inherit;
    img{
      width:100px;
      height:100px;
      margin: 0 10px 10px 0;
    }
`;

export const FeedContainer = styled.div`
`;



export const FeedTitle = styled.h2`
  font-size: 13px;
  font-weight: 600;
  color: #AEBDD3;
`;

export const FeedContent = styled.p`
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 8px;

`;