import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faPlusMinus, faCartShopping, faUser, faBagShopping, faClockRotateLeft, faCreditCard, faCalendarDays } from "@fortawesome/free-solid-svg-icons";

import { Link, useNavigate } from "react-router-dom";

function UserSidebar() {

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [id, setId] = useState('');
    const [userRole, setUserRole] = useState('user')


    useEffect(() => {
        if (localStorage.getItem('login')) {
            let data = JSON.parse(localStorage.getItem('login'))
            let id = data.id
            setUserRole(data.userRole)
            setId(id)
        }
        else {
            navigate('/')
        }


    }, [])

    const handleTrigger = () => {
        if (isOpen) {
            setIsOpen(!isOpen);

        } else {
            setIsOpen(!isOpen);

        }
    };

    const handleLogout = () => {
        localStorage.removeItem("Login");
        navigate("/signin");
    };
    const [isEvent, setisEvent] = useState(false);
    const [isprofile, setProfile] = useState(false)
    const [isPlusMinus, setPlusMinus] = useState(false)
    const [isCartSimple, setCartSimple] = useState(false)
    const [isCardSimple, setCardSimple] = useState(false)
    const [isOrderSimple, setOrderSimple] = useState(false)
    const [isLogout, setLogout] = useState(false)

    const eventsEnter = () => {
        setisEvent(true);
    };


    const profileEnter = () => {

        setProfile(true)
    }
    const PlusMinusEnter = () => {
        setPlusMinus(true)
    }
    const CartSimpleEnter = () => {
        setCartSimple(true)
    }
    const CardSimpleEnter = () => {
        setCardSimple(true)
    }
    const OrderSimpleEnter = () => {
        setOrderSimple(true)
    }

    const eventsOut = () => {
        setisEvent(false)
    }
    const profileLeave = () => {
        setProfile(false)
    }
    const PlusMinusLeave = () => {
        setPlusMinus(false)
    }
    const CartSimpleLeave = () => {
        setCartSimple(false)
    }
    const CardSimpleLeave = () => {
        setCardSimple(false)
    }
    const OrderSimpleLeave = () => {
        setOrderSimple(false)
    }
    const LogoutLeave = () => {
        setLogout(false)
    }

    return (
        <div className="App">
            <div className="page">
                <div className="my"></div>

                <div className={`sidebar-backdrop ${isOpen ? "sidebar-backdrop--open" : ""}`} onClick={() => setIsOpen(false)}></div>

                <div className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
                    <div className="trigger" onClick={handleTrigger}>
                        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
                    </div>

                    {userRole === 'admin' && <Link className="d-flex anchor3" to={"/profile/" + id}    >
                        <div className="sidebar-position" onMouseEnter={profileEnter}
                            onMouseLeave={profileLeave} title="Profile">
                            {isprofile ? <FontAwesomeIcon icon={faUser} shake /> : <FontAwesomeIcon icon={faUser} />}
                            <span>Dashboard</span>
                        </div>
                    </Link>}
                    <Link className="d-flex anchor3" to={"/profile/" + id}    >
                        <div className="sidebar-position" onMouseEnter={profileEnter}
                            onMouseLeave={profileLeave} title="Profile">
                            {isprofile ? <FontAwesomeIcon icon={faUser} shake /> : <FontAwesomeIcon icon={faUser} />}
                            <span>Profile</span>
                        </div>
                    </Link>
                    <Link className="d-flex anchor3" to={"/history/" + id} onClick={() => setIsOpen(false)}>
                        <div className="sidebar-position" onMouseEnter={PlusMinusEnter}
                            onMouseLeave={PlusMinusLeave} title="History">
                            {isPlusMinus ? <FontAwesomeIcon icon={faClockRotateLeft} shake /> : <FontAwesomeIcon icon={faClockRotateLeft} />}
                            <span>Donation History</span>
                        </div>
                    </Link>
                    <Link className="d-flex anchor3" to={"/participatedevent/" + id} onClick={() => setIsOpen(false)}>
                        <div className="sidebar-position" onMouseEnter={eventsEnter}
                            onMouseLeave={eventsOut} title="Participated Events">
                            {isEvent ? <FontAwesomeIcon icon={faCalendarDays} shake /> : <FontAwesomeIcon icon={faCalendarDays} />}
                            <span>Participated Events</span>
                        </div>
                    </Link>
                    <Link className="d-flex anchor3" to={"/card/" + id} onClick={() => setIsOpen(false)}>
                        <div className="sidebar-position" onMouseEnter={CardSimpleEnter}
                            onMouseLeave={CardSimpleLeave} title="Card">
                            {isCardSimple ? <FontAwesomeIcon icon={faCreditCard} shake /> : <FontAwesomeIcon icon={faCreditCard} />}
                            <span>Card</span>
                        </div>
                    </Link>

                    <Link className="d-flex anchor3" to={"/cart/" + id} onClick={() => setIsOpen(false)}>
                        <div className="sidebar-position" onMouseEnter={CartSimpleEnter}
                            onMouseLeave={CartSimpleLeave} title="cart">
                            {isCartSimple ? <FontAwesomeIcon icon={faCartShopping} shake /> : <FontAwesomeIcon icon={faCartShopping} />}
                            <span>My Cart</span>
                        </div>
                    </Link>

                    <Link className="d-flex anchor3" to={"/myorder/" + id} onClick={() => setIsOpen(false)}>
                        <div className="sidebar-position" onMouseEnter={OrderSimpleEnter}
                            onMouseLeave={OrderSimpleLeave} title="Order">
                            {isOrderSimple ? <FontAwesomeIcon icon={faBagShopping} shake /> : <FontAwesomeIcon icon={faBagShopping} />}
                            <span>My Orders</span>
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    );
}

export default UserSidebar;
