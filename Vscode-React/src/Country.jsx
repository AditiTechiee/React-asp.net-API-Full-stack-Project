import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Country() {
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({ name: '', code: '' });
  const [editId, setEditId] = useState(null);

  // Fetch all countries
  const fetchCountries = async () => {
    try {
      const res = await axios.get('https://localhost:7075/api/Countries');
      setCountries(res.data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit (add or edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId === null) {
        // Add new country
        await axios.post('https://localhost:7075/api/Countries', formData);
        alert('Country added successfully!');
      } else {
        // Update existing country
        await axios.put(`https://localhost:7075/api/Countries/${editId}`, {
          id: editId,
          ...formData,
        });
        alert('Country updated successfully!');
      }
      setFormData({ name: '', code: '' });
      setEditId(null);
      fetchCountries();
    } catch (error) {
      console.error('Error saving country:', error);
      alert('Error occurred. See console for details.');
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this country?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://localhost:7075/api/Countries/${id}`);
      alert('Country deleted successfully!');
      fetchCountries();
    } catch (error) {
      console.error('Error deleting country:', error);
    }
  };

  // Handle edit button
  const handleEdit = (country) => {
    setFormData({ name: country.name, code: country.code });
    setEditId(country.id);
  };

  return (
    <div className="container col-md-6">
      <h1>Manage Country</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter country name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <input
            type="text"
            name="code"
            className="form-control mt-2"
            placeholder="Enter country code"
            value={formData.code}
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <input
            type="submit"
            className="btn btn-primary mt-2"
            value={editId === null ? 'Add Country' : 'Update Country'}
          />
        </div>
      </form>

      <div className="container mt-4">
        <h4>Country List</h4>
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Country Name</th>
              <th>Country Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.code}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleEdit(c)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => handleDelete(c.id)}
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

export default Country;
