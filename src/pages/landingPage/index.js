import React from 'react';

import IndexNavbar from '../../components/Navbars/IndexNavbar';
import Footer from '../../components/Footers/Footer';
import About from './About';
import Home from './Home';

export default function LandingPage() {
  return (
    <>
      <IndexNavbar fixed />
      <Home />
      <About />
      <Footer />
    </>
  );
}
