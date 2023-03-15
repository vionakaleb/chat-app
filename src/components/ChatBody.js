import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import { AiOutlineClose, AiOutlineArrowLeft } from "react-icons/ai";
import moment from 'moment';

const ChatBody = ({messages, typingStatus, lastMessageRef, socket}) => { 
  const navigate = useNavigate()
  
  const [users, setUsers] = useState([])

    useEffect(()=> {
        socket.on("newUserResponse", data => setUsers(data))
    }, [socket, users])

  const handleLeaveChat = () => {
    localStorage.removeItem("userName")
    navigate("/")
    window.location.reload()
  }
  
  return (
    <>
      <header className='chat__mainHeader !bg-[#ffffff] border-b-[1px] border-b-[solid] border-b-[#BDBDBD]'>
        <button className='cursor-pointer' onClick={handleLeaveChat}>
          <AiOutlineArrowLeft className='w-[14px]' />
        </button>
        <div className='flex-row !w-[100%] !ml-[1.2rem]'>
          <div className='text-[#2F80ED] text-[15px] mb-[9px]'>
              {users?.length > 0 
                ? users.map(user => <label key={user.socketID}>{users?.length > 1 ? `${user.userName}, ` : user.userName}</label>)
                :<label>User</label>}
          </div>
          <h4 className='text-[#333333] text-[10px]'>{users?.length > 1 ? `${users?.length} Participants` : `${users?.length} Participant`}</h4>
        </div>
        <button className='cursor-pointer' onClick={handleLeaveChat}>
          <AiOutlineClose className='w-[14px]' />
        </button>
      </header>

      <div className='message__container'>
        {messages.map(message => (
          message.name === localStorage.getItem("userName") ? (
            <div className="message__chats" key={message.id}>
              <p className='sender__name !text-[#9B51E0]'>You</p>
              <div className='message__sender !rounded !bg-[#EEDCFF]'>
                  <p className='!text-[#4F4F4F] !text-[12px] mb-[12px]'>{message.text}</p>
                  <p className='!text-[#4F4F4F] !text-[9px]'>{moment(message.timestamp).format('HH:mm')}</p>
              </div>
            </div>
          ): (
            <div className="message__chats" key={message.id}>
              <p className='capitalize !text-[#E5A443]'>{message.name}</p>
              <div className='message__recipient !rounded !bg-[#FCEED3]'>
                  <p className='!text-[#4F4F4F] !text-[12px] mb-[12px]'>{message.text}</p>
                  <p className='!text-[#4F4F4F] !text-[9px]'>{moment(message.timestamp).format('HH:mm')}</p>
              </div>
            </div>
          )
          ))}

        <div className='message__status'>
          <p>{typingStatus}</p>
        </div>
        <div ref={lastMessageRef} />   
      </div>
    </>
  )
}

export default ChatBody