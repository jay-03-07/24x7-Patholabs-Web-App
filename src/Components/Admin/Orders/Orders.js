
import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Table, Modal } from 'react-bootstrap';
import { ref, onValue, update } from 'firebase/database';
import { db } from '../../../Firebase/Firebase';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-bs5';
import { Link } from 'react-router-dom';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [currentOrderId, setCurrentOrderId] = useState(null); // New state variable to store the current order ID
    const storage = getStorage();

    useEffect(() => {
        const ordersRef = ref(db, 'orders');

        onValue(ordersRef, (snapshot) => {
            try {
                const ordersData = snapshot.val();
                if (ordersData) {
                    const ordersArray = Object.entries(ordersData).flatMap(([phoneNumber, orderData]) =>
                        Object.entries(orderData).map(([orderId, orderDetails]) => ({ id: orderId, phoneNumber, ...orderDetails }))
                    );
                // Sort the orders in descending order based on selectedDate and selectedTime
      const sortedArray = ordersArray.sort((a, b) => {
        // Compare selectedDate
        const dateComparison = b.selectedDate.localeCompare(a.selectedDate);
        if (dateComparison !== 0) {
          return dateComparison;
        } else {
          // If selectedDate is the same, compare selectedTime
          return b.selectedTime.localeCompare(a.selectedTime);
        }
      });
      setOrders(sortedArray);
    } else {
      setOrders([]);
    }
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError('Error fetching orders. Please try again later.');
            }
        });
    }, []);

    useEffect(() => {
        if ($.fn.DataTable.isDataTable('#ordersTable')) {
            $('#ordersTable').DataTable().destroy();
        }
        $('#ordersTable').DataTable();
    }, [orders]);

    const handleStatusChange = (orderId, phoneNumber, newStatus) => {
        update(ref(db, `orders/${phoneNumber}/${orderId}`), { status: newStatus });
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (selectedFile && currentOrderId) {
            const order = orders.find(order => order.id === currentOrderId);
            if (order) {
                try {
                    const uploadTask = await uploadBytes(storageRef(storage, `reports/${order.id}.pdf`), selectedFile);
                    const downloadURL = await getDownloadURL(uploadTask.ref);
                    // Update the report and reportUrl for the specific order ID
                    update(ref(db, `orders/${order.phoneNumber}/${order.id}`), { report: 'Generated', reportUrl: downloadURL });
                    setSelectedFile(null);
                    setShowModal(false);
                } catch (error) {
                    console.error('Error uploading file:', error);
                    setError('Error uploading file. Please try again.');
                }
            }
        }
    };

    const handleDownload = (reportUrl) => {
        window.open(reportUrl, '_blank');
    };
    const getVariant = (status) => {
        switch (status) {
            case 'Pending':
                return 'danger';
            case 'Processing':
                return 'primary';
            case 'Delivered':
                return 'success';
            default:
                return 'danger'; // Default variant
        }
    };


    return (
        <main className='main-container' style={{ color: "black" }}>
            <h3>Orders</h3>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="table-responsive">
                    <Table id="ordersTable" striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Order Number</th>
                                <th>Patient Name</th>
                                <th>Slot Date and Time</th>
                                <th>Package Name</th>
                                <th>Total Amount</th>
                                <th>Status</th>
                                <th>E-Report Generated</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={order.id}>
                                    <td>{index + 1}</td>
                                    <td>{order.orderNumber}</td>
                                    <td>{order.selectedPatient.name}</td>
                                    <td>{order.selectedDate} {order.selectedTime}</td>
                                    <td>{order.cartItems.map(item => item.packageName).join(', ')}</td>
                                    <td>₹{order.priceDetails.totalToBePaid}</td>
                                    <td>
                                        <Dropdown>
                                            <Dropdown.Toggle variant={getVariant(order.status)} id="dropdown-basic">
                                                {order.status}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => handleStatusChange(order.id, order.phoneNumber, 'Pending')}>Pending</Dropdown.Item>
                                                <Dropdown.Item onClick={() => handleStatusChange(order.id, order.phoneNumber, 'Processing')}>Processing</Dropdown.Item>
                                                <Dropdown.Item onClick={() => handleStatusChange(order.id, order.phoneNumber, 'Delivered')}>Delivered</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>

                                    </td>
                                    <td>
                                        {order.report === 'Generated' ? (
                                            <Button variant="secondary" onClick={() => handleDownload(order.reportUrl)}>Download Report</Button>
                                        ) : (
                                            'Not Generated'
                                        )}
                                    </td>
                                    <td>
                                        <div className="d-flex" style={{ textAlign: 'center', gap: '5px' }}>
                                            <Link to={`/admin/dashboard/view-details/${order.id}`}>
                                                <Button variant="info">View</Button>
                                            </Link>
                                            <Button variant="success" onClick={() => { setShowModal(true); setCurrentOrderId(order.id); }}>Upload</Button> {/* Set the current order ID */}
                                            <Modal show={showModal} onHide={() => setShowModal(false)}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Upload Report</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <input type="file" accept=".pdf" onChange={handleFileChange} />
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="success" onClick={handleUpload}>Upload Report</Button> {/* No need to pass orderId here */}
                                                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </main>
    );
}

export default Orders;


