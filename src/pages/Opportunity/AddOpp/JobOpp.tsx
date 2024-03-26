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
    const [jobLocation, setjobLocation] = useState('Tunis')
    const [jobDescription, setjobDescription] = useState('')
    const [salary, setsalary] = useState('')
    const [jobPost, setjobPost] = useState('')
    const [jobfield, setjobfield] = useState('Computer Science')
    const [jobStartDate, setjobStartDate] = useState('')
    const [jobApplicationDeadline, setjobApplicationDeadline] = useState('')
    const [jobRequiredSkills, setjobRequiredSkills] = useState('')
    const [jobRequiredEducation, setjobRequiredEducation] = useState('Bachelor degree')
    const [jobRequiredExperience, setjobRequiredExperience] = useState('Junior')
    const [contactNumber, setcontactNumber] = useState('')
    const [jobOtherInformation, setjobOtherInformation] = useState('')
    const [jobImage, setjobImage] = useState('')
    
    const [error, setError] = useState(false)
    const currentUser = useSelector(selectCurrentUser);
    //const currentUser = useSelector(selectCurrentUser) || defaultUser;



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!currentUser) {
            console.warn('Aucun utilisateur connecté. L\'ajout de l\'opportunité ne peut pas être effectué.');
            return;
        }
        if (jobTitle.length === 0 || jobAdress.length === 0 || jobDescription.length === 0 || salary.length === 0 || jobPost.length === 0 ||
            jobfield.length === 0 || jobApplicationDeadline.length === 0 || jobRequiredSkills.length === 0 || jobRequiredEducation.length === 0
            || jobRequiredExperience.length === 0 || contactNumber.length === 0 || jobLocation.length === 0) {
            setError(true);
            return;
        }
        // Obtenir la date actuelle
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString();

        const jobData = {
            jobCommpanyName: currentUser.username,
            jobImage:currentUser.image,
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

        try {
            const response = await AddJob(currentUser.username, jobData);
            console.log("job added", response);
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
                                                <option value="Computer Science">Computer Science</option>
                                                <option value="Mechanical Engineering">Mechanical Engineering</option>
                                                <option value="Electromechanical Engineering">Electromechanical Engineering</option>
                                                <option value="Civil Engineering">Civil Engineering</option>
                                                <option value="Business Administration">Business</option>
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-xs font-bold text-OppSarra2R">Post</label>
                                            <input className="w-full shadow-4 p-4 border-0 xs" type="text" name="name" placeholder=" Acme Mfg. Co." onChange={e => setjobPost(e.target.value)} />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold text-OppSarra2R">Application Deadline</label>
                                            <input className="w-full shadow-4 p-4 border-0" type="date" name="address_number" placeholder="#3" onChange={e => setjobApplicationDeadline(e.target.value)} />
                                            {/* <span className="text-xs mb-4 font-thin">We lied, this isn't required.</span> */}
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
export default JobOpp;