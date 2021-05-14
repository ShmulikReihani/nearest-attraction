import React from 'react';
import './Container.css';

export default function container({ children }) {

    return (
        <div className='Container'>
            { children}
        </div >
    )
}
