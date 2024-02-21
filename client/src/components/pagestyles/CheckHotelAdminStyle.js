import styled from 'styled-components';

export const InfoDiv = styled.div`
  margin: 30px;
  justify-content: center;

  div{
    display:flex;
    flex-direction: column;
    align-items: center;
  }

  span {
    font-size: 20px;
  }
`;

export const HotelProfile = styled.h2`
  font-size: 3rem;
  text-align: center;
`;

export const ImgForAdmin = styled.img`
  width: ${props => props.page === 'hotelDetailPage' ? '50px' : '100%'};
  height: ${props => props.page === 'hotelDetailPage' ? '50px' : 'auto'};
  border-radius: ${props => props.page === 'hotelDetailPage' ? '50%' : '0'};
  margin: ${props => props.page === 'hotelDetailPage' ? '0' : '20px 0'};
`;

export const AdminInfo = styled.p`
  font-size: 1.8rem;
`;