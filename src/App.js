import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import CheckoutForm from './components/CheckoutForm';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// require('dotenv').config()

// const secretKey = process.env.REACT_APP_STRIPE_SECRET_KEY
const publishKey = process.env.REACT_APP_STRIPE_PUBLISH_KEY
const stripePromise = loadStripe(publishKey)
// const secretKey = fetchClientSecretFromServer()


// const requestData = {
//   // Add any data you want to send in the request body
//   // For example:
//   amount: 1000,
//   currency: 'usd'
// };

// const response = await fetch('http://localhost:3003/api/create-payment-intent/', {
// method: 'POST',
// headers: {
// 'Content-Type': 'application/json'
// // Add any other headers as needed
// },
// body: JSON.stringify(requestData)
// })
// // console.log(response);
// const data = await response.json();
// let client_secret = data.client_secret
// const options = {
 
//   clientSecret: client_secret,
// };


function App() {
const productApi = process.env.REACT_APP_PRODUCT_API_URL

  return (
    <>
      <Router>
    
          <Navbar></Navbar>

          <Routes>
              <Route path="/product/:id" element={<ProductDetails/>}></Route>
              <Route path="/" element={<Products productApi = {productApi} />}></Route>
              <Route path="/checkout" element={<Checkout />}> </Route>
          </Routes>


      </Router>
    
    </>
  );
}

export default App;

function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

