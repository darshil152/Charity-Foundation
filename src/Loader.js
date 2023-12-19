import React from 'react'
import loader from './Assets/loader.gif'
import './loader.css'
export default function Loader() {
    return (
        <div className='loader-background'>
            <div class="loader-walk">
                <div></div><div></div><div></div><div></div><div></div>
            </div>
        </div>
    )
}
