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

    const packageDetails = [
        {
            name: 'Comprehensive Gold Full Body Checkup',
            totalTests: 10,
            testNames: ['Complete Blood Count', 'Cholesterol Test', 'Liver Function Test', 'Vitamin Profile'],
            reportTime: 'within 24 hours',
            payableAmount: 800,
            totalAmount: 1000,
            discountPercentage: 20
        },
        {
            name: 'Fever',
            totalTests: 5,
            testNames: ['Fever Panel 1', 'Fever Panel 2', 'Fever Panel 2', 'Fever Panel 3'],
            reportTime: 'within 12 hours',
            payableAmount: 450,
            totalAmount: 500,
            discountPercentage: 10
        },
        {
            name: 'Diabetes',
            totalTests: 6,
            testNames: ['Diabetes Panel 1', 'Diabetes Panel 2', 'Diabetes Panel 2', 'Diabetes Panel 2'],
            reportTime: 'within 12 hours',
            payableAmount: 630,
            totalAmount: 700,
            discountPercentage: 10
        }, , {
            name: 'Popular Packages',
            totalTests: 10,
            testNames: ['Complete Blood Count', 'Cholesterol Test', 'Liver Function Test', 'Vitamin Profile'],
            reportTime: 'within 24 hours',
            payableAmount: 800,
            totalAmount: 1000,
            discountPercentage: 20
        },
        {
            name: 'Fever',
            totalTests: 5,
            testNames: ['Fever Panel 1', 'Fever Panel 2', 'Fever Panel 2', 'Fever Panel 3'],
            reportTime: 'within 12 hours',
            payableAmount: 450,
            totalAmount: 500,
            discountPercentage: 10
        },
        {
            name: 'Diabetes',
            totalTests: 6,
            testNames: ['Diabetes Panel 1', 'Diabetes Panel 2','Diabetes Panel 2','Diabetes Panel 2'],
            reportTime: 'within 12 hours',
            payableAmount: 630,
            totalAmount: 700,
            discountPercentage: 10
        }


        // Add details for other packages similarly
    ];

    const [selectedPackage, setSelectedPackage] = useState(null);

    const handlePackageSelection = (packageType) => {
        setSelectedPackage(packageType);
    };

    return (
        <Container>
            {/* Search Bar */}
            <Row className="mt-4 mb-4 d-flex align-items-center">
                <Form>
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
                    <div className="package-buttons" style={{ overflowX: 'auto' }}>
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

            {/* Cards for Packages Details */}
            <Row>
                {packageDetails.map((packageItem, index) => (
                    <Col md={4} className="mb-4" key={index}>
                        <Card className="h-100"> {/* Ensure card height is full */}
                            <Card.Body>
                                <Card.Title style={{fontSize:'18px'}}>{packageItem.name}</Card.Title>
                                <Card.Text style={{color:'#757575',fontWeight:'600',fontSize:'16px'}}> 
                                    <p>Includes {packageItem.totalTests} Tests</p>
                                </Card.Text>
                                <Card.Text className="test-names-container h-100" style={{fontSize:'16px', maxHeight: '100px',color: '#757575',fontWeight:'600' }}>
                                    {/* Fixed height for test names */}


                                    {packageItem.testNames.slice(0, 3).map((testName, index) => (
                                        <span key={index}>{testName}<br /></span>

                                    ))}
                                    {packageItem.testNames.length > 3 && <span style={{fontWeight:'700', fontSize:'16px'}}><b>+ More</b></span>}

                                </Card.Text>
                                <p style={{color:'#757575',fontWeight:'600',fontSize:'16px'}}>Get report {packageItem.reportTime}</p>
                                <p style={{fontSize:'20px'}}>
                                    <span><b>₹ {packageItem.payableAmount}</b></span>
                                    <span className="mx-2" style={{color:'#757575',fontWeight:'600'}}><s>₹ {packageItem.totalAmount}</s></span>
                                </p>
                                <p>
                                    <span className="discount-percentage-box">{packageItem.discountPercentage}% off</span>
                                </p>
                                <Button className="add-to-chart w-100 mt-auto">ADD TO CART</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Content;
