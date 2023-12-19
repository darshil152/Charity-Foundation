import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Assets/Charity-light.png'
import Layoutforshop from './Layoutforshop';
import { useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faPlusMinus, faCartShopping, faUser, faChartSimple, faClockRotateLeft, faCreditCard, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';


export default function Headerforshop() {

    const Navigate = useNavigate()

    useEffect(() => {
        let x = JSON.parse(localStorage.getItem("login"))

        if (JSON.parse(localStorage.getItem("login"))) {
            console.log(x.id)
            setId(x.id)
        } else {
            setId("")
        }
    }, [])


    const [id, setId] = useState('')

    const cartClick = () => {
        console.log('come')
        if (id != '') {
            Navigate('/cart/' + id)
        } else {
            toast.warn(<span style={{ color: "#757575" }}>Please<a href="/signin" style={{ textDecoration: "none", fontWeight: 'bold' }}> login </a> for donation. </span >, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    return (
        <Navbar expand="lg" className='header' >
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
                        </Nav.Link>
                    </Nav>
                    <Nav>

                        <button className="d-flex anchor3 btn" onClick={cartClick} >
                            {<FontAwesomeIcon icon={faCartShopping} />}
                            <b className='ms-1' style={{ color: "black" }}>Cart</b>
                        </button>


                        {/* <Nav.Link>

                            <Link to={'/cart/' + id} className='anchor'>
                                Cart
                            </Link>
                        </Nav.Link> */}
                        {/* <Nav.Link>
                            {
                                localStorage.getItem('login') ? <button className='button2'>Profile</button> : <Link to={'/signin'} className='anchor'>
                                    Sign in
                                </Link>
                            }

                        </Nav.Link> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
            <ToastContainer />
        </Navbar>
    )
}
