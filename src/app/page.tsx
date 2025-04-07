'use client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Hero from '@/components/HomePageSections/Hero';
import VideoTrailerSection from '@/components/HomePageSections/VideoTrailerSection';
import CardsShowcase from '@/components/HomePageSections/CardsShowcase';
import PacksShowcase from '@/components/HomePageSections/PacksShowcase';
import LoreSection from '@/components/HomePageSections/LoreSections';

import styles from './page.module.css';
import WoRDescription from '@/components/HomePageSections/WoRDescription';

export default function Home() {
  return (
    <main className={styles.main}>
      <Navigation />
      <Hero />
      <VideoTrailerSection />
      <LoreSection />
      <PacksShowcase />
      <CardsShowcase />
      <WoRDescription />
      <Footer />
    </main>
  );
}
