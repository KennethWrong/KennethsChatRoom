import axios from 'axios'
import react from 'react'

const getAllFriends = async () => {
   const res = await axios.get('http://localhost:3080/friends')
    .catch(err => console.log(err))
    console.log(res.data)
}

export default {getAllFriends}