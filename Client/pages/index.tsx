import ContentPage from '@/components/landingpage/Content';
import FooterPage from '@/components/landingpage/Footer';
import HeroPage from '@/components/landingpage/Hero';
import NavbarPage from '@/components/landingpage/Navbar';

export default function Home() {
  return (
    <>
      <NavbarPage />

      <HeroPage />

      <ContentPage />

      <FooterPage />
    </>
  );
}
