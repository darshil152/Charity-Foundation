import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, Navigate, json, useNavigate } from 'react-router-dom';
import logo from '../Assets/Charity-light.png'
import Profile from '../Assets/profile.png'
import { useEffect } from 'react';


export default function Header() {
  const Navigate = useNavigate()

  const [id, setID] = useState('')
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('');
  const [profile, setProfile] = useState("")
  const handleprofile = () => {
    Navigate('/profile/' + id)
  };

  const handleLogout = () => {
    localStorage.removeItem('login')
    setLoggedIn(false);
    Navigate('/')

  };

  useEffect(() => {


    let x = JSON.parse(localStorage.getItem('login'))
    if (x) {
      setID(x.id)
    } else {
      setID('')
    }


    if (localStorage.getItem('login')) {
      setProfile()
      setLoggedIn(true);
      setLoggedInUser(x.Fname); // Note: This line might need to be corrected based on your data structure
    }

  }, []);


  return (
    <Navbar expand="lg" className='header'>
      <Container >
        <Navbar.Brand href="#home" >
          <Link to={'/'} className='logotext'>
            <img src={logo} style={{ width: '125px' }} />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            <Nav.Link>
              <Link to={'/about'} className='anchor'>
                About
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to={'/contact'} className='anchor'>
                Contact
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to={'/shop'} className='anchor'>
                Shop
              </Link>


            </Nav.Link>
            <Nav.Link>
              <Link to={'/event'} className='anchor'>
                Events
              </Link>

              {/* <Link to={'/event'} className='anchor'>
                Upcoming Event
              </Link> */}
            </Nav.Link>

          </Nav>
          <Nav>

            <Nav.Link >
              {loggedIn ? (
                <Dropdown>
                  <Dropdown.Toggle className='button2' id="dropdown-basic">
                    <i className="bi bi-person-fill"></i> {loggedInUser}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleprofile}>   <i className="bi bi-person-fill"></i> Profile</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout} ><i class="bi bi-box-arrow-right"></i> Logout</Dropdown.Item>

                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Link to="/signin" className="anchor">Sign In</Link>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
