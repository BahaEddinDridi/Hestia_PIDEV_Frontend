// Import necessary components and hooks

import DefaultLayout from '../../../../../layout/DefaultLayout';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../../../../components/Breadcrumbs/Breadcrumb';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SwitcherTwo from '../../../../../components/Switchers/SwitcherTwo';
import { UpdatePassword, recoverymail, updateSecurityQuestions } from '../../../../../pages/api/index';
// Define the AccountSecurity component
const AccountSecurity = () => {

    // Function to toggle visibility of the password form
    const togglePasswordForm = () => {
        setShowPasswordForm(!showPasswordForm);
    };

    // Function to toggle visibility of the security questions section
    const toggleSecurityQuestions = () => {
        setShowSecurityQuestions(!showSecurityQuestions);
    };

    // Function to toggle visibility of the email recovery section
    const toggleEmailRecovery = () => {
        setShowEmailRecovery(!showEmailRecovery);
    };

    // State variables to manage the visibility of different sections
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [showSecurityQuestions, setShowSecurityQuestions] = useState(false);
    const [showEmailRecovery, setShowEmailRecovery] = useState(false);
    const [recoveryEmail, setRecoveryEmail] = useState('');
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
    const [securityQuestions, setSecurityQuestions] = useState([
        { question: "What is your mother's name?", answer: '' },
        { question: "In what city were you born?", answer: '' },
        { question: "What is the name of your first pet?", answer: '' }
    ]);

    const handleSecurityQuestionChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const updatedQuestions = [...securityQuestions];
        updatedQuestions[index].answer = value;
        setSecurityQuestions(updatedQuestions);
    };

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


    };

    const handlePasswordFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // You may want to get the user ID from your context or props instead of localStorage
            const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
            const userId = storedUser._id;
            const response = await UpdatePassword(userId, oldPassword, newPassword);

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

    const handleSecurityQuestionsSubmit = async () => {
        try {
            const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
            const userId = storedUser._id;

            // Assuming securityQuestions is the state that holds the security questions and answers
            const response = await updateSecurityQuestions(userId, securityQuestions);

            // Handle the response from the server
            if (response.status === 'Success') {
                setSuccessMessage(response.message);
                setTimeout(() => {
                    navigate('/profile');
                }, 3000);
            } else {
                setError(response.error || 'Failed to update security questions');
            }
        } catch (error) {
            console.error('Error updating security questions:', error);
            // Handle error
        }
    };

    const handleEmailRecoverySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // You may want to get the user ID from your context or props instead of localStorage
            const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
            const userId = storedUser._id;

            // Call the recoverymail service to send recovery email
            const response = await recoverymail(userId, recoveryEmail);

            // Handle the response
            if (response.status === 'Success') {
                setSuccessMessage(response.message);
                setTimeout(() => {
                    navigate('/profile');
                }, 3000);
            } else {
                setError(response.error || 'Failed to send recovery email');
            }
        } catch (error) {
            setError((error as Error).message || 'An error occurred while sending recovery email');
        }
    };





    // JSX structure of the AccountSecurity component
    return (
        <DefaultLayout>
            <div className="account-security">
                <div className="account-security__header">
                    <Breadcrumb pageName="Account Security" />
                </div>

                {/* Section for updating password */}

                <div className="mb-5 container mx-auto p-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex flex-col items-center justify-center">
                    {/* Section for updating password */}
                    <div className="account-security__section">
                        <h2 className="text-xl font-bold cursor-pointer mb-4 text-red-900 dark:text-red-900 dark:hover:text-white hover:text-black" onClick={togglePasswordForm}>
                            Update Password
                        </h2>

                        {showPasswordForm && (
                            <form onSubmit={handlePasswordFormSubmit} className="max-w-sm">
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
                                    <label htmlFor="ConfirmPasswordChange" className="block text-red-900 dark:text-cyan-500 mb-5">
                                        Are you sure you want to change your password?
                                    </label>
                                    <SwitcherTwo checked={isSwitchOn} onChange={() => setIsSwitchOn(!isSwitchOn)} />
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="mb-5 inline-flex items-center justify-center rounded-md border  py-4 px-10 text-center font-medium  hover:bg-opacity-90 lg:px-8 xl:px-10 focus:outline-none focus:shadow-outline cursor-pointer 
                    border-red-900 bg-red-800 p-4 text-white transition
                     dark:bg-cyan-900
               dark:hover:bg-cyan-700 dark:focus:ring-cyan-400 dark:border-cyan-900"
                                    >
                                        Submit
                                    </button>
                                    <Link to="/profile/update">
                                        <button className="mx-4 mb-5 inline-flex items-center justify-center rounded-md border border-black py-4 px-10 text-center font-medium text-black hover:bg-opacity-90 lg:px-8 xl:px-10 focus:outline-none focus:shadow-outline">
                                            Cancel
                                        </button>
                                    </Link>
                                </div>
                            </form>
                        )}
                    </div>

                </div>

                {/* Section for security questions */}

                <div className="mb-5 container mx-auto p-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex flex-col items-center justify-center">
                    <div className="account-security__section">
                        <h2 className="text-xl font-bold cursor-pointer mb-4 text-red-900 dark:text-red-900 dark:hover:text-white hover:text-black" onClick={toggleSecurityQuestions}>
                            Security Questions
                        </h2>
                        {showSecurityQuestions && (
                            <div className="security-questions">
                                {securityQuestions.map((item, index) => (
                                    <div key={index} className="mt-2 mb-4">
                                        <label className="block text-sm font-medium text-gray-700">{`Security Question ${index + 1}`}</label>
                                        <p className="text-sm text-red-900 dark:text-cyan-500 my-2">{item.question}</p>
                                        <input
                                            type="text"
                                            placeholder="Enter your answer"
                                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            value={item.answer}
                                            onChange={(e) => handleSecurityQuestionChange(index, e)}
                                        />
                                    </div>
                                ))}
                                <div>
                                    <button
                                        type="submit"
                                        onClick={handleSecurityQuestionsSubmit} // Call the handleSecurityQuestionsSubmit function on submit
                                        className="mb-5 inline-flex items-center justify-center rounded-md border  py-4 px-10 text-center font-medium  hover:bg-opacity-90 lg:px-8 xl:px-10 focus:outline-none focus:shadow-outline cursor-pointer 
                    border-red-900 bg-red-800 p-4 text-white transition
                     dark:bg-cyan-900
               dark:hover:bg-cyan-700 dark:focus:ring-cyan-400 dark:border-cyan-900"
                                    >
                                        Submit
                                    </button>
                                    <Link to="/profile/update">
                                        <button className="mx-4 mb-5 inline-flex items-center justify-center rounded-md border border-black py-4 px-10 text-center font-medium text-black hover:bg-opacity-90 lg:px-8 xl:px-10 focus:outline-none focus:shadow-outline">
                                            Cancel
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>


                {/* Section for email recovery */}
                <div className="mb-5 container mx-auto p-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex flex-col items-center justify-center">
                    <div className="account-security__section">
                        <h2 className="text-xl font-bold cursor-pointer mb-4 text-red-900 dark:text-red-900 dark:hover:text-white hover:text-black" onClick={toggleEmailRecovery}>
                            Email Recovery
                        </h2>
                        {showEmailRecovery && (
                            <div className="email-recovery ">
                                {/* Render email recovery inputs and buttons here */}
                                <form onSubmit={handleEmailRecoverySubmit} className="max-w-sm">
                                    {error && <div className="text-red-600">{error}</div>}
                                    {successMessage && <div className="text-green-600">{successMessage}</div>}
                                    <div className="mt-2 mb-3">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Enter your Recovery Email</label>
                                        <input
                                            type="text"
                                            placeholder="Enter your recovery email"
                                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            value={recoveryEmail}
                                            onChange={(e) => setRecoveryEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="ConfirmRecoveryMail" className="block text-red-900 dark:text-cyan-500 mb-5">
                                            Please confirm by turning on the switch to proceed.
                                        </label>
                                        <SwitcherTwo checked={isSwitchOn} onChange={() => setIsSwitchOn(!isSwitchOn)} />
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="mb-5 inline-flex items-center justify-center rounded-md border  py-4 px-10 text-center font-medium  hover:bg-opacity-90 lg:px-8 xl:px-10 focus:outline-none focus:shadow-outline cursor-pointer 
                    border-red-900 bg-red-800 p-4 text-white transition
                     dark:bg-cyan-900
               dark:hover:bg-cyan-700 dark:focus:ring-cyan-400 dark:border-cyan-900"
                                        >
                                            Submit
                                        </button>
                                        <Link to="/profile/update">
                                            <button className="mx-4 mb-5 inline-flex items-center justify-center rounded-md border border-black py-4 px-10 text-center font-medium text-black hover:bg-opacity-90 lg:px-8 xl:px-10 focus:outline-none focus:shadow-outline">
                                                Cancel
                                            </button>
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

// Export the AccountSecurity component
export default AccountSecurity;