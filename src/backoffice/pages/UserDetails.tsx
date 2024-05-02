import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
// import DefaultLayout from '../layout/DefaultLayout';
import CoverOne from '../../images/cover/cover-01.png';

import { Link } from 'react-router-dom';

//affichage details de user
import React, { useEffect,useState } from 'react';
// import { getUserById } from '../components/api';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DefaultLayoutAdmin from "../layaout/DefaultLayoutAdmin";







interface User{
    _id:string;
    firstName:string;
    lastName:string;
    username:string;
    email:string;
    role:string;
    birthDate:string;
    status:string;
    image:string;
    gender:string;
    phoneNumber:string;
    coverimage:string;
    location:string;
    ProfileStatus:string,
    Country:string;
    accountVisibility:string;
    education: {
      school: string;
      degree: string;
      startDate: string;
      endDate: string;
  }[];
  experience:{
    title:string;
    company:string;
    startDate:string;
    endDate:string;
    description:string;
  }[];
  }
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

const userDetails:React.FC = () => {

    const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const profileImage = user && user.image ? `${user.image}` : (user && user.gender === 'female' ? 'https://res.cloudinary.com/dc31jcevz/image/upload/v1710846932/unknownF_ohd798.jpg' : 'https://res.cloudinary.com/dc31jcevz/image/upload/v1710846932/unknownH_oabt4p.jpg');
  const statusColor =user &&user.status =='online' ? 'bg-green-600' : 'bg-red-500';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://192.168.33.10:3001/dashboard/user/${id}`);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);
  

  return (
    <DefaultLayoutAdmin>
      {/* <Breadcrumb pageName="Profile" /> */}

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65">
        {user && user.coverimage ? (
              <img
                  src={user.coverimage}
                  alt="profile cover"
                  className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
              />
          ) : (
              <img
                  src={CoverOne}
                  alt="profile cover"
                  className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
              />)}
          <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
            
          </div>
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2">
                <div className='rounded-full overflow-hidden'>
                <img src={profileImage} alt="profile" />
                </div>
                {/* status en ligne */}
              {/* <label
                htmlFor="profile"
                className={`absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-success text-white  sm:bottom-2 sm:right-2 ${statusColor}`}
              >
                <input
                  type="file"
                  name="profile"
                  id="profile"
                  className="sr-only"
                />
              </label> */}
            </div>
          </div>
          <div>
            
                <div className="mt-4">
                <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                  {user && user.username}
                </h3>
                <p className="font-medium">{user &&user.role}</p>
                
                </div>
            
              
            
           
          
          
       
  
            {/* Profil Information */}
            {/* <div className="w-full lg:w-1/2 px-4">
                <div className="rounded-sm border border-esprit bg-white shadow-default dark:border-esprit dark:bg-boxdark">
                <div className="border-b border-esprit py-4 px-6.5 dark:border-esprit">
                    <h3 className="font-medium text-black dark:text-white">
                    Profil Information
                    </h3>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                    <div className="flex flex-col">
                    <div className="flex items-center  space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
                  </svg>

                    <span className=" text-lg font-semibold text-gray-800 dark:text-white">Full Name</span>
                    </div>
                    <label className="text-sm text-gray-500 dark:text-gray-300  ">{user && user.firstName} {user && user.lastName}</label>
                    </div>
                    <div className="flex flex-col">
                    <div className="flex items-center space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fill-rule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z" clip-rule="evenodd" />
                  </svg>
                    <span className="text-lg font-semibold text-gray-800 dark:text-white">Mobile</span>
                    </div>
                    <label className="text-sm text-gray-500 dark:text-gray-300">{user && user.phoneNumber}</label>
                    </div>
                    <div className="flex flex-col">
                    <div className="flex items-center space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fill-rule="evenodd" d="M5.404 14.596A6.5 6.5 0 1 1 16.5 10a1.25 1.25 0 0 1-2.5 0 4 4 0 1 0-.571 2.06A2.75 2.75 0 0 0 18 10a8 8 0 1 0-2.343 5.657.75.75 0 0 0-1.06-1.06 6.5 6.5 0 0 1-9.193 0ZM10 7.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z" clip-rule="evenodd" />
                  </svg>
                    <span className="text-lg font-semibold text-gray-800 dark:text-white">Email</span>
                    </div>
                    <label className="text-sm text-gray-500 dark:text-gray-300">{user && user.email}</label>
                    </div>
                    {user && (
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-3">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path d="m6.75.98-.884.883a1.25 1.25 0 1 0 1.768 0L6.75.98ZM13.25.98l-.884.883a1.25 1.25 0 1 0 1.768 0L13.25.98ZM10 .98l.884.883a1.25 1.25 0 1 1-1.768 0L10 .98ZM7.5 5.75a.75.75 0 0 0-1.5 0v.464c-1.179.304-2 1.39-2 2.622v.094c.1-.02.202-.038.306-.052A42.867 42.867 0 0 1 10 8.5c1.93 0 3.83.129 5.694.378.104.014.206.032.306.052v-.094c0-1.232-.821-2.317-2-2.622V5.75a.75.75 0 0 0-1.5 0v.318a45.645 45.645 0 0 0-1.75-.062V5.75a.75.75 0 0 0-1.5 0v.256c-.586.01-1.17.03-1.75.062V5.75ZM4.505 10.365A41.36 41.36 0 0 1 10 10c1.863 0 3.697.124 5.495.365C16.967 10.562 18 11.838 18 13.28v.693a3.72 3.72 0 0 1-1.665-.393 5.222 5.222 0 0 0-4.67 0 3.722 3.722 0 0 1-3.33 0 5.222 5.222 0 0 0-4.67 0A3.72 3.72 0 0 1 2 13.972v-.693c0-1.441 1.033-2.717 2.505-2.914ZM15.665 14.92a5.22 5.22 0 0 0 2.335.552V16.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 16.5v-1.028c.8 0 1.6-.184 2.335-.551a3.722 3.722 0 0 1 3.33 0c1.47.735 3.2.735 4.67 0a3.722 3.722 0 0 1 3.33 0Z" />
                    </svg>
                    <span className="text-lg font-semibold text-gray-800 dark:text-white">Birthdate</span>
                    </div>
                    <label className="text-sm text-gray-500 dark:text-gray-300">{new Date( user.birthDate).toLocaleDateString('fr-FR')}</label>
                   
                    </div>
                    )}
                    <div className="flex flex-col">
                    <div className="flex items-center space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fill-rule="evenodd" d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clip-rule="evenodd" />
                  </svg>
                    <span className="text-lg font-semibold text-gray-800 dark:text-white">Location</span>
                    </div>
                    <label className="text-sm text-gray-500 dark:text-gray-300">{user && user.location}</label>
                    </div>
                    <div className="flex flex-col">
                    <div className="flex items-center space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd" />
                    </svg>
                    <span className="text-lg font-semibold text-gray-800 dark:text-white">Profil Status</span>
                    </div>
                    <label className="text-sm text-gray-500 dark:text-gray-300">{user && user.ProfileStatus}</label>
                    </div>
                    <div className="flex flex-col">
                    <div className="flex items-center space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-1.5 0a6.5 6.5 0 1 1-11-4.69v.447a3.5 3.5 0 0 0 1.025 2.475L8.293 10 8 10.293a1 1 0 0 0 0 1.414l1.06 1.06a1.5 1.5 0 0 1 .44 1.061v.363a1 1 0 0 0 .553.894l.276.139a1 1 0 0 0 1.342-.448l1.454-2.908a1.5 1.5 0 0 0-.281-1.731l-.772-.772a1 1 0 0 0-1.023-.242l-.384.128a.5.5 0 0 1-.606-.25l-.296-.592a.481.481 0 0 1 .646-.646l.262.131a1 1 0 0 0 .447.106h.188a1 1 0 0 0 .949-1.316l-.068-.204a.5.5 0 0 1 .149-.538l1.44-1.234A6.492 6.492 0 0 1 16.5 10Z" clip-rule="evenodd" />
                  </svg>
                    <span className="text-lg font-semibold text-gray-800 dark:text-white">Country</span>
                    </div>
                    <label className="text-sm text-gray-500 dark:text-gray-300">{user && user.Country}</label>
                    </div>
                    <div className="flex flex-col">
                    <div className="flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clip-rule="evenodd" />
                  </svg>
                    <span className="text-lg font-semibold text-gray-800 dark:text-white">Account-Visiblity</span>
                    </div>
                    <label className="text-sm text-gray-500 dark:text-gray-300">{user && user.accountVisibility}</label>
                    </div>

                    
                </div>
                </div>
            </div> */}
            

<div className="grid grid-cols-3  rounded-lg  md:grid-cols-3 gap-8">
  <div className="relative overflow-hidden rounded-3xl w-80 h-70  cursor-pointer text-2xl font-bold bg-gradient-to-r from-infoprofilomayma to-red-700 mt-4">
  <div className="z-10 absolute w-full h-full peer col-span-1 bg-gray-200 rounded-lg p-4"></div>
  <div
    className="absolute peer-hover:-top-20 peer-hover:-left-16 peer-hover:w-[140%] peer-hover:h-[140%] -top-32 -left-16 w-32 h-44 rounded-full bg-purple-300 transition-all duration-500"
  ></div>

    <div className="absolute peer-hover:-top-20 peer-hover:-left-16 peer-hover:w-[140%] peer-hover:h-[140%] -top-32 -left-16 w-32 h-44 rounded-full bg-red-700 transition-all duration-500"></div>

      <div className="absolute flex text-xl text-center items-end justify-end peer-hover:right-0 peer-hover:rounded-b-none peer-hover:bottom-0 peer-hover:items-center peer-hover:justify-center peer-hover:w-full peer-hover:h-full -bottom-32 -right-90 w-36 h-44 rounded-full bg-infoprofilomayma transition-all duration-500">
        <div className="flex flex-col gap-5.5 p-6.5">
          <div className="flex flex-col">
            <span className="text-sm text-white dark:text-black">Full Name</span>
            <label className="text-lg font-semibold text-black dark:text-white">{user && `${user.firstName} ${user.lastName}`}</label>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-white dark:text-black">Mobile</span>
            <label className="text-lg font-semibold text-black dark:text-white">{user&& `${user.phoneNumber}`}</label>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-white dark:text-black">Email</span>
            <label className="text-lg font-semibold text-black dark:text-white"> {user&& `${user.email}`} </label>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-white dark:text-black">Location</span>
            <label className="text-lg font-semibold text-black dark:text-white">{user && `${user.location}`}</label>
          </div>
        </div>
      </div>

    <div className="w-full h-full items-center justify-center flex uppercase text-white">
      Profil Information
    </div>
  </div>
  
            {/* About Me */}

<div className="">
        <ul className="col-span-1 bg-gray-200 rounded-lg p-4">
        <div className="border-b border-esprit py-4 px-6.5 dark:border-esprit">
              <h3 className="font-medium text-black dark:text-white">
                Educations
              </h3>
        </div>
          {user && user.education && user.education.length > 0 && user.education.map((education, index) => (
            <li key={index} className="relative p-4 dark:bg-white dark:text-black rounded-md w-full md:w-80 transition-transform transform hover:scale-105 cursor-pointer">
              <div className="relative inline-block">
                <h4 className="text-lg font-semibold text-black dark:text-black">{education.degree}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-300">{` - ${formatDate(education.startDate)} to ${formatDate(education.endDate)}`}</p>
                <p className="text-sm text-gray-500 dark:text-gray-300">{education.school}</p>
              </div>
            </li>
          ))}
        </ul>
        </div>
  
        <div className="col-span-1 bg-gray-200 rounded-lg p-4">
        <ul className="grid gap-4">
        <div className="border-b border-esprit py-4 px-6.5 dark:border-esprit">
              <h3 className="font-medium text-black dark:text-white">
                Experiences
              </h3>
        </div>
          {user && user.experience && user.experience.length > 0 && user.experience.map((experience, index) => (
            <li key={index} className="relative p-4  dark:bg-white dark:text-black rounded-md w-full md:w-80 transition-transform transform hover:scale-105 cursor-pointer">
              <div className="relative inline-block">
                <h4 className="text-lg font-semibold text-black dark:text-black">{experience.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-300">{`${experience.company} - ${formatDate(experience.startDate)} to ${formatDate(experience.endDate)}`}</p>
                <p className="text-sm text-gray-500 dark:text-gray-300">{experience.description}</p>
              </div>
            </li>
          ))}
        </ul>
        </div>
        </div>    
          </div>
        </div>
      </div>
      
    </DefaultLayoutAdmin>
  );
};

export default userDetails;