import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const UX2010s = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section className="bg-green-400 py-16">
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        className="text-white text-4xl text-center"
      >
        <h2>2010s and UX</h2>
        {<p>wig wam</p>}
      </div>
    </section>
  );
};

export default UX2010s;
