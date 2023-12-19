import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../Assets/Charity-trans.png'
export default function Footer() {
  return (
    <div className='footer'>
      <div className="container-fluid ">
        <div className="row d-flex justify-content-center align-items-center m-0 p-0 text-center">
          <div className="col-lg-3 mt-3">
            <Link to={'/'} className='anchor2'>Home</Link> <br />
            <Link to={'/about'} className='anchor2'>About Us</Link> <br />
            <Link to={'/contact'} className='anchor2'>Contact Us</Link> <br />
            <Link to={'/shop'} className='anchor2'>Shop</Link><br />
          </div>
          <div className="col-lg-3 mt-3">
            <div className="">
              <h1 className=''>Follow Us</h1>
              <Link to={'https://accounts.snapchat.com/accounts/v2/login'} className='anchor2'>
                <i className="bi bi-snapchat fs-2 m-2"></i>
              </Link>
              <Link to={'https://www.instagram.com/accounts/login/'} className='anchor2'>
                <i className="bi bi-instagram fs-2 m-2"></i>
              </Link>
              <Link to={'https://www.google.com/search?q=facebook+login&rlz=1C1VDKB_enIN1057IN1057&oq=face&aqs=chrome.3.69i60j69i57j46i67i131i199i433i465i650j0i67i131i433i650j0i512l2j0i67i131i433i650j69i60.3063j0j7&sourceid=chrome&ie=UTF-8'} className='anchor2'>
                <i className="bi bi-facebook fs-2 m-2"></i>

              </Link>
              <Link to={'https://www.google.com/search?q=facebook+login&rlz=1C1VDKB_enIN1057IN1057&oq=face&aqs=chrome.3.69i60j69i57j46i67i131i199i433i465i650j0i67i131i433i650j0i512l2j0i67i131i433i650j69i60.3063j0j7&sourceid=chrome&ie=UTF-8'} className='anchor2'>
                <i className="bi bi-youtube fs-2 m-2"></i>

              </Link>
              <Link to={'https://twitter.com/i/flow/login'} className='anchor2'>
                <i className="bi bi-twitter fs-2 m-2"></i>

              </Link>
              <Link to={'https://web.telegram.org/k/'} className='anchor2'>
                <i className="bi bi-telegram fs-2 m-2"></i>

              </Link>


            </div>

          </div>
          <div className="col-lg-3 mt-3 m-0 p-0">
            <img src={logo} alt="!..." style={{ height: '150px' }} />
          </div>
        </div>
      </div>
    </div>

  );
}
