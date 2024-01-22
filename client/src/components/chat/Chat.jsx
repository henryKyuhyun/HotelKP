
// //성공본 Final
// //client/src/components/chat/Chat.jsx 
// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import socketIOClient from "socket.io-client"; 
// import { ChatContainer, ChatRoomContainer, MessagesContainer, MessageInput, MessageInputContainer, SendMessageButton } from '../pagestyles/ChatStyle';

// const ENDPOINT = "http://localhost:4000"; 

// export default function Chat({ isChatOpen, handleChatClose }) {
//   const [message, setMessage] = useState('');
//   const [socket, setSocket] = useState(null);
//   const [response, setResponse] = useState({});
//   const userRole = useSelector((state) => state.auth.userRole);
//   const userId = useSelector((state) => state.auth.userId);
//   const [connectedUsers, setConnectedUsers] = useState([]);
//   const [activeChatRoomId, setActiveChatRoomId] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [chatRooms, setChatRooms] = useState({}); 

//   const [chatOpen, setChatOpen] = useState(true);

//   useEffect(() => {
//     const socket = socketIOClient(ENDPOINT); 
//     setSocket(socket);

//     socket.emit('register', { role: userRole, userId });
    
//     socket.on('chat message', (message) => {
//       console.log('Received chat message:', message);
//       if (activeChatRoomId === null) {
//         setActiveChatRoomId(message.chatRoomId);
//       }

//       setChatRooms((prevChatRooms) => ({
//         ...prevChatRooms,
//         [message.chatRoomId]: [...(prevChatRooms[message.chatRoomId] || []), { userId: message.userId, role: userRole === 'user' ? 'user' : 'hotel_admin', message: message.message }],

//       }));
//     });

//     socket.on('connected users', (userIds) => {
//       console.log('Connected users:', userIds);
//       setConnectedUsers(userIds);
//     });

//     socket.on('all chat rooms', (allChatRooms) => {
//       setChatRooms(allChatRooms.reduce((rooms, roomId) => ({ ...rooms, [roomId]: [] }), {}));
//       console.log('Received all chat rooms:', allChatRooms);
//     });

//     socket.on('chat history', (history) => {
//       setChatRooms((prevChatRooms) => ({
//         ...prevChatRooms,
//         [activeChatRoomId]: history,
//       }));
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);


//   const startSiteAdminChat = (userId) => {
//     const chatRoomId = `${userId}_site_admin`;
//     setActiveChatRoomId(chatRoomId);
//     socket.emit('join chat room', {chatRoomId});  //add
//   };

//   const renderSiteAdminChatButtons = () => {
//     return (
//       <div>
//         {connectedUsers.map((user) => (
//           <button key={user} onClick={() => startSiteAdminChat(user)}>
//             Chat with {user}
//           </button>
//         ))}
//       </div>
//     );
//   };

//   const startChatWithUser = (userId) => {
  
//     setSelectedUser(userId);
//     const chatRoomId = `${userId}_site_admin`;
//     setActiveChatRoomId(chatRoomId);

//     socket.emit('fetch messages', { chatRoomId });
// };


// const sendMessage = () => {
//   if (!socket) return;

//   let chatRoomId;
//   let receiverUserId;

//   // If the sender is a site admin, set the receiver and chat room based on the selected user.
//   // Otherwise, set them as the site admin by default.
//   if (userRole === 'site_admin' && selectedUser) {
//     chatRoomId = `${selectedUser}_site_admin`;
//     receiverUserId = selectedUser;
//     setActiveChatRoomId(chatRoomId); // Update the active chat room ID
//   } else {
//     chatRoomId = `${userId}_site_admin`;
//     receiverUserId = 'site_admin';
//     setActiveChatRoomId(chatRoomId); // Update the active chat room ID
//   }

  
//   socket.emit('chat message', {
//     userId,
//     role: userRole,
//     receiverUserId,
//     message,
//     chatRoomId: activeChatRoomId,
//   });

//   setMessage('');

// };

// const isAdmin = userRole === "site_admin";

// return (
//   <ChatContainer isSiteAdmin={isAdmin}>
//       {isChatOpen ? (
//         <>
//     <ChatRoomContainer isSiteAdmin={isAdmin}>
//       {/* Render Site Admin chat buttons for Users */}
//       {isAdmin && renderSiteAdminChatButtons()}

//       {/* Chat Room Selection */}
//       {isAdmin && (
//         <>
//           Select a chat room:
//           {Object.keys(chatRooms).map((chatRoomId) =>
//             activeChatRoomId !== chatRoomId ? (
//               <>
//                 {" "}
//                 |{" "}
//                 <span style={{ cursor: "pointer"}} onClick={() => {
//                   const userId = chatRoomId.split('_')[0]; // Extract the user ID from the chat room ID
//                   setSelectedUser(userId)
//                   startChatWithUser(userId);
//                 }}>{chatRoomId}
//                 </span>{" "}
//                 |
//               </>
//             ) : null
//           )}
//         </>
//       )}
//     </ChatRoomContainer>

//     {/* Messages */}
//     <MessagesContainer>
//   {chatRooms[activeChatRoomId]?.map((msg, index) => (
//     <div key={index}>
//       <strong>{msg.userId}:</strong> {msg.message}
//     </div>
//   ))}
// {/* Message input */}
// <MessageInputContainer>
//     <MessageInput
//       type="text"
//       value={message}
//       onChange={(e) => setMessage(e.target.value)}
//     />
//     <SendMessageButton onClick={sendMessage}>Send</SendMessageButton>
//   </MessageInputContainer>
// </MessagesContainer>
// <button onClick={handleChatClose}>닫기</button>
// </>
//     ) : null}

//   </ChatContainer>

// );
// }


import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import socketIOClient from "socket.io-client"; 
import { ChatContainer,
        ChatRoomContainer,
        MessagesContainer,
        MessagesBody,
        ItemContainer,
        MessageContent,
        MessageInput,
        MessageInputContainer, 
        MessageForm,
        SendMessageButton,
        SendIcon,
        CloseIcon, } from '../pagestyles/ChatStyle';

const ENDPOINT = "http://localhost:4000"; 

export default function Chat({ isChatOpen, handleChatClose }) {
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [response, setResponse] = useState({});
  const userRole = useSelector((state) => state.auth.userRole);
  const userId = useSelector((state) => state.auth.userId);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [activeChatRoomId, setActiveChatRoomId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatRooms, setChatRooms] = useState({}); 

  const [chatOpen, setChatOpen] = useState(true);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT); 
    setSocket(socket);

    socket.emit('register', { role: userRole, userId });
    
    socket.on('chat message', (message) => {
      console.log('Received chat message:', message);
      if (activeChatRoomId === null) {
        setActiveChatRoomId(message.chatRoomId);
      }

      setChatRooms((prevChatRooms) => ({
        ...prevChatRooms,
        [message.chatRoomId]: [...(prevChatRooms[message.chatRoomId] || []), { userId: message.userId, role: userRole === 'user' ? 'user' : 'hotel_admin', message: message.message }],

      }));
    });

    socket.on('connected users', (userIds) => {
      console.log('Connected users:', userIds);
      setConnectedUsers(userIds);
    });

    socket.on('all chat rooms', (allChatRooms) => {
      setChatRooms(allChatRooms.reduce((rooms, roomId) => ({ ...rooms, [roomId]: [] }), {}));
      console.log('Received all chat rooms:', allChatRooms);
    });

    socket.on('chat history', (history) => {
      setChatRooms((prevChatRooms) => ({
        ...prevChatRooms,
        [activeChatRoomId]: history,
      }));
    });

    return () => {
      socket.disconnect();
    };
  }, []);


  const startSiteAdminChat = (userId) => {
    const chatRoomId = `${userId}_site_admin`;
    setActiveChatRoomId(chatRoomId);
    socket.emit('join chat room', {chatRoomId});  //add
  };

  const renderSiteAdminChatButtons = () => {
    return (
      <div>
        {connectedUsers.map((user) => (
          <button key={user} onClick={() => startSiteAdminChat(user)}>
            Chat with {user}
          </button>
        ))}
      </div>
    );
  };

  const startChatWithUser = (userId) => {
  
    setSelectedUser(userId);
    const chatRoomId = `${userId}_site_admin`;
    setActiveChatRoomId(chatRoomId);

    socket.emit('fetch messages', { chatRoomId });
};


const sendMessage = () => {
  if (!socket) return;

  let chatRoomId;
  let receiverUserId;

  // If the sender is a site admin, set the receiver and chat room based on the selected user.
  // Otherwise, set them as the site admin by default.
  if (userRole === 'site_admin' && selectedUser) {
    chatRoomId = `${selectedUser}_site_admin`;
    receiverUserId = selectedUser;
    setActiveChatRoomId(chatRoomId); // Update the active chat room ID
  } else {
    chatRoomId = `${userId}_site_admin`;
    receiverUserId = 'site_admin';
    setActiveChatRoomId(chatRoomId); // Update the active chat room ID
  }

  
  socket.emit('chat message', {
    userId,
    role: userRole,
    receiverUserId,
    message,
    chatRoomId: activeChatRoomId,
  });

  setMessage('');

};

const isAdmin = userRole === "site_admin";

return (
  <ChatContainer isSiteAdmin={isAdmin} isChatOpen={isChatOpen}>
      {isChatOpen && ( 
        <>

    <ChatRoomContainer isSiteAdmin={isAdmin}>
      {/* Render Site Admin chat buttons for Users */}
      {/* {isAdmin && renderSiteAdminChatButtons()} */}

      {/* Chat Room Selection */}
      {isAdmin && (
        <>
          Select a chat room:
          {Object.keys(chatRooms).map((chatRoomId) =>
            activeChatRoomId !== chatRoomId ? (
              <>
                {" "}
                |{" "}
                <span style={{ cursor: "pointer"}} onClick={() => {
                  const userId = chatRoomId.split('_')[0]; // Extract the user ID from the chat room ID
                  setSelectedUser(userId)
                  startChatWithUser(userId);
                }}>{chatRoomId}
                </span>{" "}
                |
              </>
            ) : null
          )}
        </>
      )}
      <button onClick={handleChatClose}>
        <CloseIcon/>
      </button>
    </ChatRoomContainer>

    {/* Messages */}
    <MessagesContainer>
      <MessagesBody>
        {chatRooms[activeChatRoomId]?.map((msg, index) => (

        <ItemContainer 
          key={index}
          CurrentUser={msg.userId === userId}
        >
          <div>
            {msg.userId === userId ? ( 
              <MessageContent
                CurrentUser={msg.userId === userId}
              >
                  {msg.message}
              </MessageContent> 
            ) : (
              <>
              <span>{msg.userId}</span>
              <MessageContent
                CurrentUser={msg.userId === userId}
              >   
               {msg.message}
              </MessageContent> 
              </>
            )}
          </div>
        </ItemContainer>
      ))}
    </MessagesBody>


    <MessageInputContainer>
      <MessageForm>  
        <MessageInput
          type="text"
          value={message}
          placeholder='메세지를 입력해주세요'
          onKeyDown={e=> (e.key === 'Enter' ? sendMessage(e.target.value) : null)}
          onChange={(e) => setMessage(e.target.value)}
        />

        {message.length > 0 && (
          <SendMessageButton  onClick={sendMessage}>
               <SendIcon/>
          </SendMessageButton>  
        )}     

      </MessageForm>  
    </MessageInputContainer>
        
    </MessagesContainer>
    </>
          )}
  </ChatContainer>
  );
}