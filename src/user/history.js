import React, { useEffect, useState } from 'react'
import MUIDataTable from "mui-datatables";
import UserSidebar from './UserSidebar';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import Header from '../Componets/Header';
import firebaseApp from '../Firebase/firebase';
import moment from 'moment';

export default function History() {

    const [data, setData] = useState([])
    const [productData, setProductData] = useState([])

    useEffect(() => {
        getDonationdata()
    }, [])

    const getDonationdata = (id) => {
        let loginData = JSON.parse(localStorage.getItem('login'))


        const db = firebaseApp.firestore();
        db.collection('users').where("id", "==", loginData.id).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                setData(doc.data()?.fundinCash)
                setProductData(doc.data()?.fundinThing)

            })
        }).catch(err => {
            console.error(err)
        });
    }

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
            name: "amount",
            label: "Amount",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "type",
            label: "Payment Type",
            options: {
                filter: true,
                sort: false,
            }
        },

    ];

    const productColumns = [
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
            name: "images",
            label: "Amount",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <img src={value[0]} className='img-thumbnail' width={100} ></img>
                )
            }
        },
        {
            name: "title",
            label: "Name",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "category",
            label: "Category",
            options: {
                filter: true,
                sort: false,
            }
        },

    ];


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

    return (
        <>
            <Header />
            <UserSidebar />

            <div className="container  pt-5 mt-5">
                <div className='row' >
                    <div className='col-lg-6'>
                        <h1 className='text-center pt-5 mb-5'>Fund Donation</h1>
                        <div className="row">
                            <div className="col-lg-12">
                                <CacheProvider value={muiCache}>
                                    <ThemeProvider theme={createTheme()}>
                                        <MUIDataTable
                                            title={"Donation in Cash"}
                                            data={data}
                                            columns={columns}
                                            options={options}
                                        />
                                    </ThemeProvider>
                                </CacheProvider>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <h1 className='text-center pt-5 mb-5'>Product Donation</h1>
                        <div className="row">
                            <div className="col-lg-12">
                                <CacheProvider value={muiCache}>
                                    <ThemeProvider theme={createTheme()}>
                                        <MUIDataTable
                                            title={"Donation in products"}
                                            data={productData}
                                            columns={productColumns}
                                            options={options}
                                        />
                                    </ThemeProvider>
                                </CacheProvider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
