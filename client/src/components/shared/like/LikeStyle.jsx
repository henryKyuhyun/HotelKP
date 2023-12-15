import styled from 'styled-components';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

export const LikeWrapper = styled.div`
  position: absolute;
  top: 5px; 
  right: 3px; 
`;

export const HeartFill = styled(FaHeart)`
  color: #DF013A;
  font-size: 30px;
`;

export const HeartOutline = styled(FaRegHeart)`
  font-size: 30px;
`;