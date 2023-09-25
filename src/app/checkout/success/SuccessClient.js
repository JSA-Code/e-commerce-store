// client side data fetching (useSWR) is used bc pre render data is not available
'use client';

import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import Image from 'next/image';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function SuccessClient() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  // console.log(`SESSION ID: ${sessionId}`);

  const URL = sessionId ? `/api/stripe/sessions/${sessionId}` : null;
  // console.log(`URL HERE:\n${URL}`);
  const {
    data: {
      message,
      sessionDataObj: {
        email,
        paymentId,
        products,
        wallet,
        brand,
        last4,
        expMonth,
        expYear,
        name,
        country,
        postalCode,
        subtotal,
        total,
        discount,
        tax,
      } = {},
    } = {},
  } = useSWR(URL, fetcher);
  // const dataObj = data?.sessionDataObj;
  // console.log(`DATA:\n${data?.message}`);
  // if (data === 'Access Denied' || error)
  if (message)
    return (
      <div className="bg-gray-50 py-60 text-center text-6xl font-bold tracking-wider text-gray-800">
        Access Denied
      </div>
    );
  // console.log('DATA:\n', message);
  return (
    <div className="bg-gray-50">
      <div className="print:hidden pt-24 pb-48">
        <div className="mx-auto max-w-3xl px-4 pt-4 pb-10">
          <div className="max-w-xl">
            <h1 className="text-sm font-medium text-indigo-600">
              Payment successful
            </h1>
            <p className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Order Summary
            </p>
            <p className="mt-2 text-base text-gray-500">
              We appreciate your order, we’re currently processing it. So hang
              tight and we’ll send you a download link to{' '}
              <a className="link-primary link-hover" href={`mailto:${email}`}>
                {email}
              </a>
            </p>
            {/* Order Number */}
            <dl className="mt-12 text-sm font-medium">
              <dt className="text-gray-900">Order number</dt>
              <dd className="mt-2 text-indigo-600">{paymentId}</dd>
            </dl>
          </div>

          <div className="mt-10 border-t border-gray-200">
            <h2 className="sr-only">Your order</h2>

            <h3 className="sr-only">Items</h3>
            {products?.map((product) => (
              <div
                key={product.id}
                className="flex space-x-6 border-b border-gray-200 py-10"
              >
                <Image
                  src={product.images[0]}
                  alt={product.description}
                  width={500}
                  height={500}
                  className="h-20 w-20 flex-none rounded-lg bg-gray-100 object-cover object-center sm:h-40 sm:w-40"
                />
                <div className="flex flex-auto flex-col">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      <a>{product.name}</a>
                    </h4>
                    <p className="mt-2 text-sm text-gray-600">
                      {product.description}
                    </p>
                  </div>
                  <div className="mt-6 flex flex-1 items-end">
                    <dl className="flex space-x-4 divide-x divide-gray-200 text-sm sm:space-x-6">
                      <div className="flex">
                        <dt className="font-medium text-gray-900">Quantity</dt>
                        <dd className="ml-2 text-gray-700">
                          {product.quantity}
                        </dd>
                      </div>
                      <div className="flex pl-4 sm:pl-6">
                        <dt className="font-medium text-gray-900">Price</dt>
                        <dd className="ml-2 text-gray-700">
                          {(product.price / 100).toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                          })}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            ))}

            <div className="sm:ml-40 sm:pl-6">
              <h3 className="sr-only">Your information</h3>

              <h4 className="sr-only">Payment</h4>
              <dl className="grid grid-cols-2 gap-x-6 border-t border-gray-200 py-10 text-sm">
                <div>
                  <dt className="font-medium text-gray-900">
                    Payment Information
                  </dt>
                  <dd className="mt-2 text-gray-700">
                    <p>{wallet}</p>
                    <p className="font-medium">{brand}</p>
                    <div className="flex-auto">
                      <p className="text-gray-900">Ending with {last4}</p>
                      <p>
                        Expires on {expMonth} / {expYear}
                      </p>
                    </div>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Billing address</dt>
                  <dd className="mt-2 text-gray-700">
                    <address className="not-italic">
                      <span className="block">Name: {name}</span>
                      <span className="block">Email: {email}</span>
                      <span className="block">Country: {country}</span>
                      <span className="block">Postal Code: {postalCode}</span>
                    </address>
                  </dd>
                </div>
              </dl>

              <h3 className="sr-only">Summary</h3>

              <dl className="space-y-6 border-t border-gray-200 pt-10 text-sm">
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-900">Subtotal</dt>
                  <dd className="text-gray-700">
                    {(subtotal / 100).toLocaleString('en-CA', {
                      style: 'currency',
                      currency: 'CAD',
                    })}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="flex font-medium text-gray-900">Discount</dt>
                  <dd className="text-gray-700">
                    -
                    {(discount / 100).toLocaleString('en-CA', {
                      style: 'currency',
                      currency: 'CAD',
                    })}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-900">Tax</dt>
                  <dd className="text-gray-700">
                    {(tax / 100).toLocaleString('en-CA', {
                      style: 'currency',
                      currency: 'CAD',
                    })}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-900">Total</dt>
                  <dd className="text-gray-900">
                    {(total / 100).toLocaleString('en-CA', {
                      style: 'currency',
                      currency: 'CAD',
                    })}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
      {/* Print Page
      <div className="hidden bg-gray-50 print:block">
        <div className="mx-auto max-w-3xl px-4 py-2">
          <div className="max-w-xl">
            <h1 className="text-sm font-medium text-indigo-600">
              Payment successful
            </h1>
            <p className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Order Summary
            </p>
            <p className="mt-2 text-base text-gray-500">
              We appreciate your order, we’re currently processing it. So hang
              tight and we’ll send you a download link to{' '}
              <a
                className="link-primary link-hover"
                href={`mailto:${customer?.email}`}
              >
                {customer?.email}
              </a>
            </p>

            <dl className="mt-6 text-sm font-medium">
              <dt className="text-gray-900">Order number</dt>
              <dd className="mt-2 text-indigo-600">
                {sessionData?.payment_intent?.id}
              </dd>
            </dl>
          </div>

          <div className="mt-10 border-t border-gray-200">
            <h2 className="sr-only">Your order</h2>

            <h3 className="sr-only">Items</h3>
            {products?.map((product) => (
              <div
                key={product.id}
                className="flex space-x-6 border-b border-gray-200 py-10"
              >
                <Image
                  src={product.images[0]}
                  alt={product.description}
                  width={500}
                  height={500}
                  className="h-20 w-20 flex-none rounded-lg bg-gray-100 object-cover object-center sm:h-40 sm:w-40"
                />
                <div className="flex flex-auto flex-col">
                  <h4 className="font-medium text-gray-900">
                    <a>{product.name}</a>
                  </h4>
                  <div className="mt-6 flex flex-1 items-end">
                    <dl className="flex space-x-4 divide-x divide-gray-200 text-sm sm:space-x-6">
                      <div className="flex">
                        <dt className="font-medium text-gray-900">Quantity</dt>
                        <dd className="ml-2 text-gray-700">
                          {product.quantity}
                        </dd>
                      </div>
                      <div className="flex pl-4 sm:pl-6">
                        <dt className="font-medium text-gray-900">Price</dt>
                        <dd className="ml-2 text-gray-700">
                          {(product.price / 100).toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                          })}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            ))}

            <div className="sm:ml-40 sm:pl-6">
              <h3 className="sr-only">Your information</h3>

              <h4 className="sr-only">Payment</h4>
              <dl className="grid grid-cols-2 gap-x-6 border-t border-gray-200 py-5 text-sm">
                <div>
                  <dt className="font-medium text-gray-900">
                    Payment Information
                  </dt>
                  <dd className="mt-2 text-gray-700">
                    <p>{payment?.wallet}</p>
                    <p className="font-medium">
                      {payment?.brand.toUpperCase()}
                    </p>
                    <div className="flex-auto">
                      <p className="text-gray-900">
                        Ending with {payment?.last4}
                      </p>
                      <p>
                        Expires on {payment?.exp_month} / {payment?.exp_year}
                      </p>
                    </div>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Billing address</dt>
                  <dd className="mt-2 text-gray-700">
                    <address className="not-italic">
                      <span className="block">Name: {customer?.name}</span>
                      <span className="block">Email: {customer?.email}</span>
                      <span className="block">
                        Country: {customer?.address.country}
                      </span>
                      <span className="block">
                        Postal Code: {customer?.address.postal_code}
                      </span>
                    </address>
                  </dd>
                </div>
              </dl>

              <h3 className="sr-only">Summary</h3>

              <dl className="space-y-6 border-t border-gray-200 pt-5 text-sm">
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-900">Subtotal</dt>
                  <dd className="text-gray-700">
                    {(subtotal / 100).toLocaleString('en-CA', {
                      style: 'currency',
                      currency: 'CAD',
                    })}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="flex font-medium text-gray-900">Discount</dt>
                  <dd className="text-gray-700">
                    -
                    {(discount / 100).toLocaleString('en-CA', {
                      style: 'currency',
                      currency: 'CAD',
                    })}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-900">Tax</dt>
                  <dd className="text-gray-700">
                    {(tax / 100).toLocaleString('en-CA', {
                      style: 'currency',
                      currency: 'CAD',
                    })}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-900">Total</dt>
                  <dd className="text-gray-900">
                    {(total / 100).toLocaleString('en-CA', {
                      style: 'currency',
                      currency: 'CAD',
                    })}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>*/}
    </div>
  );
}
