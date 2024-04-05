import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminRouting from './Components/Admin/AdminRouting'; // Import the AdminPage component
import UserRouting from './Components/User/UserRouting'; // Import the UserPage component


function App() {
  return (
    <Router>
      <div className="App">
        {/* Routes for both user and admin pages */}
        <Routes>

          {/* Route for the user page */}
          <Route path="/*" element={<UserRouting />} />

          {/* Route for the admin page */}
          <Route path="/admin/*" element={<AdminRouting />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
