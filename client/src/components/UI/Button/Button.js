import React from 'react'
import './Button.css';

export default function Button({ btnType, clicked, disabled, children }) {
    return (
        <button
            className={['Button', btnType].join(' ')}
            onClick={clicked}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
