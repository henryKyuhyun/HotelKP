import styled from "styled-components";

export const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #F5F2EB;
`;

export const MainWapper = styled.div`
`;


export const MainContainer = styled.div`
  flex: 1;
`;

export const MainP = styled.p`
    font-family: "Public Sans", "Public Sans Placeholder", sans-serif;
    font-size: 30px;
    color: rgb(32, 32, 35);
    line-height: 40px;
    text-align: center;
    background-color: #F5F2EB;
`;
export const CardContainer = styled.div`
  background-color: #F5F2EB;  
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;


export const ChatButtonContainer = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;

  button {
    img {
      width:80px;
    }
  }
`;