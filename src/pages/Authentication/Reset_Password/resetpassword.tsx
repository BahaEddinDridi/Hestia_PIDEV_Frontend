import React, { useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { resetPassword } from '../../api/index';
import Footer from '../../../components/Footer';
import { stringify } from 'postcss';
const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { _id } = useParams<{ _id: string}>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      setError('Both password fields are required');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = storedUser._id;

    if (!userId) {
        setError('User ID not found');
        return;
    }

    const response = await resetPassword(userId, password);
    if (response && response.Status === 'Success') {
        setSuccessMessage('Password reset successfully');
        setPassword('');
        setConfirmPassword('');
        setTimeout(() => {
            navigate('/auth/signin');
        }, 3000);
    } else {
        setError(response && response.Status ? response.Status : 'Error resetting password. Please try again.');
    }
} catch (error) {
    setError('Error resetting password');
}
  };

  return (
    <div>
    <div className="flex flex-col items-center justify-center mb-20 mt-20 bg-gray-100 dark:bg-dark dark:text-gray-300 ">
      <Breadcrumb pageName="Reset your Password"  />
      <div className="container mx-auto p-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit} className="max-w-sm">
          {error && <div className="text-red-600">{error}</div>}
          {successMessage && (
            <div className="text-green-600">{successMessage}</div>
          )}
          <div className="mb-5 w-90">
            <label htmlFor="password" className="block text-gray-700 mb-5">
              New Password
            </label>
            <input
              type="password"
              id="password"
              className="mb-5 w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your new password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label
              htmlFor="confirm-password"
              className="block text-gray-700 mb-5"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirm-password"
              className="mb-5 w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Confirm your new password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="mb-5 inline-flex items-center justify-center rounded-md border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10 focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
          <Link to="/auth/signin">
            <button className="mx-4 mb-5 inline-flex items-center justify-center rounded-md border border-black py-4 px-10 text-center font-medium text-black hover:bg-opacity-90 lg:px-8 xl:px-10 focus:outline-none focus:shadow-outline">
              Cancel
            </button>
          </Link>
        </form>
      </div>
      
    </div>
    <Footer />
    </div>
  );
};

export default ResetPasswordPage;
