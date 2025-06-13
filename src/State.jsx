import axios from 'axios';
import React, { useEffect, useState } from 'react';

function State() {
  const [states, setStates] = useState([]);
  const [formData, setFormData] = useState({ stateName: '', capital: '' });
  const [editId, setEditId] = useState(null); // Track edit mode

  // Fetch states from the API
  const fetchStates = async () => {
    try {
      const res = await axios.get("https://localhost:7075/api/States");
      setStates(res.data);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId === null) {
        // Add new state
        await axios.post('https://localhost:7075/api/States', formData);
        alert('State added successfully!');
      } else {
        // Update existing state
        await axios.put(`https://localhost:7075/api/States/${editId}`, {
          id: editId,
          ...formData,
        });
        alert('State updated successfully!');
      }

      setFormData({ stateName: '', capital: '' });
      setEditId(null);
      fetchStates();
    } catch (error) {
      console.error('Error saving state:', error);
      alert('Error occurred. See console for details.');
    }
  };

  // Handle state deletion
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this state?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://localhost:7075/api/States/${id}`);
      alert('State deleted successfully!');
      fetchStates();
    } catch (error) {
      console.error('Error deleting state:', error);
    }
  };

  // Handle state edit
  const handleEdit = (state) => {
    setFormData({ stateName: state.stateName, capital: state.capital });
    setEditId(state.id);
  };

  return (
    <div className="container col-md-6">
      <h1>Manage State</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <input
            type="text"
            name="stateName"
            className="form-control"
            placeholder="Enter state name"
            value={formData.stateName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="row">
          <input
            type="text"
            name="capital"
            className="form-control mt-2"
            placeholder="Enter state capital"
            value={formData.capital}
            onChange={handleChange}
            required
          />
        </div>
        <div className="row">
          <input
            type="submit"
            className="btn btn-primary mt-2"
            value={editId === null ? 'Add State' : 'Update State'}
          />
        </div>
      </form>

      <div className="container mt-4">
        <h4>State List</h4>
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>State Name</th>
              <th>Capital</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {states.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.stateName}</td>
                <td>{s.capital}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleEdit(s)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => handleDelete(s.id)}
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

export default State;
