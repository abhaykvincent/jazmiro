import React, { useState,useEffect } from 'react'
import products from '../../data/products'
import './Shop.scss'

//ant design carousel importg
import { Carousel, Pagination } from 'react-bootstrap'
import { Button } from 'antd/lib/radio'

//get products from stripe using rest api
function getStripeProducts(){
    return fetch('http://localhost:5001/jazmiro/us-central1/api/stripe/products')
    .then(res => res.json())
    .then(res => {
        return res
    })
}
function Shop() {
       //state for featured products
    //async await for products
    const [featuredProducts,setFeaturedProducts] = useState([]);
    //featuredProductsHTML
    const [featuredProductsHTML,setFeaturedProductsHTML] = useState('');
    useEffect(() => {
        let products =getStripeProducts();
        products.then(res => {
            console.log(res.data);
            console.log('Response Recived.');
            console.log('Copy.. Changing state `FeaturedProducts` .');
            setFeaturedProducts(res.data)
            setFeaturedProductsHTML(makeHtmlFeaturedProducts(res.data))
        })
    },[])
    //make html for featured products
    useEffect(() => {
        if(featuredProducts.length > 0){
            makeHtmlFeaturedProducts(featuredProducts)
        }
    },[featuredProducts])

    const makeHtmlFeaturedProducts = (featuredProductsTemp) =>{
        console.log('Making HTML for Featured Products');
        let featuredProductsHTMLTemp="error"
        if(featuredProductsTemp.length > 0){
        featuredProductsHTMLTemp = featuredProductsTemp.map((product,index) => {
                return(
                <div className="product" key={product.id}>
                    <div className="product-image-container">
                        <div className="product-image"
                            style={{ backgroundImage: `url(${(product.images.length>0)?product.images[0]:''})` }}
                        ></div>
                    </div>
                    <a href="product/0001"><div className="product-no">Style Number :{`Product #${product.id}`}</div></a>
                    <div className="product-name">{product.name}</div>
                    <div className="product-price">{product.price}</div>
                    <Button>Buy Now</Button>
                    <br />
                </div>
                )
        })
        return featuredProductsHTMLTemp

        }
        
    }
    return (
        <div className="shop">
            <div className="products">
                <div className="products-page-carousel">
                    {/* antd design carousel */}
                    <Carousel className="products-ad" >
                        <Carousel.Item className="ad ad-1">
                            <div className="product-ad">
                                <div className="ad">10 New Designs Every Week</div>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item className="ad ad-1">
                            <div className="product-ad">
                                <div className="ad">10 New Designs Every Week</div>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item className="ad ad-1">
                            <div className="product-ad">
                                <div className="ad">10 New Designs Every Week</div>
                            </div>
                        </Carousel.Item>
                    </Carousel>
            
                </div>
                <h1>Shop</h1>
                <div className="products_wrap">
                {featuredProductsHTML}
                </div>
                <Pagination className="products-pagination">
                    <Pagination.First />
                    <Pagination.Prev />
                    <Pagination.Item>{1}</Pagination.Item>
                    <Pagination.Ellipsis />

                    <Pagination.Item>{10}</Pagination.Item>
                    <Pagination.Item>{11}</Pagination.Item>
                    <Pagination.Item active>{12}</Pagination.Item>
                    <Pagination.Item>{13}</Pagination.Item>
                    <Pagination.Item disabled>{14}</Pagination.Item>

                    <Pagination.Ellipsis />
                    <Pagination.Item>{20}</Pagination.Item>
                    <Pagination.Next />
                    <Pagination.Last />
                </Pagination>
                
            </div>
        </div>
    )
}

export default Shop
