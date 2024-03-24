import DefaultLayout from "../../layout/DefaultLayout";
import { useSelector } from 'react-redux';
import {selectCurrentUser } from '../../ApiSlices/authSlice';
import {  useState } from 'react';
import CoverOne from '../../images/cover/cover-01.png';
import userSix from '../../images/user/user-06.png';

const ViewCompany = () => {

  const currentUser = useSelector(selectCurrentUser);
  const [activeTab, setActiveTab] = useState('info');
  const handleTabChange = (tabName: any) => {
    setActiveTab(tabName);
  };
  return (
    <>
      <DefaultLayout>
        <div className="relative overflow-hidden rounded-sm border mr-7 ml-7 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="relative overflow-hidden rounded-sm border mr-7 ml-7 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="relative z-20  h-48 md:h-80 lg:h-96 overflow-hidden rounded-t-lg">
              {currentUser.coverimage ? (
                <img
                  src={currentUser.coverimage}
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

          </div>

          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
            <div className="relative z-30 ml-10 -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
              <div className="relative drop-shadow-2">
                {currentUser.image ? (
                  <img src={currentUser.image} alt="profile" className='w-50 h-40 rounded-full overflow-hidden object-cover' />
                ) : (
                  <img src={userSix} alt="profile" />
                )
                }
               

              </div>
            </div>

            <div className="mr-150  ">
              <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">

                {currentUser && currentUser.username}
              </h3>

            </div>
            <div className="flex  ml-[1100px] mt-4">
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
                  className="absolute text-black dark:text-white opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-y-10 duration-700"
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
                  className=" text-black dark:text-white absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-y-10 duration-700"
                >
                  GitHub
                </span>
              </button>
            </div>
          </div>



        </div>
        <div className="mx-auto max-w-3xl px-4 py-8">
          <div className="flex justify-center mb-6">
            <button
              className={`mx-4 py-2 px-4 font-medium text-gray-600 dark:text-gray-400 focus:outline-none relative hover:text-black hover:dark:text-white ${activeTab === 'info' && 'text-black dark:text-white'}`}
              onClick={() => handleTabChange('info')}
            >
              About
              {activeTab === 'info' && <div className="absolute bottom-0 left-0 w-full h-1 bg-black dark:bg-white"></div>}
            </button>
            <button
              className={`mx-4 py-2 px-4 font-medium text-gray-600 dark:text-gray-400 focus:outline-none relative hover:text-red-800 hover:dark:text-white ${activeTab === 'job offers' && 'text-red-800 dark:text-white'}`}
              onClick={() => handleTabChange('job offers')}
            >
              Job Offers
              {activeTab === 'job offers' && <div className="absolute bottom-0 left-0 w-full h-1 bg-red-800 dark:bg-white"></div>}
            </button>
            <button
              className={`mx-4 py-2 px-4 font-medium text-gray-600 dark:text-gray-400 focus:outline-none relative hover:text-cardfarah hover:dark:text-white ${activeTab === 'internship' && 'text-cardfarah dark:text-white'}`}
              onClick={() => handleTabChange('internship')}
            >
              Internship Offers
              {activeTab === 'internship' && <div className="absolute bottom-0 left-0 w-full h-1 bg-cardfarah dark:bg-white"></div>}
            </button>
          </div>
        </div>



        {activeTab === 'info' && (
          <div className="mb-10 mx-auto max-w-[1233px] mt-4 rounded-lg bg-red-800 text-white shadow-md dark:bg-gray-800">
            <div className="p-6">
              <h3 className="font-medium text-lg text-white uppercase mb-4">About the Company</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <h2 className="font-medium">Presentation</h2>
                  <p>{currentUser && currentUser.title}</p>
                </div>
                <div className="mb-4">
                  <h2 className="font-medium">Company Link</h2>
                  <p>{currentUser && currentUser.CompanyLink}</p>
                </div>
                <div className="mb-4">
                  <h2 className="font-medium">Phone</h2>
                  <p>{currentUser && currentUser.phoneNumber}</p>
                </div>
                <div className="mb-4">
                  <h2 className="font-medium">Date of Creation</h2>
                  <p>{currentUser && currentUser.birthDate}</p>
                </div>
                <div className="mb-4">
                  <h2 className="font-medium">Email</h2>
                  <p>{currentUser && currentUser.email}</p>
                </div>
              </div>
            </div>
          </div>
        )}


        {activeTab === 'job offers' && (
          <div className="flex mb-10 mx-auto  mt-4 max-w-6xl">
            {/* Card pour l'image et le nom de l'entreprise */}
            <div className="flex-2 mr-4">
              <div className="bg-white border border-stroke shadow-md dark:border-strokedark dark:bg-boxdark p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-lg text-black uppercase">Company Details</h3>
                </div>
                {/* Insérer l'image de l'entreprise */}
                <img src={currentUser.image} alt="profile" className='w-40 h-30 rounded-lg overflow-hidden object-cover' />
                {/* Nom de l'entreprise */}
                <h2 className="text-xl font-semibold text-black">{currentUser && currentUser.username}</h2>
              </div>

              <div className="bg-white border mt-2 border-stroke shadow-md dark:border-strokedark dark:bg-boxdark p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <p className="w-32">View a collection of active or past {currentUser && currentUser.username} Engineering Services advertisements.</p>
                </div>
              </div>
            </div>

            {/* Card pour ajouter une offre et afficher les offres */}
            <div className="flex-1">
              <div className="bg-white border border-stroke shadow-md dark:border-strokedark dark:bg-boxdark p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-lg text-black uppercase">Job Offers</h3>
                </div>
                {/* Liste des offres existantes */}
                <div className="col-span-full flex justify-center mt-8">
                  <button className="mr-2 px-3 py-1 bg-gray-200 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 transform rotate-180" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 11H4a1 1 0 110-2h9.586L9.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <span className="px-3 py-1 bg-gray-200 rounded-md">1</span>
                  <button className="ml-2 px-3 py-1 bg-gray-200 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.707 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L15.586 11H6a1 1 0 110-2h9.586L10.707 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-wrap justify-center ">
                  {/* Insérer ici le contenu pour afficher les offres existantes */}
                  {/* Exemple de carte pour une offre */}
                  <div className="w-80 h-60 mr-4 bg-companybgfarah rounded-3xl text-neutral-300 p-4 flex flex-col items-start justify-center gap-3 hover:bg-gray-900 hover:shadow-lg hover:shadow-farahbutton transition-shadow">
                    <div className="w-52 h-30 bg-cardfarah text-white text-center rounded-2xl"><b>Software Developer</b></div>
                    <div className="">
                      <p className="text-black">We are hiring a Software Developer with experience in React.js and Node.js. Competitive salary offered.</p>
                    </div>
                    <button className="bg-cardfarah font-extrabold p-2 px-6 rounded-xl hover:bg-farahbutton transition-colors">See more</button>
                  </div>
                  {/* Exemple de carte pour une autre offre */}
                  <div className="w-80 h-60 bg-companybgfarah rounded-3xl text-neutral-300 p-4 flex flex-col items-start justify-center gap-3 hover:bg-gray-900 hover:shadow-lg hover:shadow-farahbutton transition-shadow">
                    <div className="w-52 h-40 bg-cardfarah text-white  text-center rounded-2xl"><b>Product Manager</b></div>
                    <div className="">

                      <p className="text-black">We are seeking an experienced Product Manager to join our team. Competitive compensation package.</p>
                    </div>
                    <button className="bg-cardfarah  font-extrabold p-2 px-6 rounded-xl hover:bg-farahbutton  transition-colors">See more</button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        )}


        {activeTab === 'internship' && (
          <div className="flex mb-10 mx-auto  mt-4 max-w-6xl">
            {/* Card pour l'image et le nom de l'entreprise */}
            <div className="flex-2 mr-4">
              <div className="bg-white border border-stroke shadow-md dark:border-strokedark dark:bg-boxdark p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-lg text-black uppercase">Company Details</h3>
                </div>
                {/* Insérer l'image de l'entreprise */}
                <img src={currentUser.image} alt="profile" className='w-40 h-30 rounded-lg overflow-hidden object-cover' />
                {/* Nom de l'entreprise */}
                <h2 className="text-xl font-semibold text-black">{currentUser && currentUser.username}</h2>
              </div>

              <div className="bg-white border mt-2 border-stroke shadow-md dark:border-strokedark dark:bg-boxdark p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <p className="w-32">View a collection of active or past {currentUser && currentUser.username} Engineering Services advertisements.</p>
                </div>
              </div>
            </div>

            {/* Card pour ajouter une offre et afficher les offres */}
            <div className="flex-1">
              <div className="bg-white border border-stroke shadow-md dark:border-strokedark dark:bg-boxdark p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-lg text-black uppercase">Internship Offers</h3>
                </div>
                {/* Liste des offres existantes */}
                <div className="col-span-full flex justify-center mt-8">
                  <button className="mr-2 px-3 py-1 bg-gray-200 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 transform rotate-180" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 11H4a1 1 0 110-2h9.586L9.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <span className="px-3 py-1 bg-gray-200 rounded-md">1</span>
                  <button className="ml-2 px-3 py-1 bg-gray-200 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.707 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L15.586 11H6a1 1 0 110-2h9.586L10.707 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-wrap justify-center ">
                  {/* Insérer ici le contenu pour afficher les offres existantes */}
                  {/* Exemple de carte pour une offre */}
                  <div className="w-80 h-60 mr-4 bg-cardfarah  rounded-3xl text-neutral-300 p-4 flex flex-col items-start justify-center gap-3 hover:bg-gray-900 hover:shadow-lg hover:shadow-farahbutton transition-shadow">
                    <div className="w-52 h-30  bg-companybgfarah  text-black text-center rounded-2xl"><b>Software Developer</b></div>
                    <div className="">
                      <p className="text-white">We are hiring a Software Developer with experience in React.js and Node.js. Competitive salary offered.</p>
                    </div>
                    <button className="bg-companybgfarah  text-black font-extrabold p-2 px-6 rounded-xl hover:bg-farahbutton transition-colors">See more</button>
                  </div>
                  {/* Exemple de carte pour une autre offre */}
                  <div className="w-80 h-60 bg-cardfarah rounded-3xl text-neutral-300 p-4 flex flex-col items-start justify-center gap-3 hover:bg-gray-900 hover:shadow-lg hover:shadow-farahbutton transition-shadow">
                    <div className="w-52 h-40 bg-companybgfarah text-black  text-center rounded-2xl"><b>Product Manager</b></div>
                    <div className="">

                      <p className="text-white">We are seeking an experienced Product Manager to join our team. Competitive compensation package.</p>
                    </div>
                    <button className="bg-companybgfarah  text-black font-extrabold p-2 px-6 rounded-xl hover:bg-farahbutton  transition-colors">See more</button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        )}

      </DefaultLayout>

    </>);
}

export default ViewCompany;