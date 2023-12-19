import React, { useState } from 'react'
import Layoutforshop from './Layoutforshop'
import { useEffect } from 'react'
import firebaseApp from '../Firebase/firebase'
import { ToastContainer, toast } from 'react-toastify';
import UserSidebar from '../user/UserSidebar';
import { Modal, Button, Container } from "react-bootstrap";
import cartImg from "../Assets/cart.png"
import Header from './Header';
import Loader from '../Loader';
let prdid = ""

export default function Cart() {

    useEffect(() => {
        let x = JSON.parse(localStorage.getItem("login"))

        if (JSON.parse(localStorage.getItem("login"))) {
            setId(x.id)
        } else {
            setId("")
        }
        getdata(x.id)

    }, [])

    const [showModal, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [showModal1, setShow1] = useState(false);

    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const [id, setId] = useState("")
    const [data, setData] = useState([])
    const [finalcart, setFinalcart] = useState([])
    const [currentprd, setCurrentproduct] = useState([])
    const [payment, setPayment] = useState('gpay')
    const [card, setCard] = useState([])
    const [showLoader, setshowLoader] = useState(false);
    const [address, setAddress] = useState([])

    const getdata = (ids) => {
        let x = []
        const db = firebaseApp.firestore();
        db.collection('users').where("id", "==", ids).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                setCard(doc.data().card)
                x.push(doc.data())
                setAddress(x)

                setData(doc.data().cart)

                if (doc.data().myorder && doc.data().myorder.length > 0) {
                    console.log("che")
                    setFinalcart(doc.data().myorder)
                } else {
                    console.log("no")
                    setFinalcart([])
                }

                console.log(finalcart, "asdghja")
            })
        }).catch(err => {
            console.error(err)
        });
    }



    const tocart = (value) => {
        setCurrentproduct(value)
        handleShow1()

    }

    const handleaddtocart = () => {
        let y = finalcart
        let obj = {
            id: currentprd.id,
            name: currentprd.name,
            category: currentprd.category,
            price: currentprd.price,
            imageurl: currentprd.imageurl[0],
            description: currentprd.description,
        }
        y.push(obj)

        prdid = obj.id
        setFinalcart(y)
        updatefinalcart(y, obj)
        handleClose1()
    }


    const updatefinalcart = (y, obj) => {
        let filter = data.filter((i) => i.id != prdid)
        console.log(filter)
        const db = firebaseApp.firestore();
        db.collection('users').where("id", "==", id).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var updateCollection = db.collection("users").doc(doc.ref.id);
                return updateCollection.update({
                    myorder: y,
                    cart: filter
                })
                    .then(() => {
                        console.log("Document successfully updated!");
                        stockupdate(y)
                        addtcollection(obj)

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


    const stockupdate = (y) => {
        console.log(prdid)
        const db = firebaseApp.firestore();
        db.collection('products').where("id", "==", prdid).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var updateCollection = db.collection("products").doc(doc.ref.id);
                return updateCollection.update({
                    status: 0,
                    stock: 0
                })
                    .then(() => {
                        getdata(id)
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

    const addtcollection = (obj) => {
        console.log(obj, "pbject")

        let registerQuery = new Promise((resolve, reject) => {
            let db = firebaseApp.firestore();
            db.collection("orders").add(obj)

                .then((docRef) => {

                    console.log("Document written with ID: ", docRef);
                    resolve(docRef.id);

                    toast.success('Your Order Placed successfull', {
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
        registerQuery.then(result => {
            console.warn('register successful')
        }).catch(error => {
            console.error(error)
        })
    }



    const handleType = (e) => {
        console.log(e.target.value)
        setPayment(e.target.value)
    }

    const submitdata = () => {
        if (address[0].address) {


            if (payment == "card") {
                if (card && card.length > 0) {
                    handleaddtocart()

                } else {
                    toast.warn(<span style={{ color: "#757575" }}>Please add card details <a href={"/card/" + id} style={{ textDecoration: "none", fontWeight: 'bold' }}> here </a>. </span >, {
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

            } else if (payment == "bankTransfer") {
                if (address[0].bankDetail && address[0].bankDetail.length > 0) {
                    handleaddtocart()
                } else {
                    toast.warn(<span style={{ color: "#757575" }}>Please add bank detail <a href={"/card/" + id} style={{ textDecoration: "none", fontWeight: 'bold' }}> here </a>. </span >, {
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
            } else {
                handleaddtocart()
            }



        }

        else {
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
        }
    }





    return (
        <>
            <Header />
            <UserSidebar />

            {showLoader && <Loader />}

            <div className='container container-margin'>
                <div className='row d-flex justify-content-center text-center'>
                    {(data && data.length > 0) && <h1 className=''>Your cart</h1>}

                    {

                        (data && data.length > 0) ? data.map((i) => {
                            return (
                                <div className='col-lg-3 col-md-6 col-sm-12 mb-5  d-flex justify-content-center text-center '>
                                    <div className='product-container '>

                                        <div className="product-image-container">

                                            <img className='product-image' src={i.imageurl[0]} width={150} />

                                        </div>

                                        <div className="title-rating">
                                            <h3 className="India 2003-06 Jersey" style={{ textAlign: "center" }}>Title: {i.name}</h3>
                                        </div>

                                        <div className="title-rating">
                                            <h3 title="India 2003-06 Jersey">€: {i.price}</h3>
                                        </div>

                                        <div className="title-rating">
                                            <h3 title="India 2003-06 Jersey" style={{ display: "none" }}>€: {i.donetedby}</h3>
                                        </div>
                                        <button className="button2" onClick={(() => tocart(i))}>
                                            Buy Now
                                        </button>


                                    </div>
                                </div>
                            )
                        }) :
                            <Container>
                                <h1>Your Cart Is Empty !</h1>
                                <img src={cartImg} className='img-fluid mb-5' />
                            </Container>
                    }




                </div>
            </div>
            {/* <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal> */}


            <Modal show={showModal1} onHide={handleClose1}>
                <Modal.Header closeButton>
                    <Modal.Title>Please choose Paymenty type</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-center'>

                    <div className="container-fluid">
                        <div className="row mt-3">
                            <div className="col-lg-2">
                                Name:

                            </div>
                            <div className="col-lg-10">
                                <h5 className='text-center'>{currentprd.name}</h5>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-lg-2">
                                Image:

                            </div>
                            <div className="col-lg-10">
                                <img src={currentprd.imageurl ? currentprd.imageurl[0] : ""} width={100} />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-lg-2">
                                Price:

                            </div>
                            <div className="col-lg-10">
                                <h5 className='text-center'>{currentprd.price}</h5>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-lg-2">
                            <label htmlFor="type">Payment type:</label><br />
                        </div>
                        <div className="col-lg-10 mb-3 mt-3">
                            <select name="type" id="type" className='inputstyle' onChange={handleType}>

                                <option value="gpay" >Google Pay</option>
                                <option value="bankTransfer" >Bank Transfer</option>
                                <option value="paypal" >Paypal</option>
                                <option value="card" >Credit Card / Debit Card</option>

                            </select>
                        </div>
                    </div>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose1}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={submitdata}>
                        submit
                    </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer />

        </>
    )
}
