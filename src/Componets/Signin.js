import React from 'react'
import Layout from './Layout'
import { Formik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import firebaseApp from '../Firebase/firebase';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Loader from '../Loader';


export default function Signin() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [id, setID] = useState("");
  const [showLoader, setshowLoader] = useState(true);

  const [passwordType, setPasswordType] = useState("password");


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
      console.error(err)
    });
  }

  const submittedData = (values) => {

    setshowLoader(true)

    let check = false
    let userRole = ''
    for (let i = 0; i < data.length; i++) {
      if (data[i].email == values.email && data[i].password == values.pass) {
        check = true
        userRole = data[i].userRole ? data[i].userRole : 'user'
        localStorage.setItem("login", JSON.stringify(data[i]))
      }
    }
    if (check) {
      toast.success('login successfull', {
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
      if (userRole == 'admin') {
        navigate('/admin')
      } else {
        navigate('/')
      }

    } else {
      setshowLoader(false)
      toast.error('Please check your credentials !!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }




  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text")
      console.log(passwordType, "forst")
    } else {
      setPasswordType("password")
      console.log(passwordType, "second")

    }
  }

  return (
    <Layout>
      {showLoader && <Loader />}
      <div className="container" >
        <div className="row text-center">
          <div className="col-lg-12 mb-5 studentdetail formbg" style={{ marginTop: "150px" }}>
            <Formik
              initialValues={{ email: "" }}
              onSubmit={async values => {

                // console.log(values, "asdsahjdgajsgdhj")
                submittedData(values)
              }}
              validateOnChange={false}
              validateOnBlur={false}
              validationSchema={Yup.object().shape({

                email: Yup.string()
                  .email()
                  .required("Email Required"),
                // password: Yup.string()
                //   .required("Password Required")
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

                    <h1 className='mt-3 text-center'>Login</h1>



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
                      id="pass"
                      placeholder="Enter your password"
                      type={passwordType}
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.password && touched.password
                          ? "text-input error inputstyle"
                          : "text-input inputstyle"
                      }
                    />
                    <button className="btn-btn-primary eyepass" type='button' onClick={togglePassword} style={{ backgroundColor: "white", border: "none" }}>
                      {passwordType === "password" ? <i class="fa fa-eye-slash" aria-hidden="true"></i> : <i class="fa fa-eye" aria-hidden="true"></i>
                      }
                    </button>

                    {errors.password && touched.password && (
                      <div className="input-feedback">{errors.password}</div>
                    )}
                    <br />
                    <button type="submit" className='mb-3 btn btn-primary' style={{ fontSize: "20px" }} disabled={isSubmitting}>
                      Submit
                    </button>
                    <br />

                    If you don't have an already account <Link to="/signup">Register</Link>
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
