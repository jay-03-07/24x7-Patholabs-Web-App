// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import AdminRouting from './Components/Admin/AdminRouting'; // Import the AdminPage component
// import UserRouting from './Components/User/UserRouting'; // Import the UserPage component
// import Admin from './Components/Admin/Admin';


// function App() {
//   return (
//     <Router>
//       <div className="App">
//         {/* Routes for both user and admin pages */}
//         <Routes>

//           {/* Route for the user page */}
//           <Route path="/*" element={<UserRouting />} />

//           {/* Route for the admin page */}
//           <Route path="/admin/*" element={<Admin />} />


//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './Components/Admin/AuthContext';
import UserRouting from './Components/User/UserRouting';
import Admin from './Components/Admin/Admin';
import Login from './Components/Admin/LoginAndSignup/Login';
import Signup from './Components/Admin/LoginAndSignup/Signup';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route path="/*" element={<UserRouting />} />
            <Route path="/admin" element={<AdminRoute />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/signup" element={<Signup />} />

            <Route path="/admin/*" element={<PrivateAdminRoute />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

function AdminRoute() {
  const { currentUser } = useAuth();
  return currentUser ? <Navigate to="/admin/dashboard" /> : <Navigate to="/admin/login" />;
}

function PrivateAdminRoute() {
  const { currentUser } = useAuth();
  return currentUser ? <Admin /> : <Navigate to="/admin/login" />;
}

export default App;
