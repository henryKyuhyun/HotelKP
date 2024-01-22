import styled from 'styled-components';
import { IoIosMenu } from 'react-icons/io';

export const MenuIcon = styled(IoIosMenu)`
  cursor: pointer;
  font-size: 20px;
  transition: color 0.3s ease-in-out;

  &.active {
    color: #ff7d52; 
  }

  &:hover {
    color: #ff7d52;
  }
`;

export const MenuItem = styled.li`
  position: relative;
  transition: background 0.3s ease-in-out;
  margin-right: 10px;
`;

export const SubMenu = styled.ul`
position: absolute;
top: 40px;
left: -46px;
background: white;
border-radius: 4px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
display: flex;
flex-direction: column;
z-index: 9999;

li {
    width: 130px;
    padding: 20px 30px;
    text-align: center;
    transition: all 0.3s ease; 

    &:hover {
      background: #FFDAB9;
    }
  }
`;