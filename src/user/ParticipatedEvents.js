import React, { useEffect, useState } from 'react'
import MUIDataTable from "mui-datatables";
import UserSidebar from './UserSidebar';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import Header from '../Componets/Header';
import firebaseApp from '../Firebase/firebase';
import { useNavigate } from 'react-router-dom';

export default function ParticipatedEvents() {
    const Navigate = useNavigate()

    const [data, setData] = useState([])
    const [id, setid] = useState('')


    useEffect(() => {
        if (localStorage.getItem('login')) {
            getEventdata()
        } else {
            Navigate('/')
        }
    }, [])


    const getEventdata = (id) => {
        let loginData = JSON.parse(localStorage.getItem('login'))

        let x = []
        const db = firebaseApp.firestore();
        db.collection('events').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                for (let i = 0; i < doc.data()?.appliedBy.length; i++) {
                    if (doc.data()?.appliedBy[i].id === loginData.id) {
                        x.push(doc.data())
                        setData(x)
                    }

                }

            })
        }).catch(err => {
            console.error(err)
        });
    }


    const columns = [
        {
            name: "name",
            label: "Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "date",
            label: "Date",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "address",
            label: "Address",
            options: {
                filter: true,
                sort: false,
            }
        },

    ];



    const options = {
        filterType: 'selectbox',
    };

    const muiCache = createCache({
        key: 'mui-datatables',
        prepend: true
    })

    return (
        <>
            <Header />
            <UserSidebar />

            <div className="container pt-5 mt-5">
                <h1 className='text-center pt-5 mb-5'>Participated Events</h1>
                <div className="row">
                    <div className="col-lg-12">
                        <CacheProvider value={muiCache}>
                            <ThemeProvider theme={createTheme()}>
                                <MUIDataTable
                                    title={"Event List"}
                                    data={data}
                                    columns={columns}
                                    options={options}
                                />
                            </ThemeProvider>
                        </CacheProvider>
                    </div>
                </div>
            </div>

        </>
    )
}
