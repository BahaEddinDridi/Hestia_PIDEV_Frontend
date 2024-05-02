import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  selectCurrentUser } from '../../ApiSlices/authSlice';
import { useGetUserInfoQuery } from "../../ApiSlices/userApiSlice";
import { addUserproject } from '../../pages/api';
import DatePickerOne from '../Forms/DatePicker/DatePickerOne';
import { projectColors } from '../color/color';
import { validateFormproject } from '../../pages/Profil/validation';
import axios from 'axios';
import { deleteproject } from '../../pages/api';
import { updateproject } from '../../pages/api';
const formatDate = (dateString: any) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const ProjectCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  //const { data: userInfo = {} } = useGetUserInfoQuery(currentUsername);
 
  
  const [projectData, setprojectData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    description: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
    const { name, value } = e.target;
    setprojectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [errors, setErrors] = useState({
    title: '',
    startDate: '',
    endDate: '',
    description: '',
  });
  const handleSaveModal :React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    try {
      const errors = validateFormproject(projectData);
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
      }else{
      const username = currentUser.username;
      const result = await addUserproject(username, projectData);
      console.log('Education added successfully:', result);
      setprojectData({
        title: '',
        startDate: '',
        endDate: '',
        description: '',
      });}
      setIsModalOpen(false)
      window.location.reload()
    } catch (error) {
      console.error('Error adding experience:', error);
    }
  };
  const [projects, setprojects] = useState<any[]>([]);
  useEffect(() => {
    const fetchproject = async () => {
        try {
            const response = await axios.get(`http://192.168.33.10:3001/user/projects/${currentUser.username}`);
            setprojects(response.data.data);
        } catch (error) {
            console.error('Error fetching experiences:', error.message);
        }
    };

    fetchproject();
}, []);
const [isDropdownOpen, setIsDropdownOpen] = useState<{ [key: string]: boolean }>({});
  const toggleDropdown = (experienceId: string) => {
    setIsDropdownOpen({...isDropdownOpen, [experienceId]: !isDropdownOpen[experienceId]});
  };
  /////////////////////////delete
  const [message, setMessage] = useState('');
  const handleDeleteExperience = async (projectId: string) => {
    try {
        const confirmed = window.confirm('Are you sure you want to delete this Experience?');
        if (!confirmed) {
            return;
        }else{
          window.location.reload()
        }
        await deleteproject(currentUser.username, projectId);
        setMessage('Experience deleted successfully');
        setprojects((prevList) => prevList.filter((userInfo) => userInfo._id !== projectId));
        window.location.reload();
    } catch (error) {
        setMessage('Error deleting experience');
        console.error(error);
    }
};
/////////////////////////update
const [isEditingprojecteModalOpen, setIsEditingprojectModalOpen] = useState(false);
   const [editingprojectId, setEditingprojectId] = useState<string>('');
   const [editingprojectData, setEditingprojectData] = useState<Experience>({
    _id: '',
    title: '',
    startDate: '',
    endDate: '',
    description: ''
  });
  const handleOpenEditprojectModal = async (projectId: string) => {
    console.log('Opening edit modal for project ID:', projectId);
    const projectToEdit = projects.find((exp) => exp._id === projectId);
    console.log('Experience List:', projects);
    if (projectToEdit) {
      setEditingprojectId(projectId);
      setEditingprojectData({
        _id: projectId,
        title: projectToEdit.title,
        company: projectToEdit.company,
        startDate: projectToEdit.startDate,
        endDate: projectToEdit.endDate,
        description: projectToEdit.description
      });
      setIsEditingprojectModalOpen(true);
      
    }
  };
  const handleEditProject = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const result = await updateproject(currentUser.username, editingprojectId, editingprojectData);
      console.log('project updated successfully:', result);
      setprojects((prevList) =>
        prevList.map((exp) => (exp._id === editingprojectId ? { ...exp, ...editingprojectData } : exp))
      );
      setIsEditingprojectModalOpen(false);
         window.location.reload();
    } catch (error) {
      console.error('Error updating project:', error.message);
    }
  };
  const handleEditprojectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingprojectData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  
  return (
    <div className="mb-2 rounded-lg mr-7 ml-7 bg-white border border-stroke shadow-md dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center  rounded-lg justify-between border-b border-stroke p-4 px-6.5 dark:border-strokedark bg-gradient-to-r from-graydegrade to-graydouble">
        <h3 className="font-medium text-lg text-black  w-full h-full uppercase dark:text-black">Projects</h3>
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
              strokeWidth="1.5"
              d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
            ></path>
            <path strokeWidth="1.5" d="M8 12H16"></path>
            <path strokeWidth="1.5" d="M12 16V8"></path>
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6.5">
        {currentUser.project &&
          currentUser.project.map((project: any, index: number) => (
            <div key={index} className={`rounded-md p-6.5 text-white hover:shadow-lg transform hover:-translate-y-2 transition-all duration-300 ${projectColors[index % projectColors.length]}`}
           >
              <button id={`dropdownMenuIconButton-${project._id}`} onClick={() => toggleDropdown(project._id)}   aria-haspopup="true"  aria-expanded={isDropdownOpen[project._id]}  className={`inline-flex ml-80 items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600${projectColors[index % projectColors.length]}`} type="button">
                  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor darck:bg-black dark:hover:bg-white" viewBox="0 0 4 15">
                    <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                  </svg>
                </button>
                {isDropdownOpen[project._id] && (
                <div id={`dropdownDots-${project._id}`} className=" absolute right-0 z-1  bg-black divide-y divide-gray-100 rounded-lg shadow w-50 dark:bg-gray-700 dark:divide-gray-600" aria-labelledby={`dropdownMenuIconButton-${project._id}`}>
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li><a  onClick={() => handleDeleteExperience(project._id)} className="block px-4 py-2 hover:bg-gray-100 hover:text-esprit dark:hover:bg-gray-600 dark:hover:text-esprit cursor-pointer">Delete</a></li>
                    <li><a  data-modal-target="update-modal" data-modal-toggle="update-modal" onClick={() =>handleOpenEditprojectModal(project._id)} className="block px-4 py-2 hover:bg-gray-100 hover:text-esprit dark:hover:bg-gray-600 dark:hover:text-esprit cursor-pointer">Update</a></li>
                  

                  
                  </ul>
                </div>
                 )}
              <h4 className="text-lg font-semibold">{project.title}</h4>
              <p className="text-sm mb-2">{`${formatDate(project.startDate)}-${formatDate(project.endDate)}`}</p>
              <p className="text-sm mb-4">{project.description}</p>
              <span className={`text-xs font-bold bg-white ${projectColors[index % projectColors.length].includes('red') ? 'text-red-500' : 'text-yellow-500'} py-1 px-2 rounded-full`}>
                Default Status
              </span>
            </div>
          ))}
      </div>
      
      {isModalOpen && (

        <form className="p-4 md:p-5" onSubmit={handleSaveModal}>
          <label className="mb-2 text-sm font-medium block uppercase text-black dark:text-white">
            title
          </label>
          <input
            type="text"
            placeholder="title"
            name='title'
            value={projectData.title}
            onChange={handleChange}
            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-800 dark:border-gray-500 dark:bg-gray-600 dark:text-white" />
             {errors.title && <p className="text-red-500">{errors.title}</p>}
          <label className="mb-2 text-sm font-medium  uppercase block text-black dark:text-white">
            startDate
          </label>
          <input
                    type="date"
                    placeholder="Enter Date Start "
                    className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-800 dark:border-gray-500 dark:bg-gray-600 dark:text-black"
                    value={projectData.startDate}
                    onChange={handleChange}
                    name="startDate" 
                  />
            {errors.startDate && <p className="text-red-500">{errors.startDate}</p>}
          <label className="mb-2 text-sm font-medium  uppercase block text-black dark:text-white">
            endDate
          </label>
          <input
                    type="date"
                    placeholder="EnterEnd Date "
                    className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-800 dark:border-gray-500 dark:bg-gray-600 dark:text-black"
                    value={projectData.endDate}
                    onChange={handleChange}
                    name="endDate" 
                  />
            {errors.endDate && <p className="text-red-500">{errors.endDate}</p>}
          <label className="mb-2 text-sm font-medium block uppercase text-black dark:text-white">
            description
          </label>
          <textarea

            placeholder="description"
            name='description'
            value={projectData.description}
            onChange={handleChange}
            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-800 dark:border-gray-500 dark:bg-gray-600 dark:text-white" />
             {errors.description && <p className="text-red-500">{errors.description}</p>}
          <div className="flex mt-4 justify-center gap-4.5 mb-5">


            <button
              className=" flex  justify-center rounded-md border  py-2 px-6  text-center font-medium  hover:bg-opacity-90 lg:px-8 xl:px-10 focus:outline-none focus:shadow-outline cursor-pointer 
                         border-red-900 bg-red-800 p-4 text-white transition
                                 dark:bg-red-500
                           dark:hover:bg-red-400 dark:focus:ring-red-300 dark:border-red-900"
              type="submit" 

            >
              Save

            </button>
            <button onClick={() => setIsModalOpen(false)} className='dark:text-white dark:border-red-500 transition '>Close</button>
          </div>
        </form>


      )}
        {isEditingprojecteModalOpen && (

<form className="p-4 md:p-5">
  <label className="mb-2 text-sm font-medium block uppercase text-black dark:text-white">
    title
  </label>
  <input
    type="text"
    placeholder="title"
    name='title'
    value={editingprojectData.title}
    onChange={handleEditprojectChange}
    className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-800 dark:border-gray-500 dark:bg-gray-600 dark:text-black" />
 
  <label className="mb-2 text-sm font-medium  uppercase block text-black dark:text-white">
    startDate
  </label>
  <input
          type="date"
          placeholder="Enter Date Start "
          className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-800 dark:border-gray-500 dark:bg-gray-600 dark:text-black"
          value={formatDate(editingprojectData.startDate)}
          onChange={handleEditprojectChange}
          name="startDate" 
        />
    

  <label className="mb-2 text-sm font-medium  uppercase block text-black dark:text-white">
    endDate
  </label>
              <input
          type="date"
          placeholder="Enter End Date "
          className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-800 dark:border-gray-500 dark:bg-gray-600 dark:text-black"
          value={formatDate(editingprojectData.endDate)}
          onChange={handleEditprojectChange}
          name="endDate" 
        />

  <label className="mb-2 text-sm font-medium block uppercase text-black dark:text-white">
    description
  </label>
  <textarea

    placeholder="description"
    name='description'
    value={editingprojectData.description}
    onChange={handleEditprojectChange}
    className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-800 dark:border-gray-500 dark:bg-gray-600 dark:text-black" />

  <div className="flex mt-4 justify-center gap-4.5 mb-5">


    <button
      className=" flex  justify-center rounded-md border  py-2 px-6  text-center font-medium  hover:bg-opacity-90 lg:px-8 xl:px-10 focus:outline-none focus:shadow-outline cursor-pointer 
                        border-red-900 bg-red-800 p-4 text-white transition
                                dark:bg-red-500
                          dark:hover:bg-red-400 dark:focus:ring-red-300 dark:border-red-900"
      type="submit" onClick={handleEditProject}

    >
      Save

    </button>
    <button onClick={() => setIsModalOpen(false)} className='dark:text-white dark:border-red-500 transition '>Close</button>
  </div>
</form>


)}
    </div>
  );
}

export default ProjectCard;