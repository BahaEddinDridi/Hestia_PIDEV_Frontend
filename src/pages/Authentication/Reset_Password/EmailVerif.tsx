import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { Link } from 'react-router-dom';
import { sendEmail } from '../../api/index';
import Footer from '../../../components/Footer';
const EmailVerif: React.FC = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!email) {
            setError('Email is required');
            return;
        }
        if (!validateEmail(email)) {
            setError('Invalid email format');
            return;
        }

        try {
            const response = await sendEmail(email);
            console.log('Response:', response);

            setSuccessMessage('A verification link has been sent to your email');
            setTimeout(() => {
                navigate('/auth/signin');
            }, 3000);
        } catch (error) {
            setError('Please verify your email');
        }
    };

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    return (
        <div>
        <div className="flex flex-col items-center justify-center mt-20 mb-20 bg-gray-100 dark:bg-boxdark dark:drop-shadow-none ">
            <Breadcrumb pageName="Reset your Password" />
            <div className="container mx-auto p-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold mb-4 text-red-900 dark:text-cyan-500">Email Verification</h2>
                <form onSubmit={handleSubmit} className="max-w-sm">
                    {error && <div className="text-red-600">{error}</div>}
                    {successMessage && <div className="text-green-600">{successMessage}</div>}
                    <div className="mb-5 w-90">
                        <label htmlFor="current-email" className="block text-gray-700 mb-5">
                            Recover you account by entering your email
                        </label>
                        <input
                            type="email"
                            id="current-email"
                            className="mb-5 w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='flex items-center justify-center '>
                    <button
                        type="submit"
                        className="mb-5 inline-flex items-center justify-center rounded-md border  py-4 px-10 text-center font-medium  hover:bg-opacity-90 lg:px-8 xl:px-10 focus:outline-none focus:shadow-outline cursor-pointer 
                    border-red-900 bg-red-800 p-4 text-white transition
                     dark:bg-cyan-900
               dark:hover:bg-cyan-700 dark:focus:ring-cyan-400 dark:border-cyan-900"
                    >
                        Submit
                    </button>
                    <Link to="/auth/signin">
                        <button className="mx-4 mb-5 inline-flex items-center justify-center rounded-md border border-black py-4 px-10 text-center font-medium text-black hover:bg-opacity-90 lg:px-8 xl:px-10 focus:outline-none focus:shadow-outline">
                            Cancel
                        </button>
                    </Link>
                    </div>
                </form>
                <div className="mt-6 text-center">
                    <Link to="/auth/security-questions" className="text-red-900 dark:text-cyan-500">
                      Answer Security Questions ?
                    </Link>
                </div>
            </div>
            </div>
            <Footer />
        </div>
        
    );
};

export default EmailVerif;
