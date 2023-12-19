import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import img from './Image/photo-1574169208538-4f45163ade8d.jpg'
import img2 from './Image/premium_photo-1663040337189-fa6906bf2bc4.jpg'
import img3 from './Image/premium_photo-1665203411122-de8d119f665c.jpg'
import { useNavigate } from 'react-router'
import AOS from 'aos';



export default function Home() {
  const [id, setId] = useState("")
  useEffect(() => {
    AOS.init();


    let x = JSON.parse(localStorage.getItem("login"))

    if (JSON.parse(localStorage.getItem("login"))) {
      setId(x.id)
    } else {
      setId("")
    }
  }, []);




  const check = () => {
    navigate('/donation')

  }

  const navigate = useNavigate();
  return (
    <Layout>

      <div className="container-fluid  pt-5 m-0 p-0">
        <div className='m-0 p-0'>
          <div className="con1 m-0 p-0">
            <div className='text-center m-0 p-0'>
              <h1 className='text-center txt1' data-aos="fade-down" data-aos-duration="1500">Empower Lives through <br /> Generous Giving!</h1>
              <button className='button' onClick={check}>Donate Now</button>
            </div>
          </div>
        </div>
      </div>

      <div className="con2">
        <div className="container">
          <div className="row d-flex justify-content-center overflow-x-hidden">
            <div className="col-lg-8 text-center">
              <h2 className='txt2'>Natural Disaster & Crowdfunding</h2>
              <div className='line'></div>
              <p>
                The Natural Disaster Foundation provides crucial aid and support during calamities. Through disaster relief efforts, it offers shelter, food, and medical assistance to affected communities. This foundation mobilizes resources and conducts risk assessments to mitigate future risks. Additionally, it promotes awareness and education on disaster preparedness, empowering individuals to build resilient communities.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="con3">
        <div className="container">
          <h1 className='text-center txt1'>Services and Initiatives</h1>
          <div className="row overflow-hidden ">
            <div className="col-lg-6 p-2 text-center p-5 " data-aos="fade-right" data-aos-duration="1500">
              <img src={img} alt="!.." className='img-fluid' />
            </div>
            <div className="col-lg-6 p-5">
              <h2 className='txt2' data-aos="fade-left" data-aos-duration="1500">Be Prepared, <br /> Save Lives</h2>
              <p className='pra'>Disasters strike without warning, leaving communities devastated and vulnerable. You can make a significant impact by supporting our foundation's disaster preparedness training initiatives.

                Your donation will enable us to conduct comprehensive training programs, equipping individuals and communities with the knowledge and skills to respond effectively in times of crisis. From natural calamities to emergencies, our training covers first aid, evacuation procedures, and essential survival techniques.</p>
            </div>
          </div>
          <div className="row  overflow-hidden">

            <div className="col-lg-6 text-end p-5" >
              <h2 className='txt2' data-aos="fade-right" data-aos-duration="1500">Urgent Relief</h2>
              <p className='pra'>We are facing an unprecedented humanitarian crisis, and we urgently need your support. Your donation can make a life-saving difference for vulnerable communities affected by natural disasters, conflicts, and emergencies.

                With your generous contribution to our foundation, we can deliver essential supplies such as food, clean water, medical aid, and shelter to those in desperate need. Your support ensures that families are protected from hunger, disease, and exposure, giving them a chance to rebuild their lives.</p>
            </div>
            <div className="col-lg-6 text-center p-5" data-aos="fade-left" data-aos-duration="1500">
              <img src={img2} alt="!.." className='img-fluid' />
            </div>
          </div>
          <div className="row  overflow-hidden">
            <div className="col-lg-6 p-2 text-center p-5" data-aos="fade-right" data-aos-duration="1500">
              <img src={img3} alt="!.." className='img-fluid' />
            </div>
            <div className="col-lg-6 p-5">
              <h2 className='txt2' data-aos="fade-left" data-aos-duration="1500">Empowering Lives through Rehabilitation Programs</h2>
              <p className='pra'>Our foundation is dedicated to empowering individuals on their journey to recovery and rehabilitation. With your support, we can make a profound impact on the lives of those struggling with addiction, physical disabilities, mental health challenges, and more.

                Your donation will fund crucial rehabilitation programs that provide comprehensive care, counseling, and vocational training, enabling individuals to reclaim their independence and rebuild their lives. By contributing to our cause, you offer hope to those who need it most, giving them a chance to heal and reintegrate into society.

              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="con2">
        <div className="container">
          <div className="row d-flex justify-content-center overflow-x-hidden ">
            <div className="col-lg-8 text-center ">
              <h2 className='txt2'>How we support young people and children with cancer
              </h2>

              <div className="row d-flex justify-content-center overflow-hidden">
                <div className="col-lg-3 col-md-6 col-sm-12 m-1 " data-aos="fade-up" data-aos-duration="1500">
                  <h5>28</h5>
                  <p>specialist cancer units built-in hospitals across the UK</p>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 m-1 " data-aos="fade-up" data-aos-duration="1500">
                  <h5>92</h5>
                  <p>funded Teenage Cancer Trust Nurses and Youth Support Coordinators</p>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 m-1 " data-aos="fade-up" data-aos-duration="1500">
                  <h5>100's</h5>
                  <p>accredited cancer information pages, written for young people</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="con3">
        <div className="container d-flex justify-content-center">
          <div className="row text-center overflow-x-hidden ">
            <div>
              <h1 className='txt1'>Don’t let a cancer diagnosis decide a young person’s future</h1>
              <button className='m-3 button'>Donate now</button>
            </div>
          </div>
        </div>
      </div>
      <div className="con2">


        <div className="container ">

          <h2 className="txt2 text-center">
            The Poor Man Charity Foundation Provides Money, Clothing, and Essential Items to Those in Need.
          </h2>
          <div className="row d-flex justify-content-center text-center pt-5 overflow-hidden">


            <div className="col-lg-3 p-2" data-aos="fade-right" data-aos-duration="1500">


              <div class="text-box">
                <h5 class="card-title">Empowering Lives through Charity</h5>
                <p class="card-text text-justify"> A Foundation that Donates Money"
                  Content: Our charity foundation believes in making a meaningful impact on the lives of the less fortunate. By donating money to those in need, we aim to provide crucial support for essential resources, education, and healthcare. Together, we can create a brighter and more hopeful future for vulnerable communities.</p>

              </div>

            </div>
            <div className="col-lg-3 p-2" data-aos="fade-up" data-aos-duration="1500">


              <div class="text-box">
                <h5 class="card-title mb-1">Warmth in Every Stitch</h5>
                <p class="card-text text-justify">   Charity Foundation Donates Clothing to the Needy"
                  Content: Our charity foundation recognizes the significance of basic necessities like clothing. Through generous donations, we provide warm and comfortable clothes to the less privileged, especially during harsh weather conditions. Ensuring that everyone has access to decent clothing fosters a sense of dignity and care within the community.</p>

              </div>

            </div>
            <div className="col-lg-3 p-2 " data-aos="fade-left" data-aos-duration="1500">


              <div class="text-box">
                <h5 class="card-title">Beyond Money</h5>
                <p class="card-text text-justify">  Charity Foundation Donates Essential Products"
                  Content: Our commitment to improving lives goes beyond financial support. Our charity foundation donates essential products like food, hygiene items, and educational supplies to those facing hardships. By addressing various needs, we hope to alleviate the burdens faced by marginalized individuals and foster a tronger sense of </p>

              </div>

            </div>
          </div>
        </div>
      </div>


    </Layout >
  )
}
