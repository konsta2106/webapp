"use client";
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import MainLayout from './MainLayout';

const Hero = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
`;

const images = ['/img1.jpg', '/img2.jpg', '/img3.jpg'];

function Carousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCurrent((current + 1) % images.length), 3000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <Hero>
      <Image src={images[current]} layout="fill" objectFit="cover" alt="Hero Image" />
      <button onClick={() => setCurrent((current - 1 + images.length) % images.length)}>Prev</button>
      <button onClick={() => setCurrent((current + 1) % images.length)}>Next</button>
    </Hero>
  );
}

export default function Home() {
  return (
    <MainLayout>
    </MainLayout>
  );
}
