import styled from "styled-components";
import { GrSearch } from "react-icons/gr";


export const SearchBarContainer = styled.div`
  position: relative;
  width: 50%;
  margin: auto;
`;

export const SearchInput = styled.input`
  width: 100%;
  border: 3px solid #dddddd;
  border-radius: 40px;
  padding: 10px;
  outline: none;
`;

export const SearchIcon =  styled(GrSearch)`
position: absolute;
right: 10px;
top: 50%;
transform: translateY(-50%);
color: #003b95;
font-size: 20px;
`;