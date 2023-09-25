'use client';

import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function CheckoutButton({ priceId }) {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  const router = useRouter();
  const URL = session
    ? `/api/stripe/sessions?priceId=${priceId}&userEmail=${userEmail}`
    : null;
  const { data } = useSWR(URL, fetcher);
  // console.log('DATA:\n', data);

  const handleClick = async () => {
    if (!session) {
      await signIn();
    } else {
      router.push(data?.url);
    }
  };
  return (
    <section>
      <button
        disabled={!session || !data?.url}
        title={!session ? 'Please sign in to make a purchase' : ''}
        onClick={handleClick}
        type="button"
        role="link"
        className="h-[60px] w-[345px] rounded-lg bg-[#496bff] disabled:opacity-70 font-semibold text-2xl text-gray-50 shadow-md transition duration-100 ease-out hover:bg-[#6181ff] active:bg-[#3d5be3]"
      >
        Buy Now
      </button>
    </section>
  );
}
