import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EmployeeList.css';

export const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); // Check token presence
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      fetchEmployees();
    }
  }, [isLoggedIn]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('/api/v1/admin/fetch-employee', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setEmployees(response.data.employees);
    } catch (error) {
      console.error("Error fetching employees", error);
    }
  };

  const searchEmployees = async () => {
    try {
      const response = await axios.get(`/api/v1/admin/search-employee?keyword=${searchKeyword}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setEmployees(response.data.employees);
    } catch (error) {
      console.error("Error searching employees", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/admin/delete-employee/${id}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      fetchEmployees(); // Refresh list
    } catch (error) {
      console.error("Error deleting employee", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-employee/${id}`);
  };

  if (!isLoggedIn) {
    return <p>Please log in to view the employee list.</p>;
  }

  return (
    <div className="employee-list-container">
      <h2>Employee List</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name, email, or designation"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <button onClick={searchEmployees}>Search</button>
      </div>

      <table className="employee-table">
        <thead>
          <tr>
            <th>Profile Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Designation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp._id}>
                <td>
                  {emp.image ? (
                    <img src={emp.image} alt="Profile" className="profile-thumbnail" />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td>{emp.name}</td>
                <td>{emp.mail}</td>
                <td>{emp.mobile}</td>
                <td>{emp.designation}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEdit(emp._id)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDelete(emp._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No employees found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
