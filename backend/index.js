const express = require('express');
const stripeSecretKey = process.env.STRIPE_SECRET_KEY; // Stripe secret key
const stripe = require('stripe')(stripeSecretKey);
const stripeSetupRouter = require('./routes/stripesetup');
const app = express();
const PORT = process.env.PORT || 3003;
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:3001'
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Route to create a payment intent
app.use('/api/create-payment-intent', stripeSetupRouter);

// app.post('/api/create-payment-intent', async (req, res) => {
//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: 1000, // amount in cents
//       currency: 'usd',
//       // Add additional parameters as needed
//     });
//     console.log(paymentIntent);
//     res.json({ client_secret: paymentIntent.client_secret });
//   } catch (error) {
//     console.error('Error creating payment intent:', error);
//     res.status(500).json({ error: 'Failed to create payment intent' });
//   }
// });


app.get('/test', (req, res) => {
    res.send('Server is running');
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
