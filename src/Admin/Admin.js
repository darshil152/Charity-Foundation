import React from 'react'
import firebaseApp from '../Firebase/firebase'
import { useEffect } from 'react'
import { useState } from 'react'
import MUIDataTable from "mui-datatables";
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import Layout from '../Componets/Layout';
import Sidebar from './Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
import Header from '../Componets/Header';
import { json, useNavigate } from 'react-router-dom';

export default function Admin() {



  useEffect(() => {
    getdata()
    getFundData()
  }, [])


  const [data, setData] = useState([])
  const [fundData, setfundData] = useState([])
  const [price, setPrice] = useState([])
  const [id, setId] = useState([])

  const columns = [
    {
      name: "images",
      label: "images",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => (
          <img src={value} width={90} />
        )

      }
    },
    {
      name: "title",
      label: "title",
      options: {
        filter: true,
        sort: true,
      }
    },
    // {
    //   name: "category",
    //   label: "category",
    //   options: {
    //     filter: true,
    //     sort: false,
    //   }
    // },

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
      name: "stock",
      label: "stock",
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
        customBodyRender: (value, tableMeta, updateValue) => (
          <div className="col-lg-8 mt-">
            <label htmlFor="number">Price: {value}</label><br />

            <input type="number" name="number" id="number" className='inputstyle' onChange={(e) => hadndleamount(e, tableMeta)} />
          </div>
        )
      }
    },

    {
      name: "id",
      label: "Submit",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <div className="col-lg-12 mt-3">
            <button className='button2' onClick={() => savedata(value)}>Submit</button>
          </div>

        )
      }
    },
  ];

  const fundColumns = [
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
        sort: true,
      }
    },
    {
      name: "type",
      label: "Type",
      options: {
        filter: true,
        sort: false,
      }
    },

    // {
    //   name: "id",
    //   label: "Submit",
    //   options: {
    //     filter: true,
    //     sort: false,
    //     customBodyRender: (value, tableMeta, updateValue) => (
    //       <div className="col-lg-12 mt-3">
    //         <button className='button2' onClick={() => savedata(value)}>Submit</button>
    //       </div>

    //     )
    //   }
    // },
  ];


  const savedata = (value) => {
    console.log(value)
    updateamount(price, value)
  }


  const hadndleamount = (e, tableMeta) => {
    console.log(e.target.value, tableMeta.rowData[4])
    setId(tableMeta.rowData[4])
    setPrice(e.target.value)
  }


  const updateamount = (price, value) => {
    const db = firebaseApp.firestore();
    db.collection('products').where("id", "==", value).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var updateCollection = db.collection("products").doc(doc.ref.id);

        return updateCollection.update({
          price: Number(price)
        })
          .then(() => {
            toast.success('Price updated Sucessfully', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            getdata()
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



  const changetoggle = (e, tableMeta) => {
    console.log(tableMeta)
    let id = tableMeta.rowData[5]
    updatestatus(e, id)
  }

  const updatestatus = (e, id) => {
    let status = e.target.checked ? 1 : 0
    console.log(status, id)

    const db = firebaseApp.firestore();
    db.collection('products').where("id", "==", id).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var updateCollection = db.collection("products").doc(doc.ref.id);

        return updateCollection.update({
          status: Number(status)
        })
          .then(() => {
            getdata()
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



  const getdata = () => {
    let x = []
    const db = firebaseApp.firestore();
    db.collection('products').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        x.push(doc.data())
        setData(x)
      })
    }).catch(err => {
      console.error(err)
    });
  }
  const getFundData = () => {
    let x = []


    let checks = JSON.parse(localStorage.getItem('login'))
    if (checks) {
      if (checks.userRole == "admin") {
        console.log("first")
      } else {
        navigate('/')
      }
    } else {
      navigate('/')
    }


    const db = firebaseApp.firestore();
    db.collection('funds').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        x.push(doc.data())
        setfundData(x)
      })
    }).catch(err => {
      console.error(err)
    });
  }

  const navigate = useNavigate()

  return (
    <>
      <Header />
      <Sidebar />

      <div className="container container-margin mb-5" >
        <div className="row">
          <div className="col-lg-7">
            <h1 className='text-center mb-5'>Product Donation</h1>
            <CacheProvider value={muiCache}>
              <ThemeProvider theme={createTheme()}>
                <MUIDataTable
                  title={"Product Donation"}
                  data={data}
                  columns={columns}
                  options={options}
                />
              </ThemeProvider>
            </CacheProvider>
          </div>

          <div className="col-lg-5">
            <h1 className='text-center mb-5'>Fund Donation</h1>
            <CacheProvider value={muiCache}>
              <ThemeProvider theme={createTheme()}>
                <MUIDataTable
                  title={"Fund Donation"}
                  data={fundData}
                  columns={fundColumns}
                  options={options}
                />
              </ThemeProvider>
            </CacheProvider>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>

  )
}



