import React from 'react'

function OrderConfirmation() {
    return (
        <div>
            <h1>Order Confirmation</h1>
            <p>Thank you for your order!</p>
            <p>Order confirmation has been sent to <spam className="orange">customer@jazmiro.com</spam> </p>

            <h1>Order</h1>
            <h2>Product Name</h2>
            <h4>Rs1,999</h4>

            <p>Transaction No: #57387545376 </p>
        </div>
    )
}

export default OrderConfirmation
