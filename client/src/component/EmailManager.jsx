import AddEmailForm from './AddEmailForm';
import EmailList from './EmailList';

const token = localStorage.getItem('token'); // or from context/auth state

const EmailManager = () => {
  return (
    <div className="p-4">
      <AddEmailForm token={token} />
      <EmailList token={token} />
    </div>
  );
};

export default EmailManager;
