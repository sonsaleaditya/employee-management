import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { CreateEmployee } from './components/CreateEmployee';
import { EmployeeList } from './components/EmployeeList';
import { Navbar } from './components/Navbar';
import { Signup } from './components/Signup'; // New Signup component
import { EditEmployee } from './components/EditEmployee.jsx'
function App() {
  return (
    <Router>
      <Navbar />

      <Routes> 
      <Route path="/" element={<EmployeeList/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employee-list" element={<EmployeeList />} />
        <Route path="/create-employee" element={<CreateEmployee />} />
         <Route path="/edit-employee/:id" element={<EditEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;
