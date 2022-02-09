import {NavLink} from 'react-router-dom';
import React from 'react'
//jquery
import $ from 'jquery';
//useSatte
import {useState,useEffect} from 'react';
import './Header.scss'
//salesforce

import { Breadcrumb, ListGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';

//get u;l from react router dom\
import { useHistory } from 'react-router-dom';

//ICONS
import {MdOutlineTrendingUp}    from 'react-icons/md';

//ANT Design
//PoweroffOutlined
import {PoweroffOutlined,ShoppingCartOutlined} from '@ant-design/icons';
import { AutoComplete, Input, Space, Button } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';


//function to solit breadcrumbs string  by /
function getBreadcrumbs(path) {
    let pathArray = path.split('/');
    //get each path element and add it to the breadcrumbs array of objects
    let breadcrumbs = pathArray.map((path, index) => {
        if (path !== ' ') {
            return {
                name: path.charAt(0).toUpperCase() + path.slice(1),
                path: pathArray.slice(0, index + 1).join('/')
            }
        }
    }
    )

    return breadcrumbs;
}
function removeTrendings(){
    let trending = document.getElementsByClassName('trending');
    for(let i=0;i<trending.length;i++){
        setTimeout(()=>{
            trending[i].classList.add('hide');
            if(i==trending.length-1){
                $('.list-group-item.trending').addClass('collapse');
            }
        },i*100)
    }
}
function showTrendings(){
    let trending = document.getElementsByClassName('trending');
    for(let i=0;i<trending.length;i++){
        setTimeout(()=>{
            trending[i].classList.remove('hide');
            if(i==trending.length-1){
                $('.list-group-item.trending').removeClass('collapse');
            }
        },i*200)
    }
}

function Header() {
    let history = useHistory();
    const [breadcrumbs, setBreadcrumbs] = useState (getBreadcrumbs(history.location.pathname));

    //SEARCH
    const [searchKeyWord, setSearchKeyWord] = useState('');
    //search message
    const [searchMessage, setSearchMessage] = useState('Birthday, Kids, Salwar, Ethnic');

    //setsearch key word
    const handleSearch = (e) => {
        let searchKeyWordTEMP = e.target.value

        setSearchKeyWord(searchKeyWordTEMP.charAt(0).toUpperCase() + searchKeyWordTEMP.slice(1));
    }
    const capitalizeFirstLetter=(searchKeyWord)=>{
    }
    useEffect(() => {
        if(searchKeyWord.length>0){
            capitalizeFirstLetter(searchKeyWord)
            setSearchMessage('Searching for "'+searchKeyWord+`"`);
            removeTrendings();
        }
        else{
            setSearchMessage('Birthday, Kids, Salwar, Ethnic');
            showTrendings();
        }
    }, [searchKeyWord]);


    // SEARCH LIST

    // search List TOGGLE
    const [searchToggle, setSearchToggle] = useState(false);
    // search TOGGLE class
    const [searchToggleClass, setSearchToggleClass] = useState('');

    useEffect(() => {
        if (searchToggle) {
            setSearchToggleClass('show');
            showBlackScreen();
        } else {
            setSearchToggleClass('');
            removeBlackScreen()
        }
    }, [searchToggle]);
    // search toggle
    function toggleSearch() {
        setSearchToggle(!searchToggle);
    }
    // search expand
    function searchExpand() {
        setSearchToggle(true);
    }
    // search collapse
    function searchCollapse() {
        setSearchToggle(false);
    }


    //BLACK SCREEN

    // black screen status
    const [blackScreen, setBlackScreen] = useState(false);
    // black screen class
    const [blackScreenClass, setBlackScreenClass] = useState('');

    useEffect(() => {
        if (blackScreen) {
            setBlackScreenClass('show');
            showBlackScreen()
        } else {
            setBlackScreenClass('');
            removeBlackScreen()
        }
    }, [blackScreen]);

    //removeScreen
    function removeBlackScreen() {
        setBlackScreen(false);
    }
    //showScreen
    function showBlackScreen() {
        setBlackScreen(true);
    }

    /* const enterLoading = index => {
    this.setState(({ loadings }) => {
      const newLoadings = [...loadings];
      newLoadings[index] = true;

      return {
        loadings: newLoadings,
      };
    });
    setTimeout(() => {
      this.setState(({ loadings }) => {
        const newLoadings = [...loadings];
        newLoadings[index] = false;

        return {
          loadings: newLoadings,
        };
      });
    }, 6000);
  };
 */

  //CART 
    const [cart, setCart] = useState([]);
    //if length of JSONified cart  from local storage is greater than 0 setCart to cart
    useEffect(() => { 
    }, []);

    const [cartToggle, setCartToggle] = useState(false);
    //cart toggle class
    const [cartToggleClass, setCartToggleClass] = useState('');

    useEffect(() => {
        if (cartToggle) {
            setCartToggleClass('show');
            /* showBlackScreen(); */
        } else {
            setCartToggleClass('');
            /* removeBlackScreen() */
        }
    }, [cartToggle]);

    function toggleCart() {
        setCartToggle(!cartToggle);
        setCart(JSON.parse(localStorage.getItem('cart'))); 
        console.log(cart)
    }


   
    return (<div className="header">
            <div className="header-inner">

                <NavLink to="/" className="logo">
                </NavLink>

                <div className="header-search">
                <OverlayTrigger
                    key="left"
                    placement="left"
                    overlay={
                        <Tooltip id={`tooltip-left`}>
                        Search for products
                        </Tooltip>
                    }
                    >
                    <input type="text" placeholder="Search" 
                        onClick={searchExpand}
                        onChange={ (e) => {
                            searchExpand()
                            handleSearch(e)
                        }
                        }
                        />
                    </OverlayTrigger>

                <ListGroup className={`search-list ${searchToggleClass}`} >
                    <p className="search-message">{searchMessage}</p>
                    <ListGroup.Item className='trending'>Collection I<MdOutlineTrendingUp/>
                    </ListGroup.Item>
                    <ListGroup.Item className='trending'>Collection II<MdOutlineTrendingUp/>
                    </ListGroup.Item>
                    <ListGroup.Item className='trending'>Collection III<MdOutlineTrendingUp/>
                    </ListGroup.Item>
                    <ListGroup.Item className='trending'>Collection IV<MdOutlineTrendingUp/>
                    </ListGroup.Item>
                    <p className="search-type">Products</p>
                    <ListGroup.Item>{searchKeyWord}</ListGroup.Item>
                    <ListGroup.Item>Coectlion</ListGroup.Item>
                    <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                    <p className="search-type">Top Collections</p>
                    <ListGroup.Item>{searchKeyWord}</ListGroup.Item>
                    <ListGroup.Item>Coectlion</ListGroup.Item>
                    <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
                        
            </div>
            

                <div className="navs">
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/shop">Shop</NavLink>
                    <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                            <Tooltip id={`tooltip-right`}>
                            View All Orders
                            </Tooltip>
                        }
                        >
                    <div href="#" className="order-icon"
                    onClick={toggleCart}
                    >
                    </div>

                    </OverlayTrigger>
                
                </div>

            </div>
            <div className={`header-cart ${ cartToggleClass }`}>
                <div className="cart-icon">
                    <h6>Recently added an item</h6>
                    
                    {/* loop through cart and return JSX */}
                    {cart != null ? cart.map((item, index) => (

                    <Checkbox
                    key={index} /* onChange={onChange} */>
                    <div className="cart-item" >
                        <div className="cart-item-img"></div>
                        <div className="cart-item-details">
                            <div className="cart-item-name">
                                    <NavLink to="/shop/product">
                                        {item.name}
                                    </NavLink>
                                
                                <p></p>
                            </div>
                            <div className="cart-item-price">
                                <p>$0.00</p>
                            </div>
                        </div>
                    </div>
                    </Checkbox>
                    ))
                    :
                    <p>No items in cart</p>}

                    {/* Button from antd */}
                    <Space style={{ width: '100%' }}>
                        <Button
                            block={true}
                            className="buy-now-button"
                                type="secondary"
                            icon={<ShoppingCartOutlined />}
                            loading={false}
                            //links
                            href="/cart"       
                            /* onClick={() => this.enterLoading(1)} */
                        >View vcart</Button>
                        <Button
                            block={true}
                            className="buy-now-button"
                            type="primary"
                            icon={<ShoppingCartOutlined />}
                            loading={false}
                            /* onClick={() => this.enterLoading(1)} */
                        >Buy Now</Button>
                    </Space>
                    </div>
            </div>
            <div className="breadcrumbs">
               {/*  <div className="breadcrumbs-inner">
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        {
                        breadcrumbs.map((crumb, index) => { 
                            if (index !==0)
                                return <Breadcrumb.Item key={index}>{crumb.name}</Breadcrumb.Item>
                        }
                        )
                        }

                    </Breadcrumb>
                </div> */}
                
            </div>
            <div className={`black-screen ${blackScreenClass}`}
                onClick={searchCollapse}
            ></div>
            <div className="console">

                    Keyword : {searchKeyWord}
            </div>
        </div>
    )
}

export default Header



