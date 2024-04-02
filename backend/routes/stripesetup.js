const express = require('express');
const router = express.Router();
const stripeSecretKey = 'sk_test_51OywgmSAxXVU4MJaq6l0C9gCrRQIDZrgV8fFMkfOLPYExFqbyjIVOpNpcmLevm43QlhPQhiCOlDpzS5hcZKKxdUp00v0by2tCf';
const stripe = require('stripe')(stripeSecretKey);
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Route to create a payment intent
router.post('/', async (req, res) => {
  const checkoutRequest = req.body;
  // checkoutRequest = JSON.parse(checkoutRequest)
  console.log(checkoutRequest.cartItems[0].price);
  const totalAmount = parseInt((parseFloat(checkoutRequest.cartItems[0].price) * parseInt(checkoutRequest.cartItems[0].quantity))*100)
  console.log(totalAmount)
  try {
  //   const customer = await stripe.customers.create({
  //     name: checkoutRequest.address.billing_name,
  //     email: checkoutRequest.address.billing_email,
  //   });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount, // amount in cents
      currency: 'USD',
      description: 'Software development services',
      shipping: {
        name: checkoutRequest.address.shipping_name,
        address: {
          line1: checkoutRequest.address.line1,
          postal_code: checkoutRequest.address.postal_code,
          city: checkoutRequest.address.city,
          state: checkoutRequest.address.state,
          country: checkoutRequest.address.country,
        },
      },
      payment_method_types: ['card'],

      // Add additional parameters as needed
    });
    console.log(paymentIntent);
    res.json({ client_secret: paymentIntent.client_secret });
    // res.send(req.body);

  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

module.exports = router;
