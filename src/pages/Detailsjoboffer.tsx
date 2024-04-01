import DefaultLayout from "../layout/DefaultLayout";
import { useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import userSix from '../images/user/user-06.png';
import userfive from '../images/user/user-05.png';
import { selectCurrentUser } from '../ApiSlices/authSlice';
import { useParams } from "react-router";
import { getUserImage } from "./api";
import { Link } from "react-router-dom";

const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
}
const Detailsjoboffer = () => {

    const acceptApplication = (candidateId) => {
        // Implémentez ici la logique pour accepter la candidature avec l'ID du candidat
        console.log(`Candidature acceptée pour le candidat avec l'ID ${candidateId}`);
    }

    // Fonction pour rejeter une candidature
    const rejectApplication = (candidateId) => {
        // Implémentez ici la logique pour rejeter la candidature avec l'ID du candidat
        console.log(`Candidature rejetée pour le candidat avec l'ID ${candidateId}`);
    }
    const currentUser = useSelector(selectCurrentUser);
    console.log(currentUser);
    const { jobId } = useParams();
    console.log("ID from Params:", jobId);

    const offer = currentUser?.job.filter(job => job !== null).find(job => job._id === jobId);
    console.log("Offer:", offer);
    if (!offer) {
        return <div>Loading...</div>;
    }
    const [jobApplications, setJobApplications] = useState([]);

    //************l'affichage des donne */
    useEffect(() => {

        const fetchJobApplications = async () => {
            try {
                const response = await fetch(`http://localhost:3001/job/getapp/${jobId}`, {
                    method: 'GET',

                });
                if (!response.ok) {
                    throw new Error('Failed to fetch job applications');
                }
                const data = await response.json();
                setJobApplications(data);
            } catch (error) {
                console.error('Error fetching job applications:', error);
            }
        };

        fetchJobApplications();

    }, [jobId]);
    //////////////// methode pour recuper image de user 
    const [userImage, setUserImage] = useState(null);
    const applicantUsername = jobApplications.applicantUsername;
    console.log(applicantUsername);
    useEffect(() => {
        const fetchUserImage = async () => {
            try {
                const imageData = await getUserImage(applicantUsername);
                setUserImage(imageData); // Mettre à jour l'état avec l'URL de l'image
            } catch (error) {
                console.error('Error fetching user image:', error);
            }
        };

        fetchUserImage();
    }, [applicantUsername]);
    //*************************** Modal */
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = (index) => {
        setSelectedApplication(jobApplications[index]);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedApplication(null);
        setIsModalOpen(false);
    };
    //////////******************** le trie de tableau  */
    const [sortByDate, setSortByDate] = useState(false);
    const [sortedApplications, setSortedApplications] = useState([...jobApplications]);
    const sortByDateApplied = () => {
        const sorted = [...jobApplications].sort((a, b) => {
            const dateA = new Date(a.submitDate);
            const dateB = new Date(b.submitDate);
            return dateA - dateB;
        });
        setSortedApplications(sorted);
    };
    const handleSortByDateChange = () => {
        setSortByDate(!sortByDate);
        if (!sortByDate) {
            sortByDateApplied();
        } else {
            setSortedApplications([...jobApplications]);
        }
    };
    ///////////////////////////////commmaintaire dans le modale 
    const [comments, setCommentaire] = useState('');
    const saveComments = () => {
        // Mettre en œuvre la logique pour sauvegarder les commentaires dans la base de données
    };
    ///////////////////////////////search bar 
    const [searchValue, setSearchValue] = useState('');
    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };
    const filteredApplications = jobApplications.filter((application) =>
    application.applicantUsername.toLowerCase().includes(searchValue.toLowerCase())
 );
    return (
        <>
            <DefaultLayout>
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">




                    {offer && (
                        <div key={offer._id} className="p-6 bg-white shadow-md rounded-lg mb-4">
                            <div className="flex items-center mb-4">
                                <img src={currentUser.image} className="w-20 h-20 rounded-full overflow-hidden object-cover" />
                                <h2 className="text-xl font-semibold ml-4">{offer.jobTitle}</h2>
                            </div>
                            <div className="flex items-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-6 h-6 text-red-800 mr-2">
                                    <path d="M21 10c0 6-9 13-9 13s-9-7-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                                <span className="text-gray-600">{offer.jobLocation}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-6 h-6 text-red-800 mr-2">
                                    <path d="M21 6h-4V4a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v2H3a1 1 0 0 0-1 1v13a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a1 1 0 0 0-1-1zm-9-2h2v2h-2V4zM5 8h14M3 12h18M6 16h12"></path>
                                </svg>
                                <div className="text-sm text-gray-600">{offer.jobPost}</div>
                            </div>
                            <div className="flex items-center mb-2">
                                <svg className="w-6 h-6 text-red-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M7 2a2 2 0 0 0-2 2v1a1 1 0 0 0 0 2v1a1 1 0 0 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H7Zm3 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm-1 7a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3 1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1Z" clip-rule="evenodd" />
                                </svg>

                                <div className="text-sm text-gray-600 mb-2">{offer.jobfield}</div>
                            </div>
                            <div className="flex items-center text-sm text-gray-600 mb-2">
                                <svg className="w-6 h-6 text-red-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24  ">
                                    <path fill-rule="evenodd" d="M6 5V4a1 1 0 1 1 2 0v1h3V4a1 1 0 1 1 2 0v1h3V4a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v2H3V7a2 2 0 0 1 2-2h1ZM3 19v-8h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm5-6a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8Z" clip-rule="evenodd" />
                                </svg>


                                <b className="text-black">Job Start Date:</b> <span className="mr-4">{formatDate(offer.jobStartDate)}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-6 h-6 text-red-800 mr-2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="8" x2="12" y2="12"></line>
                                    <line x1="12" y1="16" x2="12" y2="16"></line>
                                </svg>
                                <b className="text-black">Job Application Deadline:</b> <span>{formatDate(offer.jobApplicationDeadline)}</span>
                            </div>
                            <div className="border-t border-gray-200 pt-4">
                                <h3 className="text- text-black font-semibold mb-2">About the Job Offer</h3>
                                <p className="text-gray-800">{offer.jobDescription}</p>
                            </div>


                            <div className="border-t border-gray-200 pt-4">
                                <h3 className="text-lg font-semibold mb-2 text-black">Qualifications</h3>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                    <div className="mb-4">
                                        <h4 className="text-red-800 font-semibold mb-1">Required Skills</h4>
                                        <p className="text-gray-800">{offer.jobRequiredSkills}</p>
                                    </div>
                                    <div className="mb-4">
                                        <h4 className="text-red-800 font-semibold mb-1">Required Education</h4>
                                        <p className="text-gray-800">{offer.jobRequiredEducation}</p>
                                    </div>
                                    <div className="mb-4">
                                        <h4 className="text-red-800 font-semibold mb-1">Required Experience</h4>
                                        <p className="text-gray-800">{offer.jobRequiredExperience}</p>
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
                            value={searchValue}
                            onChange={handleSearchChange}
                            className="p-2 border border-gray-300 rounded-lg mb-4"
                        />
                        <div className="flex items-center  md:flex-row items-center md:items-start  ml-[900px]  mt-2">
                            <label className="inline-flex mr-4 items-center cursor-pointer text-base text-gray-700 transition-colors duration-300 hover:text-gray-600 focus:outline-none">
                                <input type="checkbox" className="hidden" checked={sortByDate} onChange={handleSortByDateChange} />
                                <span className={`relative flex-shrink-0 w-5 h-5 mr-1 border-2 border-gray-300 rounded-md transition-colors duration-300 bg-white ${sortByDate ? 'bg-gray-700 border-transparent' : ''}`}>
                                    {sortByDate && (
                                        <span className="absolute inset-0 flex items-center justify-center text-black">
                                            <svg className="w-6 h-6 text-black fill-current" viewBox="0 0 24 24">
                                                <path d="M10 17l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                                            </svg>
                                        </span>
                                    )}
                                </span>
                                Sort by Date Applied
                            </label>
                            <div className="text-sm font-semibold text-gray-700 mr-2">Total Applications:</div>
                            <div className="text-lg font-bold text-appthre">{jobApplications.length}</div>

                        </div>


                        <div className="overflow-x-auto">

                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gradient-to-r  from-appfarah via-apptwofarah to-appthre  text-white">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Candidate Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date Applied</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">CV</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Phone number</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {sortByDate ? (
                                    sortedApplications.map((application, index) => (

                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0">
                                                        {userImage ? (
                                                            <img src={userImage} alt="User Avatar" className="w-full h-full rounded-full" />
                                                        ) : (
                                                            <div src={userSix} className="w-full h-full rounded-full"></div>
                                                        )}
                                                    </div>
                                                    <span className="ml-3 font-semibold text-gray-800">{application.applicantUsername}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{application.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{formatDate(application.submitDate)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">

                                                <a href={application.resume} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-900">View CV</a>

                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{application.phoneNumber}</td>
                                            <td className="px-6 flex items-center py-4 whitespace-nowrap">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 cursor-pointer text-green-500 dark:text-green-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 cursor-pointer text-red-500 dark:text-red-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                    <circle cx="12" cy="12" r="10"></circle>
                                                    <line x1="15" y1="9" x2="9" y2="15"></line>
                                                    <line x1="9" y1="9" x2="15" y2="15"></line>
                                                </svg>
                                                <svg onClick={() => handleOpenModal(index)} className="w-6 h-6 text-blue-500 cursor-pointer dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                                                    <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>

                                            </td>
                                        </tr>
                                       ))

                                       ) : ( filteredApplications.length > 0 ? (
                                        filteredApplications.map((application, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0">
                                                        {userImage ? (
                                                            <img src={userImage} alt="User Avatar" className="w-full h-full rounded-full" />
                                                        ) : (
                                                            <div src={userSix} className="w-full h-full rounded-full"></div>
                                                        )}
                                                    </div>
                                                    <span className="ml-3 font-semibold text-gray-800">{application.applicantUsername}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{application.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{formatDate(application.submitDate)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <a href={application.resume} downloadclassName="text-blue-600 hover:text-blue-900">View CV</a>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{application.phoneNumber}</td>
                                            <td className="px-6 flex items-center py-4 whitespace-nowrap">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 cursor-pointer text-green-500 dark:text-green-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 cursor-pointer text-red-500 dark:text-red-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                    <circle cx="12" cy="12" r="10"></circle>
                                                    <line x1="15" y1="9" x2="9" y2="15"></line>
                                                    <line x1="9" y1="9" x2="15" y2="15"></line>
                                                </svg>
                                                <svg onClick={() => handleOpenModal(index)} className="w-6 h-6 text-blue-500 cursor-pointer dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                                                    <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>

                                            </td>
                                            </tr>
                                        ))
                                ) : (

                                    jobApplications.map((application, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0">
                                                        {userImage ? (
                                                            <img src={userImage} alt="User Avatar" className="w-full h-full rounded-full" />
                                                        ) : (
                                                            <div src={userSix} className="w-full h-full rounded-full"></div>
                                                        )}
                                                    </div>
                                                    <span className="ml-3 font-semibold text-gray-800">{application.applicantUsername}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{application.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{formatDate(application.submitDate)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <a href={application.resume} downloadclassName="text-blue-600 hover:text-blue-900">View CV</a>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{application.phoneNumber}</td>
                                            <td className="px-6 flex items-center py-4 whitespace-nowrap">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 cursor-pointer text-green-500 dark:text-green-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 cursor-pointer text-red-500 dark:text-red-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                    <circle cx="12" cy="12" r="10"></circle>
                                                    <line x1="15" y1="9" x2="9" y2="15"></line>
                                                    <line x1="9" y1="9" x2="15" y2="15"></line>
                                                </svg>
                                                <svg onClick={() => handleOpenModal(index)} className="w-6 h-6 text-blue-500 cursor-pointer dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                                                    <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>

                                            </td>
                                        </tr>

                                    ))
                                    ) 
                                    )}

                            </tbody>
                        </table>
                      </div>
                    </div>


                    {isModalOpen && selectedApplication && (
                        <div id="crud-modal" tabIndex={-1} aria-hidden="true" className="fixed inset-0 top-19  z-50 overflow-y-auto">
                            <div className="flex items-center justify-center min-h-screen">
                                <div className="fixed inset-0 bg-black bg-opacity-50"></div>
                                <div className="relative p-4 w-full max-w-5xl mx-auto" >
                                    <div className="relative bg-white rounded-lg shadow">
                                        {/* Modal header */}
                                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 bg-apptwofarah text-white">
                                            <h3 className="text-lg font-semibold">Detail of Application</h3>
                                            <button
                                                type="button"
                                                className="text-gray-200 bg-transparent hover:bg-gray-300 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                                data-modal-toggle="crud-modal"
                                                onClick={handleCloseModal}
                                            >
                                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                                    />
                                                </svg>
                                                <span className="sr-only">Close modal</span>
                                            </button>
                                        </div>

                                        {/* Modal content */}
                                        <div className="p-6">
                                            <div className="mb-4">
                                                <div className="flex items-center mb-2">
                                                    <svg className="w-6 h-6 text-red-800 mr-2 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                        <path fill-rule="evenodd" d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z" clip-rule="evenodd" />
                                                    </svg>

                                                    <p className="text-lg font-semibold text-red-800 mb-0">Username:</p>
                                                </div>
                                                <p className="text-sm ml-6 text-gray-600 mb-2">{selectedApplication.applicantUsername}</p>
                                                <div className="flex items-center mb-2">
                                                    <svg className="w-6 h-6 text-red-800 mr-2 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16v-5.5A3.5 3.5 0 0 0 7.5 7m3.5 9H4v-5.5A3.5 3.5 0 0 1 7.5 7m3.5 9v4M7.5 7H14m0 0V4h2.5M14 7v3m-3.5 6H20v-6a3 3 0 0 0-3-3m-2 9v4m-8-6.5h1" />
                                                    </svg>

                                                    <p className="text-lg font-semibold text-red-800 mb-0">Email:</p>
                                                </div>
                                                <p className="text-sm ml-6  text-gray-600 mb-2">{selectedApplication.email}</p>
                                                <div className="flex items-center mb-2">
                                                    <svg className="w-6 h-6 text-red-800 mr-2 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.427 14.768 17.2 13.542a1.733 1.733 0 0 0-2.45 0l-.613.613a1.732 1.732 0 0 1-2.45 0l-1.838-1.84a1.735 1.735 0 0 1 0-2.452l.612-.613a1.735 1.735 0 0 0 0-2.452L9.237 5.572a1.6 1.6 0 0 0-2.45 0c-3.223 3.2-1.702 6.896 1.519 10.117 3.22 3.221 6.914 4.745 10.12 1.535a1.601 1.601 0 0 0 0-2.456Z" />
                                                    </svg>

                                                    <p className="text-lg font-semibold text-red-800  mb-0">Phone Number:</p>
                                                </div>
                                                <p className="text-sm ml-6 text-gray-600 mb-2">{selectedApplication.phoneNumber}</p>
                                                <div className="flex items-center mb-2">
                                                    <svg className="w-6 h-6 text-red-800 mr-2 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-4m5-13v4a1 1 0 0 1-1 1H5m0 6h9m0 0-2-2m2 2-2 2" />
                                                    </svg>

                                                    <p className="text-lg font-semibold text-red-800 mb-0">Motivation Letter:</p>
                                                </div>
                                                <p className="text-sm ml-6  text-gray-600 mb-4">{selectedApplication.motivationLetter}</p>
                                                <div className="flex items-center mb-2">
                                                    {selectedApplication.status === "Pending" && (
                                                        <svg className="w-6 h-6 text-yellow-500 mr-2 dark:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <circle cx="12" cy="12" r="10"></circle>
                                                            <line x1="12" y1="8" x2="12" y2="12"></line>
                                                            <line x1="12" y1="16" x2="12" y2="16"></line>
                                                        </svg>
                                                    )}
                                                    {selectedApplication.status === "Accepté" && (
                                                        <svg className="w-6 h-6 text-green-500 mr-2 dark:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <circle cx="12" cy="12" r="10"></circle>
                                                            <path d="M9 12l2 2 4-4"></path>
                                                        </svg>
                                                    )}
                                                    {selectedApplication.status === "Rejeté" && (
                                                        <svg className="w-6 h-6 text-red-500 mr-2 dark:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <circle cx="12" cy="12" r="10"></circle>
                                                            <line x1="8" y1="8" x2="16" y2="16"></line>
                                                            <line x1="8" y1="16" x2="16" y2="8"></line>
                                                        </svg>
                                                    )}

                                                    <p className="text-lg font-semibold text-red-800 mb-0">Statut :</p>
                                                </div>
                                                <p className="text-sm ml-6 text-gray-600 mb-4">{selectedApplication.status}</p>
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="comments" className="block text-lg font-semibold text-red-800 mb-2">Add comments:</label>
                                                <textarea
                                                    id="comments"
                                                    className="w-full h-24 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-red-600 sm:text-sm"
                                                    placeholder="Enter your comments here..."
                                                    value={comments}
                                                    onChange={(e) => setCommentaire(e.target.value)} // Gérer le changement de la valeur des commentaires
                                                ></textarea>
                                            </div>

                                            {/* Bouton pour sauvegarder les commentaires */}
                                            <button
                                                className="bg-apptwofarah text-white font-semibold py-2 px-4 rounded hover:bg-red-800"
                                                onClick={saveComments}
                                            >
                                                Add comments
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}
                </div >
            </DefaultLayout>
        </>);
}

export default Detailsjoboffer;