import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null); // State for selected student to update
    const [updatedContact, setUpdatedContact] = useState(''); // State for updated contact number

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/students');
                setStudents(response.data);
            } catch (error) {
                console.error('Failed to fetch students', error);
            }
        };

        fetchStudents();
    }, []);

    // Function to handle update form submission
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5001/api/students/${selectedStudent.rollNo}`, {
                contactNumber: updatedContact,
            });
            console.log(response.data); // Success message
            // Re-fetch students after updating
            const updatedStudents = await axios.get('http://localhost:5001/api/students');
            setStudents(updatedStudents.data);
            setSelectedStudent(null); // Reset form
            setUpdatedContact(''); // Reset updated contact
        } catch (error) {
            console.error('Failed to update student', error);
        }
    };

    // Handle delete operation
    const handleDelete = async (rollNo) => {
        try {
            await axios.delete(`http://localhost:5001/api/students/${rollNo}`);
            const updatedStudents = await axios.get('http://localhost:5001/api/students'); // Refresh the list
            setStudents(updatedStudents.data);
            alert('Student deleted successfully');
        } catch (error) {
            console.error('Error deleting student', error);
        }
    };

    // Function to initiate update for a selected student
    const handleUpdate = (student) => {
        setSelectedStudent(student);
        setUpdatedContact(student.contactNumber); // Set the current contact number for editing
    };

    return (
        <div>
            <h2>Student List</h2>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Roll No</th>
                        <th>Contact Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.rollNo}>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.rollNo}</td>
                            <td>{student.contactNumber}</td>
                            <td>
                                <button onClick={() => handleUpdate(student)}>Update</button>
                                <button 
                                    onClick={() => handleDelete(student.rollNo)} 
                                    style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedStudent && (
                <div>
                    <h3>Update Contact Number for {selectedStudent.firstName}</h3>
                    <form onSubmit={handleUpdateSubmit}>
                        <input
                            type="text"
                            value={updatedContact}
                            onChange={(e) => setUpdatedContact(e.target.value)}
                            placeholder="Enter new contact number"
                            required
                        />
                        <button type="submit">Update</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default StudentList;
