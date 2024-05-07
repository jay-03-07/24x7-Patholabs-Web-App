import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { ref, onValue } from 'firebase/database';
import { db } from '../../../../Firebase/Firebase';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import './PackageDetails.css';
import { useCart } from '../../Cart/CartContext';
import { FaCheckCircle } from 'react-icons/fa';

function PackageDetails() {
    const { id } = useParams();
    const [testPackage, setTestPackage] = useState(null);
    const [error, setError] = useState(null);
    const [showDescription, setShowDescription] = useState({});

    const { addToCart, cartItems } = useCart();

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
            console.log("click");
        }
    };

    useEffect(() => {
        const testPackageRef = ref(db, `testPackages/${id}`);
        const unsubscribe = onValue(testPackageRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setTestPackage(data);
                setError(null);
            } else {
                setTestPackage(null);
                setError("Package not found");
            }
        }, (error) => {
            setError("Error fetching package details");
        });

        return () => {
            unsubscribe();
        };
    }, [id]);

    const addToCartAndStore = () => {
        // Check if the item is already in the cart
        const isItemAdded = cartItems.some(cartItem => cartItem.id === testPackage.id);
        if (isItemAdded) {
            return; // If item is already in cart, exit the function
        }

        // Add item to cart
        addToCart(testPackage);

        // Store item in localStorage
        localStorage.setItem('cartItems', JSON.stringify([...cartItems, testPackage]));
    };

    if (error) {
        return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>{error}</div>;
    }

    if (!testPackage) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <section className="sec-loading">
                    <div className="one"></div>
                </section>
            </div>
        );
    }

    return (
        <div style={{ marginTop: '100px', fontSize: '18px' }}>
            <Container>
                <Row className="mt-4">
                    <Col md={8}>
                        <Card>
                            <Card.Body>
                                <Card.Title style={{ fontSize: '22px' }}>{testPackage.packageName}</Card.Title>
                                <Card.Text style={{ fontWeight: '500' }}>
                                    Includes {testPackage.testDetails.length} Tests
                                    <Button variant="link" style={{ marginTop: '-5px', textDecoration: 'none', color: '#ff6f61', fontWeight: '500' }} onClick={scrollToTestDetails}>View All</Button>
                                </Card.Text>
                                <Card.Text style={{ fontWeight: '500' }}>
                                    Estimated Report Time: {testPackage.reportTime}
                                </Card.Text>
                                <Row>
                                    <Col md={6}>
                                        <div className="vertical-line">
                                            <Card.Text style={{ fontWeight: '700' }}>You need to provide</Card.Text>
                                            <Card.Text style={{ marginTop: '-12px', fontWeight: '500' }}>
                                                {testPackage.sampleRequired.join(', ')}
                                            </Card.Text>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="vertical-line">
                                            <Card.Text style={{ fontWeight: '700' }}>This test is for</Card.Text>
                                            <Card.Text style={{ marginTop: '-12px', fontWeight: '500' }}>
                                                {testPackage.selectedTestFor.join(', ')}
                                            </Card.Text>
                                        </div>
                                    </Col>

                                </Row>
                                <Card.Body style={{ boxShadow: '0 0 4px 0 hsla(0,0%,65%,.5)', padding: '10px', borderRadius: '5px', marginTop: '15px' }}>
                                    <Card.Title>
                                        Test Preparation:
                                    </Card.Title>
                                    <ul>
                                        {testPackage.testPreparation.split('\n').map((line, index) => (
                                            <li key={index}>{line}</li>
                                        ))}
                                    </ul>
                                </Card.Body>

                                {/* Render test details */}

                                {testPackage.testDetails.map((test, index) => (
                                    <div key={index} className='mt-4' id='testDetails'>
                                        <Button
                                            onClick={() => toggleDescription(index)}
                                            aria-controls={`description-${index}`}
                                            aria-expanded={showDescription[index]}
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
                                            {showDescription[index] ? <BsChevronUp /> : <BsChevronDown />}
                                        </Button>
                                        <div
                                            id={`description-${index}`}
                                            className={`test-description ${showDescription[index] ? 'show' : ''}`}
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
                                    Payable Amount:<b style={{ marginLeft: '100px' }}> ₹{testPackage.payableAmount}</b>
                                </Card.Text>

                                <Card.Text style={{ fontSize: '20px', marginLeft: '163px' }}>
                                    <p className='h-100'>{testPackage.discountPercent > 0 && (
                                        <>
                                            <span style={{ fontSize: '16px' }} className="discount-percentage-box mx-2">{testPackage.discountPercent}% off</span>
                                            <span className="mx-2" style={{ color: '#757575', fontWeight: '600' }}><s>₹ {testPackage.totalAmount}</s></span>
                                        </>
                                    )
                                    }

                                    </p>
                                </Card.Text>

                                <Button
                                    as={Link}
                                    to={cartItems.some(cartItem => cartItem.id === testPackage.id) ? "/cart" : ""}
                                    variant={cartItems.some(cartItem => cartItem.id === testPackage.id) ? "success" : "primary"}
                                    className={`w-100 mt-auto ${cartItems.some(cartItem => cartItem.id === testPackage.id) ? "go-to-cart" : "add-to-cart"}`}
                                    onClick={() => addToCartAndStore(testPackage)}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {cartItems.some(cartItem => cartItem.id === testPackage.id) ? (
                                            <>
                                                <FaCheckCircle style={{ marginRight: '5px' }} />
                                                <span>GO TO CART</span>
                                            </>
                                        ) : (
                                            <span>ADD TO CART</span>
                                        )}
                                    </div>
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default PackageDetails;
