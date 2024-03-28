import React, { useState } from 'react';
import { Container, Row, Col, Form, Card, Button, FormLabel } from 'react-bootstrap';
import './Content.css'; // Import custom CSS for styling
function Content() {
    const packages = [
        'Popular Packages',
        'Fever',
        'Women Health',
        'Diabetes',
        'Fitness',
        'Covid 19',
        'Senior Citizen',
        'Lifestyle Habits',
        'Full Body Check Up'
    ];

    const [selectedPackage, setSelectedPackage] = useState(null);

    const handlePackageSelection = (packageType) => {
        setSelectedPackage(packageType);
    };

    return (
        <Container>
            {/* Search Bar */}
            <Row className="mt-4 mb-4 d-flex align-items-center">
                <Form >
                    <Form.Group as={Row} controlId="searchBar" className="search-bar">
                        <Col lg={3}>
                            <FormLabel><h4 className="popular-health-checkups">Popular health checkups</h4></FormLabel>
                        </Col>
                        <Col lg={6}>
                            <Form.Control type="text" placeholder="Search for Test..." className="search-input" autoComplete='off' />

                        </Col>
                    </Form.Group>
                </Form>
            </Row>

            {/* Radio Buttons for Popular Packages */}
            <Row className="mb-4">
                <Col>
                    <div className="package-buttons">
                        {packages.map((packageType, index) => (
                            <button
                                key={index}
                                className={`package-button ${selectedPackage === packageType ? 'active' : ''}`}
                                onClick={() => handlePackageSelection(packageType)}
                            >
                                {packageType}
                            </button>
                        ))}
                    </div>
                </Col>
            </Row>

            {/* Cards for Product Details */}
            <Row>
                <Col md={4} className="mb-4">
                    <Card>
                        <Card.Img variant="top" src="https://via.placeholder.com/150" />
                        <Card.Body>
                            <Card.Title>Product Name</Card.Title>
                            <Card.Text>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </Card.Text>
                            <Button variant="primary">View Details</Button>
                        </Card.Body>
                    </Card>
                </Col>
                {/* Add more Card components for other products */}
            </Row>
        </Container>
    );
}

export default Content;
