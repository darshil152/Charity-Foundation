import React from 'react'
import { useState } from "react";
import Cards from "react-credit-cards";
import UserSidebar from './UserSidebar';
import { Formik } from "formik";
import * as Yup from "yup";
import firebaseApp from '../Firebase/firebase';
import { useEffect } from 'react';
import { Modal, Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import Header from '../Componets/Header';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faBuildingColumns, faCalendarDays, faLock, faCodeBranch, faUser, faFileInvoice, faChartSimple } from "@fortawesome/free-solid-svg-icons";


let x = []


export default function Card() {

    useEffect(() => {
        const url = window.location.href;
        var id = url.substring(url.lastIndexOf('/') + 1);
        setID(id)
        getdata(id)
    }, [])

    const [showModal, setDisplay] = useState(false);




    const [id, setID] = useState('')
    const [card, setCard] = useState([])
    const [bank, setbank] = useState([])

    const [show, setShows] = useState(false)
    const [number, SetNumber] = useState("");
    const [name, SetName] = useState("");
    const [date, SetDate] = useState("");
    const [cvv, SetCvv] = useState("");

    const [bnumber, SetBnumber] = useState("");
    const [bname, Setbname] = useState("");
    const [Ifsc, SetIfsc] = useState("");
    const [Rname, setrname] = useState("");


    const [focus, SetFocus] = useState("1200");
    const [cardvalues, setCardValues] = useState({ name: "", number: "", cvv: "", expdate: "" })
    const [bankvalue, setBankvalue] = useState({ name: "", number: "", ifsc: "", Bname: "" })

    const handleClose = () => setDisplay(false);
    const handleShow = () => setDisplay(true);

    const getdata = (id) => {
        const db = firebaseApp.firestore();
        db.collection('users').where("id", "==", id).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.data().card) {
                    setCard(doc.data().card)
                    if (doc.data().card.length > 0) {
                        SetNumber(doc.data().card[0].Cnumber)
                        SetName(doc.data().card[0].name)
                        SetDate(doc.data().card[0].Edate)
                        SetCvv(doc.data().card[0].cvv)
                        setCard(doc.data().card)
                    }

                } else {
                    setCard('')
                }
                if (doc.data().card) {
                    setbank(doc.data().bankDetail)
                    if (doc.data().bankDetail.length > 0) {
                        Setbname(doc.data().bankDetail[0].Bname)
                        SetIfsc(doc.data().bankDetail[0].ifsc)
                        SetBnumber(doc.data().bankDetail[0].account)
                        setrname(doc.data().bankDetail[0].name)
                    }

                } else {
                    setbank('')
                }
            })
        }).catch(err => {
            console.error(err)
        });
    }


    const addbank = (values) => {
        let x = []
        console.log(values)
        let obj = {
            Bname: values.Bname,
            ifsc: values.ifsc,
            account: values.number,
            name: values.name,

        }
        x.push(obj)
        setbank(x)
        upadtebank(x)
    }

    const upadtebank = (x) => {
        const db = firebaseApp.firestore();
        db.collection('users').where("id", "==", id).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                var updateCollection = db.collection("users").doc(doc.ref.id);

                return updateCollection.update({
                    bankDetail: x
                })
                    .then(() => {
                        getdata(id)


                        console.log("Document successfully updated!");
                        toast.success('bank detail update successfull', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        Setbname("")
                        SetIfsc("")
                        SetBnumber("")
                        setrname("")

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
                        setDisplay(false)
                        setShows(false)
                        console.log("Document successfully updated!");
                        toast.success('Card update successfull', {
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


    const editcard = () => {

        let obj = {
            name: card[0].name,
            number: card[0].Cnumber,
            cvv: card[0].cvv,
            expdate: card[0].Edate,
        }
        setCardValues(obj)
        console.log(obj)

    }


    const deletecard = () => {
        setDisplay(true)
    }

    const confirm = () => {
        let x = card.filter((i) => i.name != card[0].name)
        console.log(x)
        updatecard(x)

    }


    return (
        <>
            <Header />
            <UserSidebar />
            <div className='pt-5'>

                <div className="container pt-5">

                    <div className="row">
                        <div className="col-lg-6">
                            <div clasName="rccs__card rccs__card--unknown " style={{ marginTop: "55px", marginLeft: "55px" }}>


                                <Cards
                                    number={number}
                                    name={name}
                                    expiry={date}
                                    cvc={cvv}
                                    focused={focus}
                                />


                            </div>
                        </div>
                        <div className="col-lg-6 mt-5">
                            {/* <FontAwesomeIcon icon={faBuildingColumns} style={{ fontSize: "30px" }} /> */}
                            <h3 ><FontAwesomeIcon icon={faBuildingColumns} />:  {bname} <br /> <br /> </h3>
                            <h3>  <FontAwesomeIcon icon={faCodeBranch} />:  {Ifsc}<br />  <br /> </h3>
                            <h3>   <FontAwesomeIcon icon={faUser} /> : {Rname}<br /> <br />  </h3>
                            <h3>  <FontAwesomeIcon icon={faFileInvoice} /> : {bnumber}<br /> <br /> </h3>
                        </div>
                    </div>

                </div>
            </div>

            <div className="container mt-5 studentdetail sidebar-main-section" >
                <div className="row">
                    <div className="col-lg-6 text-center">
                        <Formik
                            initialValues={cardvalues}
                            onSubmit={async values => {

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

                                        <h1 className='mt-3 text-center'>Card Details</h1>
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
                                            type="tel"
                                            value={values.number}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            maxLength={16}
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
                                            maxLength={3}
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

                                        <button type="submit" className='mb-3 btn btn-primary' style={{ width: "30%", fontSize: "25px" }} disabled={isSubmitting}>
                                            Submit
                                        </button>
                                    </form>
                                );
                            }}
                        </Formik>
                    </div>


                    <div className="col-lg-6 text-center">
                        <Formik
                            initialValues={bankvalue}
                            onSubmit={async values => {
                                console.log(values)
                                addbank(values)
                            }}
                            validateOnChange={false}
                            validateOnBlur={false}
                            validationSchema={Yup.object().shape({
                                Bname: Yup.string()
                                    .required("Required"),
                                name: Yup.string()
                                    .required("Required"),
                                number: Yup.string()
                                    .max(16)
                                    .required("Required"),
                                ifsc: Yup.string()
                                    .required("Required"),


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

                                        <h1 className='mt-3 text-center'>Bank Details</h1>


                                        <label htmlFor="name" className='mt-3' style={{ display: "flex", justifyContent: 'flex-start', fontSize: "25px" }} >
                                            Bank name:
                                        </label>
                                        <input
                                            id="Bname"
                                            placeholder="Enter your Bank name"
                                            type="text"
                                            value={values.Bname}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={
                                                errors.Bname && touched.Bname
                                                    ? "text-input error inputstyle"
                                                    : "text-input inputstyle"
                                            }
                                        />
                                        {errors.Bname && touched.Bname && (
                                            <div className="input-feedback">{errors.Bname}</div>
                                        )}


                                        <label htmlFor="name" className='mt-3' style={{ display: "flex", justifyContent: 'flex-start', fontSize: "25px" }} >
                                            Account holder name:
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
                                            Bank account number:
                                        </label>
                                        <input
                                            id="number"
                                            placeholder="Enter your account number"
                                            type="tel"
                                            value={values.number}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            maxLength={16}
                                            className={
                                                errors.number && touched.number
                                                    ? "text-input error inputstyle"
                                                    : "text-input inputstyle"
                                            }
                                        />
                                        {errors.number && touched.number && (
                                            <div className="input-feedback">{errors.number}</div>
                                        )}





                                        <label htmlFor="ifsc" className='mt-3' style={{ display: "flex", justifyContent: 'flex-start', fontSize: "25px" }}>
                                            Sort code:
                                        </label>
                                        <input
                                            id="ifsc"
                                            placeholder="Enter your Ifsc code"
                                            type="text"
                                            value={values.ifsc}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={
                                                errors.ifsc && touched.ifsc
                                                    ? "text-input error inputstyle"
                                                    : "text-input inputstyle"
                                            }
                                        />
                                        {errors.ifsc && touched.ifsc && (
                                            <div className="input-feedback">{errors.ifsc}</div>
                                        )}

                                        <br />

                                        <button type="submit" className='mb-3 btn btn-primary' style={{ width: "30%", fontSize: "25px" }} disabled={isSubmitting}>
                                            Submit
                                        </button>
                                    </form>
                                );
                            }}
                        </Formik>
                    </div>
                </div>
            </div>






            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete card !</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="danger" onClick={confirm}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>




            <ToastContainer />

        </>

    )
}
