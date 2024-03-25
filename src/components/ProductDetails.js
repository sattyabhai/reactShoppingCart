import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


function ProductDetails() {
    const { id } = useParams();
    const [productDetails, setproductDetails] = useState([]);
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
    console.log(productDetails);
    return (
      <>

            <div className="row">
                {/* { */}
                    {/* // productDetails.map((product) => ( */}
                        <div className="col-sm-12" key={productDetails.id}>
                            <div className="card">
                                <img className="card-img-top" style={{width: "500px"}} src={productDetails.image} alt={productDetails.title}/>
                                <div className="card-body">
                                    <h5 className="card-title">{productDetails.title}</h5>
                                    <span className="card-title">${productDetails.price}</span>
                                    <p className="card-text">{productDetails.description}</p>
                                </div>
                                </div>
                        </div>
                    {/* ))
                } */}
            </div>      
      
      </>
    );
  }
  
  export default ProductDetails;