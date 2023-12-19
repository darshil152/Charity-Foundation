import React, { useState } from 'react'
import UserSidebar from '../user/UserSidebar'
import MUIDataTable from "mui-datatables";
import Layoutforshop from './Layoutforshop'
import { useEffect } from 'react'
import firebaseApp from '../Firebase/firebase'
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { Container } from 'react-bootstrap';
import cartImg from "../Assets/cart.png"
import Header from './Header';

export default function Myorder() {

    useEffect(() => {
        let getid = JSON.parse(localStorage.getItem('login'))
        if (getid) {
            setid(getid.id)
        } else {
            setid('')
        }
        getdata(getid.id)

    }, [])

    const [id, setid] = useState('')
    const [data, setData] = useState([])


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
            name: "category",
            label: "category",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "imageurl",
            label: "imageurl",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <img src={value} width={100} />
                )
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

    ];

    const options = {
        filterType: 'selectbox',
    };

    const muiCache = createCache({
        key: 'mui-datatables',
        prepend: true
    })




    const getdata = (id) => {
        console.log(id)
        let x = []
        const db = firebaseApp.firestore();
        db.collection('users').where("id", "==", id).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data().myorder)
                setData(doc.data().myorder)

            })
        }).catch(err => {
            console.error(err)
        });
    }

    return (
        <>
            <Header />
            <UserSidebar />
            <div className="container container-margin">
                <div className="row d-flex justify-content-center  text-center ">
                    {(data && data.length > 0) && <h1 className='text-center '>Order List</h1>}
                    {

                        (data && data.length > 0) ?
                            <div className="col-lg-12">
                                <CacheProvider value={muiCache}>
                                    <ThemeProvider theme={createTheme()}>
                                        <MUIDataTable
                                            title={"My order"}
                                            data={data}
                                            columns={columns}
                                            options={options}
                                        />
                                    </ThemeProvider>
                                </CacheProvider>
                            </div>
                            :
                            <Container >
                                <h1 >Looks like you haven't placed an order.</h1>
                                <img src={cartImg} className='img-fluid mb-5' />
                            </Container>
                    }
                </div>
            </div>
        </>

    )
}
