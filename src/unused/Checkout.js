// 'use client';

// import { useSession, signIn } from 'next-auth/react';
// import { useRouter } from 'next/navigation';

// export default function CheckoutButton({ priceId }) {
//   const { data: session } = useSession();
//   const userEmail = session?.user?.email;
//   const router = useRouter();
//   // console.log('PRICE ID:\n', priceId);

//   const handleClick = async () => {
//     if (!session) {
//       await signIn();
//     } else {
//       const response = await fetch('/api/stripe/sessions', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ priceId, userEmail }),
//       })
//         .then((res) => res.json())
//         .catch((err) => console.log(err));
//       // console.log('RESPONSE:\n', response);
//       router.push(response.url);
//     }
//   };
//   return (
//     <section>
//       <button
//         onClick={handleClick}
//         type="button"
//         role="link"
//         className="h-[60px] w-[345px] rounded-lg bg-[#496bff] font-semibold text-2xl text-gray-50 shadow-md transition duration-100 ease-out hover:bg-[#6181ff] active:bg-[#3d5be3]"
//       >
//         Buy Now
//       </button>
//     </section>
//   );
// }
