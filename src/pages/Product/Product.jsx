import React, { useState,useEffect } from 'react'
import { Carousel } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './Product.scss'

function addToCartLOCAL(product) {
    console.log('Starting Storinfg to local store')
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    //if product is not already  in cart then add it
    if (cart.find(item => item.id === product.id)) {
        console.log('Product already in cart')
    }
    else{

        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('🚀 ' + product.name + ' is added to cart');
    }
    
}

function Product() {

    const [product, setProduct] = useState({
        status: 'pending'
    });

    let { topicId } = useParams();
    //useEffect onload
    useEffect(() => {
    //clear cache   
    //PRODUCT
    localStorage.removeItem('product');
    let getProduct= getStripeProduct();

    },[])




    //get product by id from stripe using rest api
    function getStripeProduct(){
        const getproduct = fetch('http://localhost:5001/jazmiro/us-central1/api/stripe/product/'+topicId)
        getproduct.then(res => res.json())
        .then(res => {
            console.log(res)
            setProduct({
                status: 'success',
                id: res.id,
                name: res.name,
                description: res.description,
                images: res.images,
                price: res.price,
            })
        })
    }
    //cache product in local storage
    function cacheProduct(){
        localStorage.setItem('product',JSON.stringify(product));
        console.log('🚀 '+product.name+' is cached in local storage');
    }
    return (
        
        <div className="product-page">
            <div className="images">
                <div className="image">
                    <Carousel>
                        <Carousel.Item>
                            <div className="product-image"
                                style={{
                                    backgroundImage: `url('${product.status != 'pending'? product.images[0]:''}')` 
                                }}
                            ></div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="product-image"></div>
                        </Carousel.Item>
                    </Carousel>
                
                                
                </div>
            </div>
            
            <div className="product-details">
                <div className="product-style">STYLE NO {topicId}</div>
            <h2 className="product-title">{product.status != 'pending'? product.name :'Loading'}</h2> 
            <h3 className="product-price">
                <span className="newPrice">INR {product.status!= 'pending'?product.price.unit_amount:''}</span>
                <span className="originalPrice">INR {product.price*0.5}</span>
                
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
                <a className="button secondary" onClick={
                    ()=>{   
                        addToCartLOCAL(product);
                        cacheProduct();
                    }
                    }>Add to Cart</a>
                <a className="button primary" href="/order/checkout" onClick={cacheProduct}>Buy Now</a>
            </div>
            
        </div>
    )
}

export default Product
