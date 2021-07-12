import axios from 'axios'

const getAllFriends = async () => {
   const res = await axios.get('http://localhost:3080/friends')
    .catch(err => console.log(err))
    return await res.data
}

const getActualFriends = async (username) => {
    const res = await axios.get(`http://localhost:3080/friends/all/${username}`)
    .catch(err => console.log(err))
    return await res.data
}

const getFriendRequests = async (username) => {
    const res = await axios.get(`http://localhost:3080/users/${username}`)
    const friendrequests = res.data[0].friendrequest
    return friendrequests
}

const handleFriendRequest = async (body) => {
        const res = await axios.put('http://localhost:3080/users/request',body)
        .catch(err =>  err)
        return res
}

export default {getAllFriends,getActualFriends,getFriendRequests, handleFriendRequest}