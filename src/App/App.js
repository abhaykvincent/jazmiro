//react router
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import {useSelector, useDispatch,useStore} from 'react-redux';
import { CaretRightOutlined, ShoppingCartOutlined,ShoppingFilled,TagFilled,HeartFilled,RocketFilled } from '@ant-design/icons';

import { Link } from 'react-router-dom';
import React, { useState,useEffect } from 'react'
import { Collapse, Space } from 'antd'
//components
import Header from '../components/Header/Header';
//Pages
import Home     from '../pages/Home/Home';
import About    from '../pages/About/About';
import Gallery  from '../pages/Gallery/Gallery';

import Shop               from '../pages/Shop/Shop';
import Product            from '../pages/Product/Product';

import Order              from '../pages/Order/Order';
import OrderCheckout      from '../pages/Order/Checkout';
import OrderPayment       from '../pages/Order/Payment';
import OrderConfirmation  from '../pages/Order/Confirmation.jsx';
import BackendUI from '../pages/BackendUI/BackendUI';
import 'bootstrap/dist/css/bootstrap.min.css';
import { featuredProducts } from '../store/features/products';
//Salesforce Lightning Web Components
import {getFeaturedProducts} from '../store/features/products';
import Cart from '../pages/Cart/Cart';
import { getCartFromCache } from '../store/features/cart';

//Redux


function App() {


  let store = useStore()
  //array with 12 numbers start from 0
  const array =[0,1,2,3,4,5,6,7,8,9,10,11];
  const [featuredProducts,setFeaturedProducts] = useState(store.getState().products.featuredProducts);
  const [featuredProductsHTML,setFeaturedProductsHTML] = useState([]);


  const { Panel } = Collapse;
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


  let TEMPHTML = array.map((product,index) => {
    if(product>0){
        return(
            <Link to={`/product`} key={index}>
                <div className="featured-product-block" key={index}
                >
                    <div className="product-image">
                        
                    </div>
                    
                    <div className="collection-tag">
                        <div className="tag-container">
                            <div className="tag">Unicorn </div>
                        </div>
                        <div className="buy-now">View Product</div>
                    </div>
                    <div className="featured-product-name"></div>
                    <div className="featured-product-price">
                    </div>
                </div>
            </Link>
        )
    }
    
})

  return (
    


    <Router>
      <div className="App">

        <div className="toast-containers">
          <div className="toast-message">
            <div className="toast-message-text">
                {/* offer message free shipping */}
                <span>Free shipping on orders over $100</span>
            </div>
          </div>
        </div>

        {/* Header */}
        <Header/>
        {/* Pages */}
        <div className="header-shadow"></div>
        <div className="pages">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/gallery" component={Gallery} />

          <Route exact path="/shop" component={Shop} />
          <Route path={`/product/:productId`}>
            <Product />
          </Route>

          <Route exact path="/cart" component={Cart} />

          <Route exact path="/order" component={Order} />
          <Route exact path="/checkout" component={OrderCheckout} />
          <Route exact path="/order/payment" component={OrderPayment} />
          <Route exact path="/order/confirmation" component={OrderConfirmation} />


          {/* BACKEND UI */}
          <Route exact path="/backend" component={BackendUI} />
        </Switch>
        </div>
        {/* Footer */}



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
                {featuredProductsHTML==[]?TEMPHTML:featuredProductsHTML}
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
            





        <div className="footer">
          <div className="footer-inner">
            <div className="footer-links">
              <h5>Quick Links</h5>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/gallery">Gallery</NavLink>
              <NavLink to="/shop">Shop</NavLink>
              <NavLink to="/order">FAQ</NavLink>
            </div>    
            
            <div className="footer-links">

              <div className="footer-links">
                <h5>My Account</h5>
                <NavLink to="/order">Profile</NavLink>
                <NavLink to="/order">Order</NavLink>
                <NavLink to="/order/checkout">Checkout</NavLink>
              </div>
              
              <div className="footer-links">
                <h5>Follow Us</h5>
                <NavLink to="/">Instagram</NavLink>
                <NavLink to="/">Shopify</NavLink>
                <NavLink to="/">Facebook</NavLink>
                <NavLink to="/">Whatsapp</NavLink>

              </div>
            </div>
        
            <div className="footer-links">
              <div className="footer-links">
                <h5>LEGAL</h5>
                <NavLink to="/shop">Privacy</NavLink>
                <NavLink to="/product">Terms</NavLink>
                <NavLink to="/backend">Shipping and Returns</NavLink>

              </div>
              <div className="footer-links">
                <h5>We Accept</h5>
                <NavLink to="/">Paypal</NavLink>
                <NavLink to="/">Visa</NavLink>
                <NavLink to="/">Mastercard</NavLink>
                <NavLink to="/">American Express</NavLink>

              </div>
            </div>  
            <div className="footer-links">
              <h5>Jazmiro</h5>

              <div className="social-media-icons">
                <div className="social"></div>
                <div className="social"></div>
                <div className="social"></div>
                <div className="social"></div>
              </div>

              <h5>Sign Up for Newsletter</h5>
              <input type="text" placeholder="Enter your email address" />
            </div>

          </div>
          <div className="footer-bottom">
            <div className="footer-bottom-inner">
              <p className="copyright">Copyright © 2020 Jazmiro. All rights reserved.</p>
              <p className="copyright">Designed and developed at <a href="https://abhay-vincent-web.app.com">Apeiro Web - Ecommerec</a></p>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
