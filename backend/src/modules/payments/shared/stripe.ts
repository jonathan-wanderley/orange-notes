import Stripe from 'stripe';

const secret = process.env.STRIPE_SECRET_KEY;

if (!secret) throw new Error('STRIPE_SECRET_KEY is not set');

export const stripe = new Stripe(secret, {
  apiVersion: '2025-09-30.clover',
});
