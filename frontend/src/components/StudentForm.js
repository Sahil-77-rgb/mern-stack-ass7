import React, { useState } from 'react';
import axios from 'axios';

const StudentForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/students', {
        firstName,
        lastName,
        rollNo,
        password,
        contactNumber,
      });
      alert('Student registered successfully');
      // Reset the form after successful submission
      setFirstName('');
      setLastName('');
      setRollNo('');
      setPassword('');
      setContactNumber('');
    } catch (error) {
      console.error('Error registering student', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
        required
      />
      <input
        type="text"
        value={rollNo}
        onChange={(e) => setRollNo(e.target.value)}
        placeholder="Roll No"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <input
        type="text"
        value={contactNumber}
        onChange={(e) => setContactNumber(e.target.value)}
        placeholder="Contact Number"
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default StudentForm;
