// import SEO from './components/SEO';
import OverlayShowcase from '@/components/OverlayShowcase';
import HeroSection from '@/app/HeroSection';

export const metadata = {
  title: 'CuteAsset - Digital Assets Marketplace',
  description: 'Welcome to CuteAsset.com',
};

export default async function Page() {
  return (
    <>
      <HeroSection />
      <OverlayShowcase />
    </>
  );
}
