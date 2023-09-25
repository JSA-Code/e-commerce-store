// pages/api/stripe/sessions/webhook.js
import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
// import getRawBody from 'raw-body';
var postmark = require('postmark');

export const runtime = 'nodejs';

const uri = process.env.MONGODB_URI;
const mailClient = new postmark.ServerClient(process.env.POSTMARK_SECRET_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// should replace the lineItems.data[0] in case of multiple items, I'm learning here
export async function POST(request) {
  // console.log('POST REQUEST:\n', request);
  const payload = await request.text();
  // const payload = await getRawBody(request);
  // console.log('PAYLOAD:\n', payload);
  const sig = request.headers.get('stripe-signature');
  // console.log('REQ:\n', request);
  // console.log('HEAD:\n', request.headers);
  // console.log('SIG:\n', sig);
  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    // console.log('EVENT:\n', event);
  } catch (err) {
    return NextResponse.json({ message: err.message });
  }

  if (event.type === 'checkout.session.completed') {
    const sessionData = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
      {
        expand: ['line_items', 'customer'],
      }
    );

    const lineItems = sessionData.line_items.data[0];
    const customerDetails = sessionData.customer_details;

    fulfillOrder(lineItems, customerDetails);
  }
  return NextResponse.json({ message: 'Session Fulfilled!' }, { status: 200 });
}

const fulfillOrder = async (lineItems, customerDetails) => {
  // console.log('Fulfilling order', lineItems, customerDetails);
  const dataClient = new MongoClient(uri);
  await dataClient.connect();
  const database = dataClient.db('test');
  const products = await database.collection('products').find().toArray();
  const foundProduct = products.find(
    (product) => product.name === lineItems.description
  );

  // if (foundProduct) {
  // Do something with the found product
  // console.log(`Product was found: ${foundProduct.name}`);
  mailClient.sendEmailWithTemplate({
    From: 'support@cuteasset.com',
    To: customerDetails.email,
    TemplateAlias: 'product_download',
    TemplateModel: {
      product_url: 'https://www.cuteasset.com',
      product_name: foundProduct.name,
      name: customerDetails.name,
      download_url: foundProduct.link,
      company_name: 'CuteAsset',
      company_url: 'https://www.cuteasset.com',
    },
  });
  // }
  await dataClient.close();
};
