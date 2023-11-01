import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import underConstructionGif from './under-construction.gif';

const Mid90sInternet = () => {
  useEffect(() => {
    AOS.init({
      startEvent: 'aos-start',
    });
  }, []);

  return (
    <section
      className="bg-yellow-200 py-16" // Use a bright color
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-once="true"
      data-aos-start="aos-start"
      style={{
        backgroundImage: `url('/images/retro-background.png')`, // Use a retro-inspired background image
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
        textAlign: 'center',
      }}
    >
      <div className="text-pink-600 text-4xl text-center"> {/* Use contrasting colors */}
        <h2>Mid 90's Internet</h2>
        <img src={underConstructionGif} alt="Under Construction" /> {/* Add an "Under Construction" GIF */}
        <p>stuff etc.</p>
      </div>
    </section>
  );
};

export default Mid90sInternet;
