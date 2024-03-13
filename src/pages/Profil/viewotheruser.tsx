import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import CoverOne from '../../images/cover/cover-01.png';
import userSix from '../../images/user/user-06.png';
//import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUserProfile } from '../api';
import { projectColors } from '../../components/color/color';

const formatDate = (dateString: any) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('fr-FR', options).format(new Date(dateString));
  return formattedDate;
};
const OtherProfile = () => {
  const { username } = useParams();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [selectedExperience, setSelectedExperience] = useState<any>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (username) {
          const data = await getUserProfile(username);
          console.log('Data from getUserProfile:', data);
          setUserProfile(data);
          if (data.experience && data.experience.length > 0) {
            setSelectedExperience(data.experience[0]);
          }
        }

      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [username]);

  if (!userProfile) {
    return <div>Loading...</div>;
  }



  return (

    <DefaultLayout>
      <div className="relative overflow-hidden rounded-sm border mr-7 ml-7 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20  h-48 md:h-80 lg:h-96 overflow-hidden rounded-t-lg">
          {userProfile.coverimage ? (
            <img
              src={userProfile.coverimage}
              alt="profile cover"
              className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
            />
          ) : (
            <img
              src={CoverOne}
              alt="profile cover"
              className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
            />
          )}

        </div>


        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">

          <div className="relative z-30 ml-10 -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2">
              {userProfile.image ? (
                <img src={userProfile.image} alt="profile" className='w-50 h-40 rounded-full overflow-hidden object-cover' />
              ) : (
                <img src={userSix} alt="profile" />
              )
              }
            </div>

          </div>

          <div className="mr-150  ">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              {/* Display user's full name */}
              {userProfile && `${userProfile.firstName} ${userProfile.lastName}`}
              {userProfile && userProfile.accountVisibility === 'private' && (
                <div className="text-sm text-black dark:text-red-400 mt-2">
                  private account
                </div>
              )}
            </h3>
           
            <p className="font-medium">Ui/Ux Designer</p>
          </div>

        </div>
        <div className="flex mb-2 ml-[1009px] mt-4">

          <button

            className="group ml-10 flex p-2 rounded-md drop-shadow-xl  from-gray-800  font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1.1em"
              viewBox="0 0 512 512"
              stroke-width="0"
              fill="currentColor"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                d="M444.17 32H70.28C49.85 32 32 46.7 32 66.89v374.72C32 461.91 49.85 480 70.28 480h373.78c20.54 0 35.94-18.21 35.94-38.39V66.89C480.12 46.7 464.6 32 444.17 32zm-273.3 373.43h-64.18V205.88h64.18zM141 175.54h-.46c-20.54 0-33.84-15.29-33.84-34.43 0-19.49 13.65-34.42 34.65-34.42s33.85 14.82 34.31 34.42c-.01 19.14-13.31 34.43-34.66 34.43zm264.43 229.89h-64.18V296.32c0-26.14-9.34-44-32.56-44-17.74 0-28.24 12-32.91 23.69-1.75 4.2-2.22 9.92-2.22 15.76v113.66h-64.18V205.88h64.18v27.77c9.34-13.3 23.93-32.44 57.88-32.44 42.13 0 74 27.77 74 87.64z"
              ></path>
            </svg>
            <span
              className="absolute text-black opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-y-10 duration-700"
            >
              Linkedin
            </span>
          </button>
          <button
            className="group flex p-2 rounded-md drop-shadow-xl bg-gradient-to-r from-gray-800   font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"

          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 15 15"
              className="w-5"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                fill="currentColor"
                d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z"
              ></path>
            </svg>
            <span
              className=" text-black absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-y-10 duration-700"
            >
              GitHub
            </span>

          </button>
          <button
            className="group flex p-2 rounded-md drop-shadow-xl bg-gradient-to-r from-gray-800 font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
            <span
              className="text-black absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-y-10 duration-700"
            >
              Send Message
            </span>
          </button>
        </div>
      </div>
      <div className={`mb-10  mt-2 mr-7 ml-7 rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark`}>

        <div className="grid grid-cols-2  rounded-lg  md:grid-cols-2 gap-8">
          <div className="relative overflow-hidden rounded-3xl w-full h-100  cursor-pointer text-2xl font-bold bg-gradient-to-r from-red-500 to-red-700">
            <div className="z-10 absolute w-full h-full peer"></div>

            <div className="absolute peer-hover:-top-20 peer-hover:-left-16 peer-hover:w-[140%] peer-hover:h-[140%] -top-32 -left-16 w-32 h-44 rounded-full bg-red-700 transition-all duration-500"></div>

            <div className="absolute flex text-xl text-center items-end justify-end peer-hover:right-0 peer-hover:rounded-b-none peer-hover:bottom-0 peer-hover:items-center peer-hover:justify-center peer-hover:w-full peer-hover:h-full -bottom-32 -right-90 w-36 h-44 rounded-full bg-red-600 transition-all duration-500">
              <div className="flex flex-col gap-5.5 p-6.5">
                <div className="flex flex-col">
                  <span className="text-sm text-white dark:text-black">Full Name</span>
                  <label className="text-lg font-semibold text-black dark:text-white">{userProfile && `${userProfile.firstName} ${userProfile.lastName}`}</label>
                </div>
                {userProfile && userProfile.accountVisibility === 'private' && (
                <div className="text-sm text-black dark:text-red-400 mt-2">
                  This account is private. Contact the user for more information.
                </div>
              )}
                <div className="flex flex-col">
                  <span className="text-sm text-white dark:text-black">Mobile</span>
                  <label className="text-lg font-semibold text-black dark:text-white">{userProfile && userProfile.accountVisibility === 'public' && `${userProfile.phoneNumber}`}</label>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-white dark:text-black">Email</span>
                  <label className="text-lg font-semibold text-black dark:text-white"> {userProfile && userProfile.accountVisibility === 'public' && `${userProfile.email}`} </label>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-white dark:text-black">Location</span>
                  <label className="text-lg font-semibold text-black dark:text-white">{userProfile && userProfile.accountVisibility === 'public' && `${userProfile.location}`}</label>
                </div>
              </div>
             
            </div>

            <div className="w-full h-full items-center justify-center flex uppercase text-white">
              Profil Information
            </div>
          </div>

          <div className=" w-full md:w-1/2 p-4">
            <ul className="grid gap-4">
              {userProfile.education && userProfile.education.length > 0 && userProfile.education.map((edu: any, index: number) => (
                <li key={index} className=" relative p-4 border border-gray-200 rounded-md w-full md:w-100 transition-transform transform hover:scale-105 cursor-pointer">

                  <button id={`dropdownButton_${index}`} data-dropdown-toggle={`dropdown_${index}`} className=" absolute top-2 right-2  ml-90 inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
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


                  <h4 className="text-lg font-semibold text-black dark:text-white ">{edu.degree}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-300"> {`${edu.school} - ${formatDate(edu.startDate)} to ${formatDate(edu.endDate)}`}</p>

                </li>
              ))}
            </ul>
          </div>
        </div>
      </div >


      <div className="mb-10 mr-7 ml-7 rounded-lg bg-white border border-stroke shadow-md dark:border-strokedark dark:bg-boxdark">
        <div className="flex items-center rounded-lg justify-between border-b border-stroke p-4 px-6.5 dark:border-strokedark bg-gradient-to-r from-graydegrade to-graydouble">
          <h3 className="font-medium text-lg w-full h-full uppercase text-black">Experience</h3>
        </div>

        <div className="flex p-4">
          <div className="w-1/4">
            <ul className="flex flex-col">
              {userProfile.experience && userProfile.experience.length > 0 && userProfile.experience.map((edu: any, index: number) => (
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
                <p className="text-sm text-gray-500 dark:text-gray-300 dark:text-white">{`${formatDate(selectedExperience.startDate)} to ${formatDate(selectedExperience.endDate)}`}</p>
                <p className="text-gray-600 dark:text-gray-400 dark:text-white">{selectedExperience.description}</p>
              </>
            ) : (
              <p className="text-gray-500">Sélectionnez une expérience pour voir les détails.</p>
            )}
          </div>
        </div>
      </div>
      {/* *****************************Project  */}

      <div className="mb-2 rounded-lg mr-7 ml-7 bg-white border border-stroke shadow-md dark:border-strokedark dark:bg-boxdark">
        <div className="flex items-center  rounded-lg justify-between border-b border-stroke p-4 px-6.5 dark:border-strokedark bg-gradient-to-r from-graydegrade to-graydouble">
          <h3 className="font-medium text-lg text-black  w-full h-full uppercase dark:text-black">Projects</h3>

        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6.5">
          {userProfile.project &&
            userProfile.project.map((project: any, index: number) => (
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


      </div>


    </DefaultLayout>

  );
};

export default OtherProfile;
