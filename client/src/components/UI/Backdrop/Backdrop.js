import React from 'react';
import './Backdrop.css';

export default function Backdrop({ show, clicked }) {

    return (
        show ? <div className='Backdrop' onClick={clicked}></div> : null
    )
}
