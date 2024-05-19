import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Spinner } from 'react-bootstrap';
import { db } from '../../../Firebase/Firebase'; // Import your Firebase database instance
import { ref, push } from "firebase/database";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when form is submitted
    // Create a reference to a specific location in the database
    const contactsRef = ref(db, 'contacts');
    // Push the form data to the 'contacts' location in the database
    push(contactsRef, formData)
      .then(() => {
        alert('Your message has been submitted successfully!');
        setFormData({ name: '', email: '', message: '' });
        setLoading(false); // Set loading state to false after successful submission
      })
      .catch((error) => {
        console.error('Error submitting message:', error);
        alert('There was an error submitting your message. Please try again later.');
        setLoading(false); // Set loading state to false if there was an error
      });
  };

  return (
    <div style={{ marginTop: '100px', fontSize: '22px' }}>
      <Container className="contact-container mt-5">
        <Row>
          <Col lg={6}>
            <Card className="contact-card shadow-lg border-0">
              <Card.Body>
                <Card.Header className="text-white text-center" style={{ backgroundColor: '#ff6f61' }}>
                  <h3 className="m-0">Contact Us</h3>
                </Card.Header>
                <Form className="contact-form mt-3" onSubmit={handleSubmit}>
                  <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" value={formData.name} placeholder="Enter your name" onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group className="contact-form mt-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={formData.email} placeholder="Enter your email" onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group className="contact-form mt-3" controlId="formMessage">
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" rows={4} name="message" value={formData.message} placeholder="Enter your message" onChange={handleChange} required />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="mt-3 add-to-cart btn" disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : 'Send'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6}>
            <Card className="contact-card shadow-lg border-0">
              <Card.Body>
                <div className="contact-info" style={{ fontWeight: '600' }}>
                  <Card.Header className="text-white text-center" style={{ backgroundColor: '#ff6f61' }}>
                    <h3 className="m-0">Contact Information</h3>
                  </Card.Header >
                  <div className="mt-3">
                    <p><FaMapMarkerAlt /> 123 Main Street, Pune City, India</p>
                    <p><FaPhoneAlt /> +123 456 7890</p>
                    <p><FaEnvelope /><span style={{ color: '#ff6f61', fontWeight: 'bold' }}> 24x7patholabs@gmail.com</span></p>
                  </div>
                </div>
              </Card.Body>
            </Card>
            <Card className="contact-card mt-4 shadow-lg border-0" style={{backgroundColor:'white'}}>
              <Card.Body className="map-container">
                <iframe
                  title="Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121058.93187190729!2d73.78056631810733!3d18.52476137398971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1716078501491!5m2!1sen!2sin"
                  frameBorder="0"
                  style={{ border: 0, width: '100%', height: '100%' }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Contact;
