import React, { useState, useEffect } from 'react';
import { Button, Table, Row, Col } from 'react-bootstrap';
import { RiAddCircleFill, RiFileList2Line } from 'react-icons/ri';
import { useNavigate, useLocation } from 'react-router-dom';
import AddNewTest from './AddNewTest';
import { db, ref, onValue } from '../../../Firebase/Firebase'; // Correct import for Firebase functions

function TestInventory() {
  const navigate = useNavigate();
  const location = useLocation();
  const [testPackages, setTestPackages] = useState([]);

  useEffect(() => {
    const testPackagesRef = ref(db, 'testPackages');
    const unsubscribe = onValue(testPackagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const testPackagesList = Object.values(data);
        setTestPackages(testPackagesList);
      } else {
        setTestPackages([]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleAddNewTest = () => {
    navigate('/admin/test-inventory/add-new-test');
  };

  const handleViewAllTests = () => {
    navigate('/admin/test-inventory/');
  };

  const renderContent = () => {
    switch (location.pathname) {
      case '/admin/test-inventory/add-new-test':
        return <AddNewTest />;
      default:
        return (
          <div>
            <h3>View All Test Details</h3>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Package Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  {/* Add more table headers as needed */}
                </tr>
              </thead>
              <tbody>
                {testPackages.map((testPackage, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{testPackage.packageName}</td>
                    <td>{testPackage.selectedCategory}</td>
                    <td>{testPackage.totalAmount}</td>
                    {/* Add more table cells as needed */}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        );
    }
  };

  return (
    <main className='main-container' style={{ color: "black" }}>
      <div className="test-inventory-container">
        <Row className="mb-3">
          <Col xs={12} md={3}>
            <Button variant="primary" onClick={handleAddNewTest} block>
              <RiAddCircleFill className="mr-2" /> Add New Test
            </Button>
          </Col>
          <Col xs={12} md={3} >
            <Button variant="secondary" onClick={handleViewAllTests} block>
              <RiFileList2Line className="mr-2" /> View All Tests
            </Button>
          </Col>
        </Row>
        {renderContent()}
      </div>
    </main>
  );
}

export default TestInventory;
