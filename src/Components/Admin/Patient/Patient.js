import React, { useState, useEffect, useRef } from 'react';
import { Container, Button, Modal } from 'react-bootstrap';
import $ from 'jquery';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import { ref, onValue } from 'firebase/database';
import { db } from '../../../Firebase/Firebase';

function Patient() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const tableRef = useRef();

  useEffect(() => {
    const patientsRef = ref(db, 'patients');
    onValue(patientsRef, (snapshot) => {
      try {
        const patientsData = snapshot.val();
        if (patientsData) {
          const patientsArray = Object.entries(patientsData).map(([patientId, patientDetails]) => ({
            id: patientId,
            ...patientDetails
          }));
          setPatients(patientsArray);
        } else {
          setPatients([]);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError('Error fetching patients. Please try again later.');
      }
    });
  }, []);

  useEffect(() => {
    if ($.fn.DataTable.isDataTable('#patientsTable')) {
      $('#patientsTable').DataTable().destroy();
    }
    $('#patientsTable').DataTable();
  }, [patients]);

  const handleViewDetails = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  return (
    <main className='main-container' style={{ color: "black" }}>
      <Container>
        <h1 className="my-4">Patient Details</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="table-responsive">
            <table ref={tableRef} id="patientsTable" className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient, index) => (
                  <tr key={patient.id}>
                    <td>{index + 1}</td>
                    <td>{patient.name}</td>
                    <td>{patient.id}</td>
                    <td>{patient.email}</td>
                    <td>{patient.age}</td>
                    <td>{patient.gender}</td>
                    <td>
                      <Button variant="info" onClick={() => handleViewDetails(patient)}>View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Patient Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {selectedPatient && (
  <div>
    <p><strong>Name:</strong> {selectedPatient.name}</p>
    <p><strong>Phone Number:</strong> {selectedPatient.phoneNumber}</p>
    <p><strong>Email:</strong> {selectedPatient.email}</p>
    <p><strong>Age:</strong> {selectedPatient.age}</p>
    <p><strong>Gender:</strong> {selectedPatient.gender}</p>
    <p><strong>Address:</strong> {selectedPatient.address}</p>
    {selectedPatient.patientMembers && Object.values(selectedPatient.patientMembers).length > 0 && (
      <div>
        <hr/>
        <h4>Patient Members:</h4>
        <ul>
          {Object.values(selectedPatient.patientMembers).map((member, index) => (
            <li key={index}>
              <div>
                <strong>Name:</strong> {member.name}
              </div>
              <div>
                <strong>Age:</strong> {member.age}
              </div>
              <div>
                <strong>Gender:</strong> {member.gender}
              </div>
              <div>
                <strong>Contact Number:</strong> {member.contactNumber}
              </div>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
)}


          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </main>
  );
}

export default Patient;
