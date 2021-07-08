import axios from 'axios'

const getAllFriends = async () => {
   const res = await axios.get('http://localhost:3080/friends')
    .catch(err => console.log(err))
    return await res.data
}

const getActualFriends = async () => {
    const res = await axios.get('http://localhost:3080/friends/all')
    .catch(err => console.log(err))
    return await res.data
}

export default {getAllFriends,getActualFriends}