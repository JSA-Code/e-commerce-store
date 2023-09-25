import { primary, secondary } from '@/utils/fonts';
import ScrollButton from './ScrollButton';
import Logo from '@/public/images/Logo.png';
import Image from 'next/image';
// If loading a variable font, you don't need to specify the font weight

export default function HeroSection() {
  return (
    <div className="bg-gray-100 dark:bg-gray-100 grid grid-cols-1 sm:grid-cols-2 place-items-center py-28 gap-y-10">
      <div className="font-medium text-center sm:text-left sm:my-10 px-5 sm:pl-36">
        <h1
          className={`${primary.variable} font-primary text-5xl sm:text-7xl font-bold text-gray-900 `}
        >
          Simply Cute, Assets.
        </h1>
        <p
          className={`${secondary.variable} mt-10 font-secondary text-xl sm:text-lg font-normal leading-8 text-gray-600`}
        >
          Digital assets that are 100% custom and made to help prettify your
          stream, video, or social media.
        </p>
        <div className="mt-10 flex place-content-center sm:place-content-start text-sm sm:text-xl font-semibold text-gray-50">
          <ScrollButton />
        </div>
      </div>
      {/* CHANGE IMAGE TO CORRECT ONE */}
      <Image
        src={Logo}
        height={238}
        width={211}
        alt="Cute Assets Logo"
        className="object-cover object-center w-64 sm:w-96 block sm:ml-10"
      />
    </div>
  );
}
