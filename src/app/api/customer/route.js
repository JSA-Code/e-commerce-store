// pages/api/stripe/sessions/webhook.js
// custom api route to fetch customer information
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function GET(request) {
  const authSession = await getServerSession(authOptions);
  // console.log('REQUEST HERE:\n', request);
  // console.log('JSON HERE:\n', request.json());
  // Signed in
  if (authSession) {
    try {
      // if (checkoutData.customer_details.email !== session.user.email) {
      //   throw new Error('Wrong Credentials!');
      // }
      const customer = await stripe.customers.list({
        email: authSession.user.email,
      });
      // const charges = await stripe.charges.list({
      //   customer: customer.data[0].id,
      // });
      console.log('CHARGES:\n', customer.data);
      // console.log('CUSTOMER:\n', charges);
      // console.log('CUSTOMER LIST:\n', customer);
      // console.log('CUSTOMER:\n', customerList.data[0]);
      // console.log('SESSION DATA:\n', sessionDataObj);
      return NextResponse.json({ charges: 'SUCCESS' });
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
