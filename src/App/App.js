//react router
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
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
//Salesforce Lightning Web Components

//Redux


function App() {
  console.log('Here we go...');
  function gotoPreviuosPage(){
    window.history.back();
  }
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
          <Route path={`/product/:topicId`}>
            <Product />
          </Route>

          <Route exact path="/order" component={Order} />
          <Route exact path="/order/checkout" component={OrderCheckout} />
          <Route exact path="/order/payment" component={OrderPayment} />
          <Route exact path="/order/confirmation" component={OrderConfirmation} />


          {/* BACKEND UI */}
          <Route exact path="/backend" component={BackendUI} />
        </Switch>
        </div>
        {/* Footer */}
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
