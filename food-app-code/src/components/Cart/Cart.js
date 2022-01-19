import React, {useContext, useState} from 'react'
import Modal from '../UI/Modal'
import classes from './Cart.module.css'
import {CartContext} from '../../context/cart-context'
import CartItem from './CartItem'
import Checkout from './Checkout'

const Cart = (props) => {
    const [showForm, setShowForm] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [didSubmit, setDidSubmit] = useState(false)

    const cartCtx = useContext(CartContext)

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`

    const hasItems = cartCtx.items.length > 0

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id)
    }

    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount: 1})
    }

    const orderHandler = () => {
        setShowForm(true)
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true)

        await fetch('https://react-http-ee5a3-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        })

        setIsSubmitting(false)
        setDidSubmit(true)
        cartCtx.clearCart()
    }

    const cartitems = 
    <ul className={classes['cart-items']}>
        {cartCtx.items.map((item) => (
            <CartItem 
            key={item.id} 
            name={item.name} 
            amount={item.amount} 
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
            />
        ))}
    </ul>

    const modalActions = 
    <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onHideCart}>
            Close
        </button>
        {hasItems &&  <button className={classes.button} onClick={orderHandler}>Order</button>}    
    </div>

    const modalContent = 
        <>
            {cartitems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {showForm ? <Checkout onConfirm={submitOrderHandler} onCancel={props.onHideCart} /> : modalActions}
        </>

    const submittingModalContent = <p>Sending order</p>

    const didSubmitModalContent =
    <>
        <p>All done! Thanks!</p>
        <div className={classes.actions}>
        <button className={classes.button} onClick={props.onHideCart}>
            Close
        </button>  
    </div>
    </> 
    
    return (
        <Modal onClose={props.onHideCart}>
           {!isSubmitting && !didSubmit && modalContent}
           {isSubmitting && submittingModalContent}
           {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    )
}

export default Cart
