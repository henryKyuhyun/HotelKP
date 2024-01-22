// import styled from 'styled-components';

// export const ChatContainer = styled.div`
//   display: flex;
//   position: ${({ isSiteAdmin }) => (isSiteAdmin ? 'static' : 'absolute')};
//   height: ${({ isSiteAdmin }) => (isSiteAdmin ? '100vh' : '300px')};
//   position: ${({ isSiteAdmin }) => (isSiteAdmin ? 'static' : 'fixed')};
//   right: ${({ isSiteAdmin }) => (isSiteAdmin ? 'auto' : '50px')};
//   bottom: ${({ isSiteAdmin }) => (isSiteAdmin ? 'auto' : '60px')};
//   width: ${({ isSiteAdmin }) => (isSiteAdmin ? 'auto' : '100vh')};
//   position: relative;
//   right: auto;
//   right: 50px;
//   width: auto;
//   margin-top: 60px;
// `;

// export const ChatRoomContainer = styled.div`
//   width: ${({ isSiteAdmin }) => (isSiteAdmin ? '60%' : '30%')};
//   border-right: ${({ isSiteAdmin }) => (isSiteAdmin ? '1px solid #ccc' : '')};

//   ul {
//     list-style-type: none;
//     padding-left:0px;
//     margin-top:0px;

//     li {
//       padding:15px;
//       border-bottom :1px solid #ccc;

//       &:hover {
//         background-color:#f5f5f5;
//         cursor:pointer; 
//       }
//     }}
// `;

// export const MessagesContainer = styled.div`
//   width:70%;
//   position: relative;
  
//   ul{
//     list-style-type:none;
//     padding-left :0px;
//     margin-top :0px;
    
//     li{
//       max-width :70%;
//       margin-top :10px;
//       padding :10px;
//       position:relative;

//       &:before{
//         content:'';
//         position:absolute; 
//         top:-2px; left:-8px; 
//         border-width:10px 13px; 
//         border-style:solid; 
//         }
//         &.me{         
//           align-self:flex-end;
//           background-color:#fee500;
//           &:before{             
//             right:-8p;left:auto;border-color:white transparent transparent white}
//         }   
//         &.you{
//         background-color:#fff;
//           &:before{             
//             left:-8p;border-color:white white transparent transparent;}
//           }   
//     }}
// `;

// export const MessageInputContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding-bottom: 20px;
// `;

// export const MessageInput = styled.input`
//     width :90%;
//     padding :20px ;
    
// `;
// export const SendMessageButton = styled.button`
//   background-color: #fee500;
//   border: none;
//   color: white;
//   padding: 10px 10px;
//   text-align: center;
//   text-decoration: none;
//   display: inline-block;
//   font-size:16px;
// `;


import styled from 'styled-components';
import { FaArrowUp } from "react-icons/fa";
import { GrClose } from "react-icons/gr";

export const ChatContainer = styled.div`
position: relative;
display: ${props => props.isChatOpen ? 'flex' : 'none'};
flex-direction: column;
width: 550px;
height: 720px;
background-color: #FFF9EF;

@media (max-width:1024px) {  
  width: 400px;
  height: 650px;
}
 
 @media (min-width:1025px) and (max-width:1920px) { 
  width: 500px;
  height: 650px;
  font-size: 18px;
}

 @media (min-width:1921px) {
  width: 650px;
  height: 800px;
}
`;

export const ChatRoomContainer = styled.div`
position: relative;
padding: 30px;
background-color: #ff7d52;
color: #fff;

  button{
    position: absolute;
    top: 18px;
    right: 10px;
  }
`;

export const CloseIcon = styled(GrClose) `
    cursor: pointer;
    font-size: 30px;
`

export const MessagesContainer = styled.div`
width:100%;
height: 100%;
position: relative;
display: flex;
flex-direction: column;
justify-content: space-between;
flex-grow: 1; 
overflow-y: auto;
  
  ul{
    list-style-type:none;
    padding-left :0px;
    margin-top :0px;
    
    li{
      max-width :70%;
      margin-top :10px;
      padding :10px;
      position:relative;

      &:before{
        content:'';
        position:absolute; 
        top:-2px; left:-8px; 
        border-width:10px 13px; 
        border-style:solid; 
        }
        &.me{         
          align-self:flex-end;
          background-color:#fee500;
          &:before{             
            right:-8p;left:auto;border-color:white transparent transparent white}
        }   
        &.you{
          background-color:#fff;
          &:before{             
            left:-8p;border-color:white white transparent transparent;}
          }   
    }}
`;

export const MessagesBody = styled.div`
  width: 100%;
  padding: 15px;
  overflow-y:auto; 
  flex-grow: 1;
`;

export const MessageInputContainer = styled.div`
  width: 100%;
  height: 60px;
  position: sticky; 
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
  background-color: #ff7d52;

  @media (max-width:1024px) {  
    height: 60px;
  }
   
   @media (min-width:1025px) and (max-width:1920px) { 
    height: 70px;
    font-size: 20px;
  }
  
   @media (min-width:1921px) {
    height: 80px;
  }

`;

export const ItemContainer = styled.li`
  display: flex;
  justify-content: ${props =>props.CurrentUser ? 'flex-end' : 'flex-start'};
    span{
      font-size: 15px;
    }
`;

export const MessageContent = styled.div`
  padding: 10px;
  font-size: 15px;
  margin-top: 0.5rem;
  ${props => props.CurrentUser ? `
    background-color: #03006E;
    color: #fff;
    border-radius: 10px;
  ` : `
    background-color: #fff;
    color: #000;
    border-radius: 0px 12px 12px 12px;
    border-color: #fcf6ed;
    box-shadow: rgba(0,0,0,0.25) 0px 1px 2px;
  `}

  @media (max-width:1024px) {  
    font-size: 15px;
  }
  
  @media (min-width:1025px) and (max-width:1920px) { 
    font-size: 18px;
  }
  
  @media (min-width:1921px) {
    font-size: 23px;
  }


  
`;



export const MessageForm = styled.div`
    width: 90%;
    height: 100%;
    display: flex;
    position: relative;
`;

export const MessageInput = styled.input`
    width :90%;
    padding: 10px;
    padding-right: 50px;
    background-color: #fff;
    flex-grow: 1;
    border : none ;
    border-radius: 15px;
    font-size: 15px;

    &:focus {
        outline: none; 
    }
`;

export const SendMessageButton = styled.button`
    position: absolute; 
    display:flex;
    justify-content:center;
    align-items:center;
    width: 30px;
    height: 30px;
    right: 10px; 
    top: 50%; 
    transform: translateY(-50%); 
    margin: auto;
    background-color : transparent;
    border : none;
    border-radius: 50%;
    background-color: #03006e;
    color: #fff;

    &:hover {
      transform: translateY(-50%);
  }
`;

export const SendIcon = styled(FaArrowUp) `
    color: #fff;
    cursor: pointer;
    font-size: 12px;
`
