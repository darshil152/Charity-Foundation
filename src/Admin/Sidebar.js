import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faAddressBook, faCalendarDays, faLock, faClock, faUser, faHome, faBagShopping, faGaugeHigh } from "@fortawesome/free-solid-svg-icons";

import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isprofile, setProfile] = useState(false)
  const [isDashboard, setDashboard] = useState(false)
  const [isPlusMinus, setPlusMinus] = useState(false)
  const [isChartSimple, setChartSimple] = useState(false)
  const [isLogout, setLogout] = useState(false)

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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const profileEnter = () => {
    setProfile(true)
  }
  const PlusMinusEnter = () => {
    setPlusMinus(true)
  }
  const DashboardEnter = () => {
    setDashboard(true)
  }
  const ChartSimpleEnter = () => {
    setChartSimple(true)
  }
  const LogoutEnter = () => {
    setLogout(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const profileLeave = () => {
    setProfile(false)
  }
  const PlusMinusLeave = () => {
    setPlusMinus(false)
  }
  const DashboardLeave = () => {
    setDashboard(false)
  }
  const ChartSimpleLeave = () => {
    setChartSimple(false)
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
          <div className="trigger" onClick={handleTrigger} >
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} title="dashboard" />
          </div>


          <Link className="d-flex anchor3" to="/dashboard" onClick={() => setIsOpen(false)}>
            <div className="sidebar-position" onMouseEnter={DashboardEnter}
              onMouseLeave={DashboardLeave} title="">
              {isDashboard ? <FontAwesomeIcon icon={faGaugeHigh} shake /> : <FontAwesomeIcon icon={faGaugeHigh} />}
              <span>Dashboard</span>
            </div>
          </Link>
          <div className="sidebar-position" onMouseEnter={ChartSimpleEnter}
            onMouseLeave={ChartSimpleLeave}>
            <Link className="d-flex anchor3" to="/events" onClick={() => setIsOpen(false)}>
              {isChartSimple ? <FontAwesomeIcon icon={faCalendarDays} shake /> : <FontAwesomeIcon icon={faCalendarDays} />}
              <span>Add Events</span>
            </Link>
          </div>
          <Link className="d-flex anchor3" to="/users" onClick={() => setIsOpen(false)}>
            <div className="sidebar-position" onMouseEnter={PlusMinusEnter}
              onMouseLeave={PlusMinusLeave}>
              {isPlusMinus ? <FontAwesomeIcon icon={faUser} shake /> : <FontAwesomeIcon icon={faUser} />}
              <span>Users</span>
            </div>
          </Link>




          <div className="sidebar-position" onMouseEnter={profileEnter}
            onMouseLeave={profileLeave}>
            <Link className="d-flex anchor3" to="/admin"    >
              {isprofile ? <FontAwesomeIcon icon={faLock} shake /> : <FontAwesomeIcon icon={faLock} />}
              <span>Donation History</span>
            </Link>
          </div>

          <div className="sidebar-position" onMouseEnter={ChartSimpleEnter}
            onMouseLeave={ChartSimpleLeave}>
            <Link className="d-flex anchor3" to="/timeslot" onClick={() => setIsOpen(false)}>
              {isChartSimple ? <FontAwesomeIcon icon={faClock} shake /> : <FontAwesomeIcon icon={faClock} />}
              <span>Time Slot</span>
            </Link>
          </div>


          <div className="sidebar-position" onMouseEnter={profileEnter}
            onMouseLeave={profileLeave}>
            <Link className="d-flex anchor3" to="/contactdata"    >
              {isprofile ? <FontAwesomeIcon icon={faAddressBook} shake /> : <FontAwesomeIcon icon={faAddressBook} />}
              <span>Contact Us</span>
            </Link>
          </div>

          <div className="sidebar-position" onMouseEnter={profileEnter}
            onMouseLeave={profileLeave}>
            <Link className="d-flex anchor3" to="/allorder"    >
              {isprofile ? <FontAwesomeIcon icon={faBagShopping} shake /> : <FontAwesomeIcon icon={faBagShopping} />}
              <span>All Order</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Sidebar;
