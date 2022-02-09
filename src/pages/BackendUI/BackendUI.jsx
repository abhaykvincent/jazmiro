import React, { useState,useEffect } from 'react'
import './BackendUI.scss'
//import jquery
import $ from 'jquery';


function BackendUI() {

    //📦 STATES 
    //state for product 
    const [product,setProduct] = useState({name: '', price: '10'});
    //state for NEW product
    const [newProduct,setNewProduct] = useState({status:'inActive'});
    //state for size attribute value
    const [sizeAttributeValue,setSizeAttributeValue] = useState('');


    function createProductOnClick(){
        let NewProductREQUEST = {
            name: product.name,
            price: product.price,
            description: product.description,
            metadata:  product.attributes
            
        }
        console.log(NewProductREQUEST);
        debugger
        fetch('http://localhost:5001/jazmiro/us-central1/api/stripe/create/product',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(NewProductREQUEST)
        })
        .then(response => response.json())
        .then(data => {
            data.status= 'success';
            setNewProduct(data);    
            console.log(data)
        });
    }
    function addAttribute(currentAttribute){
        /* jquery add class */
        $(`.${currentAttribute}`).addClass('show');
        
    }

    function getAllcheckedAttributes(){
        let size = $('.size').find('input:checked');
        let sizes=[]
        size.each(function(){
            sizes.push($(this).val());
        });

        let color = $('.color').find('input:checked');
        let colors=[]
        color.each(function(){
            colors.push($(this).val());
        }
        );
        let material = $('.material').find('input:checked');
        let materials=[]
        material.each(function(){
            materials.push($(this).val());
        });
        
        let attributes = {
            size:sizes,
            color:colors,
            material:materials
        }
        setProduct({...product,attributes:attributes});
        console.log(attributes);
    }

    return (
        <div>
            BACKEND
            {/* form to get a product name and create in stripe and create a product in firebase */}
            <div className="product">


                {/* if newproduct inactive display new product */}
                {
                    newProduct.status === 'inActive' ?
                    <div className="newproduct">
                        <h1>Create new product</h1>

                    </div>
                    :
                    <div className="newproduct">
                        <h1>{newProduct.name}</h1>  
                        <img src={newProduct.images[0]} alt="" srcset="" />
                        <h3>{newProduct.metadata.priceString}</h3>
                        <p>{newProduct.description}</p>

                    </div>
                }

                <div className="productName productInputWrap">
                    {/* Product Name input */}
                    <label>Product Name</label>
                    <input type="text" value={product.name} onChange={(e) => setProduct({...product,name: e.target.value})} />
                </div>
                <div className="productPrice productInputWrap">
                    {/* Product Price input */}
                    <label>Product Price</label>
                    <input type="text" value={product.price} onChange={(e) => setProduct({...product,price: e.target.value})} />
                </div>
                <div className="productDescription productInputWrap">
                    {/* product description input*/}
                    <label>Product Description</label>
                    <input type="text" value={product.description} onChange={(e) => setProduct({...product,description: e.target.value})} />
                </div>
                {/* button to add attributes select */}
                {/* button + */}
                <div className="addAttributes">

                    <div className="size attributesHide">
                        <label>Size</label> 
                        {/* checkbox with sizes */}
                        <div className="sizeCheckbox">
                            <input type="checkbox" id="small" name="size" value="small" />
                            <label for="small">Small</label>
                            <input  type="checkbox" id="medium" name="size" value="medium" />
                            <label for="medium">Medium</label>
                            <input  type="checkbox" id="large" name="size" value="large" />
                            <label for="large">Large</label>
                            <input type="checkbox" id="xlarge" name="size" value="xlarge" />
                            <label for="xlarge">X-Large</label>
                        </div>
                    </div>
                    <div className="color attributesHide">
                        <label>Color </label> 
                        {/* checkbox with sizes */}
                        <div className="colorCheckbox">
                            <input type="checkbox" id="red" name="color" value="red" />
                            <label for="red">Red</label>
                            <input  type="checkbox" id="blue" name="color" value="blue" />
                            <label for="blue">Blue</label>
                            <input  type="checkbox" id="green" name="color" value="green" />
                            <label for="green">Green</label>
                            <input type="checkbox" id="black" name="color" value="black" />
                            <label for="black">Black</label>

                        </div>
                    </div>
                    <div className="material attributesHide">
                        <label>Material </label>
                        {/* checkbox with materials */}
                        <div className="materialCheckbox">
                            <input type="checkbox" id="cotton" name="material" value="cotton" />
                            <label for="cotton">Cotton</label>
                            <input  type="checkbox" id="silk" name="material" value="silk" />
                            <label for="silk">Silk</label>
                            <input  type="checkbox" id="leather" name="material" value="leather" />
                            <label for="leather">Leather</label>
                            <input type="checkbox" id="wood" name="material" value="wood" />
                            <label for="wood">Wood</label>
                        </div>
                    </div>


                    <label for="attributes">ADD Attributes:</label>
                    <select
                        //onchange add class to addAttributesButton
                        onChange={(e) => {
                            $('.addAttributesButton').addClass('show');
                            addAttribute(e.target.value);
                        }}
                    id="attributes" className="attributesList">
                        <option value="">Select Attribute</option>
                        <option value="size">Size</option>
                        <option value="color">Color</option>
                        <option value="material">Material</option>
                    </select>
                    
                </div>
                
                <button onClick={   () => {
                    //add attributes to product
                    getAllcheckedAttributes();
                    console.log(product)
                    createProductOnClick();
                }
                    } >create product</button>

            </div>
        </div>
    )
}

export default BackendUI
