import React, { useEffect, useState } from 'react';
import { Table, Button, Dropdown, Modal } from 'react-bootstrap';
import { ref, onValue, update } from 'firebase/database';
import { db } from '../../../Firebase/Firebase';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-bs5';

function RecentOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [currentOrderId, setCurrentOrderId] = useState(null);
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

                    // Filter out delivered orders
                    const filteredOrders = ordersArray.filter(order => order.status !== 'Delivered');
                    setOrders(filteredOrders);
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
        if ($.fn.DataTable.isDataTable('#recentOrdersTable')) {
            $('#recentOrdersTable').DataTable().destroy();
        }
        $('#recentOrdersTable').DataTable();
    }, [orders]);

    const handleStatusChange = (orderId, phoneNumber, newStatus) => {
        update(ref(db, `orders/${phoneNumber}/${orderId}`), { status: newStatus }).then(() => {
            // If the status is changed to 'Delivered', remove the row from DataTable
            if (newStatus === 'Delivered') {
                const table = $('#recentOrdersTable').DataTable();
                const rowIndex = table.row(`#${orderId}`).index();
                table.row(rowIndex).remove().draw(false);
            }
        }).catch(error => {
            console.error('Error updating status:', error);
            setError('Error updating status. Please try again.');
        });
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
            <h3>Recent Orders</h3>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="table-responsive">
                    <Table id="recentOrdersTable" striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Order Number</th>
                                <th>Selected Patient Name</th>
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
                                            <Button variant="success" onClick={() => { setShowModal(true); setCurrentOrderId(order.id); }}>Upload</Button>
                                            <Modal show={showModal} onHide={() => setShowModal(false)}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Upload Report</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <input type="file" accept=".pdf" onChange={handleFileChange} />
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="success" onClick={handleUpload}>Upload Report</Button>
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

export default RecentOrders;