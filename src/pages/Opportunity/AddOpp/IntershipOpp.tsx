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
    const [interTitle, setinterTitle] = useState('')
    const [interAdress, setinterAdress] = useState('')
    const [interType, setinterType] = useState('')
    const [interLocation, setinterLocation] = useState('Tunis')
    const [interDescription, setinterDescription] = useState('')
    const [interPost, setinterPost] = useState('')
    const [interfield, setinterfield] = useState('Computer Science')
    const [interStartDate, setinterStartDate] = useState('')
    const [interApplicationDeadline, setinterApplicationDeadline] = useState('')
    const [interRequiredSkills, setinterRequiredSkills] = useState('')
    const [interRequiredEducation, setinterRequiredEducation] = useState('')
    const [contactNumber, setcontactNumber] = useState('')
    const [interOtherInformation, setinterOtherInformation] = useState('')
    const [interImage, setinterImage] = useState('')
    const [error, setError] = useState(false)
    const currentUser = useSelector(selectCurrentUser);
    
    //const currentUser = useSelector(selectCurrentUser) || defaultUser;



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!currentUser) {
            console.warn('Aucun utilisateur connecté. L\'ajout de l\'opportunité ne peut pas être effectué.');
            return;
        }
        if (interTitle.length === 0 || interAdress.length === 0 || interDescription.length === 0 || interType.length===0 || interPost.length === 0 ||
            interfield.length === 0  || interApplicationDeadline.length === 0 || interRequiredSkills.length === 0 || interRequiredEducation.length === 0
            || contactNumber.length === 0 || interLocation.length === 0) {
            setError(true);
            return;
        }

        // Obtenir la date actuelle
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString();

        const intershipData = {
            interCommpanyName: currentUser.username,
            interImage: currentUser.image,
            interTitle: interTitle,
            interAdress: interAdress,
            interType : interType,
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

        try {
            const response = await AddIntership(currentUser.username, intershipData);
            console.log("intership added", response);
            window.location.href = '/Profilecompany';
        } catch (error: any) {
            if (error instanceof Error) {
                console.error('Registration failed:', error.message);
            } else {
                console.error('An unknown error occurred:', error);
            }
        }
    }







    return (
        <DefaultLayout>
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
                                            <input onChange={e => setinterTitle(e.target.value)} className="w-full shadow-4 p-4 border-0 xs" type="text" name="name" placeholder=" Acme Mfg. Co." />
                                        </div>

                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold text-OppSarra2R">Intership Field</label>
                                            <select className="w-full shadow-4 p-4 border-0" name="jobType" value={interfield}
                                                onChange={e => setinterfield(e.target.value)}>
                                                <option value="Computer Science">Computer Science</option>
                                                <option value="Mechanical Engineering">Mechanical Engineering</option>
                                                <option value="Electromechanical Engineering">Electromechanical Engineering</option>
                                                <option value="Civil Engineering">Civil Engineering</option>
                                                <option value="Business Administration">Business</option>
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold text-OppSarra2R">Intership Type</label>
                                            <select className="w-full shadow-4 p-4 border-0" name="jobType" value={interType}
                                                onChange={e => setinterType(e.target.value)}>
                                                <option value="Summer Internship">Summer Internship</option>
                                                <option value="PFE Internship">PFE Internship</option>
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold text-OppSarra2R">Reference Contact</label>
                                            <input className="w-full shadow-4 p-4 border-0" type="tel" name="lon" placeholder="(555) 555-5555" onChange={e => setcontactNumber(e.target.value)} />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-xs font-bold text-OppSarra2R">Post</label>
                                            <input className="w-full shadow-4 p-4 border-0 xs" type="text" name="name" placeholder=" Acme Mfg. Co." onChange={e => setinterPost(e.target.value)} />
                                        </div>
                                            <div className="mb-4">
                                                <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold text-OppSarra2R">Application Deadline</label>
                                                <input className="w-full shadow-4 p-4 border-0" type="date" name="address_number" placeholder="#3" onChange={e => setinterApplicationDeadline(e.target.value)} />
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
                                        <textarea className="w-full shadow-4 p-4 border-0" placeholder="We build fine acmes." rows="2" onChange={e => setinterDescription(e.target.value)}></textarea>
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
                                            <input className="w-full shadow-4 p-4 border-0 xs" type="text" name="name" placeholder=" Acme Mfg. Co." onChange={e => setinterAdress(e.target.value)} />
                                        </div>
                                        <JobLocation
                                            value={interLocation}
                                            onChange={newValue => setinterLocation(newValue)}
                                        />


                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold text-OppSarra2R">required skills</label>
                                            <textarea className="w-full shadow-4 p-4 border-0" placeholder="required skills" rows="2" onChange={e => setinterRequiredSkills(e.target.value)}></textarea>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold text-OppSarra2R">required education</label>
                                            <select className="w-full shadow-4 p-4 border-0" name="jobType" value={interRequiredEducation}
                                                onChange={e => setinterRequiredEducation(e.target.value)}>
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
                                            <textarea className="w-full shadow-4 p-4 border-0" placeholder="required skills" rows="2" onChange={e => setinterOtherInformation(e.target.value)}></textarea>
                                        </div>
                                    </div>
                                </div>
                                <hr className="w-full border-t border-gray-100 mb-1"></hr>
                                <div className="md:flex mb-6 border border-t-1 border-b-0 border-x-0 border-cream-dark">
                                    <div className="md:flex-1 px-3 text-center md:text-left">
                                        <Link to="/Profilecompany">
                                            <button
                                                className="bg-red-300 hover:bg-esprit text-white font-bold py-3 px-6 mt-6 rounded-full shadow-lg hover:text-white shadow-white transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce">
                                                Back to Profile
                                            </button>
                                        </Link>
                                    </div>
                                    <div className="md:flex-1 px-3 text-center md:text-right">
                                        <button
                                            onClick={(e) => handleSubmit(e)}
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