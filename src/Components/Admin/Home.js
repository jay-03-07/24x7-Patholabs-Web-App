import React, { useState, useEffect } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { ref, onValue } from 'firebase/database';
import { db } from '../../Firebase/Firebase'; // Assuming 'db' is your Firebase database reference
import RecentOrders from './Orders/RecentOrders';

function Home() {
  const [inventoryProducts, setInventoryProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);
  const [pendingReports, setPendingReports] = useState(0);

  useEffect(() => {
    const productsRef = ref(db, 'testPackages'); // Assuming 'products' is the node in your database for inventory products
    const ordersRef = ref(db, 'orders'); // Assuming 'orders' is the node in your database for orders
    const patientsRef = ref(db, 'patients'); // Assuming 'patients' is the node in your database for patients

    // Fetch inventory products count
    onValue(productsRef, (snapshot) => {
      const productData = snapshot.val();
      const productCount = productData ? Object.keys(productData).length : 0;
      setInventoryProducts(productCount);
    });

       // Fetch total orders count
       onValue(ordersRef, (snapshot) => {
        try {
          const ordersData = snapshot.val();
          if (ordersData) {
            const ordersArray = Object.entries(ordersData).flatMap(([phoneNumber, orderData]) =>
              Object.entries(orderData).map(([orderId, orderDetails]) => ({ id: orderId, phoneNumber, ...orderDetails }))
            );
  
            const orderCount = ordersArray.length;
            console.log("Orders Array:", ordersArray); // Log the flattened orders array
            console.log("Total Orders Count:", orderCount); // Log the total order count
            setTotalOrders(orderCount);
          } else {
            console.log("No order data found."); // Log if no order data is found
            setTotalOrders(0); // Set total orders count to 0 if no data is found
          }
        } catch (error) {
          console.error("Error fetching orders data:", error); // Log any errors that occur during data fetching
          setTotalOrders(0); // Set total orders count to 0 if an error occurs
        }
      });

    // Fetch total patients count
    onValue(patientsRef, (snapshot) => {
      const patientData = snapshot.val();
      const patientCount = patientData ? Object.keys(patientData).length : 0;
      setTotalPatients(patientCount);
    });

    // Fetch pending reports count
    onValue(ordersRef, (snapshot) => {
      try {
        const ordersData = snapshot.val();
        if (ordersData) {
          const pendingReportsCount = Object.values(ordersData).flatMap(order =>
            Object.values(order).filter(orderItem => orderItem.report === 'Not Generated')
          ).length;
          console.log("Pending Reports Count:", pendingReportsCount); // Log the pending reports count
          setPendingReports(pendingReportsCount);
        } else {
          console.log("No order data found."); // Log if no order data is found
          setPendingReports(0); // Set pending reports count to 0 if no data is found
        }
      } catch (error) {
        console.error("Error fetching report data:", error); // Log any errors that occur during data fetching
        setPendingReports(0); // Set pending reports count to 0 if an error occurs
      }
    });
  }, []);

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>DASHBOARD</h3>
      </div>

      <div className='main-cards'>
        <div className='card' style={{ backgroundColor:'#2962ff' }}>
          <div className='card-inner'>
            <h3>TEST INVENTORY PRODUCTS</h3>
            <BsFillArchiveFill className='card_icon' />
          </div>
          <h1>{inventoryProducts}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>TOTAL ORDERS</h3>
            <BsFillGrid3X3GapFill className='card_icon' />
          </div>
          <h1>{totalOrders}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>TOTAL PATIENT</h3>
            <BsPeopleFill className='card_icon' />
          </div>
          <h1>{totalPatients}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>PENDING REPORTS</h3>
            <BsFillBellFill className='card_icon' />
          </div>
          <h1>{pendingReports}</h1>
        </div>
      </div>
      <RecentOrders/>
    </main>
  );
}

export default Home;
