import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Breadcrumb from '../../../../../components/Breadcrumbs/Breadcrumb';
import SwitcherTwo from '../../../../../components/Switchers/SwitcherTwo';
import { UpdatePassword } from '../../../../../pages/api/index';
import { Link } from 'react-router-dom';

const updatePassword: React.FC = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [passwordValidation, setPasswordValidation] = useState({
        minLength: false,
        uppercase: false,
        number: false
    });
    const navigate = useNavigate();

    const [user, setUser] = useState({});
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        setUser(storedUser);
    }, []);

    useEffect(() => {
        validatePassword(newPassword);
    }, [newPassword]);

    const validatePassword = (password: string) => {
        setPasswordValidation({
            minLength: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            number: /[0-9]/.test(password)
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!isSwitchOn) {
            setError('Please confirm by turning on the switch to proceed.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('New password and confirm password do not match.');
            return;
        }

        try {
            const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
            const userId = storedUser._id; // Retrieve user ID from storedUser
            const response = await UpdatePassword(userId,oldPassword,newPassword);
            console.log(response);
            if (response.status === 'Incorrect old password') {
                setError(response.status);
            } else {
                setSuccessMessage(response.status);
                setTimeout(() => {
                    navigate('/profile');
                }, 3000);
            }
        } catch (error) {
            setError((error as Error).message || 'An error occurred while resetting password');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-dark dark:text-gray-300 ">
            <Breadcrumb pageName="Update Password" />
            <div className="container mx-auto p-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold mb-4">New Password</h2>
                <form onSubmit={handleSubmit} className="max-w-sm">
                    {error && <div className="text-red-600">{error}</div>}
                    {successMessage && <div className="text-green-600">{successMessage}</div>}
                    <div className="mb-5 w-90">
                        <label htmlFor="current-password" className="block text-gray-700 mb-5">
                            Current Password
                        </label>
                        <input
                            type="password"
                            id="current-password"
                            className="mb-5 w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter your current Password"
                            required
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                        <label htmlFor="new-password" className="block text-gray-700 mb-5">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="new-password"
                            className="mb-5 w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter your New Password"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        {newPassword && (
                            <div className="text-sm text-gray-600 mb-2">
                                <ul>
                                    {!passwordValidation.minLength && <li>Password must be at least 8 characters long.</li>}
                                    {!passwordValidation.uppercase && <li>Password must contain at least one uppercase letter.</li>}
                                    {!passwordValidation.number && <li>Password must contain at least one number.</li>}
                                </ul>
                            </div>
                        )}
                        <label htmlFor="confirm-password" className="block text-gray-700 mb-5">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirm-password"
                            className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Confirm your Password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="ConfirmPasswordChange" className="block text-gray-700 mb-5">
                            Are you sure you want to change your password?
                        </label>
                        <SwitcherTwo checked={isSwitchOn} onChange={() => setIsSwitchOn(!isSwitchOn)} />
                    </div>
                    <button
                        type="submit"
                        className="mt-5 mb-5 inline-flex items-center justify-center rounded-md border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10 focus:outline-none focus:shadow-outline"
                    >
                        Submit
                    </button>
                    <Link to="/pages/settings">
                        <button className="mx-4 mb-5 inline-flex items-center justify-center rounded-md border border-black py-4 px-10 text-center font-medium text-black hover:bg-opacity-90 lg:px-8 xl:px-10 focus:outline-none focus:shadow-outline">
                            Cancel
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default updatePassword;
