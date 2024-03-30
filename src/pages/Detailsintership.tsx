import DefaultLayout from "../layout/DefaultLayout";
import { useSelector } from 'react-redux';
import { useState } from "react";
import userSix from '../images/user/user-06.png';
import userfive from '../images/user/user-05.png';
import { selectCurrentUser } from '../ApiSlices/authSlice';
import { useParams } from "react-router";
interface Job {
    _id: string;
    jobTitle: string;
    jobDescription: string;
    jobLocation: string;
    salary: number;
    jobPost: string;
    jobfield: string;
    jobStartDate: string;
    jobApplicationDeadline: string;
    jobRequiredSkills: string;
    jobRequiredEducation: string;
    jobRequiredExperience: string;
    jobOtherInformation: string;
}


const formatDate = (dateString: string) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
}
const Detailsintership = () => {
    const currentUser = useSelector(selectCurrentUser);
    const acceptApplication = (candidateId) => {
        // Implémentez ici la logique pour accepter la candidature avec l'ID du candidat
        console.log(`Candidature acceptée pour le candidat avec l'ID ${candidateId}`);
    }

    // Fonction pour rejeter une candidature
    const rejectApplication = (candidateId) => {
        // Implémentez ici la logique pour rejeter la candidature avec l'ID du candidat
        console.log(`Candidature rejetée pour le candidat avec l'ID ${candidateId}`);
    }
    
    const { id } = useParams();
    console.log(id);

    const offer = currentUser?.intership.find(intership => intership._id === id);
    console.log(offer);
    if (!offer) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <DefaultLayout>
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">




                    {offer && (
                        <div key={offer._id} className="p-6 bg-white shadow-md rounded-lg mb-4">
                            <div className="flex items-center mb-4">
                                <img src={currentUser.image} className="w-20 h-20 rounded-full overflow-hidden object-cover" />
                                <h2 className="text-xl font-semibold ml-4">{offer.interTitle}</h2>
                            </div>
                            <div className="flex items-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-6 h-6 text-red-800 mr-2">
                                    <path d="M21 10c0 6-9 13-9 13s-9-7-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                                <span className="text-gray-600">{offer.interLocation}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-6 h-6 text-red-800 mr-2">
                                    <path d="M21 6h-4V4a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v2H3a1 1 0 0 0-1 1v13a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a1 1 0 0 0-1-1zm-9-2h2v2h-2V4zM5 8h14M3 12h18M6 16h12"></path>
                                </svg>
                                <div className="text-sm text-gray-600">{offer.interPost}</div>
                            </div>
                            <div className="flex items-center mb-2">
                                <svg className="w-6 h-6 text-red-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M7 2a2 2 0 0 0-2 2v1a1 1 0 0 0 0 2v1a1 1 0 0 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H7Zm3 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm-1 7a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3 1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1Z" clip-rule="evenodd" />
                                </svg>

                                <div className="text-sm text-gray-600 mb-2">{offer.interfield}</div>
                            </div>
                            <div className="flex items-center text-sm text-gray-600 mb-2">
                                <svg className="w-6 h-6 text-red-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24  ">
                                    <path fill-rule="evenodd" d="M6 5V4a1 1 0 1 1 2 0v1h3V4a1 1 0 1 1 2 0v1h3V4a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v2H3V7a2 2 0 0 1 2-2h1ZM3 19v-8h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm5-6a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8Z" clip-rule="evenodd" />
                                </svg>


                                <b className="text-black">Intership Start Date:</b> <span className="mr-4">{formatDate(offer.interStartDate)}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-6 h-6 text-red-800 mr-2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="8" x2="12" y2="12"></line>
                                    <line x1="12" y1="16" x2="12" y2="16"></line>
                                </svg>
                                <b className="text-black">Intership Application Deadline:</b> <span>{formatDate(offer.interApplicationDeadline)}</span>
                            </div>
                            <div className="border-t border-gray-200 pt-4">
                                <h3 className="text- text-black font-semibold mb-2">About the Intership Offer</h3>
                                <p className="text-gray-800">{offer.interDescription}</p>
                            </div>


                            <div className="border-t border-gray-200 pt-4">
                                <h3 className="text-lg font-semibold mb-2 text-black">Qualifications</h3>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                    <div className="mb-4">
                                        <h4 className="text-red-800 font-semibold mb-1">Required Skills</h4>
                                        <p className="text-gray-800">{offer.interRequiredSkills}</p>
                                    </div>
                                    <div className="mb-4">
                                        <h4 className="text-red-800 font-semibold mb-1">Required Education</h4>
                                        <p className="text-gray-800">{offer.interRequiredEducation}</p>
                                    </div>
                                    <div className="mb-4">
                                        <h4 className="text-red-800 font-semibold mb-1">Other Information</h4>
                                        <p className="text-gray-800">{offer.interOtherInformation}</p>
                                    </div>
                                </div>
                            </div>


                            <div className="border-t border-gray-200 pt-4"></div>



                        </div>
                    )}


                    <div className="p-6 bg-white shadow-md rounded-lg mb-4">
                        <h2 className="text-lg font-semibold mb-2 text-black">Applications</h2>
                        <input
                            type="text"
                            placeholder="Search..."
                            value=""

                            className="p-2 border border-gray-300 rounded-lg mb-4"
                        />
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gradient-to-r  from-appfarah via-apptwofarah to-appthre  text-white">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Candidate Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date Applied</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">CV</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0">
                                                <img src={userSix} alt="User Avatar" className="w-full h-full rounded-full" />
                                            </div>
                                            <span className="ml-3 font-semibold text-gray-800">John Doe</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">john.doe@example.com</td>
                                    <td className="px-6 py-4 whitespace-nowrap">2024-03-25</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <a href="#" className="text-blue-600 hover:text-blue-900">View CV</a>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button onClick={() => acceptApplication(2)} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Accept</button>
                                        <button onClick={() => rejectApplication(2)} className="bg-red-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-red-600">Reject</button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0">
                                                <img src={userfive} alt="User Avatar" className="w-full h-full rounded-full" />
                                            </div>
                                            <span className="ml-3 font-semibold text-gray-800">Jane Smith</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">jane.smith@example.com</td>
                                    <td className="px-6 py-4 whitespace-nowrap">2024-03-26</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <a href="#" className="text-blue-600 hover:text-blue-900">View CV</a>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button onClick={() => acceptApplication(2)} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Accept</button>
                                        <button onClick={() => rejectApplication(2)} className="bg-red-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-red-600">Reject</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        
                    </div>
                </div >
            </DefaultLayout>
        </>);
}

export default Detailsintership;