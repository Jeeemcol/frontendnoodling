import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Messenger00s = () => {
  AOS.init();

  return (
    <section className="bg-purple-400 py-16">
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        className="text-white text-4xl text-center"
      >
        <h2>00's Messenger</h2>
        {<p>boop on da snoot</p>}
      </div>
    </section>
  );
};

export default Messenger00s;
