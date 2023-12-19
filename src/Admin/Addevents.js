import React from 'react'
import firebaseApp from '../Firebase/firebase'
import { useEffect, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from "yup";
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { Modal, Button } from "react-bootstrap";
import MUIDataTable from 'mui-datatables';
import Sidebar from './Sidebar';
import Layout from '../Componets/Layout';
import { ToastContainer, toast } from 'react-toastify';
import Header from '../Componets/Header';

export default function Addevents() {




    useEffect(() => {
        getdata()
    }, [])

    const [showModal, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const [showModal1, setShow1] = useState(false);

    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const [file, setFile] = useState('')
    const [name, setname] = useState('')
    const [date, setDate] = useState('')
    const [address, setAddress] = useState('')
    const [event, setEvents] = useState([])
    const [applyby, setapplyby] = useState([])
    const [users, setusers] = useState([])


    const getdata = () => {
        let x = []
        const db = firebaseApp.firestore();
        db.collection('events').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data())
                x.push(doc.data())
                setEvents(x)
            })
        }).catch(err => {
            console.error(err)
        });
    }


    const columns = [
        {
            name: "id",
            label: "id",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "name",
            label: "Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "img",
            label: "img",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <img src={value} width={150} />
                )
            }
        },
        {
            name: "date",
            label: "date",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "address",
            label: "address",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "status",
            label: "status",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <label class="switch">
                        <input type="checkbox" checked={value} onChange={(e) => changetoggle(e, tableMeta)} />
                        <span class="slider round"></span>
                    </label>
                )

            }
        },
        {
            name: "appliedBy",
            label: "appliedBy",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <>

                        <button className='button2' onClick={() => showmodels(value)} >Show</button>
                    </>
                )
            }
        },
    ];


    const getuserid = (value) => {
        let z = []


        const db = firebaseApp.firestore();
        db.collection('users').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                for (let j = 0; j < value.length; j++) {
                    if (doc.data().id == value[j].id) {
                        z.push(doc.data())
                        setusers(z)
                        handleShow1()
                    }

                }

            })
        }).catch(err => {
            console.error(err)
        });


    }


    const showmodels = (value) => {
        setapplyby(value)
        getuserid(value)

    }


    const changetoggle = (e, tableMeta) => {
        updatestatus(e, tableMeta.rowData[0])
    }

    const updatestatus = (e, data) => {
        let status = e.target.checked == true ? 1 : 0
        console.log(status)
        console.log(data)

        const db = firebaseApp.firestore();
        db.collection('events').where("id", "==", data).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var updateCollection = db.collection("events").doc(doc.ref.id);

                return updateCollection.update({
                    status: Number(status)
                })
                    .then(() => {
                        getdata()
                        toast.success('Status update successfull', {
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



    const options = {

        selectableRowsHideCheckboxes: true,
        filterType: "dropdown",

        direction: 'desc',
        sortOrder: {
            name: 'date',
            direction: 'des'
        },

    };

    const muiCache = createCache({
        key: 'mui-datatables',
        prepend: true
    })

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
            const uploadTask = storageRef.child('charity').child('event').child(myGuid).put(file)
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
                        .child('event')
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
            setFile(url)

        }).catch(err => {
            console.log('error caught', err)
        })

    }

    const savedata = () => {
        let registerQuery = new Promise((resolve, reject) => {
            let db = firebaseApp.firestore();
            db.collection("events").add({
                name: name,
                date: date,
                address: address,
                img: file,
                id: makeid(4),
                appliedBy: [],
                status: 0
            })

                .then((docRef) => {

                    console.log("Document written with ID: ", docRef.id);
                    resolve(docRef.id);
                    handleClose()
                    getdata()
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
                    // navigate("/event")


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


    return (
        <>
            <Header />
            <Sidebar />

            <div className="container container-margin">


                <h1 className='text-center mb-5'>Event  History</h1>
                <button className="button2 mb-3" onClick={handleShow}>
                    Add events
                </button>
                <div className="row">
                    <div className="col-lg-12 mb-5">
                        <CacheProvider value={muiCache}>
                            <ThemeProvider theme={createTheme()}>
                                <MUIDataTable
                                    title={"Event List"}
                                    data={event}
                                    columns={columns}
                                    options={options}
                                />
                            </ThemeProvider>
                        </CacheProvider>
                    </div>
                </div>
            </div>


            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Event Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                {/* {
                                        profile ? <img src={profile} /> : <img src={profiles} className="img-fluid profileimg" />
                                    } */}
                            </div>
                            <div className="col-lg-12 mt-3">

                                <div className="file-input">

                                    <lable className="lbl-comn-info " > Change your event image:</lable> <br />
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
                                <img src={file} width={100} />

                            </div>

                            <div className="col-lg-12 mt-3">
                                <label htmlFor="Name">Name: </label><br />
                                <input type="text" name="Name" id="Name" className='inputstyle' onChange={(e) => setname(e.target.value)} />
                            </div>

                            <div className="col-lg-12 mt-3">
                                <label htmlFor="date">date:</label><br />
                                <input type="date" name="date" id="date" className='inputstyle' onChange={(e) => setDate(e.target.value)} />
                            </div>

                            <div className="col-lg-12 mt-3">
                                <label htmlFor="address">address</label><br />
                                <input type="address" name="address" id="address" className='inputstyle' onChange={(e) => setAddress(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={savedata}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>


            <Modal show={showModal1} onHide={handleClose1}>
                <Modal.Header closeButton>
                    <Modal.Title>Applyby</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="tables">
                        <table>
                            <tr>
                                <th className='heads' >id</th>
                                <th className='heads' >email</th >
                                <th className='heads' >Fname</th>
                            </tr>
                            {users && users.map((val, key) => {
                                return (
                                    <tr key={key}>
                                        <td className='details'>{val.id}</td>
                                        <td className='details'>{val.email}</td>
                                        <td className='details'>{val.Fname}</td>
                                    </tr>
                                )
                            })}
                        </table>
                    </div>



                </Modal.Body>
                <Modal.Footer>
                    <button className='button2' onClick={handleClose1}>
                        Close
                    </button>

                </Modal.Footer>
            </Modal>

            <ToastContainer />
        </>
    )
}
