import React from 'react'
import Headerforshop from './Headerforshop'
import Footer from './Footer'

export default function Layoutforshop(props) {
    return (
        <>
            <Headerforshop />
            {props.children}
            <Footer />
        </>
    )
}
