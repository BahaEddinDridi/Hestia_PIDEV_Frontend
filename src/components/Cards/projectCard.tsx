import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentUsername } from '../../ApiSlices/authSlice';
import { useGetUserInfoQuery } from "../../ApiSlices/userApiSlice";
import { addUserproject } from '../../pages/api';
import DatePickerOne from '../Forms/DatePicker/DatePickerOne';
import { projectColors } from '../color/color';
const formatDate = (dateString:any) => {
  const options : Intl.DateTimeFormatOptions ={ year: 'numeric', month: 'short', day: 'numeric'};
  const formattedDate = new Intl.DateTimeFormat('fr-FR', options).format(new Date(dateString));
  return formattedDate;
};

const ProjectCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const currentUsername = useSelector(selectCurrentUsername);
  const { data: userInfo = {} } = useGetUserInfoQuery(currentUsername);
 

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
  const handleSaveModal :React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    try {
      const username = userInfo.username;
      const result = await addUserproject(username, projectData);
      console.log('Education added successfully:', result);
      setprojectData({
        title: '',
        startDate: '',
        endDate: '',
        description: '',
      });
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error adding experience:', error);
    }
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
        {userInfo.project &&
          userInfo.project.map((project: any, index: number) => (
            <div key={index} className={`rounded-md p-6.5 text-white hover:shadow-lg transform hover:-translate-y-2 transition-all duration-300 ${projectColors[index % projectColors.length]}`}
           >
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

        <form className="p-4 md:p-5">
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

          <label className="mb-2 text-sm font-medium  uppercase block text-black dark:text-white">
            startDate
          </label>
          <DatePickerOne
                            value={projectData.startDate}
                            onChange={(value) => setprojectData((prevData) => ({ ...prevData, startDate: value }))}
                        />

          <label className="mb-2 text-sm font-medium  uppercase block text-black dark:text-white">
            endDate
          </label>
          <DatePickerOne
                            value={projectData.endDate}
                            onChange={(value) => setprojectData((prevData) => ({ ...prevData, endDate: value }))}
                        />

          <label className="mb-2 text-sm font-medium block uppercase text-black dark:text-white">
            description
          </label>
          <textarea

            placeholder="description"
            name='description'
            value={projectData.description}
            onChange={handleChange}
            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-800 dark:border-gray-500 dark:bg-gray-600 dark:text-white" />

          <div className="flex mt-4 justify-center gap-4.5 mb-5">


            <button
              className=" flex  justify-center rounded-md border  py-2 px-6  text-center font-medium  hover:bg-opacity-90 lg:px-8 xl:px-10 focus:outline-none focus:shadow-outline cursor-pointer 
                         border-red-900 bg-red-800 p-4 text-white transition
                                 dark:bg-red-500
                           dark:hover:bg-red-400 dark:focus:ring-red-300 dark:border-red-900"
              type="submit"  onClick={handleSaveModal}

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