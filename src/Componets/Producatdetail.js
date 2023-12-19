import React, { useEffect, useState } from 'react'
import Layoutforshop from './Layoutforshop';
import './detail.css'
import firebaseApp from '../Firebase/firebase';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ReactImageMagnify from 'react-image-magnify';
import { Modal, Button, Container } from "react-bootstrap";


let Prd_Price = 0

let usersid = ''
export default function Producatdetail() {

    const navigate = useNavigate();

    const [cartItems, setCart] = useState([]);
    const [order, setorder] = useState([]);
    const [productdetail, setProductdetail] = useState([]);
    const [id, setID] = useState('')
    const [usersid, setuserId] = useState('')
    const [mainimg, setImg] = useState('')
    const [payment, setPayment] = useState('gpay')
    const [address, setAddress] = useState([])
    const [showModal, setShow] = useState(false);
    const [card, setCard] = useState([])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        let getid = JSON.parse(localStorage.getItem('login'))


        if (getid) {
            setuserId(getid.id)
        } else {
            setuserId('')
        }
        getuserid(usersid)

        const url = window.location.href;
        var id = url.substring(url.lastIndexOf('/') + 1);
        setID(id)

        getproducts(id)

    }, {})



    const getproducts = (id) => {
        const db = firebaseApp.firestore();
        db.collection('products').where("id", "==", id).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setImg(doc.data().images[0])
                setProductdetail(doc.data())
            })
        }).catch(err => {
            console.error(err)
        });
    }

    const getuserid = (usersid) => {
        let x = []

        const db = firebaseApp.firestore();
        db.collection('users').where("id", "==", usersid).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data().address)
                setCard(doc.data().card)

                if (doc.data().address) {
                    setAddress(doc.data().address)
                } else {
                    setAddress([])
                }



                if (doc.data().cart?.length > 0) {
                    setCart(doc.data().cart)
                } else {
                    setCart([])
                }

                if (doc.data().myorder?.length > 0) {
                    setorder(doc.data().myorder)
                } else {
                    setorder([])
                }


            })
        }).catch(err => {
            console.error(err)
        });
    }



    const tocart = (usersid) => {
        let y = cartItems
        let local = localStorage.getItem("login")


        let check = false
        for (let i = 0; i < y.length; i++) {
            if ((y[i].id == productdetail.id)) {
                check = true
            }
        } if (check) {
            toast.warn('Product already into cart', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            if (local) {
                let obj = {
                    id: productdetail.id,
                    name: productdetail.title,
                    category: productdetail.category,
                    price: productdetail.price,
                    imageurl: productdetail.images,
                    description: productdetail.description,
                    stock: productdetail.stock,
                }
                console.log(obj)
                y.push(obj)

                console.log(y)
                setCart(y)
                updatecart(y)
            } else {
                toast.warn(<span style={{ color: "#757575" }}>Please<a href="/signin" style={{ textDecoration: "none", fontWeight: 'bold' }}> login </a> for add to cart. </span >, {
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
    }


    const updatecart = (y) => {
        console.log(y)
        console.log(usersid)
        const db = firebaseApp.firestore();
        db.collection('users').where("id", "==", usersid).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                var updateCollection = db.collection("users").doc(doc.ref.id);

                return updateCollection.update({
                    cart: y
                })
                    .then(() => {
                        console.log("Document successfully updated!");

                        toast.success('Product added into cart successfull', {
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


    const toorder = () => {
        handleShow()

    }

    const handleaddtocart = () => {
        let z = order

        let obj = {
            id: productdetail.id,
            name: productdetail.title,
            category: productdetail.category,
            price: productdetail.price,
            imageurl: productdetail.images,
            description: productdetail.description,
            stock: productdetail.stock,
        }
        console.log(obj)
        z.push(obj)

        console.log(z)
        setorder(z)
        updateorder(z, obj)
    }

    const openPayModal = options => {
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    };


    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const options = {
        key: "rzp_test_5OIkE1mNMPASot",
        amount: "10000", //  = INR 1
        name: "Charity Donation",
        description: "some description",
        image: "https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png",
        handler: function (response) {
            alert(response.razorpay_payment_id);
        },
        prefill: {
            name: "Darshil",
            contact: "635337782",
            email: "demo@demo.com"
        },
        notes: {
            address: "some address"
        },
        theme: {
            color: "#F37254",
            hide_topbar: false
        }
    };

    const submitdata = () => {
        handleClose()
        openPayModal(options)

        // if (address) {
        //     if (payment == "card") {
        //         if (card && card.length > 0) {
        //             handleaddtocart()
        //         } else {
        //             toast.warn(<span style={{ color: "#757575" }}>Please add card details <a href={"/card/" + id} style={{ textDecoration: "none", fontWeight: 'bold' }}> here </a>. </span >, {
        //                 position: "top-right",
        //                 autoClose: 5000,
        //                 hideProgressBar: false,
        //                 closeOnClick: false,
        //                 pauseOnHover: true,
        //                 draggable: true,
        //                 progress: undefined,
        //                 theme: "light",
        //             });
        //         }

        //     } else if (payment == "bankTransfer") {
        //         if (address[0].bankDetail && address[0].bankDetail.length > 0) {
        //             handleaddtocart()
        //         } else {
        //             toast.warn(<span style={{ color: "#757575" }}>Please add bank detail <a href={"/card/" + id} style={{ textDecoration: "none", fontWeight: 'bold' }}> here </a>. </span >, {
        //                 position: "top-right",
        //                 autoClose: 5000,
        //                 hideProgressBar: false,
        //                 closeOnClick: false,
        //                 pauseOnHover: true,
        //                 draggable: true,
        //                 progress: undefined,
        //                 theme: "light",
        //             });
        //         }
        //     } else {
        //         handleaddtocart()
        //     }
        // }

        // else {
        //     toast.warn(<span style={{ color: "#757575" }}>Please add your address from<a href={"/profile/" + id} style={{ textDecoration: "none", fontWeight: 'bold' }}> here </a>. </span >, {
        //         position: "top-right",
        //         autoClose: 5000,
        //         hideProgressBar: false,
        //         closeOnClick: false,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //         theme: "light",
        //     });
        // }
    }




    const updateorder = (z, obj) => {
        console.log(productdetail)

        let filter = cartItems.filter((i) => i.id != productdetail.id)
        console.log(filter)

        const db = firebaseApp.firestore();
        db.collection('users').where("id", "==", usersid).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var updateCollection = db.collection("users").doc(doc.ref.id);
                return updateCollection.update({
                    myorder: z,
                    cart: filter
                })
                    .then(() => {
                        console.log("Document successfully updated!");
                        stockupdate(z)
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

    const stockupdate = () => {
        const db = firebaseApp.firestore();
        db.collection('products').where("id", "==", productdetail.id).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var updateCollection = db.collection("products").doc(doc.ref.id);
                return updateCollection.update({
                    status: 0,
                    stock: 0
                })
                    .then(() => {
                        getproducts(id)
                        navigate('/shop')

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

    const changeimg = (index) => {
        setImg(index)
    }

    const handleType = (e) => {
        console.log(e.target.value)
        setPayment(e.target.value)

    }


    return (
        <Layoutforshop>

            <div class="card-wrapper " >
                <div class="cards container-margin">
                    <div class="">
                        <div class="img-display">
                            <div class="img-showcase" >
                                <ReactImageMagnify {...{
                                    smallImage: {
                                        alt: 'Charity image',
                                        isFluidWidth: false,
                                        src: mainimg,
                                        width: 450,
                                        height: 480,
                                    },
                                    largeImage: {
                                        src: mainimg,
                                        width: 600,
                                        height: 600,
                                    }
                                }} />

                                {/* <img src={mainimg} className='img-fluid' /> */}
                            </div>
                        </div>
                        <div className="d-flex">
                            {
                                productdetail.images && productdetail.images.map((index) => {
                                    return (
                                        <>
                                            <div className="container ">
                                                <div className="row">
                                                    <img src={index} className='mt-2 prdimage' onClick={() => changeimg(index)} />

                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>


                    <div class="product-content" style={{ marginBottom: "100px" }}>
                        <h2 class="product-title">{productdetail.title}</h2>


                        <div class="product-price">
                            <p class="new-price"> Price: <span>{productdetail.price}</span></p>
                        </div>

                        <div class="product-price">
                            <p class="new-price"> category: <span>{productdetail.category}</span></p>
                        </div>

                        <div class="product-detail">
                            <h2>about this item: </h2>
                            <p>{productdetail.description}</p>
                        </div>
                        <div class="purchase-info">

                            <button type="button" class="btn" onClick={tocart}>
                                Add to Cart
                            </button>
                            <button type="button" class="btn" onClick={toorder}>buy now</button>
                        </div>

                    </div>
                </div>
            </div>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-fluid">
                        <div className="row mt-3 text-center">
                            <div className="col-lg-2">
                                Name:

                            </div>
                            <div className="col-lg-10">
                                <h5 className='text-center'>{productdetail.title}</h5>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-lg-2">
                                Image:

                            </div>
                            <div className="col-lg-10 text-center">
                                <img src={productdetail.images ? productdetail.images[0] : ""} width={100} />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-lg-2">
                                Price:

                            </div>
                            <div className="col-lg-10">
                                <h5 className='text-center'>£ {productdetail.price}</h5>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-lg-2 mt-2">
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
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={submitdata}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer />
        </Layoutforshop>
    )
}
