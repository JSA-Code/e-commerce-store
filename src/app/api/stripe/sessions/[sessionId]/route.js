// pages/api/stripe/sessions/webhook.js
// custom api route to fetch customer information
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(request, { params: { sessionId } }) {
  // const some = request;
  // const someJson = await request.json();
  // console.log('REQUEST:\n', request);
  // console.log('SOMETHING:\n', something);
  // console.log('SESSION ID HERE:\n', sessionId);
  const session = await getServerSession(authOptions);
  // console.log('REQUEST HERE:\n', request);
  // console.log('JSON HERE:\n', request.json());
  // Signed in
  if (session) {
    try {
      if (!sessionId.startsWith('cs_')) {
        throw new Error('Missing stripe session id');
      }
      const checkoutData = await stripe.checkout.sessions.retrieve(sessionId, {
        // Expands the which ever property you want to access
        expand: ['payment_intent', 'line_items.data.price.product'],
      });
      if (checkoutData.customer_details.email !== session.user.email) {
        throw new Error('Wrong Credentials!');
      }
      const charge = await stripe.charges.retrieve(
        checkoutData.payment_intent.latest_charge
      );

      const sessionData = checkoutData;
      const paymentData = charge;
      const customer = sessionData?.customer_details;
      const products = sessionData?.line_items?.data?.map((item) => ({
        ...item.price.product,
        price: item.price.unit_amount,
        quantity: item.quantity,
      }));
      const payment = paymentData?.payment_method_details.card;
      const subtotal = sessionData?.amount_subtotal;
      const total = sessionData?.amount_total;
      const discount = sessionData?.total_details?.amount_discount;
      const tax = sessionData?.total_details?.amount_tax;

      const sessionDataObj = {
        email: customer?.email,
        paymentId: sessionData?.payment_intent?.id,
        products,
        wallet: payment?.wallet,
        brand: payment?.brand.toUpperCase(),
        last4: payment?.last4,
        expMonth: payment?.exp_month,
        expYear: payment?.exp_year,
        name: customer?.name,
        country: customer?.address?.country,
        postalCode: customer?.address?.postal_code,
        subtotal,
        total,
        discount,
        tax,
      };
      // console.log('SESSION DATA:\n', sessionDataObj);
      return NextResponse.json({ sessionDataObj });
    } catch (err) {
      // console.log(err.message);
      // res.status(500).end(`Error: ${err.message}`);
      return NextResponse.json({ message: err.message });
    }
  } else {
    // Not Signed in
    // console.log("Session", JSON.stringify(session, null, 2))
    // res.status(401).end();
    return NextResponse.json({ message: 'You must be logged in!' });
  }
}
