import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

function Products(props) {
    const [products, setProducts] = useState([]);
    const productApi = props.productApi;

    // const fetchProducts = () => {
    //     fetch(productApi + "products")
    //         .then(response => response.json())
    //         .then(data => {
    //             setProducts(data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching products:', error);
    //         });
    // };

    // useEffect(() => {
    //     fetchProducts();
    // }, [fetchProducts]); // Include productApi in the dependency array if it can change

    useEffect(() => {
        const fetchProducts = () => {
            fetch(productApi + "products")
                .then(response => response.json())
                .then(data => {
                    setProducts(data);
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                });
        };
        
        fetchProducts();
    }, [productApi]); // Include productApi in the dependency array if it can change


    return (
        <>
            <div className="row">
                {products.length > 0 && (
                    products.map((product) => (
                        <div className="col-sm-3" key={product.id}>
                            <div className="card">
                                <img className="card-img-top" src={product.image} alt={product.title}/>
                                <div className="card-body">
                                    <h5 className="card-title">{product.title}</h5>
                                    <span className="card-title">${product.price}</span>
                                    <Link to={`/product/${product.id}`}>View Product</Link>
                                </div>
                                </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}

export default Products;
