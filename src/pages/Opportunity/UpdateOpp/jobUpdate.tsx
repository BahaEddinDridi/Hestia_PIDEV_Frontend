import React, { useEffect, useState } from 'react';
import DefaultLayout from "../../../layout/DefaultLayout";
import { UpdateJob, getJobById } from '../../api/opportunity';
import JobLocation from '../AddOpp/JobLocation';
import { Link, useParams, useNavigate } from 'react-router-dom'; // Importer useNavigate
import { useSelector } from 'react-redux';
import { selectCurrentUsername } from '../../../ApiSlices/authSlice';
import { validatejobTitle, validatejobAdress, validatejobLocation, validationjobDescription, validationsalary, validatejobPost, validationjobApplicationDeadline, validationjobRequiredSkills, validationcontactNumber } from '../UpdateOpp/validations';

const EditJob: React.FC = () => {
    const navigate = useNavigate(); // Utiliser useNavigate pour la redirection

    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    //const currentUsername = useSelector(selectCurrentUsername);
    const currentUsername = "Actia";
    const { jobId } = useParams();

    const [jobInfo, setJobInfo] = useState<any>(null);
    const [formData, setFormData] = useState({
        jobImage: '',
        jobTitle: '',
        jobAdress: '',
        jobLocation: '',
        jobDescription: '',
        salary: '',
        jobPost: '',
        jobfield: '',
        jobApplicationDeadline: '',
        jobRequiredSkills: '',
        jobRequiredEducation: '',
        jobRequiredExperience: '',
        contactNumber: '',
        jobOtherInformation: '',
    });

    useEffect(() => {
        console.log('jobId:', jobId); // Ajoutez cette ligne pour vérifier la valeur de jobId
        const fetchJobInfo = async () => {
            try {
                if (!jobId) {
                    console.error('JobId is undefined');
                    return;
                }
                const data = await getJobById(jobId);
                setJobInfo(data);

                if (data) {
                    setFormData({
                        jobImage: data.jobImage || '',
                        jobTitle: data.jobTitle || '',
                        jobAdress: data.jobAdress || '',
                        jobLocation: data.jobLocation || '',
                        jobDescription: data.jobDescription || '',
                        salary: data.salary || '',
                        jobPost: data.jobPost || '',
                        jobfield: data.jobfield || '',
                        jobApplicationDeadline: data.jobApplicationDeadline || '',
                        jobRequiredSkills: data.jobRequiredSkills || '',
                        jobRequiredEducation: data.jobRequiredEducation || '',
                        jobRequiredExperience: data.jobRequiredExperience || '',
                        contactNumber: data.contactNumber || '',
                        jobOtherInformation: data.jobOtherInformation || '',
                    });
                } else {
                    console.error('Error fetching job data:', data);
                    setErrorMessage('Error fetching job data');
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setErrorMessage('Error fetching user profile');
            }
        };
        fetchJobInfo();
    }, [jobId]);

    const [errors, setErrors] = useState({
        jobImage: '',
        jobTitle: '',
        jobAdress: '',
        jobLocation: '',
        jobDescription: '',
        salary: '',
        jobPost: '',
        jobfield: '',
        jobApplicationDeadline: '',
        jobRequiredSkills: '',
        jobRequiredEducation: '',
        jobRequiredExperience: '',
        contactNumber: '',
        jobOtherInformation: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        let errorMessage = '';

        if (name === 'jobTitle') {
            errorMessage = validatejobTitle(value);
        } else if (name === "jobAdress") {
            errorMessage = validatejobAdress(value);
        } else if (name === "jobLocation") {
            errorMessage = validatejobLocation(value);
        } else if (name === "jobDescription") {
            errorMessage = validationjobDescription(value);
        } else if (name === "salary") {
            errorMessage = validationsalary(value);
        } else if (name === 'jobPost') {
            errorMessage = validatejobPost(value);
        } else if (name === "jobApplicationDeadline") {
            errorMessage = validationjobApplicationDeadline(value);
        } else if (name === "jobRequiredSkills") {
            errorMessage = validationjobRequiredSkills(value);
        } else if (name === "contactNumber") {
            errorMessage = validationcontactNumber(value);
        }

        setErrors({
            ...errors,
            [name]: errorMessage,
        });
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (!currentUsername) {
                console.error('Current username is undefined');
                setErrorMessage('Current username is undefined');
                return;
            }

            const result = await UpdateJob(jobId, formData);
            console.log('Job updated successfully:', result);

            setFormData(formData);
            setSuccessMessage('Job updated successfully');

            navigate('/Profilecompany'); // Utiliser navigate pour la redirection
        } catch (error) {
            console.error('Error updating job:', error);
            setErrorMessage('Error updating job');
        }
    };

    return (
        <DefaultLayout>
            <div>
                <body className="bg-cream text-charcoal min-h-screen font-sans leading-normal overflow-x-hidden lg:overflow-auto pb-8">
                    <main className="flex-1 md:p-0 lg:pt-8 lg:px-8 md:mx-24 flex flex-col">
                        <section className="bg-white p-4 shadow-6 ">
                            <div className="md:flex items-center justify-center">
                                <h2 className="text-center text-esprit text-4xl font-bold mb-6">Edit A Job</h2>
                            </div>
                            <hr className="w-full border-t border-gray-100 mb-1"></hr>
                            <hr className="w-full border-t border-gray-100 mb-10"></hr>

                            <form onSubmit={handleSubmit}>
                                <div className="md:flex mb-8">
                                    <div className="md:w-1/3">
                                        <legend className="uppercase tracking-wide  text-m">Job Information</legend>
                                        <p className="text-xs font-light text-esprit">** This entire section is required.</p>
                                    </div>
                                    <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-xs font-bold text-OppSarra2R">Title</label>
                                            <input className="w-full shadow-4 p-4 border-0 xs" type="text" name="jobTitle" placeholder=" Acme Mfg. Co."
                                                value={formData.jobTitle}
                                                onChange={handleInputChange} />
                                        </div>

                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold text-OppSarra2R">Job Field</label>
                                            <select className="w-full shadow-4 p-4 border-0" name="jobType"
                                                value={formData.jobfield}
                                                onChange={handleInputChange}>
                                                <option value="Computer Science">Computer Science</option>
                                                <option value="Mechanical Engineering">Mechanical Engineering</option>
                                                <option value="Electromechanical Engineering">Electromechanical Engineering</option>
                                                <option value="Civil Engineering">Civil Engineering</option>
                                                <option value="Business Administration">Business</option>
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-xs font-bold text-OppSarra2R">Post</label>
                                            <input className="w-full shadow-4 p-4 border-0 xs" type="text" name="jobPost" placeholder=" Acme Mfg. Co."
                                                value={formData.jobPost}
                                                onChange={handleInputChange} />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold text-OppSarra2R">Application Deadline</label>
                                            <input className="w-full shadow-4 p-4 border-0" type="date" name="jobApplicationDeadline" placeholder="#3"
                                                value={formData.jobApplicationDeadline}
                                                onChange={handleInputChange} />
                                            {/* <span className="text-xs mb-4 font-thin">We lied, this isn't required.</span> */}
                                        </div>
                                        <div className="md:flex mb-4">
                                            <div className="md:flex-1 md:pr-3">
                                                <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold text-OppSarra2R">Salary</label>
                                                <input className="w-full shadow-4 p-4 border-0" type="text" name="salary" placeholder="30.0455542"
                                                    value={formData.salary}
                                                    onChange={handleInputChange} />
                                            </div>
                                            <div className="md:flex-1 md:pl-3">
                                                <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold text-OppSarra2R">Reference Contact</label>
                                                <input className="w-full shadow-4 p-4 border-0" type="tel" name="contactNumber" placeholder="(555) 555-5555"
                                                    value={formData.contactNumber}
                                                    onChange={handleInputChange} />
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
                                        <textarea className="w-full shadow-4 p-4 border-0" placeholder="We build fine acmes." rows="2"
                                            value={formData.jobDescription}
                                            onChange={handleInputChange}></textarea>
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
                                            <input className="w-full shadow-4 p-4 border-0 xs" type="text" name="jobAdress" placeholder=" Acme Mfg. Co."
                                                value={formData.jobAdress}
                                                onChange={handleInputChange} />
                                        </div>
                                        <JobLocation
                                            value={formData.jobLocation}
                                            onChange={handleInputChange}
                                        />


                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold text-OppSarra2R">required skills</label>
                                            <textarea className="w-full shadow-4 p-4 border-0" placeholder="required skills" rows="2"
                                                value={formData.jobRequiredSkills}
                                                onChange={handleInputChange}></textarea>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold text-OppSarra2R">required education</label>
                                            <select className="w-full shadow-4 p-4 border-0" name="jobRequiredEducation"
                                                value={formData.jobRequiredEducation}
                                                onChange={handleInputChange}>
                                                <option value="Bachelor's degree">Bachelor degree</option>
                                                <option value="Engineering degree">Engineering degree</option>
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold text-OppSarra2R">required experience</label>
                                            <select className="w-full shadow-4 p-4 border-0" name="jobRequiredExperience"
                                                value={formData.jobRequiredExperience}
                                                onChange={handleInputChange}>
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
                                            <textarea className="w-full shadow-4 p-4 border-0" placeholder="required skills" rows="2"
                                                value={formData.jobOtherInformation}
                                                onChange={handleInputChange}></textarea>
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
                                        <Link to="/Profilecompany"><button
                                            className="bg-green-400 hover:bg-green-600 text-white font-bold py-3 px-6 mt-6 rounded-full shadow-lg hover:text-white shadow-white transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce">
                                            Save Changes
                                        </button>
                                        </Link>
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
export default EditJob;