import DefaultLayout from "../../layout/DefaultLayout";
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../ApiSlices/authSlice';
import { ChangeEvent, useState ,useEffect} from 'react';
import CoverOne from '../../images/cover/cover-01.png';
import userSix from '../../images/user/user-06.png';
import { Link } from "react-router-dom";
import { deleteJobByIdAndUsername } from "../../backoffice/api/index";
import { deleteIntershipByIdAndUsername } from "../../backoffice/api/index";
import company from '../../images/cards/cpn.jpg'

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
}
const ProfileCompany = () => {
  const currentUser = useSelector(selectCurrentUser);

  const [selectedCoverImage, setSelectedCoverImage] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handlecoverImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      const data = new FormData();
      data.append('file', selectedFile);
      data.append('upload_preset', 'hestia');
      data.append('username', currentUser.username);

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dasrakdbi/image/upload`,
          {
            method: 'POST',
            body: data,
          }
        );
        if (response.ok) {
          const result = await response.json();
          setSelectedCoverImage(result.secure_url);
          localStorage.setItem(`userImage_${currentUser.username}`, result.secure_url);
          await fetch('http://localhost:3001/user/upload-coverimage', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: currentUser.username,
              coverimageUrl: result.secure_url,
            }),
          });
          console.error('Image URL saved successfully:', result.message);
        } else {
          console.error('Failed to upload image to Cloudinary.');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      const data = new FormData();
      data.append('file', selectedFile);
      data.append('upload_preset', 'hestia');
      data.append('username', currentUser.username);

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dasrakdbi/image/upload`,
          {
            method: 'POST',
            body: data,
          }
        );
        if (response.ok) {
          const result = await response.json();
          setSelectedImage(result.secure_url);
          localStorage.setItem(`userImage_${currentUser.username}`, result.secure_url);
          await fetch('http://localhost:3001/user/upload-image', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: currentUser.username,
              imageUrl: result.secure_url,
            }),
          });
          console.error('Image URL saved successfully:', result.message);
        } else {
          console.error('Failed to upload image to Cloudinary.');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };
  //////////////////
  const [activeTab, setActiveTab] = useState('info');
  const handleTabChange = (tabName: any) => {
    setActiveTab(tabName);
  };
  ///////////////
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 4;

  const nextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };
  useEffect(() => {
    if (currentPage < 1) {
        setCurrentPage(1);
    }
}, [currentPage]);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  //trie le tableau de intership 
  const filteredinter = currentUser.intership.filter(intership => intership && intership.interStartDate);
  const sortedintership = filteredinter.sort((a: any, b: any) => {
    const dateA = new Date(a.interStartDate);
    const dateB = new Date(b.interStartDate);
    const currentDate = new Date();
    const differenceA = Math.abs(dateA - currentDate);
    const differenceB = Math.abs(dateB - currentDate);
    return differenceA - differenceB;
  });
  //trie le tableau de job 
  const filteredJobs = currentUser.job.filter(job => job && job.jobStartDate);
  const sortedJobs = filteredJobs.sort((a: any, b: any) => {
    const dateA = new Date(a.jobStartDate);
    const dateB = new Date(b.jobStartDate);
    const currentDate = new Date();
    const differenceA = Math.abs(dateA - currentDate);
    const differenceB = Math.abs(dateB - currentDate);
    return differenceA - differenceB;
  });


  const currentCards = sortedJobs.slice(indexOfFirstCard, indexOfLastCard);
  const currentCardstwo = sortedintership.slice(indexOfFirstCard, indexOfLastCard);




  const handleButtonAddJob = () => {
    window.location.href = `Profilecompany/${currentUser.username}/Opportunity/job`;
  };

  const handleButtonAddIntership = () => {
    window.location.href = `Profilecompany/${currentUser.username}/Opportunity/intership`;
  };


  /////////////////////////////Sarra Delete/////////////////////////////////////
  const [jobs, setJobs] = useState<{ _id: String, username: string, jobs: { jobTitle: string, jobAdress: string, jobLocation: string, jobDescription: string, salary: number, jobPost: string, jobfield: string, jobStartDate: string, jobApplicationDeadline: string, jobRequiredSkills: string, jobRequiredEducation: string, jobRequiredExperience: string, contactNumber: Number, jobOtherInformation: string, _id: string }[] }[]>([]);
  const [showAlert, setShowAlert] = useState(false);

  const handleDeleteJob = async (id: string, username: string) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this opportunity? ?");

      if (confirmDelete) {
        await deleteJobByIdAndUsername(id, username);

        // Filtrer la liste pour exclure l'emploi supprimé
        const updatedJobs = jobs.map(user => ({
          ...user,
          jobs: user.jobs.filter(job => job._id !== id)
        }));

        // Mettre à jour l'état avec la nouvelle liste
        setJobs(updatedJobs);

        // Afficher l'alerte de succès
        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(false);
        }, 3000);

        // Rafraîchir la page après la suppression réussie
        window.location.reload();
        // Ajouter le console.log ici
        console.log("Emplois mis à jour :", updatedJobs);
      } else {
        console.log("La suppression a été annulée.");
      }
    } catch (error) {
      console.error(error);
      // Gérer les erreurs de suppression de l'emploi
    }
  };

  const [interships, setInterships] = useState<{ _id: String, username: string, interships: { interTitle: string, interAdress: string, interLocation: string, interDescription: string, interPost: number, interfield: string, interStartDate: string, interApplicationDeadline: string, interRequiredSkills: string, interRequiredEducation: string, contactNumber: Number, interOtherInformation: string, _id: string }[] }[]>([]);

  const handleDeleteinter = async (id: string, username: string) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this opportunity?");

      if (confirmDelete) {
        await deleteIntershipByIdAndUsername(id, username);

        // Filtrer la liste pour exclure l'emploi supprimé
        const updatedInterships = interships.map(user => ({
          ...user,
          interships: user.interships.filter(intership => intership._id !== id)
        }));

        // Mettre à jour l'état avec la nouvelle liste
        setInterships(updatedInterships);

        // Afficher l'alerte de succès
        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
        // Rafraîchir la page après la suppression réussie
        window.location.reload();

        // Ajouter le console.log ici
        console.log("Emplois mis à jour :", updatedInterships);
      } else {
        console.log("La suppression a été annulée.");
      }
    } catch (error) {
      console.error(error);
      // Gérer les erreurs de suppression de l'emploi
    }
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
              ) : selectedCoverImage ? (
                <img
                  src={selectedCoverImage}
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


              {/* Edit cover photo button */}
              <div className="absolute bottom-4 right-4 z-30 xsm:bottom-8 xsm:right-8">
                <label
                  htmlFor="cover"
                  className="flex cursor-pointer items-center justify-center gap-2 rounded bg-black py-1 px-2 text-sm font-medium text-white hover:bg-opacity-90 xsm:px-4"
                >
                  <input type="file" name="cover" id="cover" className="sr-only" onChange={handlecoverImageChange} />
                  <span>
                    <svg
                      className="fill-current"
                      width="16"
                      height="16"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Your SVG path */}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                        fill="white"
                      />
                      {/* Your SVG path */}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.99992 5.83329C6.03342 5.83329 5.24992 6.61679 5.24992 7.58329C5.24992 8.54979 6.03342 9.33329 6.99992 9.33329C7.96642 9.33329 8.74992 8.54979 8.74992 7.58329C8.74992 6.61679 7.96642 5.83329 6.99992 5.83329ZM4.08325 7.58329C4.08325 5.97246 5.38909 4.66663 6.99992 4.66663C8.61075 4.66663 9.91659 5.97246 9.91659 7.58329C9.91659 9.19412 8.61075 10.5 6.99992 10.5C5.38909 10.5 4.08325 9.19412 4.08325 7.58329Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                  <span>Edit</span>
                </label>

              </div>

            </div>

          </div>

          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
            <div className="relative z-30 ml-10 -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
              <div className="relative drop-shadow-2">
                {currentUser.image ? (
                  <img src={currentUser.image} alt="profile" className='w-50 h-40 rounded-full overflow-hidden object-cover' />
                ) : selectedImage ? (
                  <img src={selectedImage} alt="profile" className='w-50 h-40 rounded-full overflow-hidden object-cover' />
                ) : (
                  <img src={userSix} alt="profile" />
                )
                }
                <label
                  htmlFor="profile"
                  className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-black text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
                >
                  <svg
                    className="fill-current"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                      fill=""
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                      fill=""
                    />
                  </svg>
                  <input
                    type="file"
                    name="profile"
                    id="profile"
                    className="sr-only"
                    onChange={handleImageChange}
                  />
                </label>

              </div>
            </div>

            <div className="mr-150  ">
              <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">

                {currentUser && currentUser.username}
              </h3>

            </div>
            <div className="flex  ml-[888px] mt-4">
            
           
             
              <Link to={`/calendarcompany/${(currentUser.username)}`}>
                <button className="flex justify-center items-center gap-2 px-3 h-10 w-48 rounded-full bg-gradient-to-r from-neutral-400 via-neutral-200 to-neutral-400  text-blackgray font-sans font-medium text-base shadow-md hover:bg-red-600 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    viewBox="0 0 24 24"
                    height="24"
                    fill="none"
                    className="w-6 h-6 stroke-current "
                  >
                    <g strokeWidth="2" strokeLinecap="round" stroke="#000">
                      <rect y="5" x="4" width="16" rx="2" height="16"></rect>
                      <path d="m8 3v4"></path>
                      <path d="m16 3v4"></path>
                      <path d="m4 11h16"></path>
                    </g>
                  </svg>
                  <span className="text-lg text-black-2">see the calendar</span>
                </button>
              </Link>
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
                  <p>{currentUser && formatDate(currentUser.birthDate)}</p>
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
                <img src={currentUser.image} alt="profile" className='w-40 h-30 rounded-full  overflow-hidden object-cover' />
                {/* Nom de l'entreprise */}
                <h2 className="text-xl font-semibold text-black">{currentUser && currentUser.username}</h2>
              </div>

              <div className=" border mt-2 border-stroke shadow-md dark:border-strokedark dark:bg-boxdark p-6 rounded-lg" style={{ backgroundImage: "url('src/images/cards/cpn.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="flex items-center justify-between mb-4 " >
                 
                  <p className="w-32 text-black " >
                    
                    View a collection of active or past {currentUser && currentUser.username} Engineering Services advertisements.</p>
                </div>
              </div>
            </div>

            {/* Card pour ajouter une offre et afficher les offres */}
            <div className="flex-1 ">
              <div className="bg-white border border-stroke shadow-md dark:border-strokedark dark:bg-boxdark p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-lg text-black uppercase">Job Offers</h3>
                  <button className="px-4 py-2 bg-red-800 text-white hover:bg-red-700 focus:outline-none focus:bg-red-700 rounded-md" onClick={handleButtonAddJob}>Add New Offer</button>
                </div>
                {/* Liste des offres existantes */}
                <div className="col-span-full flex justify-center mt-8">
                  <button className="mr-2 px-3 py-1 bg-gray-200 rounded-md" onClick={prevPage}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 transform rotate-180" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 11H4a1 1 0 110-2h9.586L9.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <span className="px-3 py-1 bg-gray-200 rounded-md">{currentPage}</span>
                  <button className="ml-2 px-3 py-1 bg-gray-200 rounded-md" onClick={nextPage}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.707 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L15.586 11H6a1 1 0 110-2h9.586L10.707 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-wrap justify-center ">

                  {currentCards.map((job) => (

                    <div className="w-100 h-55 mr-4  mt-16 rounded-3xl text-neutral-300 p-4 flex flex-col items-start justify-center gap-3 hover:bg-gray-900 hover:shadow-lg hover:shadow-neutral-500 transition-shadow"  style={{ backgroundImage: "url('src/images/cards/cardsoffersjob.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>

                      <div className=" flex items-center   w-50 h-30 bg-gradient-to-r from-neutral-400 via-neutral-200 to-neutral-400 bg-white text-black text-center rounded-full ">
                       
                        <img src={currentUser.image} alt="profile" className='w-9.5 h-9.5 rounded-full  overflow-hidden object-cover' />
                        <b className="ml-2">{job.jobTitle}</b>
                      </div>

                      <div className="">
                        <div className="  felex items-center">
                          <h2 className="font-bold text-black text-base mr-1">Post:</h2>
                          <p className="text-sm  text-white">{job.jobPost}</p>
                        </div>
                        <div className=" felex items-center">
                          <h2 className="font-bold  text-black text-base mr-1">Field:</h2>
                          <p className="text-sm text-white w-5">{job.jobfield}</p></div>
                        <div className=" text-black felex items-center">
                          <h2 className="font-bold  text-black  text-base mr-1">Application Deadline:</h2>
                          <p className="text-sm text-white ">{formatDate(job.jobApplicationDeadline)}</p></div>
                      </div>
                      <div className="flex justify-between  ml-44">

                       

                        <section className="relative flex justify-center items-center pr-2 ">
                          <div className="group flex justify-center transition-all rounded-full bg-black p-1">
                            <Link to={`/Profilecompany/Opportunity/EditJob/${job._id}`}>
                              <svg viewBox="0 0 24 24" className="w-4 h-4">
                                <path
                                  fill="currentColor"
                                  d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                                ></path>
                              </svg>
                            </Link>
                            <span
                              className="absolute opacity-0 text-black group-hover:opacity-100 group-hover:-translate-y-7 duration-700 text-sm"
                            >Update</span>

                          </div>
                        </section>

                        <section className="relative flex justify-center items-center  pr-2">
                          <div className="group flex justify-center transition-all rounded-full bg-black p-1">
                            <button onClick={() => handleDeleteJob(job._id, currentUser.username)} className="focus:outline-none">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4">
                                <path fill="currentColor" d="M20.625 4.975h-3.438v-1.9a1.275 1.275 0 0 0-1.275-1.275h-4.975a1.275 1.275 0 0 0-1.275 1.275v1.9H3.375a.843.843 0 0 0-.843.843a.844.844 0 0 0 .843.843h.3l.839 13.775a2.7 2.7 0 0 0 2.7 2.477h9.15a2.7 2.7 0 0 0 2.7-2.7L20.325 6.66h.3a.844.844 0 0 0 .843-.843a.843.843 0 0 0-.843-.843zm-11.067-.874h3.112v1.101H9.558V4.101zm4.112 0v1.101h-2.22V4.101h2.22zM5.08 6.545h13.905L17.61 18.774H6.375l-1.295-12.229zM5.756 21.975a1.006 1.006 0 0 1-1.006-1.006c0-.555.45-1.006 1.006-1.006h12.488a1.006 1.006 0 0 1 1.006 1.006c0 .555-.45 1.006-1.006 1.006h-1.686a.844.844 0 0 1-.843-.843a.843.843 0 0 1 .843-.843h1.686c.093 0 .169.076.169.169c0 .093-.076.169-.169.169h-12.488a.169.169 0 0 0-.169.169c0 .093.076.169.169.169h.843a.844.844 0 0 1 .843.843a.844.844 0 0 1-.843.843H5.756z" />
                              </svg>
                            </button>
                            <span
                              onClick={() => handleDeleteJob(job._id, currentUser.username)}
                              className="absolute text-black opacity-0 group-hover:opacity-100 group-hover:-translate-y-7 duration-700 text-sm"
                            >Delete</span>
                          </div>
                        </section>
                        <Link to={`/detailsoffer/${job._id}`}>
                          <button className="bg-black text-neutral-200  font-extrabold  p-2 px-6  rounded-xl hover:bg-neutral-400  hover:text-black transition-colors">See more</button>
                        </Link>
                      </div>


                    </div>
                  ))}
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

              <div className="bg-white border mt-2 border-stroke shadow-md dark:border-strokedark dark:bg-boxdark p-6 rounded-lg" style={{ backgroundImage: "url('src/images/cards/cpn.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="flex items-center justify-between mb-4">
                  <p className="w-32 text-black">View a collection of active or past {currentUser && currentUser.username} Engineering Services advertisements.</p>
                </div>
              </div>
            </div>

            {/* Card pour ajouter une offre et afficher les offres */}
            <div className="flex-1">
              <div className="bg-white border border-stroke shadow-md dark:border-strokedark dark:bg-boxdark p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-lg text-black uppercase">Internship Offers</h3>
                  <button className="px-4 py-2 bg-red-800 text-white hover:bg-red-700 focus:outline-none focus:bg-red-700 rounded-md" onClick={handleButtonAddIntership}>Add New Offer</button>
                </div>
                {/* Liste des offres existantes */}
                <div className="col-span-full flex justify-center mt-8">
                  <button className="mr-2 px-3 py-1 bg-gray-200 rounded-md" onClick={prevPage}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 transform rotate-180" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 11H4a1 1 0 110-2h9.586L9.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <span className="px-3 py-1 bg-gray-200 rounded-md">{currentPage}</span>
                  <button className="ml-2 px-3 py-1 bg-gray-200 rounded-md" onClick={nextPage}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.707 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L15.586 11H6a1 1 0 110-2h9.586L10.707 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-wrap justify-center ">

                  {currentCardstwo.map((internship) => (
                    <div className="w-100 h-55 mr-4 mt-16  bg-companybgfarah rounded-3xl text-neutral-300 p-4 flex flex-col items-start justify-center gap-3 hover:bg-gray-900 hover:shadow-lg hover:shadow-farahbutton transition-shadow" style={{ backgroundImage: "url('src/images/cards/cardsoffersjob.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                      <div className=" flex items-center w-52 h-30    bg-gradient-to-r from-neutral-400 via-neutral-200 to-neutral-400 bg-white text-black text-center rounded-2xl">
                      <img src={currentUser.image} alt="profile" className='w-9.5 h-9.5 rounded-full  overflow-hidden object-cover' />
                        <b className="ml-2">{internship.interTitle}</b>
                        </div>
                      <div className="">
                        <div className="  felex items-center">
                          <h2 className="font-bold text-black text-base mr-1">Post:</h2>
                          <p className="text-sm text-white">{internship.interPost}</p>
                        </div>
                        <div className="  felex items-center">
                          <h2 className="font-bold text-base text-black  mr-1">Field:</h2>
                          <p className="text-sm text-white w-5">{internship.interfield}</p></div>
                        <div className="  felex items-center">
                          <h2 className="font-bold text-black  text-base mr-1">Application Deadline:</h2>
                          <p className="text-sm text-white">{formatDate(internship.interApplicationDeadline)}</p></div>

                      </div>
                      <div className="flex justify-between  ml-44">
                       

                        <section className="relative flex justify-center items-center  pr-2">
                          <div className="group flex justify-center transition-all rounded-full bg-black p-1">
                            <Link to={`/Profilecompany/Opportunity/EditInternship/${internship._id}`}>
                              <svg viewBox="0 0 24 24" className="w-4 h-4 ">
                                <path
                                  fill="currentColor"
                                  d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                                ></path>
                              </svg>
                            </Link>
                            <span
                              className="text-black absolute opacity-0 group-hover:opacity-100 group-hover:-translate-y-7 duration-700 text-sm"
                            >Update</span>
                          </div>
                        </section>
                        <section className="relative flex justify-center items-center pr-2 ">
                          <div className="group flex justify-center transition-all rounded-full bg-black  p-1">
                            <button onClick={() => handleDeleteinter(internship._id, currentUser.username)} className="focus:outline-none">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 ">
                                <path fill="currentColor" d="M20.625 4.975h-3.438v-1.9a1.275 1.275 0 0 0-1.275-1.275h-4.975a1.275 1.275 0 0 0-1.275 1.275v1.9H3.375a.843.843 0 0 0-.843.843a.844.844 0 0 0 .843.843h.3l.839 13.775a2.7 2.7 0 0 0 2.7 2.477h9.15a2.7 2.7 0 0 0 2.7-2.7L20.325 6.66h.3a.844.844 0 0 0 .843-.843a.843.843 0 0 0-.843-.843zm-11.067-.874h3.112v1.101H9.558V4.101zm4.112 0v1.101h-2.22V4.101h2.22zM5.08 6.545h13.905L17.61 18.774H6.375l-1.295-12.229zM5.756 21.975a1.006 1.006 0 0 1-1.006-1.006c0-.555.45-1.006 1.006-1.006h12.488a1.006 1.006 0 0 1 1.006 1.006c0 .555-.45 1.006-1.006 1.006h-1.686a.844.844 0 0 1-.843-.843a.843.843 0 0 1 .843-.843h1.686c.093 0 .169.076.169.169c0 .093-.076.169-.169.169h-12.488a.169.169 0 0 0-.169.169c0 .093.076.169.169.169h.843a.844.844 0 0 1 .843.843a.844.844 0 0 1-.843.843H5.756z" />
                              </svg>
                            </button>
                            <span
                              onClick={() => handleDeleteinter(internship._id, currentUser.username)}
                              className="text-black absolute opacity-0 group-hover:opacity-100 group-hover:-translate-y-7 duration-700 text-sm"
                            >Delete</span>
                          </div>
                        </section>
                        <Link to={`/detailsintership/${internship._id}`} >
                          <button className="bg-black  text-neutral-200  font-extrabold p-2 px-6 rounded-xl hover:bg-neutral-400 hover:text-black transition-colors">See more</button>
                        </Link>
                      </div>
                    </div>
                  ))}

                </div>
              </div>
            </div>
          </div>
        )}

      </DefaultLayout>

    </>);
}

export default ProfileCompany;