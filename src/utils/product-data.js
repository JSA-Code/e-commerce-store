import Stripe from 'stripe';

export const getProductData = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { data: productData } = await stripe.prices.list({
    active: true,
    limit: 2,
    expand: ['data.product'],
  });
  return productData;
};
