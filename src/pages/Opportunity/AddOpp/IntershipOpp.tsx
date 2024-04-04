import React, { useState } from 'react';
import DefaultLayout from "../../../layout/DefaultLayout";
import JobLocation from '../AddOpp/JobLocation';
import { Alert, input } from '@material-tailwind/react';
import { AddIntership } from '../../api/opportunity';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../ApiSlices/authSlice';
import { Link } from 'react-router-dom';

//Essai avant de lié avec un compte user
// const defaultUser = {
//     username: 'testuser',
// };

const IntershipOpp: React.FC = () => {

    const [interCommpanyName, setinterCommpanyName] = useState('')
    const [interCompanyId, setinterCompanyId] = useState('')
    
    const [interTitle, setinterTitle] = useState('')
    const [interAdress, setinterAdress] = useState('')
    const [interType, setinterType] = useState('')
    const [interLocation, setinterLocation] = useState('')
    const [interDescription, setinterDescription] = useState('')
    const [interPost, setinterPost] = useState('')
    const [interfield, setinterfield] = useState('')
    const [interStartDate, setinterStartDate] = useState('')
    const [interApplicationDeadline, setinterApplicationDeadline] = useState('')
    const [interRequiredSkills, setinterRequiredSkills] = useState('')
    const [interRequiredEducation, setinterRequiredEducation] = useState('')
    const [contactNumber, setcontactNumber] = useState('')
    const [interOtherInformation, setinterOtherInformation] = useState('')
    const [interImage, setinterImage] = useState('')
    const [error, setError] = useState(false)
    const currentUser = useSelector(selectCurrentUser);

    const [showModal, setShowModal] = useState(false);
    const [showModalBack, setShowModalBack] = useState(false);

    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // New state
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const handleAddOpportunity = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (
            interTitle.length === 0 ||
            interAdress.length === 0 ||
            interType.length === 0 ||
            interLocation.length === 0 ||
            interDescription.length === 0 ||
            interPost.length === 0 ||
            interfield.length === 0 ||
            interApplicationDeadline.length === 0 ||
            contactNumber.length === 0 ||
            interRequiredSkills.length === 0 ||
            interRequiredEducation.length === 0
        ) {
            setShowErrorMessage(true); // Affiche le message d'erreur si des données sont manquantes
            setTimeout(() => {
                setShowErrorMessage(false);
            }, 2000);
            setError(true);
        } else {
            setShowModal(true);
        }
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
            const intershipData = {
                interCompanyId:currentUser._id,
                interCommpanyName: currentUser.username,
                interImage: currentUser.image,
                interTitle: interTitle,
                interAdress: interAdress,
                interType: interType,
                interLocation: interLocation,
                interDescription: interDescription,
                interPost: interPost,
                interfield: interfield,
                interStartDate: formattedDate,
                interApplicationDeadline: interApplicationDeadline,
                interRequiredSkills: interRequiredSkills,
                interRequiredEducation: interRequiredEducation,
                contactNumber: contactNumber,
                interOtherInformation: interOtherInformation,
            };
            await AddIntership(currentUser.username, intershipData);
            setShowModal(false);
            setShowSuccessMessage(true); // Mettre à jour l'état pour afficher le message de succès
            setTimeout(() => {
                setShowSuccessMessage(false); // Cacher le message de succès après quelques secondes
                window.location.href = '/Profilecompany'; // Rediriger après l'ajout avec succès
            }, 3000);
            console.log('Intership data:', intershipData);
            console.log("intership added successfully");
        } catch (error: any) {
            setShowModal(false);
            setShowErrorMessage(true); // Affiche le message d'erreur si une erreur survient
            setTimeout(() => {
                setShowErrorMessage(false);
            }, 2000);
            console.error('An error occurred while adding intership:', error);

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



    //const currentUser = useSelector(selectCurrentUser) || defaultUser;





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

            {showErrorMessage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-opacity-50">
                    <div className="bg-red-400 p-6 rounded-lg">
                        <p className="text-white">Please verify your informations.</p>
                        <button
                            onClick={() => setShowErrorMessage(false)}
                            className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
                                <h2 className="text-center text-esprit text-4xl font-bold mb-6">Create A New Internship</h2>
                            </div>
                            <hr className="w-full border-t border-gray-100 mb-1"></hr>
                            <hr className="w-full border-t border-gray-100 mb-10"></hr>

                            <form>
                                <div className="md:flex mb-8">
                                    <div className="md:w-1/3">
                                        <legend className="uppercase tracking-wide  text-m">Internship Information</legend>
                                        <p className="text-xs font-light text-esprit">** This entire section is required.</p>
                                    </div>
                                    <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-xs font-bold text-OppSarra2R">Title</label>
                                            <input onChange={e => setinterTitle(e.target.value)} className="w-full shadow-4 p-4 border-0 xs" type="text" name="name" placeholder=" Acme Mfg. Co." />
                                            {error && interTitle.length <= 0 && (
                                                <label className="text-esprit text-xs">Internship title can't be empty</label>
                                            )}
                                        </div>

                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold text-OppSarra2R">Internship Field</label>
                                            <select className="w-full shadow-4 p-4 border-0" name="jobType" value={interfield}
                                                onChange={e => setinterfield(e.target.value)}>
                                                <option value=""></option>
                                                <option value="Computer Science">Computer Science</option>
                                                <option value="Mechanical Engineering">Mechanical Engineering</option>
                                                <option value="Electromechanical Engineering">Electromechanical Engineering</option>
                                                <option value="Civil Engineering">Civil Engineering</option>
                                                <option value="Business Administration">Business</option>
                                            </select>
                                            {error && interfield.length <= 0 && (
                                                <label className="text-esprit text-xs">Internship field can't be empty</label>
                                            )}
                                        </div>
                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold text-OppSarra2R">Internship Type</label>
                                            <select className="w-full shadow-4 p-4 border-0" name="jobType" value={interType}
                                                onChange={e => setinterType(e.target.value)}>
                                                <option value=""></option>
                                                <option value="Summer Internship">Summer Internship</option>
                                                <option value="PFE Internship">PFE Internship</option>
                                            </select>
                                            {error && interType.length <= 0 && (
                                                <label className="text-esprit text-xs">Internship type can't be empty</label>
                                            )}
                                        </div>
                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold text-OppSarra2R">Reference Contact</label>
                                            <input className="w-full shadow-4 p-4 border-0" type="tel" name="lon" placeholder="(555) 555-5555" onChange={e => setcontactNumber(e.target.value)} />
                                            {error && contactNumber.length <= 0 && (
                                                <label className="text-esprit text-xs">Contact Number can't be empty</label>
                                            )}
                                            {error && !/^\d+$/.test(contactNumber) && contactNumber.length > 0 && (
                                                <label className="text-esprit text-xs">Contact Number must contain only numbers</label>
                                            )}
                                        </div>
                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-xs font-bold text-OppSarra2R">Post</label>
                                            <input className="w-full shadow-4 p-4 border-0 xs" type="text" name="name" placeholder=" Acme Mfg. Co." onChange={e => setinterPost(e.target.value)} />
                                            {error && interPost.length <= 0 && (
                                                <label className="text-esprit text-xs">Internship Post can't be empty</label>
                                            )}
                                        </div>
                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold text-OppSarra2R">Application Deadline</label>
                                            <input className="w-full shadow-4 p-4 border-0" type="date" name="address_number" placeholder="#3" onChange={e => setinterApplicationDeadline(e.target.value)} />
                                            {error && interApplicationDeadline.length <= 0 && (
                                                <label className="text-esprit text-xs">Application Deadline can't be empty</label>
                                            )}
                                            {error && new Date(interApplicationDeadline) <= new Date() && interApplicationDeadline.length > 0 && (
                                                <label className="text-esprit text-xs">Application Deadline must be greater than the current date</label>
                                            )}
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
                                        <textarea className="w-full shadow-4 p-4 border-0" placeholder="We build fine acmes." rows="2" onChange={e => setinterDescription(e.target.value)}></textarea>
                                        {error && interDescription.length <= 0 && (
                                            <label className="text-esprit text-xs">Description can't be empty</label>
                                        )}
                                    </div>
                                </div>
                                <hr className="w-full border-t border-graydouble mb-10"></hr>
                                <div className="md:flex mb-8">
                                    <div className="md:w-1/3">
                                        <legend className="uppercase tracking-wide text-m">Internship Requirements</legend>
                                        <p className="text-xs font-light text-esprit">** This entire section is required.</p>
                                    </div>
                                    <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">

                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-xs font-bold text-OppSarra2R">Address</label>
                                            <input className="w-full shadow-4 p-4 border-0 xs" type="text" name="name" placeholder=" Acme Mfg. Co." onChange={e => setinterAdress(e.target.value)} />
                                            {error && interAdress.length <= 0 && (
                                                <label className="text-esprit text-xs">Address can't be empty</label>
                                            )}
                                        </div>
                                        <JobLocation
                                            value={interLocation}
                                            onChange={newValue => setinterLocation(newValue)}
                                        />


                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold text-OppSarra2R">required skills</label>
                                            <textarea className="w-full shadow-4 p-4 border-0" placeholder="required skills" rows="2" onChange={e => setinterRequiredSkills(e.target.value)}></textarea>
                                            {error && interRequiredSkills.length <= 0 && (
                                                <label className="text-esprit text-xs">Required Skills can't be empty</label>
                                            )}
                                        </div>
                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold text-OppSarra2R">required education</label>
                                            <select className="w-full shadow-4 p-4 border-0" name="jobType" value={interRequiredEducation}
                                                onChange={e => setinterRequiredEducation(e.target.value)}>
                                                <option value=""></option>
                                                <option value="PreEngineering 1st year">PreEngineering 1st year</option>
                                                <option value="PreEngineering 2nd year">PreEngineering 2nd year</option>
                                                <option value="Bachelor degree 1st year">Bachelor degree 1st year</option>
                                                <option value="Bachelor degree 2nd year">Bachelor degree 2nd year</option>
                                                <option value="Bachelor degree 3rd year">Bachelor degree 3rd year</option>
                                                <option value="Engineering degree 1st year">Engineering degree 1st year</option>
                                                <option value="Engineering degree 2nd year">Engineering degree 2nd year</option>
                                                <option value="Engineering degree 3rd year">Engineering degree 3rd year</option>
                                            </select>
                                            {error && interRequiredEducation.length <= 0 && (
                                                <label className="text-esprit text-xs">Required Education can't be empty</label>
                                            )}
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
                                            <textarea className="w-full shadow-4 p-4 border-0" placeholder="required skills" rows="2" onChange={e => setinterOtherInformation(e.target.value)}></textarea>
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
export default IntershipOpp;