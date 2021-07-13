import axios from 'axios'

const getAllFriends = async () => {
   const res = await axios.get('http://localhost:3080/friends')
    .catch(err => console.log(err))
    return await res.data
}
//getting friends for the friend bar
const getActualFriends = async (username) => {
    const res = await axios.get(`http://localhost:3080/friends/all/${username}`)
    .catch(err => console.log(err))
    return await res.data
}
//getting friend requests 
const getFriendRequests = async (username) => {
    const res = await axios.get(`http://localhost:3080/users/${username}`)
    .catch(err =>  console.log(err))
    const friendrequests = res.data[0].friendrequest
    return friendrequests
}
//to either decline or accept friend request, then deleting it
const handleFriendRequest = async (body) => {
        const res = await axios.put('http://localhost:3080/users/request',body)
        .catch(err =>  console.log(err))
        return res
}
//unfriending a person
const deleteFriend = async (body) => {
    const res = await axios.delete('http://localhost:3080/friends',{data:body})
}

export default {getAllFriends,getActualFriends,getFriendRequests, handleFriendRequest, deleteFriend}