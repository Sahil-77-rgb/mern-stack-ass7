import React from 'react';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm'; // Ensure this is imported

function App() {
  return (
    <div>
      <h1>Student Registration System</h1>
      <StudentForm />  {/* Ensure this line is present */}
      <StudentList />
    </div>
  );
}

export default App;
