import DefaultLayoutAdmin from '../layaout/DefaultLayoutAdmin';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SwitcherTwo from '../../components/Switchers/SwitcherTwo';
import { UpdatePassword, recoverymail, updateSecurityQuestions, updateCRM, getCRM } from '../../../src/pages/api/index';
import { selectCurrentUser } from '../../ApiSlices/authSlice';
import { useSelector } from 'react-redux';

interface CRMData {
    PrivacyPolicy: string;
    TermsOfService: string;
    Location: string;
    Email: string;
    PhoneNumber: number;
    Description: string;
    CompanyName: string;
    CompanyLink: string;
    SocialMedia: {
        Facebook: string;
        Twitter: string;
        LinkedIn: string;
        Instagram: string;
    };
}

const AccountSecurityAdmin = () => {
    const storedUser=useSelector(selectCurrentUser);
    const togglePasswordForm = () => {
        setShowPasswordForm(!showPasswordForm);
    };

    const toggleSecurityQuestions = () => {
        setShowSecurityQuestions(!showSecurityQuestions);
    };

    const toggleEmailRecovery = () => {
        setShowEmailRecovery(!showEmailRecovery);
    };

    const toggleTermsOfService = () => {
        setShowTermsOfService(!showTermsOfService);
    };

    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [crmData, setCrmData] = useState<CRMData>({} as CRMData);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    const [showSecurityQuestions, setShowSecurityQuestions] = useState(false);
    const [showEmailRecovery, setShowEmailRecovery] = useState(false);
    const [showTermsOfService, setShowTermsOfService] = useState(false);
    const [recoveryEmail, setRecoveryEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [errorter, setErrorTer] = useState('');

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



    useEffect(() => {
        const fetchCRMData = async () => {
            try {
                const response = await getCRM();
                console.log('Response:', response); // Log the entire response object to see its structure
                if (!response || !Array.isArray(response) || response.length === 0) {
                    console.warn('No CRM data found or response is empty.'); // Log a warning
                    // Optionally set a flag or message to indicate no data
                } else {
                    // Extract the first object in the array
                    const firstObject = response[0];
                    console.log('First Object:', firstObject);

                    // Fetch Company Name from the first object
                    const companyName = firstObject.CompanyName;
                    console.log('Company Name:', companyName);

                    // You can also set this company name to state if needed
                    // setCompanyName(companyName);
                    setCrmData(firstObject)
                }
            } catch (error) {
                console.error('Error fetching CRM data:', error);
                setFetchError(error.message || 'An error occurred.'); // Set a user-friendly error message
            } finally {
                setIsLoading(false); // Set loading state to false when data is fetched
            }
        };

        fetchCRMData();
    }, []);


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

        // Handle form submission
    };

    const handlePasswordFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // You may want to get the user ID from your context or props instead of localStorage
          
            const userId = storedUser._id;
            const response = await UpdatePassword(userId, oldPassword, newPassword);

            if (response.status === 'Incorrect old password') {
                setError(response.status);
            } else {
                setSuccessMessage(response.status);
                setTimeout(() => {
                    navigate('/Dashboard/ProfileAdmin/:username');
                }, 3000);
            }
        } catch (error) {
            setError((error as Error).message || 'An error occurred while resetting password');
        }
    };

    const handleSecurityQuestionsSubmit = async () => {
        try {
           
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
            
            const userId = storedUser._id;
            console.log(userId);

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

    const handleTermsOfServiceSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        // You may want to get the user ID from your context or props instead of localStorage
        
        if (storedUser.role !== 'admin') {
            setErrorTer('You do not have permission to update the Terms of Service');
            return;
        }

        // Prepare the data needed to update the CRM (Replace these with your actual data)
        const updatedTermsOfServiceData = {
            PrivacyPolicy: crmData.PrivacyPolicy,
            TermsOfService: crmData.TermsOfService,
            Location: crmData.Location,
            Email: crmData.Email,
            PhoneNumber: crmData.PhoneNumber,
            Description: crmData.Description,
            CompanyName: crmData.CompanyName,
            SocialMedia: {
                Facebook: crmData.SocialMedia.Facebook,
                Twitter: crmData.SocialMedia.Twitter,
                LinkedIn: crmData.SocialMedia.LinkedIn,
                Instagram: crmData.SocialMedia.Instagram
            }
        };

        // Call the updateCRM service to update the CRM with the prepared data
        const response = await updateCRM(updatedTermsOfServiceData);

        // Handle the response
        if (response.status === 'Success') {
            setSuccessMessage(response.message);
            setTimeout(() => {
                navigate('/profile');
            }, 3000);
        } else {
            setErrorTer(response.error || 'Failed to update CRM');
        }
    } catch (error) {
        setErrorTer((error as Error).message || 'An error occurred while updating CRM');
    }
}

    return (
        <DefaultLayoutAdmin>
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

                {/* Section for Terms of Service and Use */}
                <div className="mb-5 container mx-auto p-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex flex-col items-center justify-center">
                    <div className="account-security__section">
                        <h2 className="text-xl font-bold cursor-pointer mb-4 text-red-900 dark:text-red-900 dark:hover:text-white hover:text-black" onClick={toggleTermsOfService}>
                            CRM
                        </h2>
                        {isLoading ? (
                            <div>Loading...</div>
                        ) : fetchError ? (
                            <div className="text-red-600">{fetchError}</div>
                        ) : (
                            showTermsOfService && (
                                <form onSubmit={handleTermsOfServiceSubmit} className="max-w-sm ">
                                    {successMessage && <div className="text-green-600">{successMessage}</div>}

                                    <div>
                                        {/* Input field for Privacy Policy */}
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Update the Privacy Policy</label>
                                        <input
                                            type="text"
                                            placeholder="Privacy Policy"
                                            value={crmData?.PrivacyPolicy || ''} // Use optional chaining
                                            onChange={(e) => setCrmData({ ...crmData, PrivacyPolicy: e.target.value })}
                                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-2"
                                        />
                                    </div>
                                    <div>
                                        {/* Input field for Terms of Service */}
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Update the Terms of Service</label>
                                        <input
                                            type="text"
                                            placeholder="Terms of Service"
                                            value={crmData?.TermsOfService || ''} // Use optional chaining
                                            onChange={(e) => setCrmData({ ...crmData, TermsOfService: e.target.value })}
                                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-2"
                                        />
                                    </div>
                                    <div>
                                        {/* Input field for Location */}
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Update the Location</label>
                                        <input
                                            type="text"
                                            placeholder="Location"
                                            value={crmData?.Location || ''} // Use optional chaining
                                            onChange={(e) => setCrmData({ ...crmData, Location: e.target.value })}
                                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-2"
                                        />
                                    </div>
                                    <div>
                                        {/* Input field for Email */}
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Update the Email</label>
                                        <input
                                            type="text"
                                            placeholder="Email"
                                            value={crmData?.Email || ''} // Use optional chaining
                                            onChange={(e) => setCrmData({ ...crmData, Email: e.target.value })}
                                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-2"
                                        />
                                    </div>
                                    <div>
                                        {/* Input field for Phone Number */}
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Update the Phone Number</label>
                                        <input
                                            type="number"
                                            placeholder="Phone Number"
                                            value={crmData?.PhoneNumber || ''} // Use optional chaining
                                            onChange={(e) => setCrmData({ ...crmData, PhoneNumber: Number(e.target.value) })}
                                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-2"
                                        />
                                    </div>
                                    <div>
                                        {/* Input field for Description */}
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Update the Description</label>
                                        <input
                                            type="text"
                                            placeholder="Description"
                                            value={crmData?.Description || ''} // Use optional chaining
                                            onChange={(e) => setCrmData({ ...crmData, Description: e.target.value })}
                                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-2"
                                        />
                                    </div>
                                    <div>
                                        {/* Input field for Company Name */}
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Update the Company Name</label>
                                        <input
                                            type="text"
                                            placeholder="Company Name"
                                            value={crmData?.CompanyName || ''} // Use optional chaining
                                            onChange={(e) => setCrmData({ ...crmData, CompanyName: e.target.value })}
                                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-2"
                                        />
                                    </div>
                                    <div>
                                        {/*input field for social media links */}
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Update the Social Media Links</label>
                                        <input
                                            type="text"
                                            placeholder="Facebook"
                                            value={crmData?.SocialMedia.Facebook || ''} // Use optional chaining
                                            onChange={(e) => setCrmData({ ...crmData, SocialMedia: { ...crmData.SocialMedia, Facebook: e.target.value } })}
                                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-2" />
                                        <input type="text" placeholder="Twitter" value={crmData?.SocialMedia.Twitter || ''} onChange={(e) => setCrmData({ ...crmData, SocialMedia: { ...crmData.SocialMedia, Twitter: e.target.value } })} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-2" />
                                        <input type="text" placeholder="LinkedIn" value={crmData?.SocialMedia.LinkedIn || ''} onChange={(e) => setCrmData({ ...crmData, SocialMedia: { ...crmData.SocialMedia, LinkedIn: e.target.value } })} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-2" />
                                        <input type="text" placeholder="Instagram" value={crmData?.SocialMedia.Instagram || ''} onChange={(e) => setCrmData({ ...crmData, SocialMedia: { ...crmData.SocialMedia, Instagram: e.target.value } })} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-2" />
                                    </div>

                                    <div className='mt-5 px-10'>
                                        <button
                                            type="submit"
                                            className="mb-5 inline-flex items-center justify-center rounded-md border  py-4 px-10 text-center font-medium  hover:bg-opacity-90 lg:px-8 xl:px-10 focus:outline-none focus:shadow-outline cursor-pointer 
                    border-red-900 bg-red-800 p-4 text-white transition
                     dark:bg-cyan-900
               dark:hover:bg-cyan-700 dark:focus:ring-cyan-400 dark:border-cyan-900"
                                        >
                                            Update Terms of Service
                                        </button>
                                    </div>
                                </form>
                            )
                        )}
                    </div>
                </div>
            </div>
        </DefaultLayoutAdmin>
    );
};

// Export the AccountSecurity component
export default AccountSecurityAdmin;