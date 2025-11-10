import { useEffect, useState } from 'react';
import axios from 'axios';

const EmailList = ({ token }) => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/emails`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmails(res.data);
      } catch (err) {
        console.error('Error fetching emails:', err);
      }
    };

    fetchEmails();
  }, [token]);

  const Deletehandler = async (emailId) => {
    if (!window.confirm('Are you sure you want to delete this email?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/emails/${emailId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          alert: 'Email deleted successfully',
          
        },
      });
      setEmails(emails.filter((email) => email._id !== emailId));
    } catch (err) {
      console.error('Error deleting email:', err);
      alert('Failed to delete email');
    }
  };

  const Edithandler = async (emailId, newEmail) => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/emails/${emailId}`, 
        { email: newEmail }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });   
      setEmails(emails.map((email) => (email._id === emailId ? res.data : email)));
    } catch (err) {
      console.error('Error editing email:', err);
    }
  };


  return (
    <div className="mt-4">
      {emails.length === 0 ? (
        <p className="text-gray-500">No emails found.</p>
      ) : (
        <ul className="space-y-2">
          {emails.map((item) => (
            <li key={item._id} className="border p-2 rounded bg-gray-50 relative">
             <div>
               <strong>{item.email}</strong>{' '}
             
             </div>
             <div className='absolute right-2 top-2 flex gap-2'>
              {/* <button
                onClick={() => Edithandler(item._id, prompt('Edit email:', item.email))}
                className="text-blue-600 hover:text-blue-800"
              >
                Edit
              </button> */}
              <button
                onClick={() => Deletehandler(item._id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>


             </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmailList;
