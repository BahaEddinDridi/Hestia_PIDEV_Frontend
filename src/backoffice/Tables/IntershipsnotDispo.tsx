import { Package } from '../../types/package';
import DefaultLayoutAdmin from "../layaout/DefaultLayoutAdmin";
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import React ,{ useEffect,useState } from "react";
import { fetchIntershipsByRoleAndDeadline } from "../api";
import { deleteIntershipByIdAndUsername} from "../api";
import Pagination from "../pagination/pagination";







const OpportunitiesNotAvailable = () => {
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

  //get all opportunities Not Disponible 
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchIntershipsByRoleAndDeadline (); 
        setInterships(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchData();
  }, []);
  //show description job modal
const [showFullDescription, setShowFullDescription] = useState(false);
const [selectedJob, setSelectedJob] = useState<string | null>(null);

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
//close modal
const closeModal = () => {
  setSelectedJob(null);
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

  return (
    
      

 
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
                 Intership Title
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
                    <p key={intershipIndex} className="text-esprit dark:text-esprit py-2">
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
                             <h3 className="font-semibold ">
                             {intership.interTitle}
                             </h3>
                             <p className="font-bold">
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
                         <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-black">Job Description :</dt>
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
                    <div className="flex-1 ... mb-2 font-semibold leading-none text-gray-900 dark:text-black">Job Post <p className='mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-800'>{intership.interPost}</p></div>
                      <div className="flex-1 ... mb-2 font-semibold leading-none text-gray-900 dark:text-black">Education <p className='mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-800'>{intership.interRequiredEducation}</p></div>
                      <div className="flex-1 ... mb-2 font-semibold leading-none text-gray-900 dark:text-black">Skills  <p className='mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-800'>{intership.interRequiredSkills}</p></div>
                    </div>
                    <div className="flex ...">
                      <div className="flex-1 ... mb-2 font-semibold leading-none text-gray-900 dark:text-black"> Adress<p className='mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-800'>{intership.interAdress}</p></div>
                      <div className="flex-1 ... mb-2 font-semibold leading-none text-gray-900 dark:text-black">Location  <p className='mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-800'>{intership.interLocation}</p></div>
                      <div className="flex-1 ... mb-2 font-semibold leading-none text-gray-900 dark:text-black">Contact Number <p className='mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-800'>{intership.contactNumber ? intership.contactNumber.toString() : 'undifined'}</p></div>
                    </div>
                    <div className="flex ...">
                      <div className="flex-1 ... mb-2 font-semibold leading-none text-gray-900 dark:text-black"> Start Date <p className='mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-800'>{new Date(intership.interStartDate).toLocaleDateString('fr-FR')}</p></div>
                      <div className="flex-1 ... mb-2 font-semibold leading-none text-gray-900 dark:text-black">Deadline Date  <p className='mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-800'>{new Date(intership.interApplicationDeadline).toLocaleDateString('fr-FR')}</p></div>
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
                    <button onClick={() => handleDeleteJob(intership._id,item.username)}  className="hover:text-red-900 text-red-500 ">
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
  
  
  );
};

export default OpportunitiesNotAvailable;