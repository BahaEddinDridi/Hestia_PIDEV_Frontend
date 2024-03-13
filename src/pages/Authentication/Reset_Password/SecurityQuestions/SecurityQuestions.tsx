import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../../../components/Breadcrumbs/Breadcrumb';
import { verifySecurityAnswers } from '../../../api/index'; // Update the import statement with the correct service function
import Footer from '../../../../components/Footer';
const SecurityQuestions: React.FC = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [securityQuestions, setSecurityQuestions] = useState([
        { question: "What is your mother's name?", answer: '' },
        { question: "In what city were you born?", answer: '' },
        { question: "What is the name of your first pet?", answer: '' }
    ]);
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
            const response = await verifySecurityAnswers(email, securityQuestions);
            console.log('Response:', response);
            setSuccessMessage('Security questions updated successfully');
            setTimeout(() => {
                navigate('/auth/signin');
            }, 3000);
        } catch (error) {
            setError('Error updating security questions');
        }
    };

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSecurityQuestionChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedQuestions = [...securityQuestions];
        updatedQuestions[index].answer = event.target.value;
        setSecurityQuestions(updatedQuestions);
    };

    const handleCancel = () => {
        navigate('/auth/EmailVerif'); // Navigate to the sign-in page when the cancel button is clicked
    };

    return (
        <div>
        <div className="flex flex-col items-center justify-center mt-10 mb-20 bg-gray-100 dark:bg-dark dark:text-gray-300">
            <Breadcrumb pageName="Reset your Password" />
            <div className="container mx-auto p-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold mb-4 text-red-900 dark:text-cyan-500">Security Questions</h2>
                <form onSubmit={handleSubmit} className="max-w-sm">
                    {error && <div className="text-red-600">{error}</div>}
                    {successMessage && <div className="text-green-600">{successMessage}</div>}
                    <div className="mb-5">
                        <label htmlFor="current-email" className="block text-gray-700 mb-2">
                            Enter your Email
                        </label>
                        <input
                            type="email"
                            id="current-email"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {securityQuestions.map((question, index) => (
                        <div key={index} className="mt-2 mb-4">
                            <label className="block text-sm font-medium text-gray-700">{`Security Question ${index + 1}`}</label>
                            <p className="text-sm text-red-900 dark:text-cyan-500 my-2">{question.question}</p>
                            <input
                                type="text"
                                placeholder="Enter your answer"
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                value={question.answer}
                                onChange={(e) => handleSecurityQuestionChange(index, e)}
                            />
                        </div>
                    ))}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="mr-4 inline-flex items-center justify-center rounded-md border  py-4 px-10 text-center font-medium  hover:bg-opacity-90 lg:px-8 xl:px-10 focus:outline-none focus:shadow-outline cursor-pointer 
                    border-red-900 bg-red-800 p-4 text-white transition
                     dark:bg-cyan-900
               dark:hover:bg-cyan-700 dark:focus:ring-cyan-400 dark:border-cyan-900"
                        >
                            Submit
                        </button>
                        <button
                            type="button" // Change type to button
                            onClick={handleCancel} // Add onClick event handler
                            className="inline-flex items-center justify-center rounded-md border border-black py-4 px-10 text-center font-medium text-black hover:bg-opacity-90 focus:outline-none focus:shadow-outline"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
            </div>
            <Footer />
        </div>
    );
};

export default SecurityQuestions;
