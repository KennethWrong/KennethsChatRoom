import axios from 'axios'
import friendFunction from '../utils/friendFunction'

const Friendbar =  () => {

  const friend = friendFunction.getAllFriends()
  friend.then(res => console.log(res))

    
    return(
        <section className='friendbar'>
            <div className='friendbar-div'>
                <h3 className="friendonline">Friends online</h3>
                <div className="innerfriendonline">
                    
                </div>
            </div>
        </section>
    )
}

export default Friendbar