import React from 'react'
import { useState } from 'react';
import UserSidebar from './UserSidebar'
import profiles from "../Assets/profile.png"
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Button } from "react-bootstrap";
import { useEffect } from 'react';
import firebaseApp from '../Firebase/firebase';
import { ToastContainer, toast } from 'react-toastify';
import Header from '../Componets/Header';

export default function Profile() {



    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showModal1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const [email, setemail] = useState("");
    const [name, setname] = useState("");
    const [number, setnumber] = useState("");
    const [lname, setLname] = useState("");

    const [address, setAddress] = useState("");
    const [city, setcity] = useState("");
    const [state, setstate] = useState("");
    const [country, setcountry] = useState("");
    const [Zipcode, setZipcode] = useState("");
    const [id, setID] = useState("");
    const [data, setData] = useState([])
    const [profile, setProfile] = useState([])




    useEffect(() => {
        const url = window.location.href;
        var id = url.substring(url.lastIndexOf('/') + 1);
        setID(id)
        getaddress(id)


    }, [])


    const getaddress = (id) => {
        console.log("first")
        let x = []
        const db = firebaseApp.firestore();
        db.collection('users').where("id", "==", id).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data())
                setAddress(doc.data().address)
                setcity(doc.data().city)
                setstate(doc.data().state)
                setcountry(doc.data().country)
                setZipcode(doc.data().zipcode)
                setemail(doc.data().email)
                setProfile(doc.data().profile)
                setname(doc.data().Fname)
                setLname(doc.data().Lname)
                setnumber(doc.data().contact)
            })
            console.log(x)
        }).catch(err => {
            console.error(err)
        });
    }


    const fileechange = (e) => {
        UploadImageTOFirebase(e.target.files[0])
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
            const uploadTask = storageRef.child('charity').child('profile').child(myGuid).put(file)
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
                        .child('profile')
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
            console.log(url)
            setProfile(url)

        }).catch(err => {
            console.log('error caught', err)
        })

    }




    const saveprofile = () => {
        updtedetal()
    }

    const saveaddress = () => {
        updateaddress()
    }



    const updtedetal = () => {
        const db = firebaseApp.firestore();
        db.collection('users').where("id", "==", id).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                var updateCollection = db.collection("users").doc(doc.ref.id);

                return updateCollection.update({
                    Fname: name,
                    profile: profile,
                    contact: number,
                    Lname: lname,
                })
                    .then(() => {
                        handleClose1()
                        getaddress(id)
                        toast.success('Profile updated successfully!', {
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

    const updateaddress = () => {
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
                        setShow1(false)
                        getaddress(id)
                        toast.success('Address updated successfully!', {
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

    return (
        <>
            <Header />
            <UserSidebar />

            <div className="content-main-section mt-5 pt-5 ">



                <div className='container showdiv mt-5 studentdetail' >
                    <div className="row ">
                        <div className="col-10 text-sm-center mt-3 mb-3">
                            <h1 className="text-left ml-3">Personal Detail</h1>
                        </div>
                        <div className="col-2 text-sm-center text-lg-right mt-3" >
                            <button className="buttonedit btn btn-primary btn-lg" onClick={handleShow}>
                                <FontAwesomeIcon icon={faPencil} /></button>
                        </div>
                    </div>



                    <div className='row'>
                        <div className='col-11 text-center mt-4'>
                            {
                                profile ? <img src={profile} className='profileimg' /> : <img src={profiles} className="img-fluid profileimg" />
                            }

                        </div>

                    </div>


                    <div className='row'>
                        <div className='col-11 text-center mt-4'>
                            <img src={""} className="profilepicture" />
                        </div>

                    </div>

                    <div className='row ml-4'>




                        <div className='col-lg-6 '>
                            <div className="row">
                                <div className="col-lg-3">
                                    <div className='mt-lg-5 d-flex mt-4 text-left'>
                                        <label className="labelDatas ml-3 mb-2">Name:</label>
                                    </div>
                                </div>
                                <div className="col-lg-9">
                                    <label className="labelData  mt-lg-5  ml-3">{name}</label>
                                </div>


                                <div className="col-lg-3">
                                    <div className='mt-lg-5 d-flex mt-4 text-left'>
                                        <label className="labelDatas  ml-3 mb-2">Email:</label>
                                    </div>
                                </div>
                                <div className="col-lg-9">
                                    <label className="labelData mt-lg-5 ml-3" style={{ wordBreak: "break-all" }}>{email}</label>
                                </div>
                            </div>
                        </div>

                        <div className='col-lg-6'>
                            <div className="row">

                                <div className="col-lg-4">
                                    <div className=' d-flex mt-4 text-left'>
                                        <label className="labelDatas mt-lg-4 ml-3 mb-2">Last Name</label>
                                    </div>
                                </div>
                                <div className="col-lg-8">
                                    <label className="labelData mt-lg-5 ml-3">{lname}</label>
                                </div>


                                <div className="col-lg-4">
                                    <div className=' d-flex mt-4 text-left'>
                                        <label className="labelDatas mt-lg-4 ml-3 mb-2">Mobile No:</label>
                                    </div>
                                </div>
                                <div className="col-lg-8">
                                    <label className="labelData mt-lg-5 ml-3">{number}</label>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>


                <div className='container mt-5 studentdetail '>
                    <div className='container'>
                        <div className="showdiv mt-3">

                            <div className="row">
                                <div className="col-10 text-sm-center mt-3 mb-3">
                                    <h1 className="text-left">
                                        Residental Detail</h1>
                                </div>
                                <div className="col-2 text-sm-center text-lg-right mt-3" >
                                    <button className="buttonedit btn btn-primary btn-lg " onClick={handleShow1}>
                                        <FontAwesomeIcon icon={faPencil} /></button>
                                </div>


                                <div className='col-lg-6'>

                                    <div className="row">
                                        <div className="col-lg-4">
                                            <div className='mt-lg-4  d-flex mt-sm-4 ml-lg-4 text-left'>
                                                <label className="labelDatas  mb-2">Address :</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-8">
                                            <label className="labelData mt-lg-4 ">{address}</label>
                                        </div>


                                        <div className="col-lg-4">
                                            <div className='mt-lg-4 d-flex mt-sm-4 ml-lg-4 text-left'>
                                                <label className="labelDatas   mb-2">State:</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-8">
                                            <label className="labelData mt-lg-4 ">{state}</label>
                                        </div>


                                        <div className="col-lg-4">
                                            <div className='mt-lg-4 d-flex mt-sm-4 ml-lg-4 mb-sm-4 text-left'>
                                                <label className="labelDatas   mb-2">Zipcode:</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-8">
                                            <label className="labelData  mt-lg-4">{Zipcode}</label>
                                        </div>

                                    </div>
                                </div>
                                <div className='col-lg-6'>

                                    <div className="row">
                                        <div className="col-lg-4">
                                            <div className='mt-lg-4  d-flex mt-sm-4 ml-lg-4 text-left'>
                                                <label className="labelDatas  mb-2">City:</label>
                                            </div>
                                        </div>
                                        <div className="col-lg-8">
                                            <label className="labelData mt-lg-4 ">{city}</label>
                                        </div>


                                        <div className="col-lg-4">
                                            <div className='mt-lg-4 d-flex mt-sm-4 ml-lg-4 text-left'>
                                                <label className="labelDatas  mb-2">Country: </label>
                                            </div>
                                        </div>
                                        <div className="col-lg-8">
                                            <label className="labelData mt-lg-4 ">{country}</label>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                {
                                    profile ? <img src={profile} className='profileimg' /> : <img src={profiles} className="img-thumbnail profileimg" />
                                }
                            </div>
                            <div className="col-lg-12 mt-3">

                                <div className="file-input">

                                    <lable className="lbl-comn-info " > Change your Profile:</lable> <br />


                                    <input
                                        type="file"
                                        name="file-input"
                                        id="file-input"
                                        className="d-none file-input__input"
                                        onChange={(e) => fileechange(e)}
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

                            <div className="col-lg-12 mt-3">
                                <label htmlFor="Name">Name: </label><br />
                                <input type="text" name="Name" id="Name" className='inputstyle' value={name} onChange={(e) => setname(e.target.value)} />
                            </div>

                            <div className="col-lg-12 mt-3">
                                <label htmlFor="lname">lname:</label><br />
                                <input type="text" name="lname" id="lname" className='inputstyle' value={lname} onChange={(e) => setLname(e.target.value)} />
                            </div>

                            <div className="col-lg-12 mt-3">
                                <label htmlFor="number">mobile no:</label><br />
                                <input type="number" name="number" id="number" className='inputstyle' value={number} onChange={(e) => setnumber(e.target.value)} />

                            </div>
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveprofile}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal >

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
        </>
    )
}
