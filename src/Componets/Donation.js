import React from 'react'
import Layout from './Layout'
import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import firebaseApp from '../Firebase/firebase';
import { useEffect } from 'react';
import { Modal, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { CheckLg } from 'react-bootstrap-icons';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import Loader from '../Loader';

import StripeCheckout from 'react-stripe-checkout';

let images = []
let imageUrl = []
let n = 0
let flag = false
export default function Donation() {




  const [showModal, setShow] = useState(false);
  const [showLoader, setshowLoader] = useState(true);

  const [showModal1, setShow1] = useState(false);


  const [key, setKey] = useState('fund');
  const [val, setVal] = useState(0);
  const [cash, setCash] = useState([])
  const [bank, setBank] = useState([])

  const [id, setId] = useState("");
  const [amount, setAmount] = useState("")
  const [data, setData] = useState([]);
  const [card, setCard] = useState([])
  const [type, setType] = useState('gpay')
  const [timeslot, setTimeslot] = useState([])
  const [products, setProcucts] = useState([])
  const [preview, setPreview] = useState([])
  const [finaldata, setFinaldata] = useState([])
  const [uploadedImg, setuploadedImg] = useState([])

  const [city, setcity] = useState("")
  const [state, setstate] = useState("")
  const [country, setcountry] = useState("")
  const [Zipcode, setZipcode] = useState("")

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("furniture");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [slot, setslot] = useState("");



  useEffect(() => {
    gettimeslot()
    let id = ''
    if (localStorage.getItem('login')) {

      id = JSON.parse(localStorage.getItem('login')).id
    }

    setId(id)
    getdata(id)
  }, [])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);


  const showcredit = (e) => {
    setVal(e.target.value)
  }


  const handleSlot = (e) => {
    console.log(e.target.value)
    setslot(e.target.value)
  }


  const gettimeslot = () => {

    let x = []
    const db = firebaseApp.firestore();
    db.collection('timeslot').where("status", "==", Number(1)).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data())
        x.push(doc.data())
        setTimeslot(x)
      })
    }).catch(err => {
      console.error(err)
    });
    setshowLoader(false)
  }

  const getdata = (id) => {
    const db = firebaseApp.firestore();
    db.collection('users').where("id", "==", id).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

        console.log(doc.data().bankDetail)

        if (doc.data().bankDetail) {
          setBank(doc.data().bankDetail)
        }

        if (doc.data().fundinCash) {
          setCash(doc.data().fundinCash)
        }

        if (doc.data().address) {
          setAddress(doc.data()?.address)
        }
        if (doc.data().card) {
          setCard(doc.data()?.card)
        }

        // setData(doc.data().card)
        if (doc.data().fundinThing) {
          setFinaldata(doc.data().fundinThing)
        } else {
          setFinaldata([])
        }



      })
    }).catch(err => {
      console.error(err)
    });
  }

  const handleType = (e) => {
    setType(e.target.value)
  }


  // const onToken = (token) => {
  //   fetch('/save-stripe-token', {
  //     method: 'POST',
  //     body: JSON.stringify(token),
  //   }).then(response => {
  //     response.json().then(data => {
  //       alert(`We are in business, ${data.email}`);
  //     });
  //   });
  // }

  const submitdonation = () => {
    if (localStorage.getItem('login')) {
      let loginData = JSON.parse(localStorage.getItem('login'))
      if (amount > 0) {

        if (type == 'card') {
          if (card.length > 0) {
            let x = cash
            let obj = {
              id: makeid(4),
              amount: amount,
              type: type,
              date: Date.now(),
              donatedBy: id
            }
            x.push(obj)
            setCash(x)

            setAllFundInDatabase(obj, x)
          } else {
            toast.warn(<span style={{ color: "#757575" }}>Please add your card Details from <a href={"/card/" + loginData.id} style={{ textDecoration: "none", fontWeight: 'bold' }}> here </a>. </span >, {
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

        } else if (type == 'bankTransfer') {
          if (bank.length > 0) {
            let x = cash
            let obj = {
              id: makeid(4),
              amount: amount,
              type: type,
              date: Date.now(),
              donatedBy: id
            }
            x.push(obj)
            setCash(x)

            setAllFundInDatabase(obj, x)
          } else {
            toast.warn(<span style={{ color: "#757575" }}>Please add your bank Detail  <a href={"/card/" + loginData.id} style={{ textDecoration: "none", fontWeight: 'bold' }}> here </a>. </span >, {
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
        } else if (type == 'paypal') {
          console.log("first")
        }
        else {
          let x = cash
          let obj = {
            id: makeid(4),
            amount: amount,
            type: type,
            date: Date.now(),
            donatedBy: id
          }
          x.push(obj)
          setCash(x)

          setAllFundInDatabase(obj, x)
        }

      } else {
        toast.warn('please add amount', {
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

  const setAllFundInDatabase = (obj, x) => {
    let registerQuery = new Promise((resolve, reject) => {
      let db = firebaseApp.firestore();
      db.collection("funds").add(obj)

        .then((docRef) => {

          console.log("Document written with ID: ", docRef.id);
          resolve(docRef.id);


          upadtecash(x)



        })
        .catch((error) => {

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

  const upadtecash = (x) => {
    console.log(x, id)

    const db = firebaseApp.firestore();
    db.collection('users').where("id", "==", id).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

        var updateCollection = db.collection("users").doc(doc.ref.id);

        return updateCollection.update({
          fundinCash: x
        })
          .then(() => {
            toast.success('Donation successfull', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });

            console.log("Document successfully updated!");
            getdata(id)
          })
          .catch((error) => {

            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
      })
    }).catch(err => {
      console.error(err)
    });
  }


  const addcard = (values) => {
    let x = []
    console.log(values)
    let obj = {
      name: values.name,
      Cnumber: values.number,
      cvv: values.cvv,
      Edate: values.expdate,
    }
    x.push(obj)
    setCard(x)
    updatecard(x)
  }


  const getBase64 = (file) => {
    let x = []
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      images.push(reader.result)
      setProcucts(images)
      setPreview(images)
      console.log(products)
    };
    // console.log(products)
  }

  const setImages = (files) => {
    images = files
    setshowLoader(true)
    for (let i = 0; i < files.length; i++) {

      UploadImageTOFirebase(files[i])
    }

    // for (let i = 0; i < e.target.files.length; i++) {
    //  
    // }

  }
  const submitdata = () => {

    if (JSON.parse(localStorage.getItem("login"))) {
      if (address == '') {
        toast.warn(<span style={{ color: "#757575" }}>Please add your address from<a href={"/profile/" + id} style={{ textDecoration: "none", fontWeight: 'bold' }}> here </a>. </span >, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (uploadedImg.length > 0 && slot !== '' && title !== '') {
        AddproductDatabase()

      } else {
        toast.error("Please enter product Details")
      }


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


  const UploadImageTOFirebase = (file) => {

    const guid = () => {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return String(s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4());
    }


    let myPromise = new Promise((resolve, reject) => {

      const myGuid = guid();
      const storageUrl = firebaseApp.storage('gs://decode-softtech.appspot.com/')
      const storageRef = storageUrl.ref();
      console.log('ref : ', storageRef)
      const uploadTask = storageRef.child('charity').child('products').child(myGuid).put(file)
      uploadTask.on('state_changed',
        (snapShot) => {

        }, (err) => {
          //catches the errors
          console.log(err)
          reject(err)
        }, () => {

          firebaseApp
            .storage('gs://decode-softtech.appspot.com/')
            .ref()
            .child('charity')
            .child('products')
            .child(myGuid)
            .getDownloadURL()
            .then(fireBaseUrl => {
              resolve(fireBaseUrl)
            }).catch(err => {
              console.log('error caught', err)
            })
        })
    })
    myPromise.then(url => {
      imageUrl.push(url)
      setuploadedImg(imageUrl)
      if (imageUrl.length == images.length) {
        setshowLoader(false)
      }
    }).catch(err => {
      console.log('error caught', err)
    })

  }




  const AddproductDatabase = () => {
    setshowLoader(true)
    let finalProductData = finaldata
    let obj = {
      title: title,
      description: description,
      category: category,
      price: 0,
      images: uploadedImg,
      date: Date.now(),
      id: makeid(8),
      slots: slot,
      address: address,
      stock: 1,
      status: 0
    }
    finalProductData.push(obj)
    setFinaldata(finalProductData)

    let registerQuery = new Promise((resolve, reject) => {
      let db = firebaseApp.firestore();
      db.collection("products").add(obj)
        .then((docRef) => {
          updatedonation(finalProductData)
          console.log("Document written with ID: ", docRef.id);
          resolve(docRef.id);

          setshowLoader(false)
          setCategory('')
          setDescription('')
          setslot('')
          setTitle('')
          setPreview([])
          setuploadedImg([])
          images = []
          imageUrl = []
          document.getElementById("file-input").value = ('')

        })
        .catch((error) => {
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


  const updatedonation = (x) => {
    const db = firebaseApp.firestore();
    console.log(x, id)
    db.collection('users').where("id", "==", id).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

        var updateCollection = db.collection("users").doc(doc.ref.id);

        return updateCollection.update({
          fundinThing: x
        })
          .then(() => {

            console.log("Document successfully updated!");
            setshowLoader(false)
            setCategory('')
            setDescription('')
            setslot('')
            setTitle('')
            setPreview([])
            setuploadedImg([])
            images = []
            imageUrl = []
            document.getElementById("file-input").value = ('')

            n = 0
            getdata(id)
            slotstatus(slot)

          })
          .catch((error) => {

            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
      })
    }).catch(err => {
      console.error(err)
    });
  }



  const slotstatus = (slot) => {

    console.log(slot)
    const db = firebaseApp.firestore();
    db.collection('timeslot').where("id", "==", slot).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

        var updateCollection = db.collection("timeslot").doc(doc.ref.id);

        return updateCollection.update({
          status: 0,
          bookedBy: id
        })
          .then(() => {
            gettimeslot()
            console.log("first")
            toast.success('Donation added successfull', {
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
            setCategory('')
            setDescription('')
            setslot('')
            setTitle('')
            setPreview([])
            setuploadedImg([])
            images = []
            imageUrl = []
            document.getElementById("file-input").value = ('')
            console.log("Document successfully updated!");
          })
          .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
      })
    }).catch(err => {
      console.error(err)
    });
  }


  const saveaddress = () => {
    const db = firebaseApp.firestore();
    db.collection('users').where("id", "==", id).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

        var updateCollection = db.collection("users").doc(doc.ref.id);

        return updateCollection.update({
          address: address,
          city: city,
          state: state,
          country: country,
          zipcode: Zipcode
        })
          .then(() => {
            getdata(id)
            setShow1(false)
            console.log("Document successfully updated!");
            toast.success('Address added successfull', {
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
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
      })
    }).catch(err => {
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

  const updatecard = (x) => {
    const db = firebaseApp.firestore();
    db.collection('users').where("id", "==", id).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

        var updateCollection = db.collection("users").doc(doc.ref.id);

        return updateCollection.update({
          card: x
        })
          .then(() => {
            getdata(id)
            setShow(false)
            console.log("Document successfully updated!");

          })
          .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
      })
    }).catch(err => {
      console.error(err)
    });
  }

  const removeImg = (img) => {
    console.log(img)
  }

  return (
    <Layout>
      {showLoader && <Loader />}
      <div className='pt-5'>

        <h1 className='text-center pt-5 mt-5 mb-4'>Choose Donation Type</h1>
        <div className="container pt-5">

          {/* <StripeCheckout
            token={onToken}
            name='Charity foundation'
            amount="500"
            stripeKey="pk_test_51KNyQ8SBIciy97wjc2m5TtpUnn5rpx6x6XxjFpFt1LMQlG572knYyCgOwDbKqYaLy9aZH0RKgb7XRfhPn80Kkr9s00Fn72bYJd"
          /> */}

          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="d-flex justify-content-center mb-3"
          >

            <Tab eventKey="fund" title="Fund Donation">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 mb-5 studentdetail formbg">
                    <h1 className='mt-3 text-center'>Fund Donation</h1>

                    <div className="col-lg-12 mt-3">
                      <label htmlFor="number">amount: </label><br />
                      <span style={{ position: "relative", top: "32px", left: "10px" }}>£</span>

                      <input type="number" name="number" id="number" style={{ paddingLeft: "20px" }} value={amount} className='inputstyle' onChange={(e) => setAmount(e.target.value)} />


                    </div>



                    <div className="col-lg-12 mb-3 mt-3">
                      <label htmlFor="type">Payment type:</label><br />
                      <select name="type" id="type" className='inputstyle' onChange={handleType}>

                        <option value="gpay" >Google Pay</option>
                        <option value="bankTransfer" >Bank Transfer</option>
                        <option value="paypal" >Paypal</option>
                        <option value="card" >Credit Card / Debit Card</option>
                        <option value="paypal" >paypal</option>


                      </select>
                    </div>


                    {/* {
                    (val == 1 && data && data.length > 0) ? flag = true : fl 
                  }

                  {(val == 1 && data && data.length > 0) ? <h1>asdsa</h1> : <button>add card</button>}
                  {(val == 3 && data && data.length > 0) ? <h1>asdsa</h1> : <button>add Bank</button>} */}




                    {/* {
                    val == 0 ? console.log("paypal") : (val == 1 && data && data.length > 0) ? <h1>********</h1> : <button>add card</button> ? val == 2 ? console.log("gpay") : val == 3 && data && data.length > 0 ? <h1>123*</h1> : <button>add bank Detail</button> 
                  } */}

                    <br />

                    <button className='mb-3 button2' onClick={submitdonation}>Submit</button>
                  </div>
                </div>
              </div>
            </Tab>

            <Tab eventKey="items" title="Items Donation">
              <div className="container">

                <div className="row">
                  <div className="col-lg-12 mb-5 studentdetail formbg">
                    <h1 className='mt-3 text-center'>Items Donation</h1>

                    <div className="col-lg-12 mt-3">
                      <label htmlFor="title">Title: </label><br />
                      <input type="text" name="title" id="title" value={title} className='inputstyle' onChange={(e) => setTitle(e.target.value)} />
                    </div>


                    <div className="col-lg-12 mt-3">
                      <label htmlFor="title">Category: </label><br />
                      <select name="category" className='inputstyle' value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="furniture">Furniture</option>
                        <option value="cloths">Cloths</option>
                        <option value="grocerry">Grocerry</option>
                        <option value="electronic">Electronic Item</option>
                        <option value="other">Other</option>
                      </select>
                    </div>


                    <div className="col-lg-12 mt-3">
                      <label htmlFor="title">timeslot: </label><br />
                      <select name="timeslot" className='inputstyle' onChange={handleSlot}>
                        <option value=''>Select Time Slot</option>
                        {
                          timeslot.map((i) => {
                            return (
                              <option value={i.id}>{i.time}</option>

                            )
                          })
                        }
                      </select>
                    </div>


                    <div className="col-lg-12 mt-3">

                      <div className="file-input">

                        <lable className="lbl-comn-info " > Upload Images:</lable> <br />


                        <input
                          type="file"
                          name="file-input"
                          id="file-input"
                          multiple

                          className="d-none file-input__input"
                          onChange={(e) => setImages(e.target.files)}
                        />
                        <label className="file-input__label" for="file-input">
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="upload"
                            className="svg-inline--fa fa-upload fa-w-16"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path
                              fill="currentColor"
                              d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                            ></path>
                          </svg>
                          <span>Upload file</span></label>
                      </div>

                    </div>


                    <div className='row'>

                      {
                        uploadedImg.map((i) => {
                          return (
                            <div className='col-3' >


                              <img src={i} className='img-thumbnail' width={"100px"} />

                            </div>
                          )
                        })
                      }
                    </div>
                    <div className="col-lg-12 mt-3">
                      <label htmlFor="description">description: </label><br />
                      <input type="text" name="description" id="description" value={description} className='inputstyle' onChange={(e) => setDescription(e.target.value)} />
                    </div>




                    <br />

                    <button className='mb-3 button2' onClick={submitdata}>Submit</button>
                  </div>
                </div>

              </div>

            </Tab>

          </Tabs >
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>please Enter Card detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>  <div className="row">
          <div className="col-lg-12 text-center ">
            <Formik
              initialValues={{ name: "", Cnumber: "", cvv: "", Edate: "" }}
              onSubmit={async values => {
                console.log(values)
                addcard(values)
              }}
              validateOnChange={false}
              validateOnBlur={false}
              validationSchema={Yup.object().shape({
                name: Yup.string()
                  .required("Required"),
                number: Yup.string()
                  .max(16)
                  .required("Required"),
                expdate: Yup.string()
                  .required("Required"),
                cvv: Yup.string()
                  .required("Required")
                  .min(3)
                  .max(3),

              })}
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

                    <h4 className='mt-3 text-center'>Card Details</h4>
                    <label htmlFor="name" className='mt-3' style={{ display: "flex", justifyContent: 'flex-start', fontSize: "25px" }} >
                      name:
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



                    <label htmlFor="number" className='mt-3' style={{ display: "flex", justifyContent: 'flex-start', fontSize: "25px" }}  >
                      number:
                    </label>
                    <input
                      id="number"
                      placeholder="Enter your number"
                      type="number"
                      value={values.number}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.number && touched.number
                          ? "text-input error inputstyle"
                          : "text-input inputstyle"
                      }
                    />
                    {errors.number && touched.number && (
                      <div className="input-feedback">{errors.number}</div>
                    )}


                    <label htmlFor="cvv" className='mt-3' style={{ display: "flex", justifyContent: 'flex-start', fontSize: "25px" }}>
                      cvv:
                    </label>
                    <input
                      id="cvv"
                      placeholder="Enter your cvv"
                      type="text"
                      value={values.cvv}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.cvv && touched.cvv
                          ? "text-input error inputstyle"
                          : "text-input inputstyle"
                      }
                    />
                    {errors.cvv && touched.cvv && (
                      <div className="input-feedback">{errors.cvv}</div>
                    )}


                    <label htmlFor="expdate" className='mt-3' style={{ display: "flex", justifyContent: 'flex-start', fontSize: "25px" }}>
                      Expiry Date:
                    </label>
                    <input
                      id="expdate"
                      placeholder="Enter your expiry date 4444"
                      type="tel"
                      pattern='(0[1-9]|1[0-2])\/?(([0-9]{4})|[0-9]{2}$)'
                      title='please enter date like 25/12'
                      value={values.expdate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.expdate && touched.expdate
                          ? "text-input error inputstyle"
                          : "text-input inputstyle"
                      }
                    />
                    {errors.expdate && touched.expdate && (
                      <div className="input-feedback">{errors.expdate}</div>
                    )}

                    <br />

                    <button type="submit" className='mb-3 btn btn-primary' disabled={isSubmitting}>
                      Submit
                    </button>
                  </form>
                );
              }}
            </Formik>
          </div>
        </div></Modal.Body>

      </Modal>


      <Modal show={showModal1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Resident Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="container">
            <div className="row">

              <div className="col-lg-12 mt-3">
                <label htmlFor="add1">Address Line : </label><br />
                <input type="text" name="add1" id="add1" className='inputstyle' value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>



              <div className="col-lg-12 mt-3">
                <label htmlFor="city">city:</label><br />
                <input type="city" name="city" id="city" className='inputstyle' value={city} onChange={(e) => setcity(e.target.value)} />
              </div>

              <div className="col-lg-12 mt-3">
                <label htmlFor="Name">State : </label><br />
                <input type="text" name="State" id="State" className='inputstyle' value={state} onChange={(e) => setstate(e.target.value)} />
              </div>

              <div className="col-lg-12 mt-3">
                <label htmlFor="Name">Country : </label><br />
                <input type="text" name="Country" id="Country" className='inputstyle' value={country} onChange={(e) => setcountry(e.target.value)} />
              </div>

              <div className="col-lg-12 mt-3">
                <label htmlFor="Name">Zipcode : </label><br />
                <input type="text" name="Zipcode" id="Zipcode" className='inputstyle' value={Zipcode} onChange={(e) => setZipcode(e.target.value)} />
              </div>
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" onClick={saveaddress}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>



      <ToastContainer />
    </Layout >
  )
}
