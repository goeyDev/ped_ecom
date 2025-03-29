import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!) //! is enforce type of the secret key