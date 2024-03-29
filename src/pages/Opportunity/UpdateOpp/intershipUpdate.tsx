import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import DefaultLayout from "../../../layout/DefaultLayout";
import JobLocation from '../AddOpp/JobLocation';
import { UpdateInter, getInterById } from '../../api/opportunity';

const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const EditInter: React.FC = () => {
    const { internId } = useParams<{ internId: any }>(); // Extrait l'ID du travail de l'URL
    const [showModal, setShowModal] = useState(false);
    const [showModalBack, setShowModalBack] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // New state
    const handleAddOpportunity = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Empêche le comportement par défaut du formulaire
        setShowModal(true);
    };
    const handleCancel = () => {
        setShowModal(false);
    };

    const [interData, setinterData] = useState<any>({
        interTitle: '',
        interAdress: '',
        interType: '',
        interLocation: '',
        interDescription: '',
        interPost: '',
        interfield: '',
        interStartDate: '',
        interApplicationDeadline: '',
        interRequiredSkills: '',
        interRequiredEducation: '',
        contactNumber: '',
        interOtherInformation: ''
    });

    useEffect(() => {
        console.log("Initial jobData:", interData);
        if (internId) {
            const fetchJobData = async () => {
                try {
                    const response = await getInterById(internId);
                    setinterData(response);
                    console.log("Data fetched:", response);
                } catch (error) {
                    console.error('Erreur lors de la récupération des données de l\'offre d\'emploi :', error);
                    // Affichage d'une alerte pour informer l'utilisateur de l'erreur
                    alert('Une erreur s\'est produite lors de la récupération des données de l\'offre d\'emploi. Veuillez réessayer.');
                }
            };

            fetchJobData();
        }
    }, [internId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        console.log("Input changed - Name:", name, "Value:", value);
        setinterData((prevState: any) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitting jobData:", interData);
        try {
            if (internId) { // Vérifier si jobId est défini
                // Appel de la fonction d'API pour mettre à jour l'offre d'emploi
                const result = await UpdateInter(internId, interData);
                console.log('Profile updated successfully:', result);
                setShowModal(false);
                setShowSuccessMessage(true); // Mettre à jour l'état pour afficher le message de succès
                setTimeout(() => {
                    setShowSuccessMessage(false); // Cacher le message de succès après quelques secondes
                    window.location.href = '/Profilecompany'; // Rediriger après l'ajout avec succès
                }, 3000);
            } else {
                console.error('No jobId provided');
                alert('Une erreur s\'est produite lors de la mise à jour de l\'offre d\'emploi. Veuillez réessayer.');
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'offre d\'emploi :', error);
            // Logique pour afficher un message d'erreur à l'utilisateur
            alert('Une erreur s\'est produite lors de la mise à jour de l\'offre d\'emploi. Veuillez réessayer.');
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
                        <p className='text-white'>Opportunity Updated successfully!</p>
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
                            Are you sure you want to edit this opportunity?
                        </p>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={handleSubmit}
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
                                <h2 className="text-center text-esprit text-4xl font-bold mb-6">Create A New Intership</h2>
                            </div>
                            <hr className="w-full border-t border-gray-100 mb-1"></hr>
                            <hr className="w-full border-t border-gray-100 mb-10"></hr>

                            <form>
                                <div className="md:flex mb-8">
                                    <div className="md:w-1/3">
                                        <legend className="uppercase tracking-wide  text-m">Intership Information</legend>
                                        <p className="text-xs font-light text-esprit">** This entire section is required.</p>
                                    </div>
                                    <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-xs font-bold text-OppSarra2R">Title</label>
                                            <input className="w-full shadow-4 p-4 border-0 xs" type="text" name="interTitle" placeholder=" Acme Mfg. Co." 
                                            value={interData?.interTitle || ''}
                                            onChange={handleInputChange} />
                                        </div>

                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold text-OppSarra2R">Intership Field</label>
                                            <select className="w-full shadow-4 p-4 border-0" name="interfield" value={interData?.interfield || ''}
                                                onChange={handleInputChange}>
                                                <option value="Computer Science">Computer Science</option>
                                                <option value="Mechanical Engineering">Mechanical Engineering</option>
                                                <option value="Electromechanical Engineering">Electromechanical Engineering</option>
                                                <option value="Civil Engineering">Civil Engineering</option>
                                                <option value="Business Administration">Business</option>
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold text-OppSarra2R">Intership Type</label>
                                            <select className="w-full shadow-4 p-4 border-0" name="interType" 
                                            value={interData?.interType || ''}
                                            onChange={handleInputChange}>
                                                <option value="Summer Internship">Summer Internship</option>
                                                <option value="PFE Internship">PFE Internship</option>
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold text-OppSarra2R">Reference Contact</label>
                                            <input className="w-full shadow-4 p-4 border-0" type="tel" name="contactNumber" placeholder="(555) 555-5555" 
                                            value={interData?.contactNumber || ''}
                                            onChange={handleInputChange} />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-xs font-bold text-OppSarra2R">Post</label>
                                            <input className="w-full shadow-4 p-4 border-0 xs" type="text" name="interPost" placeholder=" Acme Mfg. Co." 
                                            value={interData?.interPost || ''}
                                            onChange={handleInputChange} />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold text-OppSarra2R">Application Deadline</label>
                                            <input className="w-full shadow-4 p-4 border-0" type="date" name="interApplicationDeadline" placeholder="#3" 
                                            value={interData?.interApplicationDeadline ? formatDateForInput(interData.interApplicationDeadline) : ''}
                                            onChange={handleInputChange} />
                                            {/* <span className="text-xs mb-4 font-thin">We lied, this isn't required.</span> */}
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
                                        <textarea className="w-full shadow-4 p-4 border-0" placeholder="We build fine acmes." rows="2" name="interDescription" 
                                        value={interData?.interDescription || ''}
                                                onChange={handleInputChange}></textarea>
                                    </div>
                                </div>
                                <hr className="w-full border-t border-graydouble mb-10"></hr>
                                <div className="md:flex mb-8">
                                    <div className="md:w-1/3">
                                        <legend className="uppercase tracking-wide text-m">Intership Requirements</legend>
                                        <p className="text-xs font-light text-esprit">** This entire section is required.</p>
                                    </div>
                                    <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">

                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-xs font-bold text-OppSarra2R">Address</label>
                                            <input className="w-full shadow-4 p-4 border-0 xs" type="text" name="interAdress" placeholder=" Acme Mfg. Co."
                                            value={interData?.interAdress || ''}
                                            onChange={handleInputChange} />
                                        </div>
                                        <JobLocation
                                            value={interData?.interLocation || ''}
                                            onChange={(value) => setinterData({ ...interData, interLocation: value })}
                                        />


                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold text-OppSarra2R">required skills</label>
                                            <textarea className="w-full shadow-4 p-4 border-0" placeholder="required skills" rows="2" name="interRequiredSkills"
                                            value={interData?.interRequiredSkills || ''}
                                            onChange={handleInputChange}></textarea>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold text-OppSarra2R">required education</label>
                                            <select className="w-full shadow-4 p-4 border-0" name="interRequiredEducation" 
                                            value={interData?.interRequiredEducation || ''}
                                            onChange={handleInputChange}>
                                                <option value="PreEngineering 1st year">PreEngineering 1st year</option>
                                                <option value="PreEngineering 2nd year">PreEngineering 2nd year</option>
                                                <option value="Bachelor degree 1st year">Bachelor degree 1st year</option>
                                                <option value="Bachelor degree 2nd year">Bachelor degree 2nd year</option>
                                                <option value="Bachelor degree 3rd year">Bachelor degree 3rd year</option>
                                                <option value="Engineering degree 1st year">Engineering degree 1st year</option>
                                                <option value="Engineering degree 2nd year">Engineering degree 2nd year</option>
                                                <option value="Engineering degree 3rd year">Engineering degree 3rd year</option>
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
                                            <textarea className="w-full shadow-4 p-4 border-0" placeholder="required skills" rows="2" name="interOtherInformation"
                                            value={interData?.interOtherInformation || ''}
                                            onChange={handleInputChange}></textarea>
                                        </div>
                                    </div>
                                </div>
                                <hr className="w-full border-t border-gray-100 mb-1"></hr>
                                <div className="md:flex mb-6 border border-t-1 border-b-0 border-x-0 border-cream-dark">
                                    <div className="md:flex-1 px-3 text-center md:text-left">
                                        <Link to="/Profilecompany">
                                            <button
                                                onClick={handleShowModalBack}
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
export default EditInter;