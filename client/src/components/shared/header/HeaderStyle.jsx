import styled from "styled-components";
import { Link } from "react-router-dom";
import { GrPrevious } from "react-icons/gr";

export const MainHeaderLayout = styled.header`
  font-family: 'Single Day', cursive;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 5rem 1rem 4rem;
  background-color: #F5F2EB;
  // color: #FB5946;
  margin-bottom: 5rem;
  border: 1px solid #dddbd6;
  border-radius: 20px;
`;


export const HeaderLayout = styled.header`
font-family: 'Single Day', cursive;
width: 100%;
display: flex;
flex-wrap: wrap;
justify-content: space-between;
align-items: center;
padding: 0 5rem 1rem 4rem;
background-color: ${props => props.bgColor || '#F5F2EB'};
margin-bottom: 5rem;
border: 1px solid #dddbd6;
border-radius: 20px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  margin-right: 25px;
  text-align: center;
  font-size: 1.6rem;
  font-weight: 700;
  color: #6c6c89;

  &:not(:last-child)::after {
    content: "·";
    margin-left: 15px;
  }

  &:hover {
    color: #FB5946;
    border-radius: 5rem;
  }

  &:hover:not(:last-child)::after {
    color: #6c6c89;
  }
`;

export const CenteredLinkForBtn = styled.button`
  margin-right: 25px;
  text-align: center;
  font-size: 1.6rem;
  font-weight: 700;
  color: #6c6c89;

  &:not(:last-child)::after {
    content: "·";
    margin-left: 15px;
  }

  &:hover {
    color: #FB5946;
    border-radius: 5rem;
  }

  &:hover:not(:last-child)::after {
    color: #6c6c89;
  }
`;

export const ClickLink = styled(Link)`
  margin-right: 15px;
  text-align: center;
  font-size: 1.6rem;
  font-weight: 700;
  color: #6c6c89;

  &:not(:last-child)::after {
    content: "·";
    margin-left: 15px;
  }
  
  &:hover {
    color:#FB5946;
    border-radius: 5rem;
  }

  &:hover:not(:last-child)::after {
    color: #6c6c89;
  }
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
    color: #FB5946;
    font-size: 3rem;
    letter-spacing: .2cm;
`;

export const AccommdationStyle = styled.p`
  font-family: 'Single Day', cursive;
  font-size: 1.5rem;
  letter-spacing: .2cm;
  color: #FB5946;
`


export const PreviousIcon = styled(GrPrevious) `
    cursor: pointer;
    font-size: 2rem;
    text-align: center;
    align-items: center;
    height: auto;
    margin-right: 15rem;
`