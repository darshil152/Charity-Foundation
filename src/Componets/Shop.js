import React, { useEffect, useState } from 'react';
import Layoutforshop from './Layoutforshop';
import './donation.css';
import firebaseApp from '../Firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Container } from 'react-bootstrap';
import cartImg from "../Assets/cart.png"

let prdid = ""
let dummyarray = []
export default function Shop() {


    useEffect(() => {
        let getid = JSON.parse(localStorage.getItem('login'))
        if (getid) {
            setid(getid.id)
        } else {
            setid('')
        }
        getdata(id)
        getuserid(id)
    }, []);

    const navigate = useNavigate();
    const [data, setData] = useState([])
    const [cartItems, setCart] = useState([])
    const [id, setid] = useState('')
    const [dummy, setDummy] = useState('')
    const [filterTags, setFilterTags] = useState([])


    const getuserid = (id) => {
        let x = []
        const db = firebaseApp.firestore();
        db.collection('users').where("id", "==", id).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data())


                if (doc.data().cart?.length > 0) {
                    setCart(doc.data().cart)
                } else {
                    setCart([])
                }

                // if (cartItems.length > 0) {
                //     setCart(doc.data().cart)
                // } else {
                //     setCart([])

                // }

            })
        }).catch(err => {
            console.error(err)
        });
    }

    const getdata = (id) => {
        let x = []
        const db = firebaseApp.firestore();
        db.collection('products').where("status", "==", 1).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // console.log(first)
                if (doc.data().stock == 1) {
                    x.push(doc.data())
                    setData(x)
                }



            })
        }).catch(err => {
            console.error(err)
        });
    }



    const tocart = (i) => {
        let dummt = i.id
        let y = cartItems

        let x = localStorage.getItem("login")
        let check = false

        for (let i = 0; i < y.length; i++) {
            if (y[i].id == dummt) {
                console.log(y[i].id == dummt)
                check = true
            }

        } if (check) {
            toast.warn('Product already added into cart ', {
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

            if (x) {
                let obj = {
                    id: i.id,
                    name: i.title,
                    category: i.category,
                    price: i.price,
                    imageurl: i.images,
                    description: i.description,
                    // donetedby: i.donatedBy,
                    stock: i.stock,
                }
                prdid = obj.id
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
        console.log(id)

        const db = firebaseApp.firestore();
        db.collection('users').where("id", "==", id).get().then((querySnapshot) => {
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


    // const deleteitem = (prdid) => {
    //     const db = firebaseApp.firestore();
    //     db.collection('products').where("id", "==", prdid).get().then((querySnapshot) => {
    //         querySnapshot.forEach((doc) => {

    //             var updateCollection = db.collection("products").doc(doc.ref.id);

    //             return updateCollection.update({
    //                 stock: 0
    //             })
    //                 .then(() => {
    //                     getdata(id)
    //                     console.log("Document successfully updated!");
    //                 })
    //                 .catch((error) => {

    //                     // The document probably doesn't exist.
    //                     console.error("Error updating document: ", error);
    //                 });
    //         })
    //     }).catch(err => {
    //         console.error(err)
    //     });
    // }

    const changeprice = (e) => {
        setDummy(e.target.value)
        if (e.target.value == "lowtohigh") {
            data.sort((a, b) => a.price - b.price);


        } else if (e.target.value == "hightolow") {
            data.sort((a, b) => b.price - a.price);

        }
    }

    const handledata = () => {
        const filteredDATA = data.filter((node) =>
            filterTags.length > 0
                ? filterTags.every((filterTag) =>
                    node.tags.map((tag) => tag.slug).includes(filterTag)
                )
                : data
        )
        setData(filteredDATA)
        console.log(filteredDATA)
    }

    const [value, setValue] = useState([]);

    // const hadlefilter = (e) => {
    //     if (e.target.checked) {
    //         setValue([...value, e.target.value])
    //     } else {
    //         setValue([value.filter(element => element !== e.target.value)])
    //     }

    //     adddata(value)
    // }

    const adddata = (value) => {
        console.log(value)

        // for (let i = 0; i < data.length; i++) {
        //     for (let j = 0; j < value.length; j++) {
        //         if (data[i].category == value[j]) {
        //             console.log(data[i])
        //         }

        //     }

        // }
    }



    const toproduct = (value) => {

        navigate(`/productdetail/` + value)
    }


    return (

        <Layoutforshop>
            <div className="container-fluid pt-5 m-0 p-0 overflow-hidden">
                <div className='row'>
                    <div className="col-lg-12"></div>
                    <div className="con1">
                        <div className='text-center'>
                            <h1 className='text-center txt1' data-aos="fade-down" data-aos-duration="1500">Shop Now</h1>
                            <button className='button' onClick={() => navigate("/donation")} >Donate Now</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">

                <div className="row mt-5 ms-3">
                    <div className="col-lg-3">
                        <h5 className='text-left ml-5 ' >Sorting : </h5> <span>

                            <select name="sort" id="sort" className='form-control mb-3 ' style={{ width: "50%", marginLeft: "35px" }} onChange={changeprice}>
                                <option value="#">choose one</option>
                                <option value="lowtohigh">low to high</option>
                                <option value="hightolow">high to low</option>
                            </select>
                        </span>
                        <br />

                        {/* <h5>Categiry vise filter:</h5> */}

                        {/* <input type="checkbox" class="ms-3 form-check-input" name="grocerry" value="grocerry" onChange={(e) => hadlefilter(e)} />
                    <label for="grocerry" class="ms-2 form-check-label"> grocerry</label><br />
                    <input type="checkbox" class="ms-3 form-check-input" name="furniture" value="furniture" onChange={(e) => hadlefilter(e)} />
                    <label for="furniture" class="ms-2 form-check-label"> furniture</label><br />
                    <input type="checkbox" class="ms-3 form-check-input" name="cloths" value="cloths" onChange={(e) => hadlefilter(e)} />
                    <label for="cloths" class="ms-2 form-check-label"> cloths</label><br />
                    <input type="checkbox" class="ms-3  form-check-input" name="electronic" value="electronic" onChange={(e) => hadlefilter(e)} />
                    <label for="electronic" class="ms-2  form-check-label"> electronic</label><br />
                    <input type="checkbox" class="ms-3  form-check-input" name="other" value="other" onChange={(e) => hadlefilter(e)} />
                    <label for="other" class="ms-2  form-check-label"> other</label><br /> */}

                    </div>

                </div>
            </div>


            <div className="container">
                <div className="row">

                    {
                        data.length > 0 ? data
                            .map((i) => {

                                return (
                                    <div className='col-lg-4 col-md-6 col-sm-12 mb-5   text-center ' >
                                        <div className='product-container '>

                                            <div className='clickme' onClick={() => toproduct(i.id)}>
                                                <div className="product-image-container">
                                                    <img className='product-image' src={i.images[0]} width={150} />

                                                </div>

                                                <div className="title-rating">
                                                    <h3 className="India 2003-06 Jersey">Title: {i.title}</h3>
                                                </div>

                                                <div className="title-rating">
                                                    <h3 title="India 2003-06 Jersey">Price : £{i.price}</h3>
                                                </div>
                                            </div>
                                            <button className="button2" onClick={(() => tocart(i))}>
                                                Add to cart
                                            </button>


                                        </div>
                                    </div>
                                )
                            }) : <Container>
                            <div className="container">
                                <div className="row text-center">
                                    <div className="col-lg-12">
                                        <h1 className='text-center'>No Items Availble for sale !</h1>
                                        <img src={cartImg} className=' img-fluid mb-5' />
                                    </div>
                                </div>
                            </div>

                        </Container>
                    }


                    <ToastContainer />

                </div>

            </div>

        </Layoutforshop >
    )
}
