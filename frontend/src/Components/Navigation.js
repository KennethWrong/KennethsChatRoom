import '../app.css';
import React from 'react'
import {Navbar,Nav} from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'

function Navigation() {

  const popover = (
    <Popover id="popover-basic">
    <Popover.Title as="h3">About Me </Popover.Title>
    <Popover.Content>
      Hey guys I am kenneth nice to meet you, I am new to CSS so I am trying
      to use web development, SCSS, React and Node to create a webapp to improve and train my skills
      as a web-developer, I am going to add more things into this!

    </Popover.Content>
    </Popover>
  )

  return (
    <Navbar bg="light" variant="light" sticky="top">
      <Navbar.Brand href='#'>KCHAT</Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Item>
          <OverlayTrigger trigger="focus" placement="bottom" overlay={popover}>
            <Nav.Link href="#">About me</Nav.Link>
          </OverlayTrigger>
        </Nav.Item>
        <Nav.Link href="#">Video Syncing</Nav.Link>
        <Nav.Link href="#">What's next?</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default Navigation;
