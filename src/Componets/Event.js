import React from 'react'
import Layout from './Layout'
import Games from '../Assets/friends-playing-online-video-games-game-club.jpg'
import Music from '../Assets/musicial-music-live-band-performing-stage-with-different-lights.jpg'
import Motivational from '../Assets/male-business-executive-giving-speech.jpg'
import firebaseApp from '../Firebase/firebase'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import img from "../Assets/blue minimal quote instagram story.png"
import { useNavigate } from 'react-router-dom';
import not from "./Image/newdesignillustrations190211443 (1).jpg"

let z = []
export default function Event() {

    const navigate = useNavigate();

    const [event, setEvents] = useState([])
    const [id, setId] = useState('')
    const [data, setData] = useState([])

    useEffect(() => {
        let getid = JSON.parse(localStorage.getItem('login'))
        if (getid) {
            setId(getid.id)
        } else {
            setId('')
        }
        getdata(id)

    }, [])

    const getdata = (id) => {
        let x = []
        const db = firebaseApp.firestore();
        db.collection('events').where("status", "==", 1).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                x.push(doc.data())
                setEvents(x)

                if (doc.data().appliedBy?.length > 0) {
                    setData(doc.data().appliedBy)
                } else {
                    setData([])
                }

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

    const add = (i) => {

        if (localStorage.getItem('login')) {

            z = i.appliedBy ? i.appliedBy : []
            console.log(z)



            let check = false
            for (let i = 0; i < z.length; i++) {
                if (z[i].id == id) {
                    check = true
                }
            } if (check) {
                console.log("adde")
                toast.error('You are already participated this event!', {
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
                // event id



                let obj = {
                    id: id,
                    Eid: makeid(4)
                }
                z.push(obj)
                addid(z, i.id)
                setData(z)
            }
        } else {
            toast.warn(<span style={{ color: "#757575" }}>Please<a href="/signin" style={{ textDecoration: "none", fontWeight: 'bold' }}> login </a> for Participate. </span >, {
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

    const addid = (appliedUserData, eventId) => {

        let data = []
        const db = firebaseApp.firestore();
        db.collection('events').where("id", "==", eventId).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var updateCollection = db.collection("events").doc(doc.ref.id);
                data = doc.data()
                return updateCollection.update({
                    appliedBy: appliedUserData
                })
                    .then(() => {
                        getdata(id)
                        UpdateInUser(data)

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

    const UpdateInUser = (data) => {
        console.log(data, 'update user')
        let partEvents = []
        const db = firebaseApp.firestore();
        db.collection('users').where("id", "==", id).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var updateCollection = db.collection("users").doc(doc.ref.id);
                if (doc.data().participatedEvents) {
                    partEvents = doc.data().participatedEvents
                }
                partEvents.push(data)
                console.log(partEvents)


                return updateCollection.update({
                    participatedEvents: partEvents
                })
                    .then(() => {
                        getdata(id)
                        toast.success('Participate successful', {
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
        <Layout>
            <div className="con2 overflow-hidden" >

                <div className="container-fluid pt-5 m-0 p-0">
                    <div className='row overflow-y-hidden'>
                        <div className="col-lg-12"></div>
                        <div className="con1">
                            <div className='text-center'>
                                <h1 className='text-center txt1' data-aos="fade-down" data-aos-duration="1500">Volunteer With Us</h1>
                                <button className='button' onClick={() => navigate("/donation")} >Donate Now</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className='m-3'>
                        <h1 class="text-center ">Upcoming events</h1>


                    </div>
                    <div className="row " >
                        {
                            event.length == 0 ?

                                <h1 className='text-center'>Events are not available</h1>
                                :


                                event.length > 0 && event.map((i) => {
                                    return (
                                        <div className='col-lg-3 col-md-6 col-sm-12 mb-5    text-center ' >
                                            <div className=' p-3'>
                                                <div className='shadow pb-3'>
                                                    <div className='clickme ' >
                                                        <div className="mb-3">
                                                            <img className='event-img' src={i.img} />

                                                        </div>

                                                        <div className="title-ratings ">
                                                            <h6 className="text-center India 2003-06 Jersey">{i.name}</h6>
                                                        </div>

                                                        <div className="title-ratings">
                                                            <h6 title=" text-center India 2003-06 Jersey"> {i.date}</h6>
                                                        </div>
                                                        <div className="title-ratings">
                                                            <h6 title=" text-center India 2003-06 Jersey"> {i.address}</h6>
                                                        </div>
                                                    </div>
                                                    <button className="button2" onClick={() => add(i)}>
                                                        Participate Now
                                                    </button>


                                                </div>
                                            </div>
                                        </div>
                                        // <div className="col-lg-3 col-md-5 col-sm-6 m-3 ">
                                        //     <div class="card" >
                                        //         <img class="event-img" src={i.img} alt="Card image cap" />
                                        //         <div class="card-body">
                                        //             <div className='text-left'> <b class=" card-title">{i.name}</b></div>
                                        //             <div className='text-left'>     <b class=" card-title">{i.date}</b></div>

                                        //             <p class="text-left card-text">{i.address}</p>
                                        //             <button class="button2" onClick={() => add(i)}>Participate</button>
                                        //         </div>
                                        //     </div>
                                        // </div>
                                    )
                                })
                        }


                    </div>
                </div>
            </div>
            <ToastContainer />
        </Layout>
    )
}
