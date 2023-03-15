import React, {useState} from 'react'
import {useNavigate} from "react-router-dom"

const Home = ({socket}) => {
    const navigate = useNavigate()
    const [userName, setUserName] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        localStorage.setItem("userName", userName)
        socket.emit("newUser", {userName, socketID: socket.id})
        navigate("/chat")
    }
  return (
    <form className='home__container' onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" 
        minLength={3} 
        name="username" 
        id='username'
        className='username__input border-[1px] border-[solid] border-[#BDBDBD] !rounded' 
        value={userName} 
        onChange={e => setUserName(e.target.value)}
        />
        <button className='home__cta'>Sign in</button>
    </form>
  )
}

export default Home