import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentUsername } from '../../ApiSlices/authSlice';
import { useGetUserInfoQuery } from "../../ApiSlices/userApiSlice";
import { addUserExperience } from '../../pages/api';
import DatePickerOne from '../Forms/DatePicker/DatePickerOne';
const formatDate = (dateString:any) => {
  const options : Intl.DateTimeFormatOptions ={ year: 'numeric', month: 'short', day: 'numeric'};
  const formattedDate = new Intl.DateTimeFormat('fr-FR', options).format(new Date(dateString));
  return formattedDate;
};

const ExperienceCard = () => {
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
  const handleSaveModal :React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    try {
      const username = userInfo.username;
      const result = await addUserExperience(username, experienceData);
      console.log('Education added successfully:', result);
      setexperienceData({
        title: '',
        company: '',
        startDate: '',
        endDate: '',
        description: '',
      });
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error adding experience:', error);
    }
  };

  const [selectedExperience, setSelectedExperience] = useState(userInfo.experience && userInfo.experience.length > 0 ? userInfo.experience[0] : null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
                strokeWidth="1.5"
                d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
              ></path>
              <path strokeWidth="1.5" d="M8 12H16"></path>
              <path strokeWidth="1.5" d="M12 16V8"></path>
            </svg>
          </button>
        </div>

        <div className="flex p-4">
          <div className="w-1/4">
            <ul className="flex flex-col">
            {userInfo.experience && userInfo.experience.length > 0 && userInfo.experience.map((edu:any, index:number) => (
                <li key={index} className={`cursor-pointer p-2 hover:bg-gray-100 ${edu === selectedExperience ? 'bg-gray-100' : ''}`} onClick={() => setSelectedExperience(edu)}>
                  <span className="text-sm font-semibold text-black dark:text-red-600">{edu.title}</span>
                  <span className="text-xs text-gray-500 dark:text-white">{edu.company}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-3/4 p-4">
            {selectedExperience ? (
              <>
                <h4 className="text-lg font-semibold text-red-700 dark:text-red-600">{selectedExperience.title}</h4>
                <p className="text-sm text-gray-500 dark:text-white">{`${formatDate(selectedExperience.startDate)} to ${formatDate(selectedExperience.endDate)}`}</p>
                <p className="text-gray-600 dark:text-white">{selectedExperience.description}</p>
              </>
            ) : (
              <p className="text-gray-500">Select an experience to see details.</p>
            )}
          </div>
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
              value={experienceData.title}
              onChange={handleChange}
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-800 dark:border-gray-500 dark:bg-gray-600 dark:text-white" />
            <label className="mb-2 text-sm font-medium block uppercase text-black dark:text-white">
              company Name
            </label>
            <input
              type="text"
              placeholder=" company Name"
              name='company'
              value={experienceData.company}
              onChange={handleChange}
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-800 dark:border-gray-500 dark:bg-gray-600 dark:text-white" />
            <label className="mb-2 text-sm font-medium  uppercase block text-black dark:text-white">
              startDate
            </label>
            <DatePickerOne
                            value={experienceData.startDate}
                            onChange={(value) => setexperienceData((prevData) => ({ ...prevData, startDate: value }))}
                           
                        />

            <label className="mb-2 text-sm font-medium  uppercase block text-black dark:text-white">
              endDate
            </label>
            <DatePickerOne
                            value={experienceData.endDate}
                            onChange={(value) => setexperienceData((prevData) => ({ ...prevData, endDate: value }))}
                        />

            <label className="mb-2 text-sm font-medium block uppercase text-black dark:text-white">
              description
            </label>
            <textarea
        
              placeholder="description"
              name='description'
              value={experienceData.description}
              onChange={handleChange}
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-red-800 dark:border-gray-500 dark:bg-gray-600 dark:text-white" />

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
      </div>

    </>);
}

export default ExperienceCard;