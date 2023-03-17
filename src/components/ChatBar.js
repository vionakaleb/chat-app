import React, {useState, useEffect, useCallback} from 'react'

const ChatBar = ({messages, messageData, typingStatus, lastMessageRef, socket}) => {
    const [userData, setUserData] = useState([])
    const [search, setSearch] = useState("")

    const handleSearch = useCallback ((e) => {
        e.preventDefault()
        setSearch(e.target.value)
    }, [])

    useEffect(()=> {
        if (search) {
            const filteredData = userData?.filter((item) => socket?.connected 
                ? item.userName.toLowerCase().includes(search.toLowerCase())
                : item.owner.firstName.toLowerCase().includes(search.toLowerCase())
            )
            setUserData(filteredData)
        } else if (!search && socket?.connected === true)  socket.on("newUserResponse", data => setUserData(data))
        else if (!search && socket?.connected === false) setUserData(messageData?.data);
    }, [messageData?.data, search, socket, userData])
    
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
        <div className="px-[10px]">
            <h4  className='chat__header'>{userData?.length > 0 && `${userData?.length || 0} Participants`}</h4>
            <div className='chat__users'>
                {userData?.map((user, id) => socket?.connected 
                    ? <p key={id}>{user.userName}</p>
                    : <p key={id}>{user.owner.firstName}</p>
                )}
            </div>
        </div>
  </div>
  )
}

export default ChatBar