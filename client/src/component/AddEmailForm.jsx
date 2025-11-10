import { useState } from 'react';
import axios from 'axios';

const AddEmailForm = ({ token }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/emails`, { email }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage('Email added successfully!');
      setEmail('');
    } catch (error) {
      setMessage('Error: ' + error.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border px-4 py-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Add Email</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default AddEmailForm;
