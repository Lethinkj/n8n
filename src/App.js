import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import EmployeeForm from './components/EmployeeForm';
import EmployeeTable from './components/EmployeeTable';
import axios from 'axios';

function App() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailSending, setEmailSending] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('employees').select('*');
      if (error) throw error;
      setEmployees(data || []);
    } catch (error) {
      console.error('Error fetching employees:', error);
      alert('Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData) => {
    try {
      const { error } = await supabase.from('employees').insert([formData]);
      if (error) throw error;
      await fetchEmployees();
      setShowForm(false);
    } catch (error) {
      console.error('Error creating employee:', error);
      alert('Failed to create employee');
    }
  };

  const handleUpdate = async (formData) => {
    try {
      const { error } = await supabase
        .from('employees')
        .update(formData)
        .eq('id', editingEmployee.id);
      
      if (error) throw error;
      await fetchEmployees();
      setEditingEmployee(null);
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('Failed to update employee');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;
    
    try {
      const { error } = await supabase
        .from('employees')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      await fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Failed to delete employee');
    }
  };

  const handleSendEmail = async (employee) => {
    setEmailSending(employee.id);
    try {
      await axios.post(
        process.env.REACT_APP_WEBHOOK_URL || 'http://localhost:5678/webhook/send-employee-email',
        {
          name: employee.name,
          email: employee.email,
          employeeNumber: employee.employeeNumber
        },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 10000 // 10 second timeout
        }
      );
      alert(`Email sent to ${employee.email}!`);
    } catch (error) {
      console.error('Error sending email:', error);
      alert(`Failed to send email: ${error.response?.data?.message || error.message}`);
    } finally {
      setEmailSending(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Employee Manager</h1>
      
      {loading ? (
        <div className="text-center py-4">Loading employees...</div>
      ) : (
        <>
          {showForm || editingEmployee ? (
            <EmployeeForm 
              employee={editingEmployee}
              onSubmit={editingEmployee ? handleUpdate : handleCreate}
              onCancel={() => {
                setEditingEmployee(null);
                setShowForm(false);
              }}
            />
          ) : (
            <button
              onClick={() => setShowForm(true)}
              className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add New Employee
            </button>
          )}

          <EmployeeTable 
            employees={employees}
            onEdit={setEditingEmployee}
            onDelete={handleDelete}
            onSendEmail={handleSendEmail}
            emailSending={emailSending}
          />
        </>
      )}
    </div>
  );
}

export default App;