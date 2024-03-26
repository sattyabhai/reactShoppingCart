import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


function ProductDetails() {
    const { id } = useParams();
    const [productDetails, setproductDetails] = useState([]);
    const [cartButtonText, setcartButtonText] = useState('Add to cart');
    const [cartButtonStatus, setcartButtonStatus] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const productApi = process.env.REACT_APP_PRODUCT_API_URL;
    useEffect(() => {
        const fetchProductDetails = () => {
            fetch(productApi + "products/" + id)
                .then(response => response.json())
                .then(data => {
                    setproductDetails(data);
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                });
        };
        
        fetchProductDetails();
    }, [productApi,id]); // Include productApi in the dependency array if it can change

    let addToCart = () =>{
             const isItemInCart = cartItems.find((cartItem) => cartItem.id === productDetails.id);
             if (isItemInCart) {
                setCartItems(
                    cartItems.map((cartItem) => // if the item is already in the cart, increase the quantity of the item
                    cartItem.id === productDetails.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem // otherwise, return the cart item
                    )
                );
                } else {
                setCartItems([...cartItems, { ...productDetails, quantity: 1 }]); // if the item is not in the cart, add the item to the cart
                }
                setcartButtonText("Added to cart");
                setcartButtonStatus(true)
                sessionStorage.setItem("cartItems", JSON.stringify(cartItems));

            // console.log(cartItems)
    }



    return (
      <>

            <div className="row">
                <div className="col-sm-12" key={productDetails.id}>
                    <div className="card">
                        <img className="card-img-top" style={{width: "500px"}} src={productDetails.image} alt={productDetails.title}/>
                        <div className="card-body">
                            <h5 className="card-title">{productDetails.title}</h5>
                            <span className="card-title">${productDetails.price}</span>
                            <p className="card-text">{productDetails.description}</p>
                            <button className="add-to-cart" onClick={addToCart}>{cartButtonText}</button>
                            {cartButtonStatus && <a href="/">Checkout</a>}
                        </div>
                        </div>
                </div>
               
            </div>      
      
      </>
    );
  }
  
  export default ProductDetails;