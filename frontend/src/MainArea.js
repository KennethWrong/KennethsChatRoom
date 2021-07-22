import React,{useState} from 'react'
import './app.css'
import './styling/responsive.css'
import Chatbox from './Components/Chatbox'
import Notifications from './Components/Notifications'
import Friendbar from './Components/Friendbar'
import Login from './Components/Login'
import Logout from './Components/Logout'
import Footer from './Components/Footer'
import bgVideo from './assets/backdrop.mp4'


function MainArea(props) {
    const [loggedIn, setLoggedIn] = useState(false)
    const socket = props.socket

    
    return(
        <div className="mainarea">
            <section className='sections'>
            <Notifications />
            </section>  
        
        {!loggedIn?
        <section>
        <section className="hero1">
            <div className="wrapping-header">
            <h1 className="kchatapphead">Kenneth's Chat App</h1>
            <h1 className="tryyoutext">Try it! You might start liking it!</h1>
            </div>
            <Login  setLoggedIn={setLoggedIn} socket={socket}/>
        </section>
        <Footer />
        </section>:
        <section className="totalsectionstyle">
            <video autoPlay loop muted type="video/mp4"
            className="bgVideo">
                <source src={bgVideo}></source>
            </video>
        <Logout setLoggedIn={setLoggedIn} socket={socket}></Logout>
        <section className="responsive-section-row">
            <Friendbar socket={socket}/>
            <Chatbox socket={socket} />
         </section>
         </section>
    
    }
        </div>
        
    )
}

export default MainArea;