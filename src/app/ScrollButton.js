'use client';

import { useRouter } from 'next/navigation';

export default function ScrollButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push('/#overlay-showcase')}
      className="rounded-md bg-[#496bff] hover:bg-[#6181ff] px-28 py-4 transition duration-100 ease-out"
    >
      Shop Now
    </button>
  );
}
