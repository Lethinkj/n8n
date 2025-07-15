import React from 'react';

const EmployeeTable = ({ employees, onEdit, onDelete, onSendEmail }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Phone</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="border-b">
              <td className="py-2 px-4">{employee.name}</td>
              <td className="py-2 px-4">{employee.employeeNumber}</td>
              <td className="py-2 px-4">{employee.email}</td>
              <td className="py-2 px-4">{employee.phone}</td>
              <td className="py-2 px-4 flex gap-2">
                <button
                  onClick={() => onEdit(employee)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(employee.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => onSendEmail(employee)}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Send Email
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
