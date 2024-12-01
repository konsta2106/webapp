"use client";  // Use client-side rendering
import styled from 'styled-components';
import Link from 'next/link';
import ImageCarousel from './components/Carousel';

const Header = styled.header`
  position: sticky;
  top: 0;
  background-color: #333;
  color: #fff;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Footer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 2rem;
  text-align: center;
`;

export default function MainLayout({ children }) {
  return (
    <div>
      <Header>
        <h1>My Web App</h1>
        <Nav>
          <Link href="/">Main Page</Link>
          <Link href="/fuel-prices">Fuel Prices</Link>
          <a href="#contact">Contact</a>
        </Nav>
      </Header>
      <ImageCarousel />
      <main>{children}</main>
      <Footer id="contact">
        <p>Contact Information</p>
      </Footer>
    </div>
  );
}
