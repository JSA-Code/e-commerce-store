import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (session) {
    // const { priceId, userEmail } = await request.json();
    // console.log('ORIGIN:\n', origin, userEmail, priceId);
    // console.log('HEADERS:\n', headers);
    try {
      // HOW DOES `success?sessionId={CHECKOUT_SESSION_ID}` WORK?
      const urlData = new URL(request.url);
      const origin = urlData.origin;
      const userEmail = urlData.searchParams.get('userEmail');
      const priceId = urlData.searchParams.get('priceId');

      const session = await stripe.checkout.sessions.create({
        customer_email: userEmail,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${origin}/checkout/success?sessionId={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}`,
      });
      // console.log('SESSION:\n', session.url);
      // console.log(NextResponse.json({ url: session.url }));
      return NextResponse.json({ url: session.url });
    } catch (err) {
      return NextResponse.json(err.message);
    }
  }
}
