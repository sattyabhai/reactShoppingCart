const express = require('express');
const router = express.Router();
const stripeSecretKey = 'sk_test_51OywgmSAxXVU4MJaq6l0C9gCrRQIDZrgV8fFMkfOLPYExFqbyjIVOpNpcmLevm43QlhPQhiCOlDpzS5hcZKKxdUp00v0by2tCf';
const stripe = require('stripe')(stripeSecretKey);

// Route to create a payment intent
router.post('/', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // amount in cents
      currency: 'usd',
      description: 'Software development services',
      shipping: {
        name: 'Jenny Rosen',
        address: {
          line1: '510 Townsend St',
          postal_code: '98140',
          city: 'San Francisco',
          state: 'CA',
          country: 'US',
        },
      },
      payment_method_types: ['card'],

      // Add additional parameters as needed
    });
    console.log(paymentIntent);
    res.json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

module.exports = router;
