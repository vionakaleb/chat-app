import React, {useState} from 'react'

const ChatFooter = ({socket}) => {
  const [message, setMessage] = useState("")
  const handleTyping = () => socket.emit("typing",`${localStorage.getItem("userName")} is typing`)

  const handleSendMessage = (e) => {
    e.preventDefault()
    if(message.trim() && localStorage.getItem("userName")) {
      socket.emit("message", 
          {
          text: message, 
          name: localStorage.getItem("userName"), 
          id: `${socket.id}${Math.random()}`,
          socketID: socket.id
          }
      )
    } else {
      alert("Error: Connect to server to send message.")
    }
    setMessage("")
  }
  return (
    <div className='chat__footer'>
        <form className='form' onSubmit={handleSendMessage}>
          <input 
            type="text" 
            placeholder='Type a new message' 
            className='message !text-[#333333]' 
            value={message} 
            onChange={e => setMessage(e.target.value)}
            onKeyDown={handleTyping}
            />
            <button className="sendBtn !bg-[#2F80ED]">Send</button>
        </form>
     </div>
  )
}

export default ChatFooter