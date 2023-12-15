import styled from "styled-components";
import { Link } from "react-router-dom";

export const CategoryLayout = styled.div`
  width: 100%;
  display: flex;
  gap:50px;
  padding: 10px 10px;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;

`;

export const CategoryContainer = styled.li`
    padding: 30px 30px;

`;


export const CategoryLink = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    
     img{
        width:50px;
        height:50px;
     }
`;

export const CategoryTitle = styled.h1`
font-size: 15px;
font-weight: 400;

`;