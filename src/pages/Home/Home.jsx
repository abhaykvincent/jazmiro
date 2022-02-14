import { Collapse, Space } from 'antd'
//IMPORT CaretRightOutlined
import { CaretRightOutlined, ShoppingCartOutlined,ShoppingFilled,TagFilled,HeartFilled,RocketFilled } from '@ant-design/icons';
import { Client, Environment } from 'square'
import React, { useState,useEffect } from 'react'
import { Carousel } from 'react-bootstrap'
import $ from 'jquery'
import './Home.scss'
import { Link } from 'react-router-dom';

//get products from stripe using rest api

function onProductClick(product){
    console.log('product clicked')
    //save SelectedProduct to local storage
    //redirect to product page

    //save to local storage
    localStorage.setItem('selectedProduct',JSON.stringify(product))
}



function Home() {
    //state for featured products
    //async await for products
    const [featuredProducts,setFeaturedProducts] = useState([]);
    const [featuredProductsHTML,setFeaturedProductsHTML] = useState([]);
    const onProductClick=(product)=>{
        //go to url for product
        history.push('/product');

    }
    useEffect(() => {
        //async
        const  getProducts  = async () =>{
            let productsTEMP;
            fetch('http://localhost:5001/jazmiro/us-central1/api/square/products',{
                method:'GET',
                headers:{
                    //Access-Control-Allow-Origin
                    'Access-Control-Allow-Origin':'*',
                    'Square-Version': '2022-01-20',
                    'Authorization':'Bearer EAAAENt1YVTeAE8xwkjyU3afL9UZmdNR_F479-m-FxZvJsctRqGQ4NyrGYc4XfGx',
                    'Content-Type':'application/json'
                }   
            })
            .then(response => response.json())
            .then(res => {
                // Products
                productsTEMP = res.objects
                setFeaturedProducts(res.objects)
                //array async map fetch
                const getItemWithImage = async () =>{

                    let  results = await Promise.all(productsTEMP.map(async (item) => {
                        
                        if (item.item_data.image_ids!= undefined)
                        return  fetch('http://localhost:5001/jazmiro/us-central1/api/square/products/image',{
                            method:'POST',
                            headers:{
                                //Access-Control-Allow-Origin
                                'Access-Control-Allow-Origin':'*',
                                'Square-Version': '2022-01-20',
                                'Authorization':'Bearer EAAAENt1YVTeAE8xwkjyU3afL9UZmdNR_F479-m-FxZvJsctRqGQ4NyrGYc4XfGx',
                                'Content-Type':'application/json'
                            } ,
                            body:JSON.stringify({
                                image_id:item.item_data.image_ids[0]  
                            })
                            
                        }).then(response => response.json())
                        .then(imageObject => {
                            return imageObject.objects[0]
                        })
                    
                    }));
                    return results
                }

                getItemWithImage()
                .then((res) => {
                    return res
                })
                .then(res => {
                    let updatedProducts = productsTEMP.map((product,index) => {
                        if(res[index]!=undefined)   {

                            let productTEMP = product
                            productTEMP.image = res[index].image_data.url
                            console.log('res',res)
                            return productTEMP
                        }
                        else{
                            return product
                        }
                    })
                    console.log(updatedProducts)
                    setFeaturedProducts(updatedProducts)
                })

            })
            .catch(err => console.log(err))
        }
        
        getProducts()
            
        
    },[])

    useEffect(() => {
        //map featuredProducts to featuredProductsHTML
        console.log("==========")
        console.log(featuredProducts)
        let featuredProductsHTMLTEMP = featuredProducts.map((product,index) => {
            let price;
            price = product.item_data.variations[0].item_variation_data.price_money== undefined  ? 0 : product.item_data.variations[0].item_variation_data.price_money.amount/100
            console.log(price);
            console.log(product.id)
            return(
                <Link to={`/product/${product.id}`} key={index}>
                    <div className="featured-product-block" key={index}
                        //ONCLICK GO TO PRODUCT SINGLE PAGE
                        onClick={() => onProductClick(product)}
                    >
                        <div className="product-image"
                        style={{backgroundImage:`url(${product.image})`}}
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
            <section className="featured-collections">
                <div className="featured-collections-header">
                    <div className="title">
                        <h1>Featured Collections</h1>
                    </div>
                </div>
                <div className="featured-collection">
                    <div className="featured-collection-block">
                        <div className="featured-cta">Shop NOW</div>
                    </div>
                    <div className="featured-collection-block">
                        <div className="featured-cta">Shop NOW</div>
                    </div>
                </div>
                <div className="featured-collection c3">
                    <div className="featured-collection-block">
                        <div className="featured-cta">Shop NOW</div>
                    </div>
                    <div className="featured-collection-block">
                        <div className="featured-cta">Shop NOW</div>
                    </div>
                    <div className="featured-collection-block">
                        <div className="featured-cta">Shop NOW</div>
                    </div>
                </div>
            </section>
            <section className="featured-products">
                <div className="featured-products-header">
                    <h1>
                    Featured Products
                    </h1>

                    <div className="featured-product" >
                    {featuredProductsHTML}
                    </div>
                </div>
                
                </section>
            <section className="featured-faq">
                <div className="faq-header">
                    <h1>Frequently asked question</h1>
                </div>
                <Space direction="vertical" className="frequently-asked-questions">
                <Collapse
                    bordered={false}
                    defaultActiveKey={['1']}
                    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                    className="site-collapse-custom-collapse"
                >
                    <Panel header="Lorem ipsum dolor sit amet consectetur?" key="1" className="site-collapse-custom-panel">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, enim vero fugit totam veniam iure architecto repudiandae saepe dolor dolorem.</p>
                    </Panel>
                    <Panel header="Lorem ipsum dolor sit amet consectetur?" key="2" className="site-collapse-custom-panel">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, enim vero fugit totam veniam iure architecto repudiandae saepe dolor dolorem.</p>
                    </Panel>
                    <Panel header="Lorem ipsum dolor sit amet?" key="3" className="site-collapse-custom-panel">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, enim vero fugit totam veniam iure architecto repudiandae saepe dolor dolorem.</p>
                    </Panel>
                    <Panel header="Lorem ipsum dolor sit amet?" key="4" className="site-collapse-custom-panel">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, enim vero fugit totam veniam iure architecto repudiandae saepe dolor dolorem.</p>
                    </Panel>
                    <Panel header="Lorem ipsum dolor sit amet?" key="5" className="site-collapse-custom-panel">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, enim vero fugit totam veniam iure architecto repudiandae saepe dolor dolorem.</p>
                    </Panel>
                    <Panel header="Lorem ipsum dolor sit amet?" key="6" className="site-collapse-custom-panel">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, enim vero fugit totam veniam iure architecto repudiandae saepe dolor dolorem.</p>
                    </Panel>
                    <Panel header="Lorem ipsum dolor sit amet?" key="7" className="site-collapse-custom-panel">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, enim vero fugit totam veniam iure architecto repudiandae saepe dolor dolorem.</p>
                    </Panel>
                    <Panel header="Lorem ipsum dolor sit amet?" key="8" className="site-collapse-custom-panel">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, enim vero fugit totam veniam iure architecto repudiandae saepe dolor dolorem.</p>
                    </Panel>
                    <Panel header="Lorem ipsum dolor sit amet?" key="9" className="site-collapse-custom-panel">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, enim vero fugit totam veniam iure architecto repudiandae saepe dolor dolorem.</p>
                    </Panel>
                </Collapse>
                </Space>
            </section>
            {/* <div className="instagram-banner"></div> */}
            <div className="location">
                <h1>Location</h1>
                <div className="location-map">
                    <div className="map-container">
                        <div className="map-canvas"></div>
                    </div>  
                </div>
                <div className="location-address">
                    <div className="location-address-block">
                        <h2>
                            Jazmiro Fashion
                        </h2>
                        <h3>
                            1881 Dalhousie Streets
                        </h3>
                        <p>
                            Toronto, ON M4L 1G8

                        </p>
                    </div>
                </div>
            </div>
            <div className="address">
                <div className="address-container">
                    <h1>Contact Us</h1>
                    <h4>Phone</h4>
                    <p>
                        +1 (416) 888-8888
                    </p>
                    <h4>Email</h4>
                    <p>
                        emailIq@jazmiro.com
                    </p>
                    <h4>Instagram</h4>
                    <p>
                        @jazmiro
                    </p>
                    <h4>
                        Facebook
                    </h4>
                    </div>
                <div className="boutique-image-in-address"></div>
                <div className="background-in-address"></div>
                <div className="background-line">
                    
                </div>
            </div>
            <div className="book-appoinment">
                <div className="book-appoinment-container">
                    <h1>Looking for a custom designed Clothing?</h1>
                    <h3>Book an Appoinment with our Stylist.</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut quidem dolorum aut, impedit dicta atque.
                            </p>
                </div>
                <div className="boutique-image-in-book-appoinment"></div>
            </div>
            <section className="contact-jazmiro"
            onMouseMove={(e) => {
                setMousePosition(
                    {
                        x: e.clientX,
                        y: e.clientY
                    }
                )
            }}

            >
                <div className="featurted-contact-jazmiro">
                    <h2>
                    Still have a Question?
                    </h2>
                    <p>If you can’t find answer to your questions our FAQ, you can always contact us. We will answer to you shortly.</p>
                    <div className="whatsapp-talk-to-button">

                    </div>
                    {/* <div className="featured-contact-image"
                    style={{
                        top: `${mousePosition.y}px`,
                        left: `${mousePosition.x}px`
                    }}
                    ></div> */}
                </div>
            </section>
            </div>
    

    )
}

export default Home


