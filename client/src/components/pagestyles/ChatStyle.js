import styled from 'styled-components';

export const ChatContainer = styled.div`
  display: flex;
  position: ${({ isSiteAdmin }) => (isSiteAdmin ? 'static' : 'absolute')};
  height: ${({ isSiteAdmin }) => (isSiteAdmin ? '100vh' : '300px')};
  position: ${({ isSiteAdmin }) => (isSiteAdmin ? 'static' : 'fixed')};
  right: ${({ isSiteAdmin }) => (isSiteAdmin ? 'auto' : '50px')};
  bottom: ${({ isSiteAdmin }) => (isSiteAdmin ? 'auto' : '60px')};
  width: ${({ isSiteAdmin }) => (isSiteAdmin ? 'auto' : '100vh')};
  position: relative;
  right: auto;
  right: 50px;
  width: auto;
  margin-top: 60px;
`;

export const ChatRoomContainer = styled.div`
  width: ${({ isSiteAdmin }) => (isSiteAdmin ? '60%' : '30%')};
  border-right: ${({ isSiteAdmin }) => (isSiteAdmin ? '1px solid #ccc' : '')};

  ul {
    list-style-type: none;
    padding-left:0px;
    margin-top:0px;

    li {
      padding:15px;
      border-bottom :1px solid #ccc;

      &:hover {
        background-color:#f5f5f5;
        cursor:pointer; 
      }
    }}
`;

export const MessagesContainer = styled.div`
  width:70%;
  position: relative;
  
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

export const MessageInputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
`;

export const MessageInput = styled.input`
    width :90%;
    padding :20px ;
    
`;
export const SendMessageButton = styled.button`
  background-color: #fee500;
  border: none;
  color: white;
  padding: 10px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size:16px;
`;