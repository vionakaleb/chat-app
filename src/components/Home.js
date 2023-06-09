import React, {useState} from 'react'
import {useNavigate} from "react-router-dom"

const Home = ({socket}) => {
    const navigate = useNavigate()
    const [userName, setUserName] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        localStorage.setItem("userName", userName)
        socket.emit("newUser", {userName, socketID: socket.id})
        navigate("/chat-app/chat")
    }
  return (
    <>
      <form className='home__container' onSubmit={handleSubmit}>
          <h1 className="!text-[#607EAA] text-[2rem]">Chat App</h1>

          <label htmlFor="username">Username</label>
          <input type="text" 
          minLength={3} 
          name="username" 
          id='username'
          className='username__input border-[1px] border-[solid] border-[#BDBDBD] !rounded !mb-[3rem] text-center' 
          defaultValue={userName || "User"} 
          onChange={e => setUserName(e.target.value)}
          />
          <button className='home__cta'>Sign in</button>
      </form>
      
      <div className="text-center mb-4">
        <a target="_blank" href="https://vionakaleb.github.io/me" rel="noreferrer">
            &nbsp;&#169; https://vionakaleb.github.io/me
        </a>
      </div>
    </>
  )
}

export default Home