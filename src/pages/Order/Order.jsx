import React from 'react'
import { useHistory } from 'react-router-dom'

    //get cached product from local store
    const product = JSON.parse(localStorage.getItem('product'))
function Order() {
    const history = useHistory();
    return (
        <div>

            <h1>Order</h1>
            <h2>{product.name}</h2>
            <h4>Rs{product.price}</h4>
            <button onClick={gotoCheckout}>Checkout</button>
        </div>
    )
}

export default Order
