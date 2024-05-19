import React, { useEffect, useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { ref, onValue } from 'firebase/database';
import { db } from '../../../Firebase/Firebase';
import $ from 'jquery';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-bs5';

function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  useEffect(() => {
    const feedbacksRef = ref(db, 'contacts');
    onValue(feedbacksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const feedbackList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setFeedbacks(feedbackList);
      } else {
        setFeedbacks([]);
      }
      setLoading(false);
    }, (error) => {
      setError(error.message);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if ($.fn.DataTable.isDataTable('#feedbackTable')) {
      $('#feedbackTable').DataTable().destroy();
    }
    $('#feedbackTable').DataTable();
  }, [feedbacks]);

  const handleView = (feedback) => {
    setSelectedFeedback(feedback);
    setShowModal(true);
  };

  return (
    <main className='main-container' style={{ color: "black" }}>
    <div className="container mt-5">
      <h1 className="mb-4">Feedback</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="table-responsive">
          <Table id="feedbackTable" className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">No feedback available</td>
                </tr>
              ) : (
                feedbacks.map((feedback, index) => (
                  <tr key={feedback.id}>
                    <td>{index + 1}</td>
                    <td>{feedback.name}</td>
                    <td>{feedback.email}</td>
                    <td>{feedback.message}</td>
                    <td>
                      <Button variant="info" onClick={() => handleView(feedback)}>View</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Feedback Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedFeedback ? (
            <div>
              <p><strong>Name:</strong> {selectedFeedback.name}</p>
              <p><strong>Email:</strong> {selectedFeedback.email}</p>
              <p><strong>Message:</strong> {selectedFeedback.message}</p>
            </div>
          ) : (
            <p>No details available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
    </main>
  );
}

export default Feedback;
