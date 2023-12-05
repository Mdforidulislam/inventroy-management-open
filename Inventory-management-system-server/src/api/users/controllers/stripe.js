const { STRIPE_SECRECT_TOKEN } = require('../../../config/defaults');

const stripe = require('stripe')(STRIPE_SECRECT_TOKEN)

const stripePaymentIntent = async (req, res) => {
    try {
        const { price } = req.body;
        
        // Validate the price
        if (isNaN(price) || price <= 0) {
            return res.status(400).json({ error: 'Invalid price value' });
        }

        // Convert price to cents (Stripe uses the smallest currency unit)
        const amount = Math.round(price * 100);

        // Create a payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            payment_method_types: ['card']
        });

        res.send({
            clientSecret: paymentIntent.client_secret
        });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {stripePaymentIntent}