import styled from "styled-components";
import { Link } from "react-router-dom";

export const FooterLayout = styled.footer`
    display: flex;
    justify-content: space-between;
    padding: 30px;
    background-color: #F6F6F9;
`;

export const LeftContainer = styled.div`
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  font-size: 10px;
  font-weight: bold;
`;

export const RightContainer = styled.div`
  margin-right: 20px;
  font-size: 10px;
  font-weight: bold;
`;


export const DeveloperLink = styled(Link)`
  margin-right: 20px;
  font-size: 10px;
  font-weight: bold;
`;
