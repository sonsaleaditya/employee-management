import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditEmployee.css';

export const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: '',
    mail: '',
    mobile: '',
    designation: '',
    gender: '',
    course: [],
    image: '',
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchEmployeeDetails();
  }, []);

  const fetchEmployeeDetails = async () => {
    try {
      const response = await axios.get(`/api/v1/admin/fetch-by-id/${id}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      const fetchedEmployee = response.data.user;
      setEmployee({
        ...fetchedEmployee,
        course: Array.isArray(fetchedEmployee.course) ? fetchedEmployee.course : [],
      });
    } catch (error) {
      console.error("Error fetching employee details", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCourseChange = (e) => {
    const { value, checked } = e.target;
    setEmployee((prevState) => ({
      ...prevState,
      course: checked
        ? [...prevState.course, value]
        : prevState.course.filter((c) => c !== value),
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', employee.name);
    formData.append('mail', employee.mail);
    formData.append('mobile', employee.mobile);
    formData.append('designation', employee.designation);
    formData.append('gender', employee.gender);
    formData.append('course', JSON.stringify(employee.course));
    if (file) formData.append('file', file);

    try {
      const response = await axios.put(`/api/v1/admin/update-employee/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        alert('Employee updated successfully');
        navigate('/employee-list');
      } else {
        alert('Update failed: ' + response.data.message);
      }
    } catch (error) {
      console.error("Error updating employee:", error.response ? error.response.data : error.message);
      alert('An error occurred while updating the employee');
    }
  };

  return (
    <div className="edit-employee-container">
      <h2>Edit Employee</h2>
      <form className="edit-employee-form" onSubmit={handleUpdate}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="mail"
            value={employee.mail}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Mobile:</label>
          <input
            type="text"
            name="mobile"
            value={employee.mobile}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Designation:</label>
          <select
            name="designation"
            value={employee.designation}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={employee.gender === 'male'}
              onChange={handleInputChange}
            /> Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={employee.gender === 'female'}
              onChange={handleInputChange}
            /> Female
          </label>
        </div>
        <div className="form-group">
          <label>Course:</label>
          <label>
            <input
              type="checkbox"
              value="MCA"
              checked={employee.course.includes('MCA')}
              onChange={handleCourseChange}
            /> MCA
          </label>
          <label>
            <input
              type="checkbox"
              value="BCA"
              checked={employee.course.includes('BCA')}
              onChange={handleCourseChange}
            /> BCA
          </label>
          <label>
            <input
              type="checkbox"
              value="BSC"
              checked={employee.course.includes('BSC')}
              onChange={handleCourseChange}
            /> BSC
          </label>
        </div>
        <div className="form-group image-upload">
          <label>Profile Image:</label>
          <input type="file" onChange={handleFileChange} />
          {employee.image && <img src={employee.image} alt="Profile" className="profile-preview" />}
        </div>
        <button type="submit" className="update-button">Update Employee</button>
      </form>
    </div>
  );
};
