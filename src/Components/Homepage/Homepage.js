import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Hero from '../Hero/Hero';
import Popular from '../Popular/Popular';
import Action from '../Action/Action';
import Features from '../Features/Features';
import Footer from '../Footer/Footer';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'; // Import your loading spinner component

export default function Homepage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay (e.g., fetching data)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the timeout as needed

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, []);

  if (loading) {
    return <LoadingSpinner />; // Show loading spinner
  }

  return (
    <div>
      <Navbar />
      <Hero />
      <Popular />
      <Action />
      <Features />
      <Footer />
    </div>
  );
}
