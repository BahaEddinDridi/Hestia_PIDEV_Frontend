
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAdminByUsername } from '../api/index';
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../ApiSlices/authSlice";


interface UserProfile {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  image:string;
  role:string;
  phoneNumber:string;
}

///////////////////////////////////////////

const profilAdmininfo = () => {


  const { username } = useParams<{ username: string }>();
  const [adminProfile, setAdminProfile] = useState<UserProfile | null>(null);

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       if (username) { // Vérifiez si username est défini
  //         const profile = await fetchAdminByUsername(username);
  //         setAdminProfile(profile);
  //       } else {
  //         console.error('Username is undefined');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching admin profile:', error);
  //     }
  //   };
  //
  //   fetchProfile();
  // }, [username]);

  const currentUser=useSelector(selectCurrentUser);

  //////////////////////////////////////////////////////////////////////////////////////////
    const [user, setUser] = useState<any>(null);
    const educations = [
        {
          degree: "Bachelor's Degree in Computer Science",
          school: "University of Example",
          graduationYear: "2022",
        },
        {
          degree: "Master's Degree in Web Development",
          school: "Online University",
          graduationYear: "2024",
        },
        {
          degree: "Diploma in Graphic Design",
          school: "Art Institute",
          graduationYear: "2021",
        },
      ]
      const [isModalOpen, setIsModalOpen] = useState(false);

      const handleAddEducationClick = () => {
        setIsModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
      };
      const handleFormSubmit = (formData: any) => {
        // Traitement du formulaire ici
        // ...
    
        // Fermer le modal après la soumission du formulaire
        setIsModalOpen(false);
      };
      const [dropdownVisible, setDropdownVisible] = useState(Array(educations.length).fill(false));

      const toggleDropdown = (index: any) => {
        const newDropdownVisible = [...dropdownVisible];
        newDropdownVisible[index] = !newDropdownVisible[index];
        setDropdownVisible(newDropdownVisible);
      };
    return ( 
    <>
     <div className=" mb-10 mt-2 rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
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
                    <label className="text-lg font-semibold text-black dark:text-white">{currentUser && `${currentUser.phoneNumber}`}</label>
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

            <div className="w-full md:w-1/2 p-4">
              <div className="text-right mb-4">
                <button
                  className=" rounded-lg relative w-full md:w-50 h-10 cursor-pointer flex items-center border bg-white  group hover:bg-white active:bg-white "
                  data-modal-target="authentication-modal" data-modal-toggle="authentication-modal"
                  onClick={handleAddEducationClick}
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
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line x1="12" x2="12" y1="5" y2="19"></line>
                      <line x1="5" x2="19" y1="12" y2="12"></line>
                    </svg>
                  </span>
                </button>
                <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                  <div className="relative p-4 w-full max-w-md max-h-full">
                  
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                     
                      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          Sign in to our platform
                        </h3>
                        <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                          </svg>
                          <span className="sr-only">Close modal</span>
                        </button>
                      </div>
                      <div className="p-4 md:p-5">
                        <form className="space-y-4" action="#">
                          <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                          </div>
                          <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                          </div>
                          <div className="flex justify-between">
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                              </div>
                              <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                            </div>
                            <a href="#" className="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                          </div>
                          <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered? <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>




              </div>
              <ul className="grid gap-4">
                {educations.map((edu, index) => (
                  <li key={index} className=" relative p-4 border border-gray-200 rounded-md w-full md:w-100 transition-transform transform hover:scale-105 cursor-pointer">

                    <button id={`dropdownButton_${index}`} data-dropdown-toggle={`dropdown_${index}`} className=" absolute top-2 right-2  ml-90 inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" onClick={() => toggleDropdown(index)} type="button">
                      <span className="sr-only">Open dropdown</span>
                      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                      </svg>
                      <div id={`dropdown_${index}`} className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44  dark:bg-gray-700">
                        <ul className="py-2" aria-labelledby={`dropdownButton_${index}`}>
                          <li>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
                          </li>
                          <li>
                            <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                          </li>
                        </ul>
                      </div>
                    </button>


                    <h4 className="text-lg font-semibold text-black dark:text-white">{edu.degree}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-300">{edu.school} - {edu.graduationYear}</p>

                  </li>
                ))}
              </ul>

            </div>
          </div>
        </div>
    </> );
}
 
export default profilAdmininfo;