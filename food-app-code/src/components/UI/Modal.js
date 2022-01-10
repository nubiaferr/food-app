import React from 'react'
import reactDom from 'react-dom'
import classes from './Modal.module.css'

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClose}/>
}

const ModalOverlay = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>
                {props.children}
            </div>
        </div>
    )
}

const Modal = (props) => {
    const portalElement = document.getElementById('overlays')

    return (
        <>
            {reactDom.createPortal(<Backdrop onClose={props.onClose}/>, portalElement)}
            {reactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </>
    )
}

export default Modal
