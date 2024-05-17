// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { ref, get } from 'firebase/database';
// import { db, auth } from '../../../Firebase/Firebase';
// import { Container, Row, Col, Card } from 'react-bootstrap';

// const OrderDetails = () => {
//     const { orderId } = useParams();
//     const [order, setOrder] = useState(null);

//     useEffect(() => {
//         const fetchOrderDetails = async () => {
//             try {
//                 const userPhoneNumber = auth.currentUser.phoneNumber.substring(3);
//                 const orderRef = ref(db, `orders/${userPhoneNumber}/${orderId}`);
//                 const snapshot = await get(orderRef);
//                 if (snapshot.exists()) {
//                     const orderData = snapshot.val();
//                     setOrder(orderData);
//                 } else {
//                     setOrder(null); // Order not found
//                 }
//             } catch (error) {
//                 console.error('Error fetching order details:', error);
//             }
//         };

//         fetchOrderDetails();
//     }, [orderId]);

//     if (!order) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div style={{ marginTop: '100px' }}>
//             <Container >
//                 <h2 className="text-center mb-4">Order Details</h2>
//                 <Row className="justify-content-center">
//                     <Row className="mb-4">
//                             <Col md={8}>
//                             <Card className="mb-4 shadow-lg border-0" style={{ backgroundColor: 'white' }}>
//                                 <Card.Header className="text-white text-center" style={{ backgroundColor: '#ff6f61' }}>
//                                     <h3 className="m-0">Patient Details</h3>
//                                 </Card.Header>
//                                 <Card.Body>
//                                     <Card.Title className="mb-3" style={{fontStyle:'italic'}}>                                 
//                                   <strong>Order Number:</strong> <span style={{fontWeight:'500'}}>{order.orderNumber}</span>
//                                     </Card.Title>
//                                     <Row className="mb-3 mt-4">
//                                         <Col md={6}>
//                                             <p><strong>Patient Name:</strong> {order.selectedPatient.name}</p>
//                                         </Col>
//                                         <Col md={6}>
//                                             <p><strong>Gender:</strong> {order.selectedPatient.gender}</p>

//                                         </Col>
//                                     </Row>
//                                     <Row className="mb-3">
//                                         <Col md={6}>
//                                             <p><strong>Email:</strong> {order.selectedPatient.email}</p>
//                                         </Col>
//                                         <Col md={6}>
//                                             <p><strong>Age:</strong> {order.selectedPatient.age}</p>
//                                         </Col>
//                                     </Row>
//                                     <Row className="mb-3">
//                                         <Col md={6}>
//                                             <p><strong>Contact Number:</strong> {order.selectedPatient.contactNumber}</p>
//                                         </Col>
//                                         <Col md={6}>
//                                             <p><strong>Address:</strong> {order.selectedPatient.address}</p>
//                                         </Col>
//                                     </Row>
//                                     <Card.Title className="mb-3">Slot Date and Time</Card.Title>
//                                     <Row>
//                                         <Col md={6}>
//                                             <p><strong>Date:</strong> {order.selectedDate}</p>
//                                         </Col>
//                                         <Col md={6}>
//                                             <p><strong>Time:</strong> {order.selectedTime}</p>
//                                         </Col>
//                                     </Row>
//                                     <Card.Title className="mb-3">View Status and Report</Card.Title>
//                                     <Row>
//                                         <Col md={6}>
//                                             <p><strong>Status:</strong> {order.isChecked ? 'Delivered' : 'Pending'}</p>
//                                         </Col>
//                                         <Col md={6}>
//                                         <p><strong>Report:</strong> {order.isChecked ? 'Available' : 'Pending'}</p>
//                                         </Col>
//                                     </Row>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                         <Col>
//                             <Card className="shadow">
//                                 <Card.Body>
//                                     <Card.Title className="text-primary">Price Details</Card.Title>
//                                     <div className="mb-3"><strong>Total Amount:</strong> ₹{order.priceDetails.totalToBePaid}</div>
//                                     <div className="mb-3"><strong>Status:</strong> {order.isChecked ? 'Delivered' : 'Pending'}</div>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                     </Row>

//                     <Row className="mb-4">
//                         <Col md={8}>
//                             <Card className="shadow">
//                                 <Card.Body>
//                                     <Card.Title className="text-primary">Packages</Card.Title>
//                                     {order.cartItems.map((item, index) => (
//                                         <div key={index} className="mb-4 border-bottom pb-3">
//                                             <div className="mb-3"><strong>Package Name:</strong> {item.packageName}</div>
//                                             <div className="mb-3"><strong>Price:</strong> ₹{item.payableAmount}</div>
//                                             <div className="mb-3"><strong>Report Time:</strong> {item.reportTime}</div>
//                                             <div className="mb-3"><strong>Sample Required:</strong> {item.sampleRequired.join(', ')}</div>
//                                             <div className="mb-3"><strong>Test Details:</strong></div>
//                                             <ul className="list-unstyled mb-3">
//                                                 {item.testDetails.map((test, i) => (
//                                                     <li key={i}>
//                                                         <div className="mb-1"><strong>Test Name:</strong> {test.testName}</div>
//                                                         <div className="mb-1"><strong>Description:</strong> {test.description}</div>
//                                                         <div className="mb-1"><strong>Price:</strong> ₹{test.price}</div>
//                                                     </li>
//                                                 ))}
//                                             </ul>
//                                             <div className="mb-3"><strong>Test Preparation:</strong> {item.testPreparation}</div>
//                                         </div>
//                                     ))}
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                     </Row>
//                 </Row>
//             </Container>
//         </div>
//     );
// };

// export default OrderDetails;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { ref, get } from 'firebase/database';
// import { db, auth } from '../../../Firebase/Firebase';
// import { Container, Row, Col, Card, Modal, Button } from 'react-bootstrap';

// const OrderDetails = () => {
//     const { orderId } = useParams();
//     const [order, setOrder] = useState(null);
//     const [showModal, setShowModal] = useState(false);
//     const [selectedPackage, setSelectedPackage] = useState(null);

//     useEffect(() => {
//         const fetchOrderDetails = async () => {
//             try {
//                 const userPhoneNumber = auth.currentUser.phoneNumber.substring(3);
//                 const orderRef = ref(db, `orders/${userPhoneNumber}/${orderId}`);
//                 const snapshot = await get(orderRef);
//                 if (snapshot.exists()) {
//                     const orderData = snapshot.val();
//                     setOrder(orderData);
//                 } else {
//                     setOrder(null); // Order not found
//                 }
//             } catch (error) {
//                 console.error('Error fetching order details:', error);
//             }
//         };

//         fetchOrderDetails();
//     }, [orderId]);

//     const handleViewPackage = (packageDetails) => {
//         setSelectedPackage(packageDetails);
//         setShowModal(true);
//     };

//     const handleCloseModal = () => {
//         setShowModal(false);
//     };

//     if (!order) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div style={{ marginTop: '100px' }}>
//             <Container >
//                 <h2 className="text-center mb-4">Order Details</h2>
//                 <Row className="justify-content-center">
//                 <Row className="mb-4">
//                             <Col md={8}>
//                             <Card className="mb-4 shadow-lg border-0" style={{ backgroundColor: 'white' }}>
//                                 <Card.Header className="text-white text-center" style={{ backgroundColor: '#ff6f61' }}>
//                                     <h3 className="m-0">Patient Details</h3>
//                                 </Card.Header>
//                                 <Card.Body>
//                                     <Card.Title className="mb-3" style={{fontStyle:'italic'}}>                                 
//                                   <strong>Order Number:</strong> <span style={{fontWeight:'500'}}>{order.orderNumber}</span>
//                                     </Card.Title>
//                                     <Row className="mb-3 mt-4">
//                                         <Col md={6}>
//                                             <p><strong>Patient Name:</strong> {order.selectedPatient.name}</p>
//                                         </Col>
//                                         <Col md={6}>
//                                             <p><strong>Gender:</strong> {order.selectedPatient.gender}</p>

//                                         </Col>
//                                     </Row>
//                                     <Row className="mb-3">
//                                         <Col md={6}>
//                                             <p><strong>Email:</strong> {order.selectedPatient.email}</p>
//                                         </Col>
//                                         <Col md={6}>
//                                             <p><strong>Age:</strong> {order.selectedPatient.age}</p>
//                                         </Col>
//                                     </Row>
//                                     <Row className="mb-3">
//                                         <Col md={6}>
//                                             <p><strong>Contact Number:</strong> {order.selectedPatient.contactNumber}</p>
//                                         </Col>
//                                         <Col md={6}>
//                                             <p><strong>Address:</strong> {order.selectedPatient.address}</p>
//                                         </Col>
//                                     </Row>
//                                     <Card.Title className="mb-3">Slot Date and Time</Card.Title>
//                                     <Row>
//                                         <Col md={6}>
//                                             <p><strong>Date:</strong> {order.selectedDate}</p>
//                                         </Col>
//                                         <Col md={6}>
//                                             <p><strong>Time:</strong> {order.selectedTime}</p>
//                                         </Col>
//                                     </Row>
//                                     <Card.Title className="mb-3">View Status and Report</Card.Title>
//                                     <Row>
//                                         <Col md={6}>
//                                             <p><strong>Status:</strong> {order.isChecked ? 'Delivered' : 'Pending'}</p>
//                                         </Col>
//                                         <Col md={6}>
//                                         <p><strong>Report:</strong> {order.isChecked ? 'Available' : 'Pending'}</p>
//                                         </Col>
//                                     </Row>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                         <Col>
//                             <Card className="shadow">
//                                 <Card.Body>
//                                     <Card.Title className="text-primary">Price Details</Card.Title>
//                                     <div className="mb-3"><strong>Total Amount:</strong> ₹{order.priceDetails.totalToBePaid}</div>
//                                     <div className="mb-3"><strong>Status:</strong> {order.isChecked ? 'Delivered' : 'Pending'}</div>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                     </Row>

//                     <Row className="mb-4">
//                         <Col md={8}>
//                         <Card className="mb-4 shadow-lg border-0" style={{ backgroundColor: 'white' }}>
//                                     <Card.Header className="text-white text-center" style={{ backgroundColor: '#ff6f61' }}>
//                                     <h3 className="m-0">Packages Details</h3>
//                                 </Card.Header>
//                                 <Card.Body>
//                                     {order.cartItems.map((item, index) => (
//                                         <div key={index} className="mb-4 border-bottom pb-3">
//                                             <div className="mb-3"><strong>Package Name:</strong> {item.packageName}</div>
//                                             <div className="mb-3"><strong>Price:</strong> ₹{item.payableAmount}</div>
//                                             <div className="mb-3"><strong>Report Time:</strong> {item.reportTime}</div>
//                                             <div className="mb-3"><strong>Sample Required:</strong> {item.sampleRequired.join(', ')}</div>
//                                             <Button variant="primary" onClick={() => handleViewPackage(item)}>View</Button>
//                                         </div>
//                                     ))}
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                     </Row>
//                 </Row>
//             </Container>

//             {/* Package Details Modal */}
//             <Modal show={showModal} onHide={handleCloseModal}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Package Details</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {selectedPackage && (
//                         <div>
//                             {/* Render selected package details here */}
//                         </div>
//                     )}
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// };

// export default OrderDetails;

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { db, auth } from '../../../Firebase/Firebase';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import PackageDetailsModal from './PackageDetailsModal'; // Import the PackageDetailsModal component

const OrderDetails = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const userPhoneNumber = auth.currentUser.phoneNumber.substring(3);
                const orderRef = ref(db, `orders/${userPhoneNumber}/${orderId}`);
                const snapshot = await get(orderRef);
                if (snapshot.exists()) {
                    const orderData = snapshot.val();
                    setOrder(orderData);
                } else {
                    setOrder(null); // Order not found
                }
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    const handleViewPackage = (packageDetails) => {
        setSelectedPackage(packageDetails);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    if (!order) {
        return <div>Loading...</div>;
    }
    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return 'red';
            case 'Processing':
                return 'blue';
            case 'Delivered':
                return 'green';
            default:
                return 'danger';  // Default color
        }
    };

    return (
        <div style={{ margin: '100px' }}>
            <Container>
                <Row className="mt-4">
                    <Col>
                        <h4 style={{ marginLeft: '12px' }}>Order Details</h4>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Row className="mb-4">
                        <Col md={8}>
                            <Card className="mb-4 shadow-lg border-0" style={{ backgroundColor: 'white' }}>
                                <Card.Header className="text-white text-center" style={{ backgroundColor: '#ff6f61' }}>
                                    <h3 className="m-0">Patient Details</h3>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title className="mb-3" style={{ fontStyle: 'italic' }}>
                                        <strong>Order Number:</strong> <span style={{ fontWeight: '500' }}>{order.orderNumber}</span>
                                    </Card.Title>
                                    <Row className="mb-3 mt-4">
                                        <Col md={6}>
                                            <p><strong>Patient Name:</strong> {order.selectedPatient.name}</p>
                                        </Col>
                                        <Col md={6}>
                                            <p><strong>Gender:</strong> {order.selectedPatient.gender}</p>

                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col md={6}>
                                            <p><strong>Email:</strong> {order.selectedPatient.email}</p>
                                        </Col>
                                        <Col md={6}>
                                            <p><strong>Age:</strong> {order.selectedPatient.age}</p>
                                        </Col>
                                    </Row>
                                    <Row className="mb-3">
                                        <Col md={6}>
                                            <p><strong>Contact Number:</strong> {order.selectedPatient.contactNumber}</p>
                                        </Col>
                                        <Col md={6}>
                                            <p><strong>Address:</strong> {order.selectedPatient.address}</p>
                                        </Col>
                                    </Row>
                                    <Card.Title className="mb-3">Slot Date and Time</Card.Title>
                                    <Row>
                                        <Col md={6}>
                                            <p><strong>Date:</strong> {order.selectedDate}</p>
                                        </Col>
                                        <Col md={6}>
                                            <p><strong>Time:</strong> {order.selectedTime}</p>
                                        </Col>
                                    </Row>
                                    <Card.Title className="mb-3">View Status and Report</Card.Title>
                                    <Row>
                                        <Col md={6}>
                                            <p>
                                                <strong>Status: </strong>
                                                <span style={{ color: getStatusColor(order.status), fontWeight: 'bold' }}>{order.status}</span>
                                            </p>
                                        </Col>

                                        <Col md={6}>
                                            <p><strong>E-Report Generated:</strong> {order.report === 'Generated' ? (
                                                <Button variant="success" size='sm' href={order.reportUrl} target="_blank" rel="noopener noreferrer">Download Report</Button>
                                            ) : (
                                                <span>Not Generated</span>
                                            )}</p>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Row>
                                <Col md={12} className='shadow'>
                                    <h4>Price Details</h4>

                                    <Card className="mb-4 shadow" style={{ backgroundColor: '#fff' }}>
                                        <Card.Body>
                                            <Row>
                                                <Col md={12}>
                                                    <div style={{ display: 'flex', alignItems: 'center', fontWeight: '500' }}>
                                                        <p>M.R.P. Total</p>
                                                        <div style={{ flex: 1, textAlign: 'right' }}>
                                                            <p>₹{order.priceDetails.totalMRPTotal}</p>
                                                        </div>
                                                    </div>
                                                    {order.priceDetails.totalPriceDiscount > 0 && (
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <p>Price Discount</p>
                                                            <div style={{ flex: 1, textAlign: 'right' }}>
                                                                <p>- ₹{order.priceDetails.totalPriceDiscount}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {order.priceDetails.hardCopyAmount > 0 && (
                                                        <div style={{ display: 'flex', alignItems: 'center', fontWeight: '600', borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }}>
                                                            <p className='mt-2'>Hard copy of reports</p>
                                                            <div style={{ flex: 1, textAlign: 'right' }}>
                                                                <p>₹{order.priceDetails.hardCopyAmount}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className='mt-2' style={{ display: 'flex', alignItems: 'center' }}>
                                                        <p><b>TO BE PAID</b></p>
                                                        <div style={{ flex: 1, textAlign: 'right' }}>
                                                            <p>₹{order.priceDetails.totalToBePaid}</p>
                                                        </div>
                                                    </div>
                                                    {order.priceDetails.totalPriceDiscount > 0 && (
                                                        <div style={{
                                                            display: 'flex', alignItems: 'center', backgroundColor: '#e4f8e9', marginLeft: '-31px',
                                                            marginRight: '-31px',
                                                            marginBottom: '-24px', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px'
                                                        }}>
                                                            <p style={{ marginLeft: '32px', marginTop: '3px' }}>Total Savings <span style={{ color: '#1aab2a', fontWeight: '700', fontSize: '18px', marginLeft: '5px' }}>₹{order.priceDetails.totalSavings}</span></p>
                                                        </div>
                                                    )}
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                    <Button className='w-100 mb-4' variant="secondary" style={{}} onClick={() => navigate(-1)}>Back</Button>



                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col md={8}>
                            <Card className="mb-4 shadow-lg border-0" style={{ backgroundColor: 'white' }}>
                                <Card.Header className="text-white text-center" style={{ backgroundColor: '#ff6f61' }}>
                                    <h3 className="m-0">Packages Details</h3>
                                </Card.Header>
                                <Card.Body>
                                    {order.cartItems.map((item, index) => (
                                        <div key={index} className="mb-4 border-bottom pb-3">
                                            <Card.Text>
                                                <div className="mt-3"><strong>Package Name:</strong> <span style={{ fontWeight: '550' }}>{item.packageName}</span></div>
                                            </Card.Text>
                                            <Card.Text style={{ fontWeight: '500' }}>
                                                Includes {item.testDetails.length} Tests
                                                <Button variant="link" style={{ marginTop: '-5px', textDecoration: 'none', color: '#ff6f61', fontWeight: 'bold' }} onClick={() => handleViewPackage(item)}>View All</Button>
                                            </Card.Text>
                                            <Card.Text style={{ fontWeight: '500' }}>
                                                Estimated Report Time: {item.reportTime}
                                            </Card.Text>
                                            <Row>
                                                <Col md={6}>
                                                    <div className="vertical-line">
                                                        <Card.Text style={{ fontWeight: '700' }}>You need to provide</Card.Text>
                                                        <Card.Text style={{ marginTop: '-12px', fontWeight: '500' }}>
                                                            {item.sampleRequired.join(', ')}
                                                        </Card.Text>
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="vertical-line">
                                                        <Card.Text style={{ fontWeight: '700' }}>This test is for</Card.Text>
                                                        <Card.Text style={{ marginTop: '-12px', fontWeight: '500' }}>
                                                            {item.selectedTestFor.join(', ')}
                                                        </Card.Text>
                                                    </div>
                                                </Col>
                                                <Col md={6}>

                                                    <Card.Text style={{ fontWeight: '500' }}>
                                                        <div className="mt-3"><strong>Price:</strong> ₹{item.payableAmount}</div>
                                                    </Card.Text>
                                                </Col>
                                            </Row>
                                        </div>

                                    ))}

                                </Card.Body>



                            </Card>
                        </Col>
                    </Row>
                </Row>
            </Container>

            {/* Package Details Modal */}
            <PackageDetailsModal
                selectedPackage={selectedPackage}
                showModal={showModal}
                handleCloseModal={handleCloseModal}
            />
        </div>
    );
};

export default OrderDetails;
