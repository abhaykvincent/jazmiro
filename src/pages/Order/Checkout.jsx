import React, { useState,useEffect } from 'react'
import { doc, setDoc } from "firebase/firestore"; 
//scss file
import './checkout.scss'
function OrderCheckout() {
    //name,email, address, phone
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    //customer 
    const [customer, setCustomer] = useState();

    let user ;
    const products = JSON.parse(localStorage.getItem('cart'));
    //console.log(products);
    //useEffect on name, email, address, phone
    useEffect(() => {
         user={name,email,address,phone}
        //console.log(user)
    },[name,email,address,phone ])



    /* function createUserOnStripe(){
        //console.log('⛳️ 1');
        fetch('http://localhost:5001/jazmiro/us-central1/api/stripe/customer/create',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user)
        }).then(response => response.json())
        .then(data => {
            setCustomer(data);
            gotoCheckout(data)
        });
        
            
    }
    function gotoCheckout(customerData) {
        let order={
            product:product,
            customer:customerData
        }
        //console.log(order)
        fetch('http://localhost:5001/jazmiro/us-central1/api/stripe/order/create',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(order)
        })
        .then(response => response.json())
        .then(data => 
            {
                //console.log(data)
            }
        );
    }

    function createOrderWithCustomer() {
        createUserOnStripe()
    } */
    console.log(products)
    return (
        <div className="checkout-page">
            <div className="checkout-inner">

                <div className="checkout-left">
                    <h3>Contact Information</h3>
                    <div className="form">
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

                        </div>
                    </div>
             
                    <h3>Contact Information</h3>

                    <div className="form">
                        <div className="form-group">
                            <div className="input-form-group">

                                <div className="input-wrap">
                                    
                                    <label>First anme</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                    
                                </div>
                                <div className="input-wrap">
                                    
                                    <label>Last anme</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                    
                                </div>
                            </div>
                            <label>Email</label>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

                            <label>Address</label>
                            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />

                            {/* Appartment */}
                            <label>Appartment</label>
                            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />

                            {/* City */}
                            <label>City</label>
                            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />

                            <div className="input-form-group three">

                                <div className="input-wrap">
                                    
                                    <label>Country</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                    
                                </div>
                                <div className="input-wrap">
                                    
                                    <label>State</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                    
                                </div>
                                <div className="input-wrap">
                                    
                                    <label>Postal Code</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                    
                                </div>
                            </div>

                            <label>Phone</label>
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            <div className="button-group">
                                <button className="button tertiary" /* onClick={createOrderWithCustomer} */>Return to cart</button>
                                <button className="button primary" /* onClick={createOrderWithCustomer} */>Continue Shipping</button>
                            </div>
                        </div>
                    </div>
             
                </div>
                <div className="checkout-right">
                    <h3>Order Summary</h3>
                    <div className="order-items">


                        {/* map cart items*/}
                        {products.length>=1?products.map(product => (

                            <div className="order-item">
                                <div className="order-item-left">
                                    <div className="image"
                                    style={{ backgroundImage: `url(${product.image.image_data.url})` }}
                                    ></div>
                                </div>
                                <div className="order-item-right">
                                    <h4>{product.item_data.name}</h4>
                                    <p>$10.00</p>
                                </div>
                            </div>
                        ))
                        :
                        <div className="order-item">No items</div>
                    }             

                    </div>
                    

                    <h3>Discount</h3>
                    <div className="discount">
                        <label htmlFor="">Apply cupon code</label>
                        <div className="input-wrap">
                            <input type="text" />
                            <button className="button primary">Apply</button>
                        </div>
                    </div>
                    <div className="order-summary">
                        <div className="payment_lines">

                            <div className="payment_line">
                                <div className="payment_line_left">
                                    <p>Subtotal</p>
                                </div>
                                <div className="payment_line_right">
                                    <p>$10.00</p>
                                </div>
                            </div>
                            <div className="payment_line">
                                <div className="payment_line_left">
                                    <p>Shipping</p>
                                </div>
                                <div className="payment_line_right">
                                    <p>$10.00</p>
                                </div>
                            </div>
                            <div className="payment_line">
                                <div className="payment_line_left">
                                    <p>Tax</p>
                                </div>
                                <div className="payment_line_right">
                                    <p>$10.00</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>   
        </div>
    )
}

export default OrderCheckout
