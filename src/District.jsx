import axios from 'axios';
import React, { useEffect, useState } from 'react';

function District() {
  const [districts, setDistricts] = useState([]);
  const [formData, setFormData] = useState({ name: '', code: '' });
  const [editId, setEditId] = useState(null);

  // Fetch districts from the API
  const fetchDistricts = async () => {
    try {
      const res = await axios.get('https://localhost:7075/api/Districts');
      setDistricts(res.data);
    } catch (err) {
      console.error('Error fetching districts:', err);
    }
  };

  useEffect(() => {
    fetchDistricts();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit (add or edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId === null) {
        await axios.post('https://localhost:7075/api/Districts', formData);
        alert('District added successfully!');
      } else {
        await axios.put(`https://localhost:7075/api/Districts/${editId}`, {
          id: editId,
          ...formData,
        });
        alert('District updated successfully!');
      }

      setFormData({ name: '', code: '' });
      setEditId(null);
      fetchDistricts();
    } catch (error) {
      console.error('Error saving district:', error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this district?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://localhost:7075/api/Districts/${id}`);
      alert('District deleted successfully!');
      fetchDistricts();
    } catch (error) {
      console.error('Error deleting district:', error);
    }
  };

  // Handle edit button
  const handleEdit = (district) => {
    setFormData({ name: district.name, code: district.code });
    setEditId(district.id);
  };

  return (
    <div className='container col-md-6'>
      <h1>Manage District</h1>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <input
            type='text'
            name='name'
            placeholder='Enter district name'
            className='form-control'
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className='row mt-2'>
          <input
            type='text'
            name='code'
            placeholder='Enter district code'
            className='form-control'
            value={formData.code}
            onChange={handleChange}
            required
          />
        </div>

        <div className='row mt-3'>
          <input
            type='submit'
            value={editId === null ? 'Add District' : 'Update District'}
            className='btn btn-primary'
          />
        </div>
      </form>

      <div className='container mt-4'>
        <h4>District List</h4>
        <table className='table table-bordered table-striped table-hover'>
          <thead className='table-dark'>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {districts.map((d) => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.code}</td>
                <td>
                  <button
                    className='btn btn-success btn-sm me-2'
                    onClick={() => handleEdit(d)}
                  >
                    Edit
                  </button>
                  <button
                    className='btn btn-danger btn-sm me-2'
                    onClick={() => handleDelete(d.id)}
                  >
                    Delete
                  </button>
                  <button className='btn btn-primary btn-sm'>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default District;
