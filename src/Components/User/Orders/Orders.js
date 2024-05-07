import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { db, auth } from '../../../Firebase/Firebase';
import { Button, Table } from 'react-bootstrap';
import './Orders.css';
import noinventoryfound from '../icons/noinventoryfound.svg';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const userPhoneNumber = auth.currentUser.phoneNumber.substring(3);
    const ordersRef = ref(db, `orders/${userPhoneNumber}`);

    // Fetch orders from the database
    onValue(ordersRef, (snapshot) => {
      const ordersData = snapshot.val();
      if (ordersData) {
        const ordersArray = Object.entries(ordersData).map(([orderId, order]) => ({ id: orderId, ...order }));
        setOrders(ordersArray);
      } else {
        setOrders([]);
      }
    });
  }, []);

  return (
    <div className="orders-container">
      <h2 className="orders-title">My Orders</h2>
      <p>{orders.length} {orders.length === 1 ? 'item' : 'items'} in your order</p>
      {orders.length > 0 ? (
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Selected Patient Name</th>
              <th>Slot Date and Time</th>
              <th>Package Name</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Action</th>
              <th>E-Report Generated</th>
            </tr>
          </thead>
          <tbody>

            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.orderNumber}</td>
                <td>{order.selectedPatient.name}</td>
                <td>{order.selectedDate} {order.selectedTime}</td>
                <td>{order.cartItems[0].packageName}</td>
                <td>₹{order.priceDetails.totalToBePaid}</td>
                <td>{order.isChecked ? 'Delivered' : 'Pending'}</td>
                <td>
                  {/* Add Link to navigate to OrderDetails with orderId */}
                  <Link to={`/orders-details/${order.id}`} style={{ textDecoration: 'none', color: '#ff6f61', fontWeight: 'bold', cursor: 'pointer' }}>View Details</Link>
                </td>
                <td>{order.isChecked ? 'Available' : 'Pending'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ maxHeight: '80vh' }}>
          <img src={noinventoryfound} alt="noinventoryfound" />
          <h5>Labs Orders are Empty!</h5>
          <p>You don't have any lab tests in your orders yet.</p>
          <Link
            to="/" style={{ textDecoration: 'none' }}>
            <Button className='add-to-cart' variant="primary" style={{ width: '500px' }}>ADD TESTS</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Orders;
