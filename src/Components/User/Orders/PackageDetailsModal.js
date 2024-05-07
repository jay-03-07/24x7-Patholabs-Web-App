// PackageDetailsModal.js

import React, { useState } from 'react';
import { Modal, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const PackageDetailsModal = ({ selectedPackage, showModal, handleCloseModal }) => {
    const [showDescription, setShowDescription] = useState({});
    const [fullscreen, setFullscreen] = useState(true);

    const toggleDescription = (testIndex) => {
        setShowDescription((prevState) => ({
            ...prevState,
            [testIndex]: !prevState[testIndex],
        }));
    };

    const scrollToTestDetails = () => {
        const testDetailsElement = document.getElementById("testDetails");
        if (testDetailsElement) {
            testDetailsElement.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <Modal show={showModal} onHide={handleCloseModal} size="lg" fullscreen={fullscreen} >
            <Modal.Header closeButton>
                <Modal.Title style={{ color: '#ff6f61', fontWeight: 'bold' }}>Package Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {selectedPackage && (
                    <div style={{ fontSize: '18px' }}>
                        <Container>
                            <Row className="mt-4">
                                <Col>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title style={{ fontSize: '22px' }}>{selectedPackage.packageName}</Card.Title>
                                            <Card.Text style={{ fontWeight: '500' }}>
                                                Includes {selectedPackage.testDetails.length} Tests
                                                <Button variant="link" style={{ marginTop: '-5px', textDecoration: 'none', color: '#ff6f61', fontWeight: '500' }} onClick={scrollToTestDetails}>View All</Button>
                                            </Card.Text>
                                            <Card.Text style={{ fontWeight: '500' }}>
                                                Estimated Report Time: {selectedPackage.reportTime}
                                            </Card.Text>
                                            <Row>
                                                <Col md={6}>
                                                    <div className="vertical-line">
                                                        <Card.Text style={{ fontWeight: '700' }}>You need to provide</Card.Text>
                                                        <Card.Text style={{ marginTop: '-12px', fontWeight: '500' }}>
                                                            {selectedPackage.sampleRequired.join(', ')}
                                                        </Card.Text>
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="vertical-line">
                                                        <Card.Text style={{ fontWeight: '700' }}>This test is for</Card.Text>
                                                        <Card.Text style={{ marginTop: '-12px', fontWeight: '500' }}>
                                                            {selectedPackage.selectedTestFor.join(', ')}
                                                        </Card.Text>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Card.Body style={{ boxShadow: '0 0 4px 0 hsla(0,0%,65%,.5)', padding: '10px', borderRadius: '5px', marginTop: '15px' }}>
                                                <Card.Title>
                                                    Test Preparation:
                                                </Card.Title>
                                                <ul>
                                                    {selectedPackage.testPreparation.split('\n').map((line, lineIndex) => (
                                                        <li key={lineIndex}>{line}</li>
                                                    ))}
                                                </ul>
                                            </Card.Body>

                                            {/* Render test details */}

                                            {selectedPackage.testDetails.map((test, testIndex) => (
                                                <div key={testIndex} className='mt-4' id='testDetails'>
                                                    <Button
                                                        onClick={() => toggleDescription(testIndex)}
                                                        aria-controls={`description-${testIndex}`}
                                                        aria-expanded={showDescription[testIndex]}
                                                        variant="link"
                                                        className="test-toggle-btn"
                                                        style={{
                                                            fontSize: '18px',
                                                            fontWeight: 'bold',
                                                            color: 'black',
                                                            textDecoration: 'none',
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            width: '100%',
                                                            marginLeft: '-12px'
                                                        }}
                                                    >
                                                        <span>{test.testName}</span>
                                                        {showDescription[testIndex] ? <BsChevronUp /> : <BsChevronDown />}
                                                    </Button>
                                                    <div
                                                        id={`description-${testIndex}`}
                                                        className={`test-description ${showDescription[testIndex] ? 'show' : ''}`}
                                                    >
                                                        <ul>
                                                            {test.description.split('\n').map((line, lineIndex) => (
                                                                <li key={lineIndex}>{line}</li>
                                                            ))}
                                                        </ul>

                                                    </div>
                                                    <hr />
                                                </div>
                                            ))}

                                            {/* Render other details as needed */}
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={4} id="orderSummary">
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Order Summary</Card.Title>
                                            <hr />
                                            <Card.Text style={{ fontSize: '20px', fontWeight: '500' }}>
                                                Payable Amount:<b style={{ marginLeft: '100px' }}> ₹{selectedPackage.payableAmount}</b>
                                            </Card.Text>

                                            <Card.Text style={{ fontSize: '20px', marginLeft: '163px' }}>
                                                <p className='h-100'>{selectedPackage.discountPercent > 0 && (
                                                    <>
                                                        <span style={{ fontSize: '16px' }} className="discount-percentage-box mx-2">{selectedPackage.discountPercent}% off</span>
                                                        <span className="mx-2" style={{ color: '#757575', fontWeight: '600' }}><s>₹ {selectedPackage.totalAmount}</s></span>
                                                    </>
                                                )
                                                }

                                                </p>
                                            </Card.Text>
                                            <Button
                                                as={Link}
                                                to="/"
                                                variant="success"
                                                className="w-100 mt-auto add-to-cart"
                                            >
                                                ADD TO CART
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PackageDetailsModal;
