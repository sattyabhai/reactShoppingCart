import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }


    const clientSecret = getClientSecret();
    console.log(clientSecret);
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          // Add billing details if needed
        }
      }
    });

    if (error) {
      console.error('Payment failed:', error);
    } else {
      console.log('Payment successful:', paymentIntent);
      // Handle successful payment
    }
  };

  return (
    <>
        <form onSubmit={handleSubmit}>
            <div className="col-sm-6">
                <h5>Billing</h5>
                <div class="col-sm-12">
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name"/>
                </div>
                <div className="col-sm-12">
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                </div>
                <h5>Shipping</h5>
                <div className="col-sm-12">
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name"/>
                </div>
                <div className="col-sm-12">
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                </div>
            </div>
            <div className="col-sm-6">
                <CardElement />
                <button type="submit" disabled={!stripe}>Pay</button>
        </div>
        </form>
    </>
  );
}


async function getClientSecret(){
    const requestData = {
        // Add any data you want to send in the request body
        // For example:
        amount: 1000,
        currency: 'usd'
      };
      
      const response = await fetch('http://localhost:3003/api/create-payment-intent/', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      // Add any other headers as needed
      },
      body: JSON.stringify(requestData)
      })
      // console.log(response);
      const data = await response.json();
      let clientSecret = data.client_secret
}
export default CheckoutForm;