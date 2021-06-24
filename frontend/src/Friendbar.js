import React, {useState} from 'react'
import io from 'socket.io-client'

function Friendbar(props){
    const [friends,setFriends] = useState(['two toe bill','5 toe johnny'])


    return(
        <section className='friendbar'>
            <div>
                <h3 className="friendonline">Friends online</h3>
                <div className="innerfriendonline">
                    <ul className="responsive-p">
                    {friends.map((friend,index) => <li key={index}>{friend}</li>)}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Friendbar