import React from 'react'
import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./css.css";
export default function Menu() {
  return <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
    <Navbar.Brand>
      {/* <Link to="/calendrier" className='links'>Calendar</Link> */}

      <Link to="/" className='links'>Calendar</Link>

    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    </Container>
    </Navbar>
}
