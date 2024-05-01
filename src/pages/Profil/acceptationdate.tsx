import DefaultLayout from "../../layout/DefaultLayout";
import { selectCurrentUser } from '../../ApiSlices/authSlice';
import { useSelector } from 'react-redux';
import axios from "axios";
import { useState, useEffect } from "react";
import './acceptation.css'

const Acceptationdate = () => {
    const currentUser = useSelector(selectCurrentUser);
    const [message, setMessage] = useState('');
    const [showAnimation, setShowAnimation] = useState(false);
    const [acceptationClicked, setAcceptationClicked] = useState(false);
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdn.lordicon.com/lordicon.js';
        script.async = true;

        const onLoad = () => {
            setShowAnimation(false);
        };

        script.addEventListener('load', onLoad);

        document.body.appendChild(script);

        return () => {
            script.removeEventListener('load', onLoad);
            document.body.removeChild(script);
        };
    }, []);
   
    const handleSelectDate = async (selectedDate) => {
        try {
            const applicantUsername = currentUser.username; // Remplacez par le nom d'utilisateur de l'application
            const date = new Date(selectedDate);
            console.log("Applicant username:", applicantUsername);
            console.log("Selected date:", date.toISOString());
            const response = await axios.put('http://localhost:3001/application/selecteddate', {
                applicantUsername,
                selectedDate: date.toISOString()
            });
            console.log("Response:", response);
            setMessage(response.data.message);

            setShowAnimation(true);
            setTimeout(() => {
                setShowAnimation(false);
            }, 3000);
            setAcceptationClicked(true);
        } catch (error) {
            setMessage('Une erreur s\'est produite lors de la sélection de la date d\'interview.');
            console.error('Error selecting interview date:', error);
        }
    };


    return (

        <>
            <DefaultLayout>
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4">
                    {currentUser && currentUser.applications.map((application, index) => (
                        <div key={index} className="mb-6">
                            <h2 className="text-red-800 text-center font-bold mb-4 mt-6 ">Congratulations, {application.fullName}!</h2>
                            <p className="text-center text-black w-115  mt-9 sm:ml-[400px] lg:ml-[400px] h-30 sm:mt-4 lg:mt-6">The company, <span className="font-bold">{application.companyName}</span>, has reviewed your application for the position of <span className="font-bold">{application.jobTitle}</span> and believes you are an excellent fit. However, before proceeding, we kindly request your availability for an interview.</p>
                            <p className="text-center text-black ">Below are three proposed dates. Please confirm your availability for one of these dates, and ensure punctuality for the interview. Thank you.</p>
                            <div className="interview-dates">
                                <h3 className="text-center text-black font-bold  mb-2">Proposed Interview Dates:</h3>
                                <table className="min-w-full divide-y divide-gray-200  ">
                                    <thead className="bg-gradient-to-r  from-appfarah via-apptwofarah to-appthre text-white">
                                        <tr>
                                            <th className=" py-2 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                                            <th className=" py-2 text-left text-xs font-medium uppercase tracking-wider">Time</th>
                                            <th className=" py-2 text-left text-xs font-medium uppercase tracking-wider">Date Confirmation</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {application.interviewDates && application.interviewDates.map((date, index) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap">{new Date(date).toLocaleDateString()}</td>
                                                <td>{new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                                <td>
                                                {!acceptationClicked && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => handleSelectDate(date)} className="w-6 h-6 mr-2 cursor-pointer text-green-500 dark:text-green-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                    </svg>
                                                      )}
                                                </td>
                                            </tr>

                                        ))}

                                    </tbody>
                                </table>


                            </div>
                        </div>
                    ))}

                    {showAnimation && (
                        <div
                            id="crud-modal"
                            tabIndex={-1}
                            aria-hidden="true"
                            className="fixed inset-0 z-50 overflow-y-auto"
                        >
                            <lord-icon
                                src="https://cdn.lordicon.com/cqofjexf.json"
                                trigger="hover"
                                style={{ width: '100%', height: '100%' }}
                            />
                        </div>
                    )}

                </div>

            </DefaultLayout>

        </>);
}

export default Acceptationdate;