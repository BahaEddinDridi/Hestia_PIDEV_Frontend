import React, { ChangeEvent, useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../ApiSlices/authSlice';
import PhoneNumber from '../Authentication/SignUpFiles/PhoneNumber';
import ApplicationService from './API/Services';

const ApplicationsList = () => {
  const currentUser = useSelector(selectCurrentUser);
  const applications = currentUser.applications;
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState(selectedApplication?.fullName || '');
  const [email, setEmail] = useState(selectedApplication?.email || '');
  const [motivationLetter, setMotivationLetter] = useState(selectedApplication?.motivationLetter || '');
  const [jobId, setJobId] = useState(selectedApplication?.job || '')


  useEffect(() => {
    if (selectedApplication) {
      setFullName(selectedApplication.fullName || '');
      setEmail(selectedApplication.email || '');
      setMotivationLetter(selectedApplication.motivationLetter || '');
      setPhoneNumber(selectedApplication.phoneNumber || '');
      setSelectedFile(selectedApplication.resume || null);
      setJobId(selectedApplication.jobId || null);
    }
  }, [selectedApplication]);
  const formatDate = (dateString) => {
    const submitDate = new Date(dateString);
    const year = submitDate.getFullYear();
    const month = (submitDate.getMonth() + 1).toString().padStart(2, '0');
    const day = submitDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const openModal = (application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handlePhoneNumberChange = (value: string, isValid: boolean) => {
    setPhoneNumber(value); // Store the phone number in state
    console.log('Phone Number:', value);
    console.log('Is Valid:', isValid);
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      const data = new FormData();
      data.append('file', selectedFile);
      data.append('upload_preset', 'hestia');

      try {
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dasrakdbi/image/upload',
          {
            method: 'POST',
            body: data,
          })
        if (response.ok) {
          const result = await response.json();
          setSelectedFile(result.secure_url)
        }
      }
      catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  }
  const handleUpdate = async (event) => {
    event.preventDefault();
    const resume = selectedFile
    try {
      await ApplicationService.updateApplication(selectedApplication._id,{
        fullName,
        email,
        phoneNumber,
        motivationLetter,
        resume,
        userId : currentUser._id,
        jobId
      })
    }
    catch (error) {
      console.log(error);
    }
    closeModal();
  };

  return (
    <DefaultLayout>
      <div className="mx-20 border border-gray-200
      rounded-lg overflow-hidden shadow-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 font-mono">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
            <tr className="text-md font-semibold tracking-wide text-left text-white bg-red-700 uppercase">
              <th className="px-6 py-3">Company</th>
              <th className="px-6 py-3">Job offer</th>
              <th className="px-6 py-3">Application Date</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 ">
            {applications.map(application => (
              <tr key={application._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10">
                      <img className="w-10 h-10 rounded-full" src={application.companyLogo} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{application.companyName}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{application.jobTitle}</td>
                <td className="px-6 py-4 whitespace-nowrap">{formatDate(application.submitDate)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{application.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="blue" className="w-6 h-6 hover:text-gray-600 cursor-pointer"
                         onClick={() => openModal(application)}>
                      <path strokeLinecap="round" strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="group flex flex-col justify-start items-start gap-2 w-230 h-125 duration-500 relative
          rounded-lg p-4 bg-white hover:-translate-y-2 hover:shadow-xl shadow-red-400
          ">
            {!isEditMode ? (
              <>
                <h2 className="text-xl font-semibold mb-4">Application Details</h2>
                <div className="grid grid-cols-2 gap-20">
                  <div>
                    <div className="mb-1">
                      <label className="block text-sm font-bold text-gray-700">Company Name</label>
                      <p>{selectedApplication.companyName}</p>
                    </div>
                    <div className="mb-1">
                      <label className="block text-sm font-bold  text-gray-700">Job Title</label>
                      <p>{selectedApplication.jobTitle}</p>
                    </div>
                    <div className="mb-1">
                      <label className="block text-sm font-bold text-gray-700">Application Date</label>
                      <p>{formatDate(selectedApplication.submitDate)}</p>
                    </div>
                    <div className="mb-1">
                      <div className="mb-1">
                        <label className="block text-sm font-bold text-gray-700">Full Name</label>
                        <p>{selectedApplication.fullName}</p>
                      </div>
                      <div className="mb-1">
                        <label className="block text-sm font-bold text-gray-700">Submitted Email</label>
                        <p>{selectedApplication.email}</p>
                      </div>
                    </div>
                    <div className="mb-1">
                      <label className="block text-sm font-bold text-gray-700">Submitted Phone Number</label>
                      <p>{selectedApplication.phoneNumber}</p>
                    </div>
                    <div className="mb-1">
                      <label className="block text-sm font-bold text-gray-700">Resume</label>
                      <a href={selectedApplication.resume} target="_blank" rel="noopener noreferrer"
                         className="text-blue-500 hover:underline">View Resume</a>
                    </div>
                    <div className="mb-1">
                      <label className="block text-sm font-bold text-gray-700">Status</label>
                      <p>{selectedApplication.status}</p>
                    </div>
                  </div>
                  {/* Right side */}

                    <div className="mb-4 h-80 ">
                      <label className="block text-sm font-medium text-black">Motivation Letter</label>
                      <p>{selectedApplication.motivationLetter}</p>
                    </div>

                </div>
                <div
                  className="mt-4 flex justify-center items-center absolute duration-700 shadow-md
                  group-hover:-translate-y-4 group-hover:-translate-x-4 -bottom-10 -right-10 w-60 h-30 rounded-lg bg-red-600">
                  <button
                    className="bg-blue-500 h-10 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mr-2"
                    onClick={toggleEditMode}
                  >
                    Update
                  </button>
                  <button
                    className="bg-gray-300 h-10 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>

              </>
            ) : (
              // Update form
              <form onSubmit={handleUpdate}>
                <div className="flex">
                  <div className="w-1/2 mr-4">
                    {/* Left side */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={(e) => setFullName(e.target.value)}
                        value={fullName}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500
                block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                      <PhoneNumber onChange={(value, isValid) => handlePhoneNumberChange(value, isValid)} />
                    </div>
                    <div>
                      <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
                        Resume (PDF)
                      </label>
                      <input
                        type="file"
                        name="resume"
                        id="resume"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Motivation Letter</label>
                      <textarea
                        name="motivationLetter"
                        id="motivationLetter"
                        onChange={(e) => setMotivationLetter(e.target.value)}
                        value={motivationLetter}
                        className="mt-1 h-80 focus:ring-blue-500 focus:border-blue-500
                block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mr-2"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </DefaultLayout>
  );
};

export default ApplicationsList;
