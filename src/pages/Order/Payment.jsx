import React from 'react'
import { useHistory } from 'react-router-dom';

function OrderPayment() {
    const history = useHistory();
    function gotoOrderConfirm() {
        history.push('/order/confirmation');
    }
    return (
        <div>
            <h1>Your order is one step away.</h1>
            <h1>Order</h1>
            <h2>Product Name</h2>
            <h4>Rs1,999</h4>
            {/* Buttons Stripe pay, bank transfer, etc. */}
            <button onClick={gotoOrderConfirm} >Pay with Stripe</button>
            <button >Bank Transfer</button>
        </div>
    )
}

export default OrderPayment
