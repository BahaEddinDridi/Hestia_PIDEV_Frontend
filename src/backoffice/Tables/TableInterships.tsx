import { Package } from '../../types/package';
import DefaultLayoutAdmin from "../layaout/DefaultLayoutAdmin";
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import React ,{ useEffect,useState } from "react";
import { fetchIntershipsByRoleAndFutureDeadline } from "../api";
import IntershipNotDispo  from "../Tables/IntershipsnotDispo";
import { deleteIntershipByIdAndUsername } from "../api";
import Pagination from "../pagination/pagination";








const TableJob = () => {
//recherche bar
const [interships, setInterships] = useState<{ _id:String,username: string, interships: { interTitle: string, interAdress: string, interLocation: string, interDescription: string, interPost: number, interfield: string, interStartDate: string, interApplicationDeadline: string, interRequiredSkills: string, interRequiredEducation: string, contactNumber: Number, interOtherInformation: string, _id: string }[] }[]>([]);
const [searchTerm,setSearchTerm]= useState("");
const [currentPage, setCurrentPage] = useState(1);
const intershipsPerPage = 6;
const filteredInterships = interships
  .filter((intershipArray) => intershipArray.interships.length > 0)
  .map((intershipArray) => ({
    ...intershipArray,
    interships: intershipArray.interships.filter((intership) =>
      Object.values(intership).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    ),
  }))
  .filter((intershipArray) => intershipArray.interships.length > 0);
//voice searsh
const startVoiceSearch = () => {
  let SpeechRecognition: any;
  try {
    SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  } catch (error) {
    console.error("La reconnaissance vocale n'est pas prise en charge par votre navigateur.");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript;
    setSearchTerm(transcript);
  };

  recognition.start();
};

//Pagination 
const totalInterships = filteredInterships.reduce((acc,intershipArray) => acc + intershipArray.interships.length, 0);
const indexOfLastIntership = currentPage * intershipsPerPage;
const indexOfFirstIntership = indexOfLastIntership - intershipsPerPage;
const currentInterships = filteredInterships
  .map((intershipArray) => ({
    ...intershipArray,
    interships: intershipArray.interships.slice(indexOfFirstIntership, indexOfLastIntership),
  }))
  .filter((intershipArray) => intershipArray.interships.length > 0);

  //get all opportunities Disponible 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchIntershipsByRoleAndFutureDeadline(); 
        setInterships(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchData();
  }, []);
  //Button Opportunities Not Available 
  const [showUnavailableOpportunities, setShowUnavailableOpportunities] = useState(false);
  const handleToggleOpportunities = () => {
    setShowUnavailableOpportunities(!showUnavailableOpportunities);
  };
  //Modal Details 
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
//show description job modal
const [showFullDescription, setShowFullDescription] = useState(false);

const toggleDescription = () => {
  setShowFullDescription(!showFullDescription);
};

const getDescriptionPreview = (description:any) => {
  const words = description.split(' ');
  if (words.length > 50) {
    return words.slice(0, 50).join(' ') + '...';
  }
  return description;
};
//delete opportunities 
const [showAlert, setShowAlert] = useState(false);

const handleDeleteJob = async (id: string, username: string) => {
  try {
    const confirmDelete = window.confirm("Voulez-vous vraiment supprimer cette opportunité ?");

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

//close modal
const closeModal = () => {
  setSelectedJob(null);
};

 
  

  return (
    <DefaultLayoutAdmin>
      <Breadcrumb pageName="Interships" />
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
    <div className="flex justify-between">
    <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Table Of Interships Opportunities
        </h4>  
        <button onClick={handleToggleOpportunities} className='ml-auto relative inline-flex items-center justify-start py-3 pl-[20px] pr-12 overflow-hidden font-semibold shadow  transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 dark:bg-gray-700 dark:text-white dark:hover:text-gray-200 dark:shadow-none group'>
         {showUnavailableOpportunities ? (
          <>
          <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-greenadd group-hover:h-full"></span>
             <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" className="w-5 h-5 text-greenadd">
               <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
             </svg>
                   </span>
          <span className="relative w-full text-left text-greenadd transition-colors duration-200 ease-in-out group-hover:text-white dark:group-hover:text-gray-200 ">Show vailable Opportunities</span>
         </>
        ) : (
          <>
           <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-esprit group-hover:h-full"></span>
              <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" className="w-5 h-5 text-esprit">
                        <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
                      </svg>
                    </span>
          <span className="relative w-full text-left text-esprit transition-colors duration-200 ease-in-out group-hover:text-white dark:group-hover:text-gray-200">Show Unavailable Opportunities</span>
            
          </>
        )}
         </button>      
    </div> 
     {/*affichage table opportunities  Available  */}
     {showUnavailableOpportunities ? (
      <IntershipNotDispo/>
       ) : (
        // second table Opportunities Are Available
        <div className="max-w-full overflow-x-auto px-7 py-7">
           <div className="flex items-center ">
       {/* barre de recherche  */}
       <input
      type="text"
      value={searchTerm}
      onChange={(e)=>setSearchTerm(e.target.value)}
      placeholder="Search Jobs..."
      className="px-3 py-2 my-5 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-greenadd focus:border-greenadd w-full"
    />
  <div className="group relative">
  <button onClick={startVoiceSearch}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path d="M7 4a3 3 0 0 1 6 0v6a3 3 0 1 1-6 0V4Z" />
      <path d="M5.5 9.643a.75.75 0 0 0-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-1.5v-1.546A6.001 6.001 0 0 0 16 10v-.357a.75.75 0 0 0-1.5 0V10a4.5 4.5 0 0 1-9 0v-.357Z" />
    </svg>
  </button>
  <span className="absolute -top-14 left-[50%] -translate-x-[50%] z-10 origin-left scale-0 px-3 rounded-lg border border-gray-300 bg-white py-2 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">Voice Search</span>
</div>
     </div>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
               User Name 
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                 Interships Title
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Application deadline
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Intershipfiled
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Location
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
         {currentInterships.map((item, index) => (
              <tr key={index}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {item.username}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {item.interships.map((intership, intershipIndex) => (
                    <p key={intershipIndex} className="text-black dark:text-white py-2">
                      {intership.interTitle}
                    </p>
                  ))}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {item.interships.map((intership, intershipIndex) => (
                    <p key={intershipIndex} className="text-greenadd dark:text-greenadd py-2">
                      {new Date(intership.interApplicationDeadline).toLocaleDateString('fr-FR')}
                    </p>
                  ))}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {item.interships.map((intership, intershipIndex) => (
                    <p key={intershipIndex} className="text-black dark:text-white py-2">
                      {intership.interfield}
                    </p>
                  ))}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {item.interships.map((intership, intershipIndex) => (
                    <p key={intershipIndex} className="text-black dark:text-white py-2">
                      {intership.interLocation}
                    </p>
                  ))}
                </td>
                {/* parti de CRUD  */}
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                {item.interships.map((intership, intershipIndex) => (
                  <div className="flex items-center space-x-3.5 py-3">
                    <button onClick={() => setSelectedJob(intership._id)} className="hover:text-primary">
                      <svg
                        className="fill-current text-blue-600"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                          fill=""
                        />
                        <path
                          d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                          fill=""
                        />
                      </svg>
                    </button>
                    {/* modal View Details */}
          {selectedJob === intership._id && (
            <div className="fixed inset-0 flex items-center justify-center">
             <div className="relative p-0 w-full max-w-xl h-full md:h-auto">
             {/* <!-- Modal content --> */}
             <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5  "style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                     {/* <!-- Modal header --> */}
                     <div className="flex justify-between mb-4 rounded-t sm:mb-5">
                         <div className="text-lg text-gray-900 md:text-xl dark:text-white">
                             <h3 className=" font-bold text-modaltitreomayma dark:text-modaltitreomayma ">
                             {intership.interTitle}
                             </h3>
                             <p className="font-semibold  text-esprit dark:text-esprit">
                                 {intership.interfield}
                             </p>
                         </div>
                         <div>
                             <button onClick={closeModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="readProductModal">
                                 <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                 <span className="sr-only">Close modal</span>
                             </button>
                         </div>
                     </div>
                     <dl>
                         <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-black">Intership Description :</dt>
                         <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-800">
                          {showFullDescription ? intership.interDescription : getDescriptionPreview(intership.interDescription)}
                          {showFullDescription && (
                            <span className="text-blue-600 cursor-pointer" onClick={toggleDescription}>
                              ... (see less)
                            </span>
                          )}
                          {!showFullDescription && (
                            <span className="text-blue-600 cursor-pointer" onClick={toggleDescription}>
                              ... (see more)
                            </span>
                          )}
                        </dd>
                     </dl>
                     
                    <div className="flex ...">
                    <div className="flex-1 ... mb-2 font-semibold leading-none text-gray-900 dark:text-black">
                    <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                    </svg>
                      Intership Post 
                      </div>
                       <p className='mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-800'>{intership.interPost}</p></div>
                      <div className="flex-1 ... mb-2 font-semibold leading-none text-gray-900 dark:text-black">
                      <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                      </svg>
                      Education
                      </div>
                        <p className='mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-800'>{intership.interRequiredEducation}</p></div>
                      <div className="flex-1 ... mb-2 font-semibold leading-none text-gray-900 dark:text-black">
                      <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                      </svg>
                      Skills 
                      </div>
                          <p className='mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-800'>{intership.interRequiredSkills}</p></div>
                    </div>
                    <div className="flex ...">
                      <div className="flex-1 ... mb-2 font-semibold leading-none text-gray-900 dark:text-black">
                      <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                      Adress 
                      </div>
                        <p className='mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-800'>{intership.interAdress}</p></div>
                      <div className="flex-1 ... mb-2 font-semibold leading-none text-gray-900 dark:text-black">
                      <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                      Location 
                      </div>
                       <p className='mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-800'>{intership.interLocation}</p></div>
                      <div className="flex-1 ... mb-2 font-semibold leading-none text-gray-900 dark:text-black">
                      <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                      </svg>
                      Contact Number 
                      </div>
                       <p className='mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-800'>{intership.contactNumber ? intership.contactNumber.toString() : 'undifined'}</p></div>
                    </div>
                    <div className="flex ...">
                      <div className="flex-1 ... mb-2 font-semibold leading-none text-gray-900 dark:text-black"> 
                      <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                      </svg>
                      Start Date 
                      </div>
                      <p className='mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-800'>{new Date(intership.interStartDate).toLocaleDateString('fr-FR')}</p></div>
                      <div className="flex-1 ... mb-2 font-semibold leading-none text-gray-900 dark:text-black">
                      <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                      </svg>
                      Deadline Date 
                      </div>
                        <p className='mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-800'>{new Date(intership.interApplicationDeadline).toLocaleDateString('fr-FR')}</p></div>
                    </div>
                    <div className="max-w-lg mx-auto p-0">
                      <details className="open:bg-white dark:open:bg-slate-900  open:ring-black/5   rounded-lg" open>
                        <summary className="text-sm leading-6 text-slate-900 dark:text-black font-semibold select-none">
                        do you want to see other information about Intership?
                        </summary>
                        <div className=" text-sm leading-6 text-slate-600 dark:text-slate-400">
                          <p>{intership.interOtherInformation}</p>
                        </div>
                      </details>
                    </div>
                    
                     <div className="flex justify-between items-center">
                         <div className="flex items-center space-x-3 sm:space-x-4">
                             <button onClick={closeModal} type="button" className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                 Cancel
                             </button>
                         </div>              
                     </div>
             </div>
         </div>
         </div>
        
            )}

            {/* alert de suppression */}
            {showAlert && (
              <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                <span className="font-medium">Opportunity removal done successfully</span> 
              </div>
            )}

                    <button onClick={() => handleDeleteJob(intership._id,item.username)} className="hover:text-red-900 text-red-500">
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                          fill=""
                        />
                        <path
                          d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                          fill=""
                        />
                        <path
                          d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                          fill=""
                        />
                        <path
                          d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                          fill=""
                        />
                      </svg>
                    </button>
                  </div>
                    ))}
                </td>
              </tr>
            ))}
          
          </tbody>
        </table>
        {/* Pagination */}
    <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalUsers={totalInterships}
      />
      </div>
       )}

       

    </div>
    </DefaultLayoutAdmin>
  );
};

export default TableJob;