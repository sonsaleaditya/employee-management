import React, { useState } from 'react';
import axios from 'axios';
import './CreateEmployee.css';

export const CreateEmployee = () => {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [mobile, setMobile] = useState('');
  const [designation, setDesignation] = useState('');
  const [gender, setGender] = useState('');
  const [course, setCourse] = useState([]);
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCourseChange = (e) => {
    const { value, checked } = e.target;
    setCourse((prevCourses) => {
      if (checked) {
        return [...prevCourses, value];
      } else {
        return prevCourses.filter((course) => course !== value);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !mail || !mobile || !designation || !gender || course.length === 0 || !file) {
      setErrorMessage("All fields are mandatory!");
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('mail', mail);
    formData.append('mobile', mobile);
    formData.append('designation', designation);
    formData.append('gender', gender);
    formData.append('course', JSON.stringify(course));
    formData.append('file', file);

    axios.post('/api/v1/admin/create-employee', formData, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    }).then(response => {
      alert('Employee created successfully');
      setName('');
      setMail('');
      setMobile('');
      setDesignation('');
      setGender('');
      setCourse([]);
      setFile(null);
    }).catch(err => {
      console.error("Error: ", err);
      alert('Failed to create employee');
    });
  };

  return (
    <div className="form-container">
      <h1>Create Employee</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={mail} onChange={(e) => setMail(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Mobile No:</label>
          <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Designation:</label>
          <select value={designation} onChange={(e) => setDesignation(e.target.value)} required>
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <label><input type="radio" value="male" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} /> Male</label>
          <label><input type="radio" value="female" checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} /> Female</label>
        </div>

        <div className="form-group">
          <label>Course:</label>
          <label><input type="checkbox" value="MCA" onChange={handleCourseChange} /> MCA</label>
          <label><input type="checkbox" value="BCA" onChange={handleCourseChange} /> BCA</label>
          <label><input type="checkbox" value="BSC" onChange={handleCourseChange} /> BSC</label>
        </div>

        <div className="form-group">
          <label>Image Upload:</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};
