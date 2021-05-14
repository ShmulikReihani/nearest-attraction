import React from 'react';
import './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

export default function Modal({ children, show, modalClosed }) {

    return (
        <div >
            <Backdrop show={show} clicked={modalClosed} />
            <div className='Modal'
                style={{
                    transform: show ? 'translate(-50%, -50%)' : 'translateY(100vh)',
                    opacity: show ? '1' : '0'
                }}
            >
                {children}
            </div>
        </div>
    )
}
