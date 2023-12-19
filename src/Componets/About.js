import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import { useNavigate } from 'react-router-dom';
import icon from './Image/undraw_education_f8ru.png'
import icon2 from './Image/undraw_environment_iaus (1).png'
import icon3 from './Image/undraw_medical_care_movn.png'
import AOS from 'aos';
import '../Componets/about.css'

export default function About() {
  const navigate = useNavigate();
  useEffect(() => {
    let getid = JSON.parse(localStorage.getItem('login'))
    if (getid) {
      setId(getid.id)
    } else {
      setId('')
    }

    AOS.init();
  }, []);


  const [id, setId] = useState('')
  return (
    <Layout>
      <div className="container-fluid  pt-5 p-0 m-0">
        <div>
          <div className="con1">
            <div className='text-center'>
              <h1 className='text-center txt1' data-aos="fade-down" data-aos-duration="1500">About Us</h1>
              <button className='button' onClick={() => navigate("/donation")}>Donate Now</button>
            </div>
          </div>
          <div className="con2">
            <div className="container">
              <div className="row text-center d-flex justify-content-center">
                <div className="col-lg-8">
                  <h2 className='txt2'>Our Mission</h2>
                  <p className='line'>At [Charity Foundation Name], we are committed to making a positive and lasting impact on the lives of individuals and communities across the United Kingdom. Our mission is to create a better, brighter future for those in need by providing essential support and implementing impactful projects that address various social, economic, and environmental challenges.</p>
                </div>
              </div>
              <div className="row text-center d-flex justify-content-center">
                <div className="col-lg-8">
                  <h2 className='txt2'>                  Who We Are
                  </h2>
                  <p className='line'>[Charity Foundation Name] is a registered nonprofit organization founded in [Year of Establishment]. We are a team of passionate individuals dedicated to improving lives and fostering positive change in the UK. With the help of our dedicated volunteers, donors, and partners, we work tirelessly to address the root causes of issues facing vulnerable populations and promote sustainable development.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="con3">
            <div className="container">
              <div className="row d-flex justify-content-center align-itmes-center text-center overflow-hidden">
                <div className="col-lg-3 col-md-6 col-sm-12 m-2 " data-aos="fade-right" data-aos-duration="1500">
                  <div className='border p-2 rounded'>
                    <img className="card-img-top" src={icon} alt="Card image cap" />
                    <div className="card-body">
                      <h5 className="card-title">Education and Empowerment</h5>
                      <p className="card-text" >"Empowering lives through education. Support our cause for a brighter tomorrow."</p>
                      <p className="card-text"></p>

                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 m-2 " data-aos="fade-up" data-aos-duration="1500">
                  <div className='border p-2 rounded'>
                    <img className="card-img-top" src={icon2} alt="Card image cap" />
                    <div className="card-body">
                      <h5 className="card-title  ">Environmental Sustainability</h5>
                      <p className="card-text">
                        "Promoting eco-friendly practices. Support environmental sustainability for a greener future."       </p>
                      <p className="card-text"></p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 m-2 " data-aos="fade-left" data-aos-duration="1500">
                  <div className='border p-2 rounded'>
                    <img className="card-img-top" src={icon3} alt="Card image cap" />
                    <div className="card-body">

                      <h5 className="card-title pt-3  ">Emergency Response</h5>
                      <p className="card-text pb-2">"Fast, reliable emergency response service. Your safety is our top priority. Support us today!"</p>


                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
