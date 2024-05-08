// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { ref, onValue } from 'firebase/database';
// import { db, auth } from '../../../Firebase/Firebase';
// import { Button, Table } from 'react-bootstrap';
// import './Orders.css';
// import noinventoryfound from '../icons/noinventoryfound.svg';

// const Orders = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const userPhoneNumber = auth.currentUser.phoneNumber.substring(3);
//     const ordersRef = ref(db, `orders/${userPhoneNumber}`);

//     // Fetch orders from the database
//     onValue(ordersRef, (snapshot) => {
//       const ordersData = snapshot.val();
//       if (ordersData) {
//         const ordersArray = Object.entries(ordersData).map(([orderId, order]) => ({ id: orderId, ...order }));
//         setOrders(ordersArray);
//       } else {
//         setOrders([]);
//       }
//     });
//   }, []);

//   return (
//     <div className="orders-container">
//       <h2 className="orders-title">My Orders</h2>
//       <p>{orders.length} {orders.length === 1 ? 'item' : 'items'} in your order</p>
//       {orders.length > 0 ? (
//         <Table responsive striped bordered hover>
//           <thead>
//             <tr>
//               <th>Order Number</th>
//               <th>Selected Patient Name</th>
//               <th>Slot Date and Time</th>
//               <th>Package Name</th>
//               <th>Total Amount</th>
//               <th>Status</th>
//               <th>Action</th>
//               <th>E-Report Generated</th>
//             </tr>
//           </thead>
//           <tbody>

//             {orders.map((order) => (
//               <tr key={order.id}>
//                 <td>{order.orderNumber}</td>
//                 <td>{order.selectedPatient.name}</td>
//                 <td>{order.selectedDate} {order.selectedTime}</td>
//                 <td> {order.cartItems.map((item) => (
//                     <div key={item.id}>{item.packageName}</div>
//                   ))}
//                 </td>
//                 <td>₹{order.priceDetails.totalToBePaid}</td>
//                 <td>{order.isChecked ? 'Delivered' : 'Pending'}</td>
//                 <td>
//                   {/* Add Link to navigate to OrderDetails with orderId */}
//                   <Link to={`/orders-details/${order.id}`} style={{ textDecoration: 'none', color: '#ff6f61', fontWeight: 'bold', cursor: 'pointer' }}>View Details</Link>
//                 </td>
//                 <td>{order.isChecked ? 'Available' : 'Pending'}</td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       ) : (
//         <div className="d-flex flex-column justify-content-center align-items-center" style={{ maxHeight: '80vh' }}>
//           <img src={noinventoryfound} alt="noinventoryfound" />
//           <h5>Labs Orders are Empty!</h5>
//           <p>You don't have any lab tests in your orders yet.</p>
//           <Link
//             to="/" style={{ textDecoration: 'none' }}>
//             <Button className='add-to-cart' variant="primary" style={{ width: '500px' }}>ADD TESTS</Button>
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Orders;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { db, auth } from '../../../Firebase/Firebase';
import { Button, Form } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import './Orders.css';
import noinventoryfound from '../icons/noinventoryfound.svg';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const userPhoneNumber = auth.currentUser.phoneNumber.substring(3);
    const ordersRef = ref(db, `orders/${userPhoneNumber}`);

    // Fetch orders from the database
    onValue(ordersRef, (snapshot) => {
      try {
      const ordersData = snapshot.val();
      if (ordersData) {
        const ordersArray = Object.entries(ordersData).map(([orderId, order]) => ({ id: orderId, ...order }));
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

  const columns = [
    {

      name: 'Sr. No.',

      selector: (row, index) => index + 1,

      sortable: false,

      width: '70px' // Adjust width as needed

    },
    {
      name: 'Order Number',
      selector: row => `${row.orderNumber}`,
      sortable: true,
      // cell: row => `${row.orderNumber}`

    },
    {
      name: 'Selected Patient Name',
      selector: row => `${row.selectedPatient.name}`,
      sortable: true,
      // cell: row => `${row.selectedPatient.name}`

    },
    {
      name: 'Slot Date and Time',
      selector: row => `${row.selectedDate} ${row.selectedTime}`,
      sortable: true,
      // cell: row => `${row.selectedDate} ${row.selectedTime}`
    },
    {
      name: 'Package Name',
      selector: row => row.cartItems.map(item => item.packageName).join(', '),
      sortable: true,
      cell: row => row.cartItems.map(item => item.packageName).join(', ')
    },
    {
      name: 'Total Amount',
      selector: row => `₹${row.priceDetails.totalToBePaid}`,
      sortable: true,
      // cell: row => `₹${row.priceDetails.totalToBePaid}`
    },
    {
      name: 'Status',
      selector: row => row.isChecked ? 'Delivered' : 'Pending',
      sortable: true,
      // cell: row => row.isChecked ? 'Delivered' : 'Pending'
    },
    {
      name: 'Action',
      sortable: false,
      cell: row => <Link to={`/orders-details/${row.id}`} style={{ textDecoration: 'none', color: '#ff6f61', fontWeight: 'bold', cursor: 'pointer' }}>View Details</Link>
    },
    {
      name: 'E-Report Generated',
      selector: row => row.isChecked ? 'Available' : 'Pending',
      sortable: true,
      // cell: row => row.isChecked ? 'Available' : 'Pending'
    },
  ];
  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };
  
  const filteredOrders = orders.filter(order =>
    order.orderNumber.toLowerCase().includes(searchText.toLowerCase()) ||
    order.selectedPatient.name.toLowerCase().includes(searchText.toLowerCase()) ||
    `${order.selectedDate} ${order.selectedTime}`.toLowerCase().includes(searchText.toLowerCase()) ||
    order.cartItems.map(item => item.packageName).join(', ').toLowerCase().includes(searchText.toLowerCase()) ||
    `₹${order.priceDetails.totalToBePaid}`.toLowerCase().includes(searchText.toLowerCase()) ||
    (order.isChecked ? 'Delivered' : 'Pending').toLowerCase().includes(searchText.toLowerCase()) ||
    (order.isChecked ? 'Available' : 'Pending').toLowerCase().includes(searchText.toLowerCase())
  );
  
  return (
    <div className="orders-container" >
      {loading ? ( // Display loader if loading state is true
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <section className="sec-loading">
            <div className="one"></div>
          </section>
        </div>
         ) : error ? (
          <p>{error}</p>
      ) : (
        <>
          <h2 className="orders-title">My Orders</h2>
          <p>{orders.length} {orders.length === 1 ? 'item' : 'items'} in your order</p>
          {orders.length > 0 ? (
            <>
              <div className='d-flex align-items-center justify-content-end'>
                <Form.Label htmlFor="Search" className="me-2 mb-0">Search :</Form.Label>
                <Form.Control
                  type="text"
                  id="Search"
                  onChange={handleSearch}
                  className="search-input"
                  style={{ width: '200px' }}
                  onFocus={(e) => e.target.style.border = '2px solid black'}
                  onBlur={(e) => e.target.style.border = '2px solid #ced4da'}

                />
              </div>

              <DataTable
                columns={columns}
                data={filteredOrders}
                pagination
                striped
                fixedHeader
                highlightOnHover
                paginationPerPage={10}
                paginationRowsPerPageOptions={[10, 20, 30, 40]}
              />
            </>
          ) : (
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ maxHeight: '80vh' }}>
              <img src={noinventoryfound} alt="noinventoryfound" />
              <h5>Labs Orders are Empty!</h5>
              <p>You don't have any lab tests in your orders yet.</p>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Button className='add-to-cart' variant="primary" style={{ width: '500px' }}>ADD TESTS</Button>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Orders;
