import React from 'react'
import { useEffect, useState } from 'react'
import MUIDataTable from "mui-datatables";
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import Sidebar from './Sidebar';
import firebaseApp from '../Firebase/firebase';
import Myorder from '../Componets/myorder';
import Header from '../Componets/Header';


let total = 0

export default function Allorder() {

    useEffect(() => {

        getdata()
    }, [])

    const [data, setData] = useState([])
    const [order, setorder] = useState([])


    const getdata = () => {
        let x = []
        const db = firebaseApp.firestore();
        db.collection('orders').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data().price)
                total = total + Number(doc.data().price)
                x.push(doc.data())
                setorder(x)
            })
            console.log(order)
        }).catch(err => {
            console.error(err)
        });
    }



    const columns = [
        {
            name: "imageurl",
            label: "imageurl",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <img src={value} width={90} />
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
            name: "category",
            label: "category",
            options: {
                filter: true,
                sort: false,
            }
        },




        {
            name: "price",
            label: "price",
            options: {
                filter: true,
                sort: false,

            }
        },
        {
            name: "description",
            label: "description",
            options: {
                filter: true,
                sort: false,

            }
        },
    ];

    const options = {

        selectableRowsHideCheckboxes: true,
        filterType: "dropdown",
        responsive: "scroll",
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
            <Sidebar />


            <div className="container container-margin mb-5" >
                <h4>Total Paymemt : £ {Number(total)}</h4>
                <div className="row">
                    <div className="col-lg-10">
                        <h1 className='text-center mb-5'>Order Details</h1>
                        <CacheProvider value={muiCache}>
                            <ThemeProvider theme={createTheme()}>
                                <MUIDataTable
                                    title={"Order Details"}
                                    data={order}
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
