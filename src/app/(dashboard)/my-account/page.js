import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// const charges = await stripe.charges.list({
//   limit: 3,
// });

export default async function MyAccount() {
  const data = await import('@/app/api/customer/route')
    .then((res) => res.GET())
    .then((res) => res.json());
  // console.log('DATA:\n', data);
  // const authSession = await getServerSession(authOptions);
  // const data = await fetch('/api/customer');

  // fetch data from api route.js file

  // console.log('DATA:\n', customer);
  //   console.log('AUTH SESSION:\n', authSession);
  //   console.log('EMAIL:\n', authSession.user.email);
  //   const customer = customerList.data[0];
  //   const chargesList = await stripe.charges.list({ customer: customer.id });
  //   const charges = chargesList.data;

  // if (!authSession) {
  //   return (
  //     <div className="bg-gray-50 py-60 text-center text-6xl font-bold tracking-wider text-gray-800">
  //       Access Denied
  //     </div>
  //   );
  // }
  return (
    <div className="py-60">
      <h1 className="text-red-800 font-extrabold text-6xl text-center">
        My Account
      </h1>
    </div>
  );
}
