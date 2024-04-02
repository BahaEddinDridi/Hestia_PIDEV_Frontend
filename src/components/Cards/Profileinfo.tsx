import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentUser, selectCurrentUsername } from '../../ApiSlices/authSlice';
import { useGetUserInfoQuery } from "../../ApiSlices/userApiSlice";
import DatePickerOne from '../Forms/DatePicker/DatePickerOne';
import { addUserEducation } from '../../pages/api';
import { validateFormEducation } from '../../pages/Profil/validation';
import axios from 'axios';
import { deleteEducation } from '../../../src/backoffice/api/index';
import { updateEducation } from '../../../src/backoffice/api/index';
const formatDate = (dateString: any) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const ProfileInfo = () => {

  const dispatch = useDispatch();
  const currentUsername = useSelector(selectCurrentUsername);
  //const { data: userInfo = {} } = useGetUserInfoQuery(currentUsername);
  const currentUser = useSelector(selectCurrentUser);
  const [user, setUser] = useState<any>(null);
  const [educationList, setEducationList] = useState<any[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<{ [key: string]: boolean }>({});
  const [educationData, setEducationData] = useState({
    school: '',
    degree: '',
    startDate: '',
    endDate: '',

  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEducationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //l'affichage de model
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const [errors, setErrors] = useState({
    degree: '',
    school: '',
    startDate: '',
    endDate: ''
  });
  const handleSaveModal: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    try {
      const errors = validateFormEducation(educationData);
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
      } else {

        const result = await addUserEducation(currentUsername, educationData);
        console.log('Education added successfully:', result);
        setEducationData({
          school: '',
          degree: '',
          startDate: '',
          endDate: '',
        });
      }
      handleCloseModal();
      window.location.reload();
    } catch (error) {
      console.error('Error adding education:', error);
    }
  };




  const toggleDropdown = (eduId: string) => {
    setIsDropdownOpen((prevIsDropdownOpen) => ({
      ...prevIsDropdownOpen,
      [eduId]: !prevIsDropdownOpen[eduId],
    }));
  };


  const handleDeleteEducation = async (educationId: string) => {
    try {
      // Afficher une alerte de confirmation
      const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cette éducation ?');
      if (!confirmed) {
        return; // Arrêter l'exécution si l'utilisateur annule
      }

      // Supprimer l'éducation côté serveur
      const data = await deleteEducation(currentUser.username, educationId);
      setMessage('Education deleted successfully');
      console.log(data); // Afficher la réponse de votre backend

      // Mettre à jour localement la liste des expériences en filtrant l'expérience supprimée
      setEducationList((prevList) => prevList.filter((edu) => edu._id !== educationId));
      window.location.reload();
      console.log('Education list updated:', educationList);
    } catch (error) {
      setMessage('Error deleting education');
      console.error(error); // Afficher l'erreur en cas d'échec
    }
  };
  const [isEditingModalOpen, setIsEditingModalOpen] = useState(false);
  const [editingEducationId, setEditingEducationId] = useState<string>('');
  const [editingEducationData, setEditingEducationData] = useState<Education>({
    _id: '',
    school: '',
    degree: '',
    startDate: '',
    endDate: ''
  });
  const handleOpenEditModal = async (educationId: string) => {
    console.log('Opening edit modal for education ID:', educationId);
    const educationToEdit = educationList.find((edu) => edu._id === educationId);
    console.log('Education List:', educationList);
    if (educationToEdit) {
      setEditingEducationId(educationId);
      setEditingEducationData({
        _id: educationId,
        school: educationToEdit.school,
        degree: educationToEdit.degree,
        startDate: educationToEdit.startDate,
        endDate: educationToEdit.endDate
      });
      setIsEditingModalOpen(true);
      console.log('isEditingModalOpen:', isEditingModalOpen);
    }


  };
  const handleEditEducation = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const result = await updateEducation(currentUsername, editingEducationId, editingEducationData); // Pass educationId to updateEducation function
      console.log('Education updated successfully:', result);
      setEducationList((prevList) =>
        prevList.map((edu) => (edu._id === editingEducationId ? { ...edu, ...editingEducationData } : edu))
      );
      setIsEditingModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Error updating education:', error.message);
    }
  };
  const handleCloseEditModal = () => {
    setIsEditingModalOpen(false);
  };
  const handleEditEducationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingEducationData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  useEffect(() => {
    console.log('isEditingModalOpen updated:', isEditingModalOpen);
  }, [isEditingModalOpen]);
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/user/educations/${currentUsername}`);
        setEducationList(response.data.data);
        
      } catch (error) {
        console.error('Error fetching educations:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className={`mb-10 ${isModalOpen ? 'bg-opacity-50' : ''} mt-2 mr-7 ml-7 rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark`}>

        <div className="grid grid-cols-2  rounded-lg  md:grid-cols-2 gap-8">
          <div className="relative overflow-hidden rounded-3xl w-full h-100  cursor-pointer text-2xl font-bold bg-gradient-to-r from-red-500 to-red-700">
            <div className="z-10 absolute w-full h-full peer"></div>

            <div className="absolute peer-hover:-top-20 peer-hover:-left-16 peer-hover:w-[140%] peer-hover:h-[140%] -top-32 -left-16 w-32 h-44 rounded-full bg-red-700 transition-all duration-500"></div>

            <div className="absolute flex text-xl text-center items-end justify-end peer-hover:right-0 peer-hover:rounded-b-none peer-hover:bottom-0 peer-hover:items-center peer-hover:justify-center peer-hover:w-full peer-hover:h-full -bottom-32 -right-90 w-36 h-44 rounded-full bg-red-600 transition-all duration-500">
              <div className="flex flex-col gap-5.5 p-6.5">
                <div className="flex flex-col">
                  <span className="text-sm text-white dark:text-black">Full Name</span>
                  <label className="text-lg font-semibold text-black dark:text-white">{currentUser && `${currentUser.firstName} ${currentUser.lastName}`}</label>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-white dark:text-black">Mobile</span>
                  <label className="text-lg font-semibold text-black dark:text-white">{currentUser && `${currentUser.phoneNumber} `}</label>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-white dark:text-black">Email</span>
                  <label className="text-lg font-semibold text-black dark:text-white"> {currentUser && `${currentUser.email}`} </label>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-white dark:text-black">Location</span>
                  <label className="text-lg font-semibold text-black dark:text-white">{currentUser && `${currentUser.location}`}</label>
                </div>
              </div>
            </div>

            <div className="w-full h-full items-center justify-center flex uppercase text-white">
              Profil Information
            </div>
          </div>

          <div className=" w-full md:w-1/2 p-4">
            <div className="text-right mb-4">
              <button
                className=" rounded-lg relative w-full md:w-50 h-10 cursor-pointer flex items-center border bg-white  group hover:bg-white active:bg-white "
                data-modal-target="crud-modal"
                data-modal-toggle="crud-modal"
                onClick={handleOpenModal}
              >
                <span
                  className="text-red-700 font-semibold ml-8 transform group-hover:translate-x-34 transition-all duration-300"

                >Add Education</span
                >
                <span
                  className="absolute right-0 h-full w-10 rounded-lg bg-graydegrade flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300"
                >
                  <svg
                    className="svg w-8 text-red-700"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line x1="12" x2="12" y1="5" y2="19"></line>
                    <line x1="5" x2="19" y1="12" y2="12"></line>
                  </svg>
                </span>
              </button>

            </div>

            {/* modallllllllllll*/}
            {isModalOpen && (
              <div
                id="crud-modal"
                tabIndex={-1}
                aria-hidden="true"
                className="fixed inset-0 top-9 z-50 overflow-y-auto"
              >
                <div className="flex items-center justify-center min-h-screen">
                  <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                  <div className="relative p-4 w-full max-w-md">
                    <div className="relative bg-white rounded-lg shadow">
                      {/* Modal header */}
                      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-black">
                          Add Education
                        </h3>
                        <button
                          type="button"
                          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                          data-modal-toggle="crud-modal"
                          onClick={handleCloseModal}
                        >
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                          >
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

                      {/* Modal content  */}
                      <form className="p-4 md:p-5">
                        <label className="mb-2 text-sm font-medium block uppercase text-black dark:text-black">
                          degree
                        </label>
                        <input
                          type="text"
                          placeholder="degree"
                          name='degree'
                          value={educationData.degree}
                          onChange={handleChange}
                          className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-800 dark:border-gray-500 dark:bg-gray-600 dark:text-black" />
                        {errors.degree && <p className="text-red-500">{errors.degree}</p>}
                        <label className="mb-2 text-sm font-medium block uppercase text-black dark:text-black">
                          school
                        </label>
                        <input
                          type="text"
                          placeholder="school"
                          name='school'
                          value={educationData.school}
                          onChange={handleChange}
                          className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-800 dark:border-gray-500 dark:bg-gray-600 dark:text-black" />
                        {errors.school && <p className="text-red-500">{errors.school}</p>}
                        <label className="mb-2 text-sm font-medium  uppercase block text-black dark:text-black">
                          startDate
                        </label>
                        <input
                          type="date"
                          placeholder="Enter Date Start "
                          className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-800 dark:border-gray-500 dark:bg-gray-600 dark:text-black"
                          value={educationData.startDate}
                          onChange={handleChange}
                          name="startDate"
                        />
                        {errors.startDate && <p className="text-red-500">{errors.startDate}</p>}
                        <label className="mb-2 text-sm font-medium  uppercase block text-black dark:text-black">
                          endDate
                        </label>
                        <input
                          type="date"
                          placeholder="Enter Date Start "
                          className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-800 dark:border-gray-500 dark:bg-gray-600 dark:text-black"
                          value={educationData.endDate}
                          onChange={handleChange}
                          name="endDate"
                        />
                        {errors.endDate && <p className="text-red-500">{errors.endDate}</p>}


                        <div className="flex mt-4 justify-center gap-4.5 mb-5">
                          <button
                            className="flex justify-center rounded border border-stroke mr-2 py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-black"
                            onClick={handleCloseModal}
                          >
                            Cancel
                          </button>

                          <button
                            className=" flex  justify-center rounded-md border  py-2 px-6  text-center font-medium  hover:bg-opacity-90 lg:px-8 xl:px-10 focus:outline-none focus:shadow-outline cursor-pointer 
                                   border-red-900 bg-red-800 p-4 text-white transition
                                           dark:bg-red-500
                                     dark:hover:bg-red-400 dark:focus:ring-red-300 dark:border-red-900"
                            type="submit"
                            onClick={handleSaveModal}
                          >
                            Save

                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}



            <ul className="grid gap-4">
              {currentUser.education && currentUser.education.length > 0 && currentUser.education.map((edu: any, index: number) => (
                <li key={index} className=" relative p-4 border border-gray-200 dark:bg-white dark:text-black rounded-md w-full md:w-70 sm:w-auto transition-transform transform hover:scale-105 cursor-pointer">
                  <div className="relative inline-block ">

                    <button id={`dropdownMenuIconButton-${edu._id}`} onClick={() => toggleDropdown(edu._id)} aria-haspopup="true" aria-expanded={isDropdownOpen[edu._id]} className="inline-flex ml-80 items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
                      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor darck:bg-black dark:hover:bg-white" viewBox="0 0 4 15">
                        <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                      </svg>
                    </button>

                    {/* Dropdown menu  */}
                    {isDropdownOpen[edu._id] && (
                      <div id={`dropdownDots-${edu._id}`} className=" absolute right-0 z-1  bg-gray divide-y divide-gray-100 rounded-lg shadow w-50 md:w-60  lg:w-72 dark:bg-gray-700 dark:divide-gray-600" aria-labelledby={`dropdownMenuIconButton-${edu._id}`}>
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                          <li><a onClick={() => handleDeleteEducation(edu._id)} className="block px-4 py-2 hover:bg-gray-100 hover:text-esprit dark:hover:bg-gray-600 dark:hover:text-esprit">Delete</a></li>
                          <li><a data-modal-target="update-modal" data-modal-toggle="update-modal" onClick={() => handleOpenEditModal(edu._id)} className="block px-4 py-2 hover:bg-gray-100 hover:text-esprit dark:hover:bg-gray-600 dark:hover:text-esprit">Update</a></li>



                        </ul>
                      </div>
                    )}


                  </div>
                  <h4 className="text-lg font-semibold text-black dark:text-black md:text-xl ">{edu.degree}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-300 md:text-base"> {`${edu.school} - ${formatDate(edu.startDate)} to ${formatDate(edu.endDate)}`}</p>

                </li>
              ))}
            </ul>

          </div>
          {isEditingModalOpen && (
            <div
              id="crud-modal"
              tabIndex={-1}
              aria-hidden="true"
              className="fixed inset-0 z-50 overflow-y-auto"
            >
              <div className="flex items-center justify-center min-h-screen">
                <div className="relative p-4 w-full max-w-md">
                  <div className="relative bg-white rounded-lg shadow">
                    {/* Modal header */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-black">
                        Update Education
                      </h3>
                      <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={handleCloseEditModal}
                      >
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                    </div>

                    {/* Modal content  */}
                    <form className="p-4 md:p-5">
                      <label className="mb-2 text-sm font-medium block uppercase text-black dark:text-black">
                        degree
                      </label>
                      <input
                        type="text"
                        placeholder="degree"
                        name='degree'
                        value={editingEducationData.degree}
                        onChange={handleEditEducationChange}
                        className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-800 dark:border-gray-500 dark:bg-gray-600 dark:text-black" />
                      <label className="mb-2 text-sm font-medium block uppercase text-black dark:text-black">
                        school
                      </label>
                      <input
                        type="text"
                        placeholder="school"
                        name='school'
                        value={editingEducationData.school}
                        onChange={handleEditEducationChange}
                        className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-800 dark:border-gray-500 dark:bg-gray-600 dark:text-black" />
                      <label className="mb-2 text-sm font-medium  uppercase block text-black dark:text-black">
                        startDate
                      </label>
                      <input
                        type="date"
                        placeholder="Enter Date Start "
                        className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-800 dark:border-gray-500 dark:bg-gray-600 dark:text-black"
                        value={formatDate(editingEducationData.startDate)}
                        onChange={handleEditEducationChange}
                        name="startDate"
                      />
                      <label className="mb-2 text-sm font-medium  uppercase block text-black dark:text-black">
                        endDate
                      </label>
                      <input
                        type="date"
                        placeholder="Enter Date Start "
                        className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-800 dark:border-gray-500 dark:bg-gray-600 dark:text-black"
                        value={formatDate(editingEducationData.endDate)}
                        onChange={handleEditEducationChange}
                        name="endDate"
                      />

                      <div className="flex mt-4 justify-center gap-4.5 mb-5">
                        <button
                          className="flex justify-center rounded border border-stroke mr-2 py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-black"
                          onClick={() => setIsEditingModalOpen(false)}
                        >
                          Cancel
                        </button>

                        <button
                          className=" flex  justify-center rounded-md border  py-2 px-6  text-center font-medium  hover:bg-opacity-90 lg:px-8 xl:px-10 focus:outline-none focus:shadow-outline cursor-pointer 
                              border-red-900 bg-red-800 p-4 text-white transition
                                      dark:bg-red-500
                                dark:hover:bg-red-400 dark:focus:ring-red-300 dark:border-red-900"
                          type="submit"
                          onClick={handleEditEducation}
                        >
                          Save

                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div >
    </>);
}

export default ProfileInfo;