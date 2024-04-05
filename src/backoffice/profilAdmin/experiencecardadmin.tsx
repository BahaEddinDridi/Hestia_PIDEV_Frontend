
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentUsername } from '../../ApiSlices/authSlice';
import { useGetUserInfoQuery } from "../../ApiSlices/userApiSlice";
import { addUserExperienceAdmin } from '../api/index';
import DatePickerOne from '../../components/Forms/DatePicker/DatePickerOne';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { deleteExperience } from '../api/index';
import {selectCurrentUser} from "../../ApiSlices/authSlice";
import { updateExperience } from '../api/index';
import { validateFormExperience } from '../../pages/Profil/validation';




interface Experience {
  _id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description:string;
}


const formatDate = (dateString: any) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
const ExperienceCardAdmin = ({ index }: { index: number }) => {

  //get all Experiences 
  const [experiences, setExperiences] = useState<any[]>([]);

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/user/Experiences/${currentUsername}`);
                setExperiences(response.data.data);
            } catch (error) {
                console.error('Error fetching experiences:', error.message);
            }
        };

        fetchExperiences();
    }, []);

    //delete Experience
    const [message, setMessage] = useState('');
    const currentUser=useSelector(selectCurrentUser);
    const [isDropdownOpen, setIsDropdownOpen] = useState<{ [key: string]: boolean }>({});
    const toggleDropdown = (experienceId: string) => {
      setIsDropdownOpen({...isDropdownOpen, [experienceId]: !isDropdownOpen[experienceId]});
    };
    

    const handleDeleteExperience = async (experienceId: string) => {
      try {
          const confirmed = window.confirm('Are you sure you want to delete this Experience?');
          if (!confirmed) {
              return;
          }
  
          // Supprimez l'expérience côté serveur
          await deleteExperience(currentUser.username, experienceId);
          setMessage('Experience deleted successfully');
  
          // Mettez à jour localement la liste des expériences en filtrant l'expérience supprimée
          setExperiences((prevList) => prevList.filter((selectedExperience) => selectedExperience._id !== experienceId));
  
          // Forcer le rechargement de la page
          window.location.reload();
      } catch (error) {
          setMessage('Error deleting experience');
          console.error(error);
      }
  };
// update Experience 
const [isEditingExperienceModalOpen, setIsEditingExperienceModalOpen] = useState(false);
const [editingExperienceId, setEditingExperienceId] = useState<string>('');
const [editingExperienceData, setEditingExperienceData] = useState<Experience>({
  _id: '',
  title: '',
  company: '',
  startDate: '',
  endDate: '',
  description: ''
});

const handleOpenEditExperienceModal = async (experienceId: string) => {
  console.log('Opening edit modal for experience ID:', experienceId);
  const experienceToEdit = experiences.find((exp) => exp._id === experienceId);
  console.log('Experience List:', experiences);
  if (experienceToEdit) {
    setEditingExperienceId(experienceId);
    setEditingExperienceData({
      _id: experienceId,
      title: experienceToEdit.title,
      company: experienceToEdit.company,
      startDate: experienceToEdit.startDate,
      endDate: experienceToEdit.endDate,
      description: experienceToEdit.description
    });
    setIsEditingExperienceModalOpen(true);
    console.log('isEditingExperienceModalOpen:', isEditingExperienceModalOpen);
  }
};

const handleEditExperience = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  try {
    const result = await updateExperience(currentUsername, editingExperienceId, editingExperienceData);
    console.log('Experience updated successfully:', result);
    setExperiences((prevList) =>
      prevList.map((exp) => (exp._id === editingExperienceId ? { ...exp, ...editingExperienceData } : exp))
    );
    setIsEditingExperienceModalOpen(false);
       // Reload the page
       window.location.reload();
  } catch (error) {
    console.error('Error updating experience:', error.message);
  }
};

const handleEditExperienceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setEditingExperienceData((prevData) => ({
    ...prevData,
    [name]: value
  }));
};
const handleEditExperienceChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setEditingExperienceData((prevData) => ({
    ...prevData,
    [name]: value
  }));
};



 





  //////////////////////////////////////////////////
  const dispatch = useDispatch();
  const currentUsername = useSelector(selectCurrentUsername);
  const { data: userInfo = {} } = useGetUserInfoQuery(currentUsername);
  const [experienceData, setexperienceData] = useState({
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
    const { name, value } = e.target;
    setexperienceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [errors, setErrors] = useState({
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
  });
  const handleSaveModal :React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    try {
      const errors = validateFormExperience(experienceData);
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
      }else{
      const username = userInfo.username;
      const result = await addUserExperienceAdmin(username, experienceData);
      console.log('Education added successfully:', result);
      setexperienceData({
        title: '',
        company: '',
        startDate: '',
        endDate: '',
        description: '',
      });}
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error adding experience:', error);
    }
  };

  const [selectedExperience, setSelectedExperience] = useState(userInfo.experience && userInfo.experience.length > 0 ? userInfo.experience[0] : null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /////////////////////////////////////////////////////////////

    return ( 
    <>
   <div className="mb-10 mr-7 ml-7 rounded-lg bg-white border border-stroke shadow-md dark:border-strokedark dark:bg-boxdark">
        <div className="flex items-center rounded-lg justify-between border-b border-stroke p-4 px-6.5 dark:border-strokedark bg-gradient-to-r from-graydegrade to-graydouble">
          <h3 className="font-medium text-lg  w-full h-full uppercase text-black">Experience</h3>
          <button
            className=" cursor-pointer outline-none hover:rotate-90 duration-300"
            title="Add New"
            onClick={() => setIsModalOpen(true)}
          >
            <svg
              className="stroke-black fill-none group-hover:fill-graydouble group-active:stroke-teal-200 group-active:fill-teal-600 group-active:duration-0 duration-300"
              viewBox="0 0 24 24"
              height="30px"
              width="30px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-width="1.5"
                d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
              ></path>
              <path stroke-width="1.5" d="M8 12H16"></path>
              <path stroke-width="1.5" d="M12 16V8"></path>
            </svg>
          </button>
        </div>

        <div className="flex p-4">
          <div className="w-1/4">
          <ul className="flex flex-col">
            {userInfo.experience && userInfo.experience.length > 0 && (
              userInfo.experience.map((experience: { _id: string, title: string, company: string }) => (
                <li key={experience._id} className={`cursor-pointer p-2 hover:bg-gray-100 ${experience === selectedExperience ? 'bg-gray-100' : ''}`} onClick={() => setSelectedExperience(experience)}>
                  <span className="text-sm font-semibold text-black dark:text-red-600">{experience.title}</span>
                  <span className="text-xs text-gray-500 dark:text-white">{experience.company}</span>
                </li>
              ))
            )}
          </ul>


          </div>

          <div className="w-3/4 p-4">
          
            
            {selectedExperience ? (
              <> 
              <div className="relative inline-block ">
                <button id={`dropdownMenuIconButton-${selectedExperience._id}`} onClick={() => toggleDropdown(selectedExperience._id)}   aria-haspopup="true"  aria-expanded={isDropdownOpen[selectedExperience._id]}  className="inline-flex ml-80 items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
                  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor darck:bg-black dark:hover:bg-white" viewBox="0 0 4 15">
                    <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                  </svg>
                </button>

                {/* Dropdown menu  */}
                {isDropdownOpen[selectedExperience._id] && (
                <div id={`dropdownDots-${selectedExperience._id}`} className=" absolute right-0 z-1  bg-gray divide-y divide-gray-100 rounded-lg shadow w-50 dark:bg-gray-700 dark:divide-gray-600" aria-labelledby={`dropdownMenuIconButton-${selectedExperience._id}`}>
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li><a  onClick={() => handleDeleteExperience(selectedExperience._id)} className="block px-4 py-2 hover:bg-gray-100 hover:text-esprit dark:hover:bg-gray-600 dark:hover:text-esprit cursor-pointer">Delete</a></li>
                    <li><a  data-modal-target="update-modal" data-modal-toggle="update-modal" onClick={() =>handleOpenEditExperienceModal(selectedExperience._id)} className="block px-4 py-2 hover:bg-gray-100 hover:text-esprit dark:hover:bg-gray-600 dark:hover:text-esprit cursor-pointer">Update</a></li>
                  

                  
                  </ul>
                </div>
                 )}
                 
           
    
                <h4 className="text-lg font-semibold text-red-700 dark:text-red-600">{selectedExperience.title}</h4>
                <p className="text-sm text-gray-500 dark:text-white">{`${formatDate(selectedExperience.startDate)} to ${formatDate(selectedExperience.endDate)}`}</p>
                <p className="text-gray-600 dark:text-white">{selectedExperience.description}</p>
                </div>
              </>
            ) : (
              <p className="text-gray-500">Select an experience to see details.</p>
            )}
          </div>
        </div>
        {/* modal de l'ajout Experience  */}
        {isModalOpen && (

          <form className="p-4 md:p-5">
            <label className="mb-2 text-sm font-medium block uppercase text-black dark:text-white">
              title
            </label>
            <input
              type="text"
              placeholder="title"
              name='title'
              value={experienceData.title}
              onChange={handleChange}
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-800 dark:border-gray-500 dark:bg-gray-600 dark:text-black" />
               {errors.title && <p className="text-red-500">{errors.title}</p>}
            <label className="mb-2 text-sm font-medium block uppercase text-black dark:text-white">
              company Name
            </label>
            <input
              type="text"
              placeholder=" company Name"
              name='company'
              value={experienceData.company}
              onChange={handleChange}
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-800 dark:border-gray-500 dark:bg-gray-600 dark:text-black" />
            {errors.company && <p className="text-red-500">{errors.company}</p>}
            <label className="mb-2 text-sm font-medium  uppercase block text-black dark:text-white">
              startDate
            </label>
            <input
                    type="date"
                    placeholder="Enter Date Start "
                    className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-800 dark:border-gray-500 dark:bg-gray-600 dark:text-black"
                    value={experienceData.startDate}
                    onChange={handleChange}
                    name="startDate" 
                  />
               {errors.startDate && <p className="text-red-500">{errors.startDate}</p>}

            <label className="mb-2 text-sm font-medium  uppercase block text-black dark:text-white">
              endDate
            </label>
                         <input
                    type="date"
                    placeholder="Enter End Date "
                    className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-800 dark:border-gray-500 dark:bg-gray-600 dark:text-black"
                    value={experienceData.endDate}
                    onChange={handleChange}
                    name="endDate" 
                  />
                   {errors.endDate&& <p className="text-red-500">{errors.endDate}</p>}

            <label className="mb-2 text-sm font-medium block uppercase text-black dark:text-white">
              description
            </label>
            <textarea
        
              placeholder="description"
              name='description'
              value={experienceData.description}
              onChange={handleChange}
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-800 dark:border-gray-500 dark:bg-gray-600 dark:text-black" />
               {errors.description && <p className="text-red-500">{errors.description}</p>}
            <div className="flex mt-4 justify-center gap-4.5 mb-5">


              <button
                className=" flex  justify-center rounded-md border  py-2 px-6  text-center font-medium  hover:bg-opacity-90 lg:px-8 xl:px-10 focus:outline-none focus:shadow-outline cursor-pointer 
                                   border-red-900 bg-red-800 p-4 text-white transition
                                           dark:bg-red-500
                                     dark:hover:bg-red-400 dark:focus:ring-red-300 dark:border-red-900"
                type="submit" onClick={handleSaveModal}

              >
                Save

              </button>
              <button onClick={() => setIsModalOpen(false)} className='dark:text-white dark:border-red-500 transition '>Close</button>
            </div>
          </form>


        )}
        {/* modal de l'update Experience  */}
        {isEditingExperienceModalOpen && (

          <form className="p-4 md:p-5">
            <label className="mb-2 text-sm font-medium block uppercase text-black dark:text-white">
              title
            </label>
            <input
              type="text"
              placeholder="title"
              name='title'
              value={editingExperienceData.title}
              onChange={handleEditExperienceChange}
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-800 dark:border-gray-500 dark:bg-gray-600 dark:text-black" />
            <label className="mb-2 text-sm font-medium block uppercase text-black dark:text-white">
              company Name
            </label>
            <input
              type="text"
              placeholder=" company Name"
              name='company'
              value={editingExperienceData.company}
              onChange={handleEditExperienceChange}
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-800 dark:border-gray-500 dark:bg-gray-600 dark:text-black" />
            <label className="mb-2 text-sm font-medium  uppercase block text-black dark:text-white">
              startDate
            </label>
            <input
                    type="date"
                    placeholder="Enter Date Start "
                    className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-800 dark:border-gray-500 dark:bg-gray-600 dark:text-black"
                    value={formatDate(editingExperienceData.startDate)}
                    onChange={handleEditExperienceChange}
                    name="startDate" 
                  />
              

            <label className="mb-2 text-sm font-medium  uppercase block text-black dark:text-white">
              endDate
            </label>
                        <input
                    type="date"
                    placeholder="Enter End Date "
                    className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-800 dark:border-gray-500 dark:bg-gray-600 dark:text-black"
                    value={formatDate(editingExperienceData.endDate)}
                    onChange={handleEditExperienceChange}
                    name="endDate" 
                  />

            <label className="mb-2 text-sm font-medium block uppercase text-black dark:text-white">
              description
            </label>
            <textarea

              placeholder="description"
              name='description'
              value={editingExperienceData.description}
              onChange={handleEditExperienceChangeTextarea}
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-800 dark:border-gray-500 dark:bg-gray-600 dark:text-black" />

            <div className="flex mt-4 justify-center gap-4.5 mb-5">


              <button
                className=" flex  justify-center rounded-md border  py-2 px-6  text-center font-medium  hover:bg-opacity-90 lg:px-8 xl:px-10 focus:outline-none focus:shadow-outline cursor-pointer 
                                  border-red-900 bg-red-800 p-4 text-white transition
                                          dark:bg-red-500
                                    dark:hover:bg-red-400 dark:focus:ring-red-300 dark:border-red-900"
                type="submit" onClick={handleEditExperience}

              >
                Save

              </button>
              <button onClick={() => setIsModalOpen(false)} className='dark:text-white dark:border-red-500 transition '>Close</button>
            </div>
          </form>


          )}
      </div>

    </> );
}
 
export default ExperienceCardAdmin;