import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [errors, setErrors] = useState({});
//   const [stripeClientSecret, setStripeClientSecret] = useState({});
  const [formData, setFormData] = useState({
    billing_name: '',
    billing_email: '',
    shipping_name: '',
    shipping_email: '',
    line1: '',
    postal_code: '',
    city: '',
    state: '',
    country: '',
  });

  const validateForm = () => {
    const errors = {};
    if (!formData.billing_name.trim()) {
      errors.billing_name = 'Billing name is required';
    }

    if (!formData.billing_email.trim()) {
      errors.billing_email = 'Billing email is required';
    }else if (!/^\S+@\S+\.\S+$/.test(formData.billing_email)) {
        errors.billing_email = 'Invalid email format';
    }

    if (!formData.shipping_name.trim()) {
        errors.shipping_name = 'Shipping name is required';
    }

    if (!formData.shipping_email.trim()) {
        errors.shipping_email = 'Shipping email is required';
      }else if (!/^\S+@\S+\.\S+$/.test(formData.shipping_email)) {
          errors.shipping_email = 'Invalid email format';
    }

    if (!formData.line1.trim()) {
        errors.line1 = 'House No is required';
    }

    if (!formData.postal_code.trim()) {
        errors.postal_code = 'Postal Code is required';
    }

    if (!formData.city.trim()) {
        errors.city = 'City is required';
    }

    if (!formData.state.trim()) {
        errors.state = 'State is required';
    }

    if (!formData.country.trim()) {
        errors.country = 'Country is required';
    }
    return errors;
  };
  
  const handleInputChange = async (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleKeyUp = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const getStripeKeys = async () => {
    let cartItems = window.sessionStorage.getItem("cartItems");
     cartItems = JSON.parse(cartItems);

    const requestData = {
        cartItems : cartItems,
        address : formData,
      };
    //   console.log(JSON.stringify(requestData))
      const response = await fetch('http://localhost:3005/api/create-payment-intent/', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*'
      // Add any other headers as needed
      },
      body: JSON.stringify(requestData)
      })
    //   console.log(JSON.stringify(requestData));
    console.log(response)

      const data = await response.json();
    //   setStripeClientSecret(data.client_secret)
    console.log(data)
      return data.client_secret
}
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const errors = validateForm();
      if (Object.keys(errors).length === 0) {
        // Form is valid, submit data
        console.log('Form data:', formData);
      } else {
        // Form is invalid, update errors state
        setErrors(errors);

      }


    //   try {
    //     const clientSecret = await getStripeKeys();
    //     // Handle clientSecret
    //   } catch (error) {
    //     console.error('Error fetching Stripe keys:', error);
    //     // Handle error (e.g., show error message to the user)
    //   }
      const clientSecret = await getStripeKeys();

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
                <div className="col-sm-12">
                    <input type="text" className="form-control" onKeyUp={handleKeyUp} onChange={handleInputChange} name="billing_name" placeholder="Enter name"/>
                        {errors.billing_name && <div className="error">{errors.billing_name}</div>}
                    </div>
                <div className="col-sm-12">
                    <input type="email" className="form-control" onKeyUp={handleKeyUp} onChange={handleInputChange} name="billing_email" placeholder="Enter email"/>
                    {errors.billing_email && <div className="error">{errors.billing_email}</div>}
                </div>
                <h5>Shipping</h5>
                <div className="col-sm-12">
                    <input type="text" className="form-control" onKeyUp={handleKeyUp} onChange={handleInputChange} name="shipping_name" placeholder="Enter name"/>
                    {errors.shipping_name && <div className="error">{errors.shipping_name}</div>}
                </div>
                <div className="col-sm-12">
                    <input type="email" className="form-control" onKeyUp={handleKeyUp} onChange={handleInputChange}  name="shipping_email" placeholder="Enter email"/>
                    {errors.shipping_email && <div className="error">{errors.shipping_email}</div>}
                </div>
                <div className="col-sm-12">
                    <input type="text" className="form-control" onKeyUp={handleKeyUp} onChange={handleInputChange}  name="line1" placeholder="Enter House NO"/>
                    {errors.line1 && <div className="error">{errors.line1}</div>}
                </div>
                <div className="col-sm-12">
                    <input type="text" className="form-control" onKeyUp={handleKeyUp} onChange={handleInputChange}  name="postal_code" placeholder="Postal Code"/>
                    {errors.postal_code && <div className="error">{errors.postal_code}</div>}
                </div>
                <div className="col-sm-12">
                    <input type="text" className="form-control" onKeyUp={handleKeyUp} onChange={handleInputChange}  name="city" placeholder="City"/>
                    {errors.city && <div className="error">{errors.city}</div>}
                </div>
                <div className="col-sm-12">
                    <input type="text" className="form-control" onKeyUp={handleKeyUp} onChange={handleInputChange}  name="state" placeholder="State"/>
                    {errors.state && <div className="error">{errors.state}</div>}
                </div>
                <div className="col-sm-12">
                    <input type="text" className="form-control" onKeyUp={handleKeyUp} onChange={handleInputChange}  name="country" placeholder="Country"/>
                    {errors.country && <div className="error">{errors.country}</div>}
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



export default CheckoutForm;