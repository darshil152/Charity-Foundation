import React, { useEffect, useState } from 'react'
import Layout from '../Componets/Layout'
import Sidebar from './Sidebar'
import firebaseApp from '../Firebase/firebase'
import Chart from "react-apexcharts";
import ReactApexChart from 'react-apexcharts';
import moment from 'moment';
import Header from '../Componets/Header';
export default function Dashboard() {


    const [fundSeriesData, setfundSeriesData] = useState([])
    const [fundLabel, setfundLabel] = useState([])

    const [productSeriesData, setproductSeriesData] = useState([])
    const [productLabel, setproductLabel] = useState([])
    const [fundAmount, setfundAmount] = useState(0)
    const [productCount, setproductCount] = useState(0)

    useEffect(() => {
        getFundData();
        getProductData()
    }, [])


    const baroptions = {
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories: fundLabel
        }
    }
    const barseries = [
        {
            name: "Donation",
            data: fundSeriesData
        }
    ]


    const pieoptions = {
        chart: {
            width: 300,
            type: 'pie',
        },
        fill: {
            colors: ["#F7A104", "#276EAD", "#151424", "#d1403f",]
        },
        labels: fundLabel,
        colors: ["#F7A104", "#276EAD", "#151424", "#d1403f",], //Add this line
        responsive: [{
            breakpoint: 498,
            options: {
                chart: {
                    width: 400,
                },
                legend: {
                    position: 'bottom',
                },

            }
        }]
    };

    const Productbaroptions = {
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories: productLabel
        }
    }
    const Productbarseries = [
        {
            name: "Donation",
            data: productSeriesData
        }
    ]


    const Productpieoptions = {
        chart: {
            width: 300,
            type: 'pie',
        },
        fill: {
            colors: ["#F7A104", "#276EAD", "#151424", "#d1403f", "#B670D3"]
        },
        labels: productLabel,
        colors: ["#F7A104", "#276EAD", "#151424", "#d1403f", "#B670D3"], //Add this line
        responsive: [{
            breakpoint: 498,
            options: {
                chart: {
                    width: 400,
                },
                legend: {
                    position: 'bottom',
                },

            }
        }]
    };





    const getFundData = () => {
        let gpayBalance = 0
        let payPalBalance = 0
        let bankBalance = 0
        let cardBalance = 0
        let fundAmount = 0
        let fdata = []


        const db = firebaseApp.firestore();
        db.collection('funds').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                fdata.push(doc.data())
                fundAmount += Number(doc.data().amount ? doc.data().amount : 0)
                if (doc.data().type == "bankTransfer") {
                    bankBalance += Number(doc.data().amount ? doc.data().amount : 0)
                }
                if (doc.data().type == "gpay") {
                    gpayBalance += Number(doc.data().amount ? doc.data().amount : 0)

                }
                if (doc.data().type == "card") {
                    cardBalance += Number(doc.data().amount ? doc.data().amount : 0)

                }
                if (doc.data().type == "paypal") {
                    payPalBalance += Number(doc.data().amount ? doc.data().amount : 0)

                }

                setfundAmount(fundAmount)
                let fundSeriesData = [bankBalance, cardBalance, gpayBalance, payPalBalance]

                setfundSeriesData(fundSeriesData)

            })
        }).catch(err => {
            console.error(err)
        });


        setfundLabel(['Bank Transfer', "Credit/Debit cart", "google Pay", "paypal"])


    }

    const getProductData = () => {
        let furniture = 0
        let cloths = 0
        let grocerry = 0
        let electronice = 0
        let other = 0
        let pdata = []
        const db = firebaseApp.firestore();
        db.collection('products').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                pdata.push(doc.data())
                setproductCount(pdata.length)
                console.log(pdata)
                if (doc.data().category == "furniture") {
                    furniture += 1
                }
                if (doc.data().category == "cloths") {
                    cloths += 1

                }
                if (doc.data().category == "grocerry") {
                    grocerry += 1

                }
                if (doc.data().category == "electronic") {
                    electronice += 1

                }
                if (doc.data().category == "other") {
                    other += 1

                }
                let productSeriesData = [furniture, cloths, grocerry, electronice, other]

                setproductSeriesData(productSeriesData)

            })
        }).catch(err => {
            console.error(err)
        });
        setproductLabel(['Furniture', "Cloths", "Grocerry", "Electronics", "Other"])
    }

    return (
        <>
            <Header />
            <Sidebar />
            <div className='container  container-margin'  >
                <div className='row '>
                    <h3>Total Donation Amount : {fundAmount}</h3>
                    <div className='col-lg-6 '>

                        <ReactApexChart
                            options={baroptions}
                            series={barseries}
                            type="bar"
                            width={500}
                        />
                    </div>
                    <div className='col-lg-6'>

                        <ReactApexChart
                            options={pieoptions}
                            series={fundSeriesData}
                            type="pie"
                            width={480} />
                    </div>

                </div>
                <hr />
                <div className='row '>
                    <h3>Total Donated Products : {productCount}</h3>
                    <div className='col-lg-6 '>
                        <ReactApexChart
                            options={Productbaroptions}
                            series={Productbarseries}
                            type="bar"
                            width={500}
                        />
                    </div>
                    <div className='col-lg-6'>
                        <ReactApexChart
                            options={Productpieoptions}
                            series={productSeriesData}
                            type="polarArea"
                            width={480} />
                    </div>

                </div>
            </div>
        </>
    )
}
