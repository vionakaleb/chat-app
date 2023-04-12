import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import { AiOutlineClose, AiOutlineArrowLeft } from "react-icons/ai";
import moment from 'moment';

const ChatBody = ({messages, messageData, typingStatus, lastMessageRef, socket}) => { 
  const navigate = useNavigate()
  const [userData, setUserData] = useState([])

  useEffect(()=> {
      if (socket?.connected === true) socket.on("newUserResponse", data => setUserData(data));
      else if (socket?.connected === false) setUserData(messageData?.data);
  }, [messageData?.data, socket, userData])

  const handleLeaveChat = () => {
    localStorage.removeItem("userName")
    navigate("/chat-app")
    window.location.reload()
  }

  // const randomColor = Math.floor(Math.random()*16777215).toString(16);
  
  return (
    <>
      <header className='chat__mainHeader !bg-[#ffffff] border-b-[1px] border-b-[solid] border-b-[#BDBDBD]'>
        <button className='cursor-pointer' onClick={handleLeaveChat}>
          <AiOutlineArrowLeft className='w-[14px]' />
        </button>
        <div className='flex-row !w-[100%] !ml-[1.2rem]'>
          <div className='text-[#2F80ED] text-[15px] mb-[9px]'>
              {userData?.length > 0 
                ? userData?.map((user, id) => socket?.connected 
                  ? <label key={id} className="responsive__text">{userData?.length > 1 ? `${user.userName}, ` : user.userName}</label>
                  : <label key={id} className="responsive__text">{userData?.length > 1 ? `${user.owner.firstName}, ` : user.owner.firstName}</label>
              ) : <label>No data.</label>}
          </div>
          <h4 className='text-[#333333] text-[10px]'>{userData?.length > 0 ? `${userData?.length} participants` : "0 participant"}</h4>
        </div>
        <button className='cursor-pointer' onClick={handleLeaveChat}>
          <AiOutlineClose className='w-[14px]' />
        </button>
      </header>

      <div className={(messages?.length > 0 || messageData?.data?.length > 0) ? "message__container" : "message__container flex"}>
        {messages?.length > 0 
        ? messages.map(message => (
          message.name === localStorage.getItem("userName") ? (
            <div className="message__chats" key={message.id}>
              <p className='sender__name !text-[#9B51E0]'>You</p>
              <div className='message__sender !rounded !bg-[#EEDCFF]'>
                  <p className='!text-[#4F4F4F] !text-[12px] mb-[12px]'>{message.text}</p>
                  <p className='!text-[#4F4F4F] !text-[9px]'>{moment(message.timestamp).format('HH:mm')}</p>
              </div>
            </div>
          ) 
          : (
            <div className="message__chats" key={message.id}>
              <p className='capitalize !text-[#E5A443]'>{message.name}</p>
              <div className='message__recipient !rounded !bg-[#FCEED3]'>
                  <p className='!text-[#4F4F4F] !text-[12px] mb-[12px]'>{message.text}</p>
                  <p className='!text-[#4F4F4F] !text-[9px]'>{moment(message.timestamp).format('HH:mm')}</p>
              </div>
            </div>
          )
          ))
          : messageData?.data?.length > 0
          ? messageData?.data?.map(message => (
              <div className="message__chats" key={message.id}>
                <p className='capitalize !text-[#E5A443]'>{message.owner.firstName}</p>
                <div className={`message__recipient !rounded !bg-[#FCEED3]`}>
                    <p className='!text-[#4F4F4F] !text-[12px] mb-[12px]'>{message.text}</p>
                    <p className='!text-[#4F4F4F] !text-[9px]'>{moment(message.timestamp).format('HH:mm')}</p>
                </div>
              </div>
            ))
          : <div className="!text-[#4F4F4F]" style={{margin: "auto"}}>No data.</div>
        }

        <div className='message__status'>
          <p>{typingStatus}</p>
        </div>
        <div ref={lastMessageRef} />   
      </div>
    </>
  )
}

export default ChatBody