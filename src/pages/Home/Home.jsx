import { Collapse, Space } from 'antd'
//IMPORT CaretRightOutlined
import { CaretRightOutlined, ShoppingCartOutlined,ShoppingFilled,TagFilled,HeartFilled,RocketFilled } from '@ant-design/icons';
import { Client, Environment } from 'square'
import React, { useState,useEffect } from 'react'
import { Carousel } from 'react-bootstrap'
import $ from 'jquery'
import './Home.scss'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch,useStore } from 'react-redux';
import {getFeaturedProducts} from '../../store/features/products';

//get products from stripe using rest api




function Home() {
    //state for featured products
    //async await for products
    let store = useStore()
    const [featuredProducts,setFeaturedProducts] = useState(store.getState().products.featuredProducts);
    const [featuredProductsHTML,setFeaturedProductsHTML] = useState([]);
  
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getFeaturedProducts())
        .then(()=>{
            console.log("Redux Featured products")  
            console.log(store.getState().products.featuredProducts)
            setFeaturedProducts(store.getState().products.featuredProducts)
        })
        
    },[])
    useEffect(()=>{
        console.log('featuredProduct STate UPdateed')
        console.log(featuredProducts)
        let featuredProductsHTMLTEMP = featuredProducts.map((product,index) => {
            if(product!= undefined){
                let price;
                price = product.item_data.variations[0].item_variation_data.price_money== undefined  ? 0 : product.item_data.variations[0].item_variation_data.price_money.amount/100
                return(
                    <Link to={`/product/${product.id}`} key={index}>
                        <div className="featured-product-block" key={index}
                        >
                            <div className="product-image"
                            style={{backgroundImage:`url(${product.image.image_data.url})`}}
                            >
                                
                            </div>
                            
                            <div className="collection-tag">
                                <div className="tag-container">
                                    <div className="tag">Unicorn </div>
                                </div>
                                <div className="buy-now">View Product</div>
                            </div><div className="featured-product-name">
                                <h4>{product.item_data? product.item_data.name:'loading...' }</h4>
                            </div>
                            <div className="featured-product-price">
                                <p className="was">{(price*1.2).toFixed(2)== 0 ? 'Price unavailable. Jazmiro Stylist would happy to helpy. Chat Now': `₹${(price*1.2).toFixed(2)}`}</p>
                                <h4>{price==0 ? ``: `₹${price}`}</h4>
                            </div>
                        </div>
                    </Link>
                )
            }
            
        })
        setFeaturedProductsHTML(featuredProductsHTMLTEMP)
    },[featuredProducts])



    const { Panel } = Collapse;

    // state for mouse position
    const [mousePosition,setMousePosition] = useState({x:0,y:0})
    const [contactPosition,setContactPosition] = useState({start:0,end:0})

    

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
    return (
        <div className="home">

           {/*  <Carousel className="message" >
                <Carousel.Item className="hero-1">
                    <div className="hero-message">
                        <div className="message">10 New Designs Every Week</div>
                    </div>
                </Carousel.Item>
                <Carousel.Item className="hero-1">
                    <div className="hero-message">
                        <div className="message">10% off for order over INR xxxx</div>
                    </div>
                </Carousel.Item>
                <Carousel.Item className="hero-1">
                    <div className="hero-message">
                        <div className="message">Ready-to-ship Products Available </div>
                    </div>
                </Carousel.Item>
            </Carousel> */}
            <div className="hero">
                <Carousel >
                    <Carousel.Item className="hero-3">
                        <Carousel.Caption>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item className="hero-1">
                        <Carousel.Caption>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item className="hero-2">
                        <Carousel.Caption>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
            <div className="hero-attributes">
                <div className="hero-attribute">
                    x.x Rating on google reviews
                </div>
                <div className="hero-attribute">
                    Free Shipping
                </div>
                <div className="hero-attribute">
                    100% Money Back Guarantee
                </div>
                <div className="hero-attribute">
                    Custoum Tailoring
                </div>
            </div>
            
            <div className="hero-banner">
            
            </div>
            <p className="hero-subtitle">Lorem, ipsum dolor.</p>
            <h1 className="hero-title">Lorem ipsum dolor  amet consectetur,  elit. Quae nihil obcaecati sunt odit. Placeat  quod possimus pariatur.</h1>
            <section className="main-featured-section">
                <div className="featured-collection">
                    <div className="featured-collection-block">
                        <div className="featured-cta">EXPLORE</div>
                    </div>
                </div>
                <div className="featured-menus">
                    <div className="menus">
                    <div className="tagline">
                        <div className="icon">
                            {/* USER ICON */}
                            <TagFilled />

                        </div>
                        <p>Signup Get 10% Off</p>
                    </div>
                    <div className="tagline">
                        <div className="icon"><HeartFilled /></div>
                        <p>Just Arrived Stylish Trends</p>
                    </div>
                    <div className="tagline">
                        <div className="icon"><ShoppingFilled /></div>
                        <p>Ready to ship Save your time</p>
                    </div>
                    <div className="tagline">
                        <div className="icon"><RocketFilled /></div>
                        <p>Bestsellers</p>
                    </div>

                    </div>
                </div>
            </section>
            </div>
    

    )
}

export default Home


