import React, { useEffect, useState, useRef} from 'react'
import ChatBar from './ChatBar'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'
import { apiGetMessages } from '../api/message.api';

const ChatPage = ({socket}) => { 
  const [messages, setMessages] = useState([])
  const [typingStatus, setTypingStatus] = useState("")
  const lastMessageRef = useRef(null);

  const [messageData, setMessageData] = useState([])

  const getMessages = async () => {
    let res = await apiGetMessages();
    setMessageData(res?.response?.data);
  }

  useEffect(()=> {
    socket.on("messageResponse", data => setMessages([...messages, data]))
  }, [socket, messages])

  useEffect(()=> {
    socket.on("typingResponse", data => setTypingStatus(data))
  }, [socket])

  useEffect(()=> {
    if (!socket?.connected && (!messageData || messageData.length === 0)) getMessages();
  }, [messageData, socket?.connected])

  useEffect(() => {
    // Scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);
  
  return (
    <div className="chat">
      <ChatBar messages={messages} messageData={messageData} typingStatus={typingStatus} lastMessageRef={lastMessageRef} socket={socket} />
      <div className='chat__main'>
        <ChatBody messages={messages} messageData={messageData} typingStatus={typingStatus} lastMessageRef={lastMessageRef} socket={socket} />
        <ChatFooter socket={socket} />
      </div>
    </div>
  )
}

export default ChatPage