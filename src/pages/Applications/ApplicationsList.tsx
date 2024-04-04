import React, { ChangeEvent, useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../ApiSlices/authSlice';
import PhoneNumber from '../Authentication/SignUpFiles/PhoneNumber';
import ApplicationService from './API/Services';
import Pagination from '../../backoffice/pagination/pagination';
import AppPagination from './AppPagination';

const ApplicationsList = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState(selectedApplication?.fullName || '');
  const [email, setEmail] = useState(selectedApplication?.email || '');
  const [motivationLetter, setMotivationLetter] = useState(selectedApplication?.motivationLetter || '');
  const [jobId, setJobId] = useState(selectedApplication?.job || '')
  const [applicationToDelete, setApplicationToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalApplications, setTotalApplications] = useState(0);
  const applicationsPerPage = 5;

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
  useEffect(() => {
    async function fetchData() {
      try {
        const response  = await ApplicationService.getApplicationsByUsername(currentUser.username);
        setApplications(response);

      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    }

    fetchData();
  }, [currentUser,currentPage]);

  const totalPages = Math.ceil(totalApplications / applicationsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
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

  const deleteModal = (application) => {
    setApplicationToDelete(application);
    setDeleteModel(true);
  }
  const closeDeleteModal = () => {
    setDeleteModel(false);
    setApplicationToDelete(null);
  };
  const handlePhoneNumberChange = (value: string, isValid: boolean) => {
    setPhoneNumber(value);
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
  const handleDelete = async (application) => {
    try {
      console.log(application._id);
      await ApplicationService.deleteApplication(application._id);
      const fetchedApplications = await ApplicationService.getApplicationsByUsername(currentUser.username);
      setApplications(fetchedApplications);
      setSelectedApplication(null);
      setApplicationToDelete(null);
      setDeleteModel(false);
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

const indexOfLastApp = currentPage * applicationsPerPage;
const indexOfFirstApp = indexOfLastApp - applicationsPerPage;
const currentApplications = applications.slice(indexOfFirstApp,indexOfLastApp)
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
            {currentApplications.map(application => (
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
                    <div onClick={() => openModal(application)} className="cursor-pointer relative  transition-all ease-in duration-75 group-hover:bg-opacity-0
                    rounded-lg group  from-blue-500 to-green-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white
                    dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                      <div className="hidden group-hover:block">
                        <div
                          className="group absolute -top-12 left-1/2 z-50 flex -translate-x-1/2 flex-col
                          items-center rounded-sm text-center text-sm text-white bg-blue-800"
                        >
                          <div className="rounded-sm bg-blue-600 py-1 px-2">
                            <p className="whitespace-nowrap">View/Edit this application</p>
                          </div>
                          <div
                            className="h-0 w-fit border-l-8 border-r-8 border-t-8 border-transparent border-t-blue-600"
                          ></div>
                        </div>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                           stroke="blue" className="w-6 h-6 hover:text-gray-600 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    </div>
                    <div onClick={() => deleteModal(application)} className="cursor-pointer relative  transition-all ease-in duration-75 group-hover:bg-opacity-0
                    rounded-lg group  from-blue-500 to-green-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white
                    dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                      <div className="hidden group-hover:block">
                        <div
                          className="group absolute -top-12 left-1/2 z-50 flex -translate-x-1/2 flex-col
                          items-center rounded-sm text-center text-sm text-white bg-red-800"
                        >
                          <div className="rounded-sm bg-red-600 py-1 px-2">
                            <p className="whitespace-nowrap">Withdraw this application</p>
                          </div>
                          <div
                            className="h-0 w-fit border-l-8 border-r-8 border-t-8 border-transparent border-t-red-600"
                          ></div>
                        </div>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                           stroke="red" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </table>

        </div>
        <div className="flex justify-center bg-red-800">
          <AppPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={applications.length}
        /></div>

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
                    <div className="mb-1 ">
                      <label className="block text-sm font-bold text-gray-700">Submitted Phone Number</label>
                      <div className="flex space-x-1  items-center">
                        <span className="[&>svg]:h-5 [&>svg]:w-5 [&>svg]:fill-[#128c7e]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 448 512">
                      <path
                        d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                      </svg>
                      </span>
                        <a href={`https://wa.me/+${selectedApplication.phoneNumber}`} target="_blank"
                           rel="noopener noreferrer" className="text-green-500 hover:underline ">
                          {selectedApplication.phoneNumber}
                        </a>
                      </div>
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
      { deleteModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div
          className="group  inset-0 z-50 select-none w-[250px] flex flex-col p-4
          items-center justify-center bg-white border border-gray-800 shadow-lg rounded-2xl"
        >
          <div className="">
            <div className="text-center p-3 flex-auto justify-center">
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                className="group-hover:animate-bounce w-12 h-12 flex items-center text-gray-600 fill-red-500 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  fillRule="evenodd"
                ></path>
              </svg>
              <h2 className="text-xl font-bold py-4 text-gray-200">Are you sure?</h2>
              <p className="font-bold text-sm text-gray-500 px-2">
                Do you really want to continue ? This process cannot be undone
              </p>
            </div>
            <div className="p-2 mt-2 text-center space-x-1 md:block">
              <button
                onClick={closeDeleteModal}
                className="mb-2 md:mb-0 bg-gray-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border-2 border-gray-600 hover:border-gray-700 text-gray-300 rounded-full hover:shadow-lg hover:bg-gray-800 transition ease-in duration-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(applicationToDelete)}
                className="bg-red-500 hover:bg-transparent px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 hover:border-red-500 text-white hover:text-red-500 rounded-full transition ease-in duration-300"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
        </div>
      )}

    </DefaultLayout>
  );
};

export default ApplicationsList;
