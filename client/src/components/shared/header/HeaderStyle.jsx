import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderLayout = styled.header`
  font-family: 'Single Day', cursive;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 10rem .9rem 10rem;
  background-color: #003b95;
  margin-bottom: 5rem;
`;

export const LinkTitle = styled(Link)`
  margin-right: 20px;
  font-size: 30px;
  font-weight: bold;
`;

export const RightContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const CenteredLink = styled(Link)`
  margin-right: 30px;
  text-align: center;
  
  color: #ffe;
  font-size: 1.6rem;

`;

export const LogoutButton = styled(Link)`
  margin-right: 8px;
  text-align: center;
  background-color: inherit;
  border: none;
`;

export const HeaderMain = styled.h1`
    margin: 1rem 0 0 3rem;
    /* margin-left: 3rem; */
    font-family: 'Single Day', cursive;
    color: #ffe;
    font-size: 3rem;
    letter-spacing: .2cm;
`;

export const AccommdationStyle = styled.p`
  font-family: 'Single Day', cursive;
  font-size: 1.5rem;
  letter-spacing: .2cm;
  color: #ffe;
`