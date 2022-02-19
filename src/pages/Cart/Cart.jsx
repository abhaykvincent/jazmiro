
import {useState,useEffect} from 'react';
import { Link,NavLink } from 'react-router-dom'
import { Button } from 'antd/lib/radio';
import { useSelector, useDispatch } from 'react-redux';
import { Checkbox,Space } from 'antd';
import {PoweroffOutlined,ShoppingCartOutlined} from '@ant-design/icons';
import { getCartFromCache } from '../../store/features/cart';

function Cart() {

    const cart = useSelector(state => state.cart.items || []);
    console.log('cart')
    console.log(cart)
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('cart updated from cache')
        dispatch(getCartFromCache())
    }, [])

    return (
        <div className="cart">
            <h1>Cart</h1>
            <div className="cartItems">
            <div className="cart-icon">
                    <h6>Recently added an item</h6>
                    
                    {/* loop through cart and return JSX */}
                    {cart != null ? cart.map((item, index) => (
                        
                        <Checkbox
                    checked={item.selected}
                    onChange={() => {
                            dispatch(unselectItem(item))

                    }}
                    key={index} /* onChange={onChange} */>
                    <div className="cart-item" >
                        <div className="cart-item-img"
                        style={{
                            backgroundImage: `url(${item.image.image_data.url})`
                        }}
                        ></div>
                        <div className="cart-item-details">
                            <div className="cart-item-name">
                                    <NavLink to="/shop/product">
                                        {item.item_data.name}
                                    </NavLink>
                                
                                <p></p>
                            </div>
                            <div className="cart-item-price">
                                <p>₹{item.item_data.variations[0].item_variation_data.price_money.amount/100}</p>
                            </div>
                        </div>
                    </div>
                    </Checkbox>
                    ))
                    :
                    <p>No items in cart</p>}

                    {/* Button from antd */}
                    <Space style={{ width: '100%' }}>
                        <Link to="/cart"><div className="order-icon"
                    >Cart</div></Link>
                        <NavLink to="/checkout">
                            <div className="button primary">Checkout</div>
                        </NavLink>
                        
                        <Button
                            block={true}
                            className="clear-button"
                            type="danger"
                            icon={<ShoppingCartOutlined />}
                            loading={false}
                            onClick={() => {
                                dispatch({type: 'cart/clearCart'})
                            }}
                        >Clear Cart</Button>
                        
                    </Space>
                    </div>
            
            </div>
        </div>
    )
}

export default Cart
