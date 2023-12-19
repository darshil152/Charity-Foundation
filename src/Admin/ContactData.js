import React from 'react'
import firebaseApp from '../Firebase/firebase'
import MUIDataTable from 'mui-datatables'
import { useEffect, useState } from 'react'
import Layout from '../Componets/Layout'
import Sidebar from './Sidebar'
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache'
import moment from 'moment'
import Header from '../Componets/Header'

export default function ContactData() {
    useEffect(() => {
        getdata()
    }, [])

    const [data, setData] = useState([])
    const getdata = () => {
        let x = []
        const db = firebaseApp.firestore();
        db.collection('contactUs').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                x.push(doc.data())
                setData(x)
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

    const columns = [
        {
            name: "date",
            label: "Date",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <span>{moment(value).format("DD MM YYYY hh:mm:ss")}</span>
                )
            }
        },
        {
            name: "name",
            label: "name",
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
            name: "message",
            label: "message",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "contact",
            label: "contact",
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
            <div className="container container-margin  mb-5" >
                <h1 className='text-center mb-5'>Contact Data</h1>
                <div className="row">
                    <div className="col-lg-12 ">
                        <CacheProvider value={muiCache} >
                            <ThemeProvider theme={createTheme()}>
                                <MUIDataTable
                                    title={"Contact  List"}
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

