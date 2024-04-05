import React, { useState } from 'react';
import { Container, Row, Col, Form, Card, Button, FormLabel } from 'react-bootstrap';
import Slider from 'react-slick';
import leftArrowIcon from '../../icons/left-arrow.svg';
import rightArrowIcon from '../../icons/right-arrow.svg';
import './Content.css'; // Import custom CSS for styling
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
            name: 'Fever 2',
            totalTests: 5,
            testNames: ['Fever Panel 1', 'Fever Panel 2', 'Fever Panel 2', 'Fever Panel 3'],
            reportTime: 'within 12 hours',
            payableAmount: 450,
            totalAmount: 500,
            discountPercentage: 10
        },
        {
            name: 'Diabetes 3',
            totalTests: 6,
            testNames: ['Diabetes Panel 1', 'Diabetes Panel 2', 'Diabetes Panel 2', 'Diabetes Panel 2'],
            reportTime: 'within 12 hours',
            payableAmount: 630,
            totalAmount: 700,
            discountPercentage: 10
        },
        {
            name: 'Popular Packages 4',
            totalTests: 10,
            testNames: ['Complete Blood Count', 'Cholesterol Test', 'Liver Function Test', 'Vitamin Profile'],
            reportTime: 'within 24 hours',
            payableAmount: 800,
            totalAmount: 1000,
            discountPercentage: 20
        },
        {
            name: 'Fever 5',
            totalTests: 5,
            testNames: ['Fever Panel 1', 'Fever Panel 2', 'Fever Panel 2', 'Fever Panel 3'],
            reportTime: 'within 12 hours',
            payableAmount: 450,
            totalAmount: 500,
            discountPercentage: 10
        },
        {
            name: 'Diabetes 6',
            totalTests: 6,
            testNames: ['Diabetes Panel 1', 'Diabetes Panel 2','Diabetes Panel 2','Diabetes Panel 2'],
            reportTime: 'within 12 hours',
            payableAmount: 630,
            totalAmount: 700,
            discountPercentage: 10
        }
    ];

    const [selectedPackage, setSelectedPackage] = useState(null);
    const handlePackageSelection = (packageType) => {
        setSelectedPackage(packageType);
    };

    const SamplePrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div className={className} style={{ ...style, display: props.currentSlide === 0 ? 'none' : 'block', left: "-28px", zIndex: "1"}} onClick={onClick}>
                {/* <img src={leftArrowIcon} alt="Left Arrow" /> */}
            </div>
        );
    }
    

    const SampleNextArrow = (props) => {
        const { className, style, onClick, currentSlide, slideCount} = props;
    
        return (
            <div className={className} style={{ ...style, display: currentSlide === slideCount - currentSlide ? 'none' : 'block', right: "10px", zIndex: "1" }} onClick={onClick}>
                {/* <img src={rightArrowIcon} alt="Right Arrow" /> */}
            </div>
        );
    }
    
    
    

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow />,
        
        
    };

    return (
        <Container>
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

            <Row>
                <Col>
                    <Slider {...settings}>
                        {packageDetails.map((packageItem, index) => (
                            <div key={index} >
                                <Card className="h-100 m-3 package-details">
                                    <Card.Body>
                                        <Card.Title style={{ fontSize: '18px' }}>{packageItem.name}</Card.Title>
                                        <Card.Text style={{ color: '#757575', fontWeight: '600', fontSize: '16px' }}>
                                            <p>Includes {packageItem.totalTests} Tests</p>
                                        </Card.Text>
                                        <Card.Text className="test-names-container h-100" style={{ fontSize: '16px', maxHeight: '100px', color: '#757575', fontWeight: '600' }}>
                                            {packageItem.testNames.slice(0, 3).map((testName, index) => (
                                                <span key={index}>{testName}<br /></span>
                                            ))}
                                            {packageItem.testNames.length > 3 && <span style={{ fontWeight: '700', fontSize: '16px' }}><b>+ More</b></span>}
                                        </Card.Text>
                                        <p style={{ color: '#757575', fontWeight: '600', fontSize: '16px' }}>Get report {packageItem.reportTime}</p>
                                        <p style={{ fontSize: '20px' }}>
                                            <span><b>₹ {packageItem.payableAmount}</b></span>
                                            <span className="mx-2" style={{ color: '#757575', fontWeight: '600' }}><s>₹ {packageItem.totalAmount}</s></span>
                                        </p>
                                        <p>
                                            <span className="discount-percentage-box">{packageItem.discountPercentage}% off</span>
                                        </p>
                                        <Button className="add-to-chart w-100 mt-auto">ADD TO CART</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </Slider>
                </Col>
            </Row>
   
        </Container>
    );
}

export default Content;
