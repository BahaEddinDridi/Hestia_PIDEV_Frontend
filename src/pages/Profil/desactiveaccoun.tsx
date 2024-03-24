
import DefaultLayout from '../../layout/DefaultLayout';
import { useState } from 'react';
import { deactivateAccount } from '../api';
import { Link, useNavigate } from "react-router-dom";
const DesactiveAccount = () => {
    const navigate = useNavigate();
    const [duration, setDuration] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const handleDurationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDuration(event.target.value);
    };
    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Selected duration:", duration);
        setShowModal(true);
    };
    const handleConfirmDeactivate = async () => {
        setShowModal(false);
        try {
            if (isNaN(parseInt(duration)) && duration !== 'deactivate the account forever') {
                console.error('Invalid duration value');
                return;
            }

            const response = await deactivateAccount(username, duration.toString(), password);

            if (response) {
                if (response.success) {
                    console.log(response.message);
                    setSuccessMessage('Account desactivated');
                    setTimeout(() => {
                        navigate('/auth/signin');
                      }, 2000);
                } else {
                    console.error(response.error);
                }
            } else {
                console.error('Response is undefined');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Error desactivated account');
        }
    };
    return (
        <>
            <DefaultLayout>
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Disabled Account
                        </h3>
                    </div>
                    <div className="flex flex-col gap-5.5 p-6.5">
                        <h1 className="text-2xl text-red-800 font-bold mb-4">Deactivation Options:</h1>
                        <div className="text-black dark:text-white">
                            <h3 className="font-semibold mb-2">1. Deactivate Account for a Specific Duration:</h3>
                            <ul className="list-disc pl-6">
                                <li>Choose a specific duration to temporarily deactivate your account.</li>
                                <li>Your account will be inactive for the selected duration.</li>
                                <li>After the specified time period, your account will automatically reactivate.</li>
                            </ul>
                        </div>
                        <div className="text-black dark:text-white">
                            <h3 className="font-semibold mb-2">2. Deactivate Account Indefinitely:</h3>
                            <ul className="list-disc pl-6">
                                <li> Select this option to permanently deactivate your account.</li>
                                <li>Your account will remain inactive indefinitely.</li>
                                <li>You will lose access to your account and its features permanently.</li>
                            </ul>

                        </div>
                        <h1 className="text-2xl text-red-800 font-bold mb-4">Important Notes:</h1>
                        <p className="text-black dark:text-white">Deactivating your account will restrict access to all associated services and features.
                            Please ensure you understand the consequences of deactivating your account before proceeding.
                            Once deactivated, you may not be able to recover your account or its data.</p>
                        <p className="text-red-800 font-semibold mt-4">Please ensure you understand the consequences of deactivating your account before proceeding.</p>
                        <p>If you have any questions or need assistance, please <Link to="/" className='hover:text-primary'> contact our support team </Link> for further assistance.</p>

                        <form className="max-w-sm mx-auto" onSubmit={handleFormSubmit}>
                            {successMessage && (
                                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mt-4">
                                    {successMessage}
                                </div>
                            )}
                            {errorMessage && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mt-4">
                                    {errorMessage}
                                </div>
                            )}
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <label htmlFor="country" className="block mb-2 text-sm font-medium text-black dark:text-white"><b>selecting how much you want the account to be deactivated </b></label>
                            <div className="">
                                <select id="countries" name="duration" className="flex-1 mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    onChange={handleDurationChange}
                                    value={duration}
                                >
                                    <option selected disabled hidden>Choose the duration </option>
                                    <option value="1">1</option>
                                    <option value="24">24</option>
                                    <option value="48">48</option>
                                    <option value="deactivate the account forever">deactivate the account forever</option>
                                </select>

                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />


                            </div>
                            <div className="flex justify-center gap-4.5 mb-5 mt-5">
                                <Link to="/profile">
                                    <button
                                        className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"

                                    >
                                        Cancel
                                    </button>
                                </Link>
                                <button
                                    className=" flex  justify-center rounded-md border  py-2 px-6  text-center font-medium  hover:bg-opacity-90 lg:px-8 xl:px-10 focus:outline-none focus:shadow-outline cursor-pointer 
                                      border-red-900 bg-red-800 p-4 text-white transition
                                      dark:bg-red-500
                                      dark:hover:bg-red-400 dark:focus:ring-red-300 dark:border-red-900"
                                    type="submit"

                                >
                                    Save

                                </button>
                            </div>
                        </form>

                    </div>


                </div >
                {showModal && (
                    <div
                        id="crud-modal"
                        tabIndex={-1}
                        aria-hidden="true"
                        className="fixed inset-0 z-50 overflow-y-auto"
                    >
                        <div className="flex items-center justify-center min-h-screen">
                            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                            <div className="relative p-4 w-full max-w-md">
                                <div className="relative bg-white rounded-lg shadow-lg">
                                    {/* Modal header */}
                                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                        <h3 className="text-lg font-semibold text-black dark:text-black">
                                            Deactivate Account
                                        </h3>
                                        <button
                                            type="button"
                                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"

                                            onClick={() => setShowModal(false)}
                                        >
                                            <svg
                                                className="w-3 h-3"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 14 14"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                                />
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </div>

                                    {/* Modal content  */}
                                    <div className="modal-container">
                                        <div className="modal">
                                            <div className="modal-content">
                                                <p className='text-black ml-2'>Are you sure you want to deactivate your account?</p>
                                                <button className="ml-2 mt-5 mb-5 px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700" onClick={handleConfirmDeactivate}>Confirm</button>
                                                <button className="px-4 ml-2  py-2 text-sm font-medium text-red-600 border border-red-600 rounded-md hover:bg-red-50" onClick={() => setShowModal(false)}>Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                )}
            </DefaultLayout >
        </>
    );
}

export default DesactiveAccount;