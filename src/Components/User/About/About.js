import React from 'react';
import { Card } from 'react-bootstrap';

function About() {
  return (
    <div style={{ margin: '100px', display: 'flex', justifyContent: 'center', overflow: 'auto' }}>
      <div style={{ width: '80%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '15px', padding: '20px' }}>
        <h2  className="m-0 mb-3 text-white text-center" style={{  padding: '10px', textAlign: 'center', marginBottom: '30px', color: '#333',backgroundColor: '#ff6f61' }}>About Us</h2>
     
        <p style={{ lineHeight: '1.6', color: '#555', fontSize: '1.1rem' }}>
          Welcome to 24x7 Patholabs, your trusted partner in comprehensive diagnostic testing services. Our mission is to provide convenient, accurate, and efficient healthcare solutions to individuals and healthcare professionals. Inspired by the functionality and success of leading platforms like 1mg Labs, we have developed a user-friendly web application that ensures seamless access to a wide range of medical tests and reports.
        </p>

        <h3 style={{ marginTop: '30px', color: '#333' }}>Our Vision</h3>
        <p>At 24x7 Patholabs, we envision a world where high-quality healthcare services are accessible to everyone, anytime, and anywhere. We strive to empower individuals with the information they need to make informed health decisions and lead healthier lives.</p>

        <h3 style={{ marginTop: '30px', color: '#333' }}>Our Mission</h3>
        <p>Our mission is to deliver reliable and timely diagnostic testing services through cutting-edge technology and exceptional customer service. We aim to simplify the process of booking tests, accessing results, and managing health records, making it as convenient and stress-free as possible for our users.</p>

        <h3 style={{ marginTop: '30px', color: '#333' }}>What We Offer</h3>
        <ul style={{ marginLeft: '20px' }}>
          <li>Home Sample Collection: Enjoy the convenience of getting your samples collected from the comfort of your home. Our trained phlebotomists ensure safe and hygienic sample collection.</li>
          <li>Digital Test Requests: Easily book and manage your diagnostic tests online. Our platform supports a wide range of tests covering various medical conditions.</li>
          <li>Online Report Access: Access your test reports online as soon as they are ready. Download and share your reports with healthcare professionals effortlessly.</li>
          <li>User-Friendly Interface: Our web application is designed with you in mind. It is intuitive, easy to navigate, and ensures a hassle-free experience.</li>
          <li>Database Integration: We use advanced database technologies to securely store and manage your health records, ensuring they are always available when you need them.</li>
        </ul>

        <h3 style={{ marginTop: '30px', color: '#333' }}>Our Technology</h3>
        <ul style={{ marginLeft: '20px' }}>
          <li>React.js: Our front-end is built using React.js, providing a dynamic and responsive user interface.</li>
          <li>Firebase Realtime Database: We utilize Firebase for real-time data synchronization and secure data storage, ensuring your information is always up-to-date.</li>
          <li>Bootstrap CSS: Our application uses Bootstrap to ensure a responsive and visually appealing design, making it accessible on any device.</li>
        </ul>

        <h3 style={{ marginTop: '30px', color: '#333' }}>Our Commitment to Quality</h3>
        <p>At 24x7 Patholabs, we are committed to maintaining the highest standards of quality and accuracy in our diagnostic services. Our laboratories are equipped with state-of-the-art technology and staffed by experienced professionals who adhere to strict quality control protocols.</p>

        <p style={{ marginTop: '30px', color: '#555' }}>Thank you for choosing 24x7 Patholabs. We look forward to being your trusted partner in health and wellness.</p>
      </div>
    </div>
  );
}

export default About;
