import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import img from './Image/595119f1-6ce3-edb5-2421-cc21a4b24655.jpg'
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import * as Yup from 'yup';
import firebaseApp from '../Firebase/firebase';
import { ToastContainer, toast } from 'react-toastify';
import AOS from 'aos';

export default function Contact() {
  useEffect(() => {

    let getid = JSON.parse(localStorage.getItem('login'))
    if (getid) {
      setId(getid.id)
    } else {
      setId('')
    }

    AOS.init();
  }, []);


  const navigate = useNavigate();
  const [id, setId] = useState('')

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    contact: Yup.string().required('Contact number is required'),
    message: Yup.string().required('Message is required'),
  });


  const makeid = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }


  const uploadDataInFirebase = (data) => {
    let contactQuery = new Promise((resolve, reject) => {
      let db = firebaseApp.firestore();
      db.collection("contactUs").add({
        id: makeid(8),
        name: data.name,
        email: data.email,
        contact: data.contact,
        message: data.message,
        date: Date.now()

      })
        .then((docRef) => {

          console.log("Document written with ID: ", docRef.id);
          resolve(docRef.id);
          toast.success('Thank you for send message! our team will contact you soon.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

        })
        .catch((error) => {

          console.error("Please check form again ", error);
          reject(error);
        });
    });
    contactQuery.then(result => {
      console.warn('register successful')
    }).catch(error => {
      console.error(error)
    })
  }





  return (
    <Layout>
      <div className="container-fluid  pt-5 m-0 p-0">
        <div>
          <div className="con1">
            <div className='text-center'>
              <h1 className='text-center txt1' data-aos="fade-down" data-aos-duration="1500">How to
                Contact Us</h1>
              <button className='button' onClick={() => navigate("/donation")}>Donate Now</button>
            </div>
          </div>
          <div className="con2">
            <div className="container">
              <div className="row overflow-hidden ">
                <div className="col-lg-6 col-sm-12 p-4" data-aos="flip-up" data-aos-duration="1000">
                  <img src={img} alt="!..." className='img-fluid' />
                </div>
                <div className="col-lg-6 col-sm-12">
                  <h1 className='txt1 mt-3'>Contact Us</h1 >
                  <p className="line mt-3">  If you wish to make a meaningful contribution to our charitable foundation, Charity Table Trust, based in the UK, your support can help us make a positive impact on the lives of vulnerable individuals and communities.

                    To make a donation, please visit our website and click on the "Donate" tab. You can choose from various donation methods, including secure online payments, bank transfers, or setting up a regular giving plan.

                    For any inquiries or assistance with the donation process, our friendly team is here to help. You can contact us via email at donate@charitytabletrust.org or call our helpline at +44 (0) 123 456 789.

                    Your generous donation will enable us to continue our essential work, such as providing food and shelter to the homeless, supporting education initiatives, and promoting healthcare in underserved areas. Together, we can create a brighter future for those in need. Thank you for your kind support!</p>
                </div>
              </div>
            </div>
          </div>
          <div className="con3">
            <div className="container">
              <div className="row d-flex justify-content-center overflow-hidden">
                <div className="col-lg-5">
                  <div className="col-lg-9">
                    <h3 className='txt2'>Send Us A Message</h3>
                    <Formik
                      initialValues={{
                        name: '',
                        email: '',
                        contact: '',
                        message: '',
                      }}
                      validationSchema={validationSchema}
                      onSubmit={(values) => {

                        console.log(values);
                        uploadDataInFirebase(values)
                      }}
                    >
                      {({ touched, errors, values }) => (
                        <Form>
                          <div className='mb-3'>
                            <Field type="text" name="name" placeholder="Name" className='form-control ' />
                            <ErrorMessage name="name" component="div" className="text-danger" />
                          </div>
                          <div className='mb-3'>
                            <Field type="email" name="email" placeholder="Email" className='form-control ' />
                            <ErrorMessage name="email" component="div" className="text-danger" />
                          </div>
                          <div className='mb-3'>
                            <Field type="tel" name="contact" placeholder="Contact" className='form-control ' />
                            <ErrorMessage name="contact" component="div" className="text-danger" />
                          </div>
                          <div className='mb-3'>
                            <Field as="textarea" name="message" placeholder="Message" className='form-control '></Field>
                            <ErrorMessage name="message" component="div" className="text-danger" />
                          </div>



                          <button type="submit" className='button2'>Submit</button>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12 p-2">
                  <iframe
                    src="https://maps.google.com/maps?q=northolt park&t=&z=18&ie=UTF8&iwloc=&output=embed"


                    style={{ border: 0, width: '100%', height: '550px' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"

                  />

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Layout>

  )
}
