import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Employee() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ name: '', salary: '' });
  const [editId, setEditId] = useState(null);

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      const res = await axios.get('https://localhost:7075/api/Employees');
      setEmployees(res.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit (add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId === null) {
        // Add new employee
        await axios.post('https://localhost:7075/api/Employees', formData);
        alert('Employee added successfully!');
      } else {
        // Update employee
        await axios.put(`https://localhost:7075/api/Employees/${editId}`, {
          id: editId,
          ...formData,
        });
        alert('Employee updated successfully!');
      }
      setFormData({ name: '', salary: '' });
      setEditId(null);
      fetchEmployees();
    } catch (error) {
      console.error('Error saving employee:', error);
      alert('Error occurred. See console for details.');
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://localhost:7075/api/Employees/${id}`);
      alert('Employee deleted successfully!');
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  // Handle edit
  const handleEdit = (emp) => {
    setFormData({ name: emp.name, salary: emp.salary });
    setEditId(emp.id);
  };

  return (
    <div className="container col-md-6">
      <h1>Employee Management System</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter employee name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="row mt-2">
          <input
            type="number"
            name="salary"
            className="form-control"
            placeholder="Enter salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />
        </div>
        <div className="row mt-3">
          <input
            type="submit"
            className="btn btn-primary"
            value={editId === null ? 'Add Employee' : 'Update Employee'}
          />
        </div>
      </form>

      <div className="container mt-4">
        <h4>Employee List</h4>
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td>{e.salary}</td>
                <td>
                  <button className="btn btn-success btn-sm me-2" onClick={() => handleEdit(e)}>
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => handleDelete(e.id)}
                  >
                    Delete
                  </button>
                  <button className="btn btn-primary btn-sm">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employee;
