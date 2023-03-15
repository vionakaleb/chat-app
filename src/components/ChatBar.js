import React, {useState, useEffect} from 'react'

const ChatBar = ({messages, messageData, typingStatus, lastMessageRef, socket}) => {
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("")

    const handleSearch = (e) => {
        e.preventDefault()
        setSearch(e.target.value)
    }

    useEffect(()=> {
        socket.on("newUserResponse", data => setUsers(data))
    }, [socket, users])

  return (
    <div className='chat__sidebar'>
        <div className='chat__footer'>
            <form className='form' onSubmit={handleSearch}>
            <input 
                type="text" 
                placeholder='Search' 
                className='message !text-[#333333]' 
                value={search} 
                onChange={e => setSearch(e.target.value)}
                />
            </form>
        </div>
        <div>
            <h4  className='chat__header'>{users?.length > 0 ? `${users?.length || 0} Participants` :  `${messageData?.data?.length || 0} Participants`}</h4>
            <div className='chat__users'>
                {users?.length > 0 
                ? users.map(user => <p key={user.socketID}>{user.userName}</p>)
                : messageData?.data?.map(user => <p key={user.id}>{user.owner.firstName}</p>)
            }
            </div>
        </div>
  </div>
  )
}

export default ChatBar