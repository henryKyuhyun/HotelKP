import styled from "styled-components";

export const ReservationLayout = styled.section`
    padding: 20px 30px; 

    h1{
        margin-bottom: 2rem;
    }
`;

export const ReservationTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  button {
    margin-left:20px;
    padding:10px;
    color:#fff;
    background-color: #fed461;
    text-align: center;
  }
`;

export const TableHead = styled.th`
  color: #c8c8cd;
  background-color: #f4f2f3;
  padding: 10px;
  font-size: 12px;
`;

export const TableData = styled.td`
  max-width: 100px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 10px;
  background-color: #fff;
  font-size: 15px;
  font-weight: 700;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  border-left: none;
  border-right: none;
`;

export const HotelDesc = styled.span`
    padding: 30px 0;
    font-size: 15px;
    font-weight: 700;
`;