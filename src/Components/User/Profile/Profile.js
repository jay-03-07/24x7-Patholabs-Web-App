import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { db, auth } from '../../../Firebase/Firebase';
import { ref, get, set } from 'firebase/database';

import './Profile.css';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    age: "",
    gender: "",
    address: ""
  });
  const [showForm, setShowForm] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      const userPhoneNumber = auth.currentUser.phoneNumber;
      // Extract only the digits after the country code
      const phoneNumberWithoutCountryCode = userPhoneNumber.substring(3);
      setFormData(prevData => ({
        ...prevData,
        phoneNumber: phoneNumberWithoutCountryCode,
      }));
      const userRef = ref(db, `patients/${userPhoneNumber}`);
      get(userRef)
        .then((snapshot) => {
          const userData = snapshot.val();
          if (userData) {
            setFormData(prevData => ({
              ...prevData,
              name: userData.name || "",
              email: userData.email || "",
              age: userData.age || "",
              gender: userData.gender || "",
              address: userData.address || "",
            }));
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update user's data in Firebase database
    if (auth.currentUser) {
      const userPhoneNumber = auth.currentUser.phoneNumber.substring(3);
      const userRef = ref(db, `patients/${userPhoneNumber}`);
      // Use set() method on userRef to update data
      set(userRef, {
        ...formData
      }).then(() => {
        console.log('Profile updated successfully');
        setShowForm(false); // Hide the form after saving
        setFormSubmitted(true); // Set formSubmitted to true
      }).catch((error) => {
        console.error('Error updating profile:', error);
      });
    }
  };

  return (
    <div style={{ margin: '100px' }} className="profile-container">
      <h2 className="text-center mb-4">My Profile</h2>
      {showForm ? (
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="phoneNumber">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                disabled
              />
            </Form.Group>
            <Form.Group as={Col} controlId="age">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter your age"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                placeholder="Select gender"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                rows={3}
              />
            </Form.Group>
          </Row>
          <div className="text-center">
            <Button variant="primary" type="submit">
              Save
            </Button>
          </div>
        </Form>
      ) : (
        <div>
          <p>Name: {formData.name}</p>
          <p>Email: {formData.email}</p>
          <p>Contact Number: {formData.phoneNumber}</p>
          <p>Age: {formData.age}</p>
          <p>Gender: {formData.gender}</p>
          <p>Address: {formData.address}</p>
          <Button onClick={() => setShowForm(true)}>Edit Profile</Button>
        </div>
      )}
    </div>
  );
}

export default Profile;
