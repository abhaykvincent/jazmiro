import React, { useState,useEffect } from 'react'
import { Carousel } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom';
import {getFeaturedProducts} from '../../store/features/products';
import './Product.scss'
import { useDispatch, useStore, useSelector } from 'react-redux';
import { addToCart } from '../../store/features/cart';

function addToCartLOCAL(product) {
    //console.log('Starting Storinfg to local store')
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    //if product is not already  in cart then add it
    if (cart.find(item => item.id === product.id)) {
        //console.log('Product already in cart')
    }
    else{

        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        //console.log('🚀 ' + product.name + ' is added to cart');
    }
    
}

function Product() {
    let store = useStore()
    let location = useLocation()
    
    const mostProducts = useSelector(state => state.products)
    const [product,setProduct] = useState();
    
    const dispatch = useDispatch();

    let { productId } = useParams();
    console.log("id: " + productId)
    //useEffect onload
    useEffect(
        () => {
            console.log('on url change')
            dispatch(getFeaturedProducts()).then((mostProductsRETURN) => {
                console.log(mostProductsRETURN)
                debugger
                let currentProduct=  mostProductsRETURN.payload.find(item => item.id === productId)
                console.log(currentProduct)
                setProduct(currentProduct)
            })
        },
        [location]
      )
    useEffect(() => {

    //scroll to top
        dispatch(getFeaturedProducts()).then((mostProductsRETURN) => {
            let currentProduct=  mostProductsRETURN.payload.find(item => item.id === productId)
            console.log(currentProduct)
            setProduct(currentProduct)
        })

    },[])
    useEffect(()=>{     

        window.scrollTo(0, 0);

    })

    useEffect(() => {
        console.log("Product Updated")
        console.log(product)
    },[product])


    //addToCartOnClick
    const addToCartOnClick = (product) => {
        dispatch(addToCart(product))
    }





    return (
        
        <div className="product-page">
            <div className="images">
                <div className="image">
                    <Carousel>
                        <Carousel.Item>
                            <div className="product-image"
                                style={{
                                    backgroundImage: `url('${product? product.image.image_data.url:'' }')` 
                                }}
                            ></div>
                        </Carousel.Item>
                    </Carousel>
                
                                
                </div>
                <div className="image-alt"
                style={{
                    backgroundImage: `url('${product? product.image.image_data.url:'' }')`
                }}></div>
            </div>
            
            <div className="product-details">
                <div className="product-style">STYLE NO {productId}</div>
            <h2 className="product-title">{product? product.item_data.name :'Loading'}</h2> 
            <h3 className="product-price">
                <span className="newPrice">INR {}</span>
                <span className="originalPrice">INR {}</span>
                
            </h3>
            <p className="product-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, cum!</p>
            
            <div className="size-options">
                <p>Size</p>
                <div className="size-options-radio">
                    <input type="radio" name="size" id="size-xs" />
                    <label htmlFor="size-xs">XS</label>
                </div>
                <div className="size-options-radio">
                    <input type="radio" name="size" id="size-s" />
                    <label htmlFor="size-s">S</label>
                </div>
                <div className="size-options-radio">
                    <input type="radio" name="size" id="size-m" />
                    <label htmlFor="size-m">M</label>
                </div>
            </div>
            {/* Available colour options with radio */}
            <div className="color-options">
                <p>Color</p>
                <div className="color-options-radio">
                    <input type="radio" name="color" id="color-red" />
                    <label htmlFor="color-red">Red</label>
                </div>
                <div className="color-options-radio">
                    <input type="radio" name="color" id="color-blue" />
                    <label htmlFor="color-blue">Blue</label>
                </div>
            </div>
            {/* Qty counter initial value 1*/}
            <div className="qty-counter">
                <p className="label">Qty</p>
                <div className="qty-counter-input">
                    <button className="qty-counter-btn" type="button">-</button>
                    <input type="text" value="1" />
                    <button className="qty-counter-btn" type="button">+</button>
                </div>
            </div>
                
            <a className="button primary" href="/order/checkout" >Buy Now</a>
            <a className="button secondary" onClick={
                    ()=>{   
                        addToCartOnClick(product)
                    }
                    }>Add to Cart</a>
            </div>
            
        </div>
    )
}

export default Product
