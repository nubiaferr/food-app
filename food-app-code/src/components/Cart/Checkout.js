import React, {useRef, useState} from 'react';
import classes from './Checkout.module.css'


const Checkout = (props) => {
    const [formValidity, setFormValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    })

   const nameRef = useRef()
   const streetRef = useRef()
   const postalRef = useRef()
   const cityRef = useRef()

   const confirmHandler = (event) => {
       event.preventDefault();
       
       const isEmpty = value => value.trim() === ''
       const isFiveChars = value => value.trim().length === 5

      const name = !isEmpty(nameRef.current.value)
      const street = !isEmpty(streetRef.current.value)
      const postalCode = isFiveChars(postalRef.current.value)
      const city = !isEmpty(cityRef.current.value)

      setFormValidity({
          name: name, street: street, city: city, postalCode: postalCode
      })

      const formIsValid = name && street && postalCode && city

      if (!formIsValid) return

      props.onConfirm({
          name: nameRef.current.value,
          street: streetRef.current.value,
          city: cityRef.current.value,
          postalCode: postalRef.current.value
      })
      
    };
  
    return (
      <form className={classes.form} onSubmit={confirmHandler}>
        <div className={`${classes.control} ${formValidity.name? '' : classes.invalid}`}>
          <label htmlFor='name'>Your Name</label>
          <input type='text' id='name' ref={nameRef} />
          {!formValidity.name && <p>Name must not be empty.</p>}
        </div>
        <div className={`${classes.control} ${formValidity.street? '' : classes.invalid}`}>
          <label htmlFor='street'>Street</label>
          <input type='text' id='street' ref={streetRef} />
          {!formValidity.street && <p>Street must not be empty.</p>}
        </div>
        <div className={`${classes.control} ${formValidity.postalCode? '' : classes.invalid}`}>
          <label htmlFor='postal'>Postal Code</label>
          <input type='text' id='postal' ref={postalRef} />
          {!formValidity.postalCode && <p>Postal Code must be 5 characters.</p>}
        </div>
        <div className={`${classes.control} ${formValidity.city? '' : classes.invalid}`}>
          <label htmlFor='city'>City</label>
          <input type='text' id='city' ref={cityRef} />
          {!formValidity.city && <p>City must not be empty.</p>}
        </div>
        <div className={classes.actions}>
          <button type='button' onClick={props.onCancel}>
            Cancel
          </button>
          <button className={classes.submit}>Confirm</button>
        </div>
      </form>
    );
  };

export default Checkout;
