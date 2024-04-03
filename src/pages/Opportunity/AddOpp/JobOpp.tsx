import React, { useState } from 'react';
import DefaultLayout from "../../../layout/DefaultLayout";
import JobLocation from '../AddOpp/JobLocation';
import { input } from '@material-tailwind/react';
import { AddJob } from '../../api/opportunity';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../ApiSlices/authSlice';
import { Link } from 'react-router-dom';

// //Essai avant de lié avec un compte user
// const defaultUser = {
//     username: 'testuser',
// };

const JobOpp: React.FC = () => {

    const [jobCommpanyName, setjobCommpanyName] = useState('')
    const [jobTitle, setjobTitle] = useState('')
    const [jobAdress, setjobAdress] = useState('')
    const [jobLocation, setjobLocation] = useState()
    const [jobDescription, setjobDescription] = useState('')
    const [salary, setsalary] = useState('')
    const [jobPost, setjobPost] = useState('')
    const [jobfield, setjobfield] = useState()
    const [jobStartDate, setjobStartDate] = useState('')
    const [jobApplicationDeadline, setjobApplicationDeadline] = useState('')
    const [jobRequiredSkills, setjobRequiredSkills] = useState('')
    const [jobRequiredEducation, setjobRequiredEducation] = useState()
    const [jobRequiredExperience, setjobRequiredExperience] = useState()
    const [contactNumber, setcontactNumber] = useState('')
    const [jobOtherInformation, setjobOtherInformation] = useState('')
    const [jobImage, setjobImage] = useState('')


    const [showModal, setShowModal] = useState(false);
    const [showModalBack, setShowModalBack] = useState(false);

    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // New state

    const currentUser = useSelector(selectCurrentUser);
    //const currentUser = useSelector(selectCurrentUser) || defaultUser;

    const [errors, setErrors] = useState({});


    



    const handleAddOpportunity = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Empêche le comportement par défaut du formulaire
            setShowModal(true);

    };

    const handleCancel = () => {
        setShowModal(false);
    };

    const handleConfirm = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try {
            //Obtenir la date actuelle
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString();
            const jobData = {
                jobCommpanyName: currentUser.username,
                jobImage: currentUser.image,
                jobTitle: jobTitle,
                jobAdress: jobAdress,
                jobLocation: jobLocation,
                jobDescription: jobDescription,
                salary: salary,
                jobPost: jobPost,
                jobfield: jobfield,
                jobStartDate: formattedDate,
                jobApplicationDeadline: jobApplicationDeadline,
                jobRequiredSkills: jobRequiredSkills,
                jobRequiredEducation: jobRequiredEducation,
                jobRequiredExperience: jobRequiredExperience,
                contactNumber: contactNumber,
                jobOtherInformation: jobOtherInformation,
            };
            await AddJob(currentUser.username, jobData);
            setShowModal(false);
            setShowSuccessMessage(true); // Mettre à jour l'état pour afficher le message de succès
            setTimeout(() => {
                setShowSuccessMessage(false); // Cacher le message de succès après quelques secondes
                window.location.href = '/Profilecompany'; // Rediriger après l'ajout avec succès
            }, 3000);

            console.log("Job added successfully");
        } catch (error: any) {
            console.error('An error occurred while adding job:', error);
        }
    };


    //////////////pour le retour au profil//////////////////////
    const handleShowModalBack = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setShowModalBack(true);
    };

    const handleConfirmBack = () => {
        window.location.href = '/Profilecompany'; // Rediriger vers le profil
    };

    const handleCancelBack = () => {
        setShowModalBack(false); // Fermer le modal sans effectuer d'action
    };




    return (
        <DefaultLayout>
            {showSuccessMessage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-opacity-50">
                    <div className="bg-green-400 p-6 rounded-lg">
                        <p className='text-white'>Opportunity added successfully!</p>
                        <button
                            onClick={() => setShowSuccessMessage(false)}
                            className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            )}


            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg">
                        <p className="text-black">
                            Are you sure you want to add this opportunity?
                        </p>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={handleConfirm}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 mr-2"
                            >
                                Confirm
                            </button>
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-md hover:bg-red-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showModalBack && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg">
                        <p className="text-black">
                            Are you sure you want to go back to your profile?
                        </p>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={handleConfirmBack} // Confirme et redirige vers le profil
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 mr-2"
                            >
                                Confirm
                            </button>
                            <button
                                onClick={handleCancelBack} // Annule et ferme le modal
                                className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-md hover:bg-red-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}


            <div>
                <body className="bg-cream text-charcoal min-h-screen font-sans leading-normal overflow-x-hidden lg:overflow-auto pb-8">
                    <main className="flex-1 md:p-0 lg:pt-8 lg:px-8 md:mx-24 flex flex-col">
                        <section className="bg-white p-4 shadow-6 ">
                            <div className="md:flex items-center justify-center">
                                <h2 className="text-center text-esprit text-4xl font-bold mb-6">Create A New Job</h2>
                            </div>
                            <hr className="w-full border-t border-gray-100 mb-1"></hr>
                            <hr className="w-full border-t border-gray-100 mb-10"></hr>

                            <form>
                                <div className="md:flex mb-8">
                                    <div className="md:w-1/3">
                                        <legend className="uppercase tracking-wide  text-m">Job Information</legend>
                                        <p className="text-xs font-light text-esprit">** This entire section is required.</p>
                                    </div>
                                    <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-xs font-bold text-OppSarra2R">Title</label>
                                            <input onChange={e => setjobTitle(e.target.value)} className="w-full shadow-4 p-4 border-0 xs" type="text" name="name" placeholder=" Acme Mfg. Co." />
                                            
                                        </div>

                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold text-OppSarra2R">Job Field</label>
                                            <select className="w-full shadow-4 p-4 border-0" name="jobType" value={jobfield}
                                                onChange={e => setjobfield(e.target.value)}>
                                                    <option value=""></option>
                                                <option value="Computer Science">Computer Science</option>
                                                <option value="Mechanical Engineering">Mechanical Engineering</option>
                                                <option value="Electromechanical Engineering">Electromechanical Engineering</option>
                                                <option value="Civil Engineering">Civil Engineering</option>
                                                <option value="Business">Business</option>
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-xs font-bold text-OppSarra2R">Post</label>
                                            <input className="w-full shadow-4 p-4 border-0 xs" type="text" name="name" placeholder=" Acme Mfg. Co." onChange={e => setjobPost(e.target.value)} />
                                            
                                        </div>
                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold text-OppSarra2R">Application Deadline</label>
                                            <input className="w-full shadow-4 p-4 border-0" type="date" name="address_number" placeholder="#3" onChange={e => setjobApplicationDeadline(e.target.value)} />
                                            
                                        </div>
                                        <div className="md:flex mb-4">
                                            <div className="md:flex-1 md:pr-3">
                                                <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold text-OppSarra2R">Salary</label>
                                                <input className="w-full shadow-4 p-4 border-0" type="text" name="lat" placeholder="30.0455542" onChange={e => setsalary(e.target.value)} />
                                                
                                            </div>
                                            <div className="md:flex-1 md:pl-3">
                                                <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold text-OppSarra2R">Reference Contact</label>
                                                <input className="w-full shadow-4 p-4 border-0" type="tel" name="lon" placeholder="(555) 555-5555" onChange={e => setcontactNumber(e.target.value)} />
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className="w-full border-t border-graydouble mb-10"></hr>
                                <div className="md:flex mb-8">
                                    <div className="md:w-1/3">
                                        <legend className="uppercase tracking-wide text-m">Description</legend>
                                        <p className="text-xs font-light text-esprit">** This entire section is required.</p>
                                    </div>
                                    <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                                        <textarea className="w-full shadow-4 p-4 border-0" placeholder="We build fine acmes." rows="2" onChange={e => setjobDescription(e.target.value)}></textarea>
                                        
                                    </div>
                                </div>
                                <hr className="w-full border-t border-graydouble mb-10"></hr>
                                <div className="md:flex mb-8">
                                    <div className="md:w-1/3">
                                        <legend className="uppercase tracking-wide text-m">Job Requirements</legend>
                                        <p className="text-xs font-light text-esprit">** This entire section is required.</p>
                                    </div>
                                    <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">

                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-xs font-bold text-OppSarra2R">Address</label>
                                            <input className="w-full shadow-4 p-4 border-0 xs" type="text" name="name" placeholder=" Acme Mfg. Co." onChange={e => setjobAdress(e.target.value)} />
                                            
                                        </div>
                                        <JobLocation
                                            value={jobLocation}
                                            onChange={newValue => setjobLocation(newValue)}
                                        />


                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold text-OppSarra2R">required skills</label>
                                            <textarea className="w-full shadow-4 p-4 border-0" placeholder="required skills" rows="2" onChange={e => setjobRequiredSkills(e.target.value)}></textarea>
                                            
                                        </div>
                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold text-OppSarra2R">required education</label>
                                            <select className="w-full shadow-4 p-4 border-0" name="jobType" value={jobRequiredEducation}
                                                onChange={e => setjobRequiredEducation(e.target.value)}>
                                                <option value="Bachelor's degree">Bachelor degree</option>
                                                <option value="Engineering degree">Engineering degree</option>
                                            </select>
                                            
                                        </div>
                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold text-OppSarra2R">required experience</label>
                                            <select className="w-full shadow-4 p-4 border-0" name="jobType" value={jobRequiredExperience}
                                                onChange={e => setjobRequiredExperience(e.target.value)}>
                                                    <option value=""></option>
                                                <option value="Junior">Junior</option>
                                                <option value="Senior">Senior</option>
                                                <option value="Experienced">Experienced</option>
                                            </select>
                                            
                                        </div>
                                    </div>
                                </div>
                                <hr className="w-full border-t border-graydouble mb-10"></hr>
                                <div className="md:flex mb-8">
                                    <div className="md:w-1/3">
                                        <legend className="uppercase tracking-wide text-m">Additional Information</legend>
                                    </div>
                                    <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold text-OppSarra2R">additional Info</label>
                                            <textarea className="w-full shadow-4 p-4 border-0" placeholder="required skills" rows="2" onChange={e => setjobOtherInformation(e.target.value)}></textarea>
                                        </div>
                                    </div>
                                </div>
                                <hr className="w-full border-t border-gray-100 mb-1"></hr>
                                <div className="md:flex mb-6 border border-t-1 border-b-0 border-x-0 border-cream-dark">
                                    <div className="md:flex-1 px-3 text-center md:text-left">
                                        <Link to="/Profilecompany">
                                            <button
                                                onClick={handleShowModalBack} // Affiche le modal
                                                className="bg-red-300 hover:bg-esprit text-white font-bold py-3 px-6 mt-6 rounded-full shadow-lg hover:text-white shadow-white transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce">
                                                Back to Profile
                                            </button>
                                        </Link>
                                    </div>

                                    <div className="md:flex-1 px-3 text-center md:text-right">
                                        <button
                                            onClick={handleAddOpportunity}
                                            className="bg-green-400 hover:bg-green-600 text-white font-bold py-3 px-6 mt-6 rounded-full shadow-lg hover:text-white shadow-white transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce">
                                            Add Opportunity
                                        </button>
                                    </div>
                                </div>

                            </form>
                        </section>
                    </main>
                </body>

            </div>

        </DefaultLayout>
    );
};
export default JobOpp;