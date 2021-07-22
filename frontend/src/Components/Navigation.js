import '../app.css';
import React from 'react'
import {Navbar,Nav} from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Badge from 'react-bootstrap/Badge'
import {useSelector} from 'react-redux'
import FriendRequest from '../Components/FriendRequest'
import friendFunction from '../utils/friendFunction'
import Logo from '../svg/Logo'

const Navigation = (props) => {
  const requests = useSelector(state => state.request.value)
  const username = useSelector(state => state.username.value)

  const requestPopover = (
    <Popover id="popover-basic">
    <Popover.Title as="h3"
    style={{fontSize:'12px'}}>
      Friend Requests </Popover.Title>
    <Popover.Content>
      {requests?
      <FriendRequest requests={requests} username={username} socket={props.socket}></FriendRequest>
      :<p style={{color:'grey',fontSize:'10px',textAlign:'center'}}>Login to Check</p>}
    </Popover.Content>
    </Popover>
  )

  const popover = (
    <Popover id="popover-basic">
    <Popover.Title as="h3"
    style={{fontSize:'15px'}}>
      About Me </Popover.Title>
    <Popover.Content>
      <p style={{fontSize:'12px'}}>
      Hey guys I am kenneth nice to meet you,  I created this page to practice
      my web-dev skills. This project started in the Summer of 2021 and I hope
      that I can continue to make cool websites like this. As for now please enjoy!
      </p>

    </Popover.Content>
    </Popover>
  )
  return (
    <Navbar bg="light" variant="light" sticky="top"
    className="navbar">
      <Navbar.Brand href='http://localhost:3000'>
        <Logo></Logo>
      </Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Item>
          <OverlayTrigger trigger="focus" placement="bottom" overlay={popover}>
            <Nav.Link href="#" className="navlink-style">About me</Nav.Link>
          </OverlayTrigger>
        </Nav.Item>
        <OverlayTrigger trigger="focus" placement="bottom" overlay={requestPopover}>
        <Nav.Link className="navlink-style" 
        href="#">
          Friend Requests <Badge variant="dark">{requests?
          requests.length: 'NaN'}</Badge>
          </Nav.Link>
          </OverlayTrigger>
        <Nav.Link className="navlink-style github" href="https://github.com/KennethWrong">
          GitHub
          </Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default Navigation;
