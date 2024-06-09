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
        const response = await axios.get(`http://localhost:3001/dashboard/user/${id}`);
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
            
              
            
           
          
          
       
  
   
            

<div className="grid grid-cols-1  rounded-lg  md:grid-cols-3 gap-8">
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