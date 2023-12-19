import React from 'react';
import { useState } from 'react';
import Layout from './Layout';
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import firebaseApp from '../Firebase/firebase';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { useFormik } from "formik";
import { Link } from 'react-router-dom';
import Contact from './Contact';
import Loader from '../Loader';

export default function Signup() {


  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [showLoader, setshowLoader] = useState(true);

  useEffect(() => {
    getdata()
  }, [])



  const getdata = () => {
    let x = []
    const db = firebaseApp.firestore();
    db.collection('users').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        x.push(doc.data())
        setData(x)
        setshowLoader(false)
      })
    }).catch(err => {
      setshowLoader(false)
      console.error(err)
    });
  }


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


  const submittedData = (values) => {
    setshowLoader(true)
    // console.log(values)
    let obj = {
      id: makeid(8),
      Fname: values.name,
      Lname: values.lname,
      password: values.password,
      email: values.email,
      contact: values.contact,
      card: [],
      city: "",
      fundinCash: [],
      fundinThing: [],
      participatedEvents: [],
      state: "",
      country: "",
      zipcode: '',
      address: "",
      userRole: 'user'
    }


    let check = false
    for (let i = 0; i < data.length; i++) {
      if (data[i].email == values.email) {
        check = true
      }
    }
    if (check) {
      toast.error('Email is allready added', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setshowLoader(false)
      // window.location.href = "./signin"
    }
    else {

      let registerQuery = new Promise((resolve, reject) => {
        let db = firebaseApp.firestore();
        db.collection("users").add(obj)

          .then((docRef) => {

            console.log("Document written with ID: ", docRef);
            resolve(docRef.id);

            toast.success('Register successfull', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            localStorage.setItem("login", JSON.stringify(obj))
            setshowLoader(false)
            navigate("/")


          })
          .catch((error) => {
            setshowLoader(false)
            console.error("Please check form again ", error);
            reject(error);
          });
      });
      registerQuery.then(result => {
        console.warn('register successful')
      }).catch(error => {
        console.error(error)
      })
    }
  }





  return (
    <Layout>
      {showLoader && <Loader />}
      <div className="container mt-5 pt-5 " >
        <div className="row text-center pt-5">
          <div className="col-lg-12 mb-5 studentdetail2 formbg" >
            <Formik
              initialValues={{ name: "", lname: "", email: "", password: "", contact: "" }}
              onSubmit={async values => {

                submittedData(values)
              }}
              validateOnChange={false}
              validateOnBlur={false}
              validationSchema={Yup.object().shape({
                name: Yup.string()
                  .required("Name Required"),

                lname: Yup.string()
                  .required("Last name Required"),
                email: Yup.string()
                  .email()
                  .required("Email Required"),
                password: Yup.string()
                  .required("Password Required")
                  .min(8, "Password is Too short"),

              })
              }
            >
              {props => {
                props.submitCount > 0 && (props.validateOnChange = true);
                const {
                  values,
                  touched,
                  errors,
                  dirty,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  handleReset
                } = props;
                return (

                  <form onSubmit={handleSubmit} className='p-5'>

                    <h1 className='mt-3 text-center'>Register</h1>
                    <label htmlFor="name" className='mt-3' style={{ display: "flex", justifyContent: 'flex-start', fontSize: "25px" }} >
                      First name:
                    </label>
                    <input
                      id="name"
                      placeholder="Enter your name"
                      type="text"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.name && touched.name
                          ? "text-input error inputstyle"
                          : "text-input inputstyle"
                      }
                    />
                    {errors.name && touched.name && (
                      <div className="input-feedback">{errors.name}</div>
                    )}

                    <label htmlFor="lname" className='mt-3' style={{ display: "flex", justifyContent: 'flex-start', fontSize: "25px" }} >
                      Last name:
                    </label>
                    <input
                      id="lname"
                      placeholder="Enter your Last name"
                      type="text"
                      value={values.lname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.lname && touched.lname
                          ? "text-input error inputstyle"
                          : "text-input inputstyle"
                      }
                    />
                    {errors.lname && touched.lname && (
                      <div className="input-feedback">{errors.lname}</div>
                    )}



                    <label htmlFor="email" className='mt-3' style={{ display: "flex", justifyContent: 'flex-start', fontSize: "25px" }}  >
                      email:
                    </label>
                    <input
                      id="email"
                      placeholder="Enter your email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.email && touched.email
                          ? "text-input error inputstyle"
                          : "text-input inputstyle"
                      }
                    />
                    {errors.email && touched.email && (
                      <div className="input-feedback">{errors.email}</div>
                    )}


                    <label htmlFor="password" className='mt-3' style={{ display: "flex", justifyContent: 'flex-start', fontSize: "25px" }}  >
                      password:
                    </label>
                    <input
                      id="password"
                      placeholder="Enter your password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.password && touched.password
                          ? "text-input error inputstyle"
                          : "text-input inputstyle"
                      }
                    />
                    {errors.password && touched.password && (
                      <div className="input-feedback">{errors.password}</div>
                    )}


                    <label htmlFor="contact" className='mt-3' style={{ display: "flex", justifyContent: 'flex-start', fontSize: "25px" }}  >
                      contact:
                    </label>
                    <input
                      id="contact"
                      placeholder="Enter your contact"
                      type="tel"
                      value={values.contact}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.contact && touched.contact
                          ? "text-input error inputstyle"
                          : "text-input inputstyle"
                      }
                    />
                    {errors.contact && touched.contact && (
                      <div className="input-feedback">{errors.contact}</div>
                    )}



                    <br />

                    <button type="submit" className='mb-3 btn btn-primary' style={{ fontSize: "20px" }} disabled={isSubmitting}>
                      Submit
                    </button>
                    <br />

                    If you have an  account <Link to="/signin">Login</Link>

                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Layout >
  )
}
