import React, { useReducer } from 'react'

export const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {}
})
const defaultCartState = {
    items: [],
    totalAmount: 0
  };
  
  const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
      const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
      const existingCartIndexItem = state.items.findIndex(
        item => item.id === action.item.id
      )
      const existingCartItem = state.items[existingCartIndexItem]
  
      let updatedItems = state.items.concat(action.item);

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount
        }

        updatedItems = [...state.items]
        updatedItems[existingCartIndexItem] = updatedItem
      } else {
        updatedItems = state.items.concat(action.item)
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount
      };
    }

    if (action.type === 'REMOVE') {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      const updatedTotalAmount = state.totalAmount - existingCartItem.price;
      let updatedItems;

      if (existingCartItem.amount === 1) {
        updatedItems = state.items.filter(item => item.id !== action.id)
      } else {
        const updatedItem = {...existingCartItem, amount: existingCartItem.amount - 1}
        updatedItems = [...state.items]
        updatedItems[existingCartItemIndex] = updatedItem
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount
      }
    }

    if (action.type === 'CLEAR') {
      return defaultCartState
    }

    return defaultCartState;
  };
  
  export const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);
  
    const addItemToCartHandler = (item) => {
      dispatchCartAction({type: 'ADD', item: item});
    };
  
    const removeItemFromCartHandler = (id) => {
      dispatchCartAction({type: 'REMOVE', id: id});
    };

    const clearCartHandler = () => {
      dispatchCartAction({type: 'CLEAR'});
    }
  
    const cartContext = {
      items: cartState.items,
      totalAmount: cartState.totalAmount,
      addItem: addItemToCartHandler,
      removeItem: removeItemFromCartHandler,
      clearCart: clearCartHandler
    };
  
    return (
      <CartContext.Provider value={cartContext}>
        {props.children}
      </CartContext.Provider>
    );
  };

