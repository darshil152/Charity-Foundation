import React from 'react'
import firebaseApp from '../Firebase/firebase'
import MUIDataTable from 'mui-datatables'
import { useEffect, useState } from 'react'
import Layout from '../Componets/Layout'
import Sidebar from './Sidebar'
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache'
import profiles from "../Assets/profile.png"
import Header from '../Componets/Header'

export default function Users() {
    useEffect(() => {
        getdata()
    }, [])

    const [data, setData] = useState([])
    const getdata = () => {
        let x = []
        const db = firebaseApp.firestore();
        db.collection('users').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                x.push(doc.data())
                setData(x)
            })
        }).catch(err => {
            console.error(err)
        });
    }


    const muiCache = createCache({
        key: 'mui-datatables',
        prepend: true
    })

    const columns = [
        {
            name: "profile",
            label: "profile",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <>
                        {
                            value ? <img src={value} width={100} /> : <img src={profiles} width={100} />
                        }
                    </>
                )
            }
        },
        {
            name: "Fname",
            label: "Fname",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Lname",
            label: "Lname",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "email",
            label: "email",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "password",
            label: "password",
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

    ];

    return (
        <>
            <Header />
            <Sidebar />
            <div className="container container-margin mb-5" >
                <h1 className='text-center mb-5'>Register User's Data</h1>
                <div className="row">
                    <div className="col-lg-12">
                        <CacheProvider value={muiCache}>
                            <ThemeProvider theme={createTheme()}>
                                <MUIDataTable
                                    title={"Register User's  List"}
                                    data={data}
                                    columns={columns}
                                    options={{
                                        selectableRows: false
                                    }}
                                />
                            </ThemeProvider>
                        </CacheProvider>
                    </div>
                </div>
            </div>

        </>
    )
}




