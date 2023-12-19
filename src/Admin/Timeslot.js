import React, { useState } from 'react'
import firebaseApp from '../Firebase/firebase'
import { Formik } from 'formik'
import * as Yup from "yup";
import { useEffect } from 'react';
import Layout from '../Componets/Layout';
import { Check } from 'react-bootstrap-icons';
import "../App.css"
import { Switch } from "@material-ui/core";
import { Modal, Button } from "react-bootstrap";
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import MUIDataTable from "mui-datatables";
import Sidebar from './Sidebar';
import Header from '../Componets/Header';

export default function Timeslot() {


    useEffect(() => {
        getslot()

    }, [])

    const [data, setData] = useState([])

    const [showModal, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const getslot = () => {
        let x = []
        const db = firebaseApp.firestore();
        db.collection('timeslot').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                x.push(doc.data())
                setData(x)
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
            name: "time",
            label: "time",
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
            name: "bookedBy",
            label: "bookedBy",
            options: {
                filter: true,
                sort: false,
            }
        },
    ];


    const changetoggle = (e, tableMeta) => {
        console.log(e.target.value, tableMeta.rowData[0])

        updatestatus(e, tableMeta.rowData[0])
    }

    const updatestatus = (e, x) => {
        let status = e.target.checked == true ? 1 : 0
        console.log(status)
        console.log(x)
        const db = firebaseApp.firestore();
        db.collection('timeslot').where("id", "==", x).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var updateCollection = db.collection("timeslot").doc(doc.ref.id);

                return updateCollection.update({
                    status: Number(status)
                })
                    .then(() => {
                        getslot()

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

    const addtime = (values) => {

        let check = false

        for (let i = 0; i < data.length; i++) {
            if (data[i].time == values.time) {
                check = true
            }
        } if (check) {
            handleClose()
            console.log("allready added")
        } else {
            let registerQuery = new Promise((resolve, reject) => {
                let db = firebaseApp.firestore();
                db.collection("timeslot").add({
                    id: makeid(8),
                    bookedBy: "",
                    status: values.status,
                    time: values.time
                })
                    .then((docRef) => {
                        handleClose()
                        console.log("Document written with ID: ", docRef.id);
                        resolve(docRef.id);
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
    }




    return (
        <>
            <Header />
            <Sidebar />


            <div className='containr container-margin'>
                <div className='container text-right'>
                    <button className=' btn btn-primary ' onClick={handleShow}>Add Timeslot</button>
                </div>

                <div className="container mt-5">
                    <h1 className='text-center mb-5'>Time Slots </h1>
                    <div className="row">
                        <CacheProvider value={muiCache}>
                            <ThemeProvider theme={createTheme()}>
                                <MUIDataTable
                                    title={"Time Slot"}
                                    data={data}
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
                    <Modal.Title>Time Slot</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container mt-5 "  >
                        <div className="row text-center">
                            <div className="col-lg-12 mb-5 studentdetail formbg">
                                <Formik
                                    initialValues={{ time: "" }}
                                    onSubmit={async values => {
                                        console.log(values)

                                        addtime(values)
                                    }}
                                    validateOnChange={false}
                                    validateOnBlur={false}
                                    validationSchema={Yup.object().shape({

                                        time: Yup.string()
                                            .required("time Required"),

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
                                            handleReset,
                                            setFieldValue

                                        } = props;
                                        return (

                                            <form onSubmit={handleSubmit} className=''>

                                                <h1 className='mt-3 text-center'>Add Timeslot</h1>

                                                <label htmlFor="time" className='mt-3' style={{ display: "flex", justifyContent: 'flex-start', fontSize: "25px" }}  >
                                                    Time:
                                                </label>
                                                <input
                                                    id="time"
                                                    placeholder="Enter the time ex: 12:00 PM to 01:00 PM"
                                                    type="text"
                                                    value={values.time}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={
                                                        errors.time && touched.time
                                                            ? "text-input error inputstyle"
                                                            : "text-input inputstyle"
                                                    }
                                                />
                                                {errors.time && touched.time && (
                                                    <div className="input-feedback">{errors.time}</div>
                                                )}

                                                <label htmlFor="Status" className='mt-3' style={{ display: "flex", justifyContent: 'flex-start', fontSize: "25px" }}  >
                                                    Status:
                                                </label>
                                                <Switch
                                                    name="status"
                                                    value="1"
                                                    checked={values.status === "1"}
                                                    onChange={(event, checked) => {
                                                        setFieldValue("status", checked ? "1" : "0");
                                                    }}
                                                />
                                                <br />

                                                <button type="submit" className='mb-3 btn btn-primary' style={{ width: "30%", fontSize: "20px" }} disabled={isSubmitting}>
                                                    Submit
                                                </button>
                                                <br />

                                            </form>
                                        );
                                    }}
                                </Formik>


                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {/* <ToastContainer /> */}


        </>
    )
}
