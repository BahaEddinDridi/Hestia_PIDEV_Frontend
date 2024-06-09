import { Package } from '../../types/package';
import DefaultLayoutAdmin from "../layaout/DefaultLayoutAdmin";
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import React ,{ useEffect,useState } from "react";
import { fetchApplicationsIntershipNotAvailable } from "../api";
import Pagination from "../pagination/pagination";






const IntershipApplicationsNotAvailable = () => {
  //recherche bar
  const [interships, setInterships] = useState<{ _id:String,interCommpanyName: string,interTitle:string,interApplicationDeadline:string,internshipApplications: { fullName: string, email: string, phoneNumber: string, motivationLetter: string, resume:string, submitDate: string, status: string, applicantUsername: string, _id: string }[]}[]>([]);
  const [searchTerm,setSearchTerm]= useState("");
const [currentPage, setCurrentPage] = useState(1);
const intershipsPerPage = 6;
const filteredInterships = interships
  .filter((intershipArray) => intershipArray.internshipApplications.length > 0)
  .map((intershipArray) => ({
    ...intershipArray,
    interships: intershipArray.internshipApplications.filter((intership) =>
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
        const data = await fetchApplicationsIntershipNotAvailable (); 
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
              <th className="hidden lg:table-cell min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
               Company Name 
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                 Intership Title
              </th>
              <th className="hidden lg:table-cell min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Application deadline
              </th>
              <th className="hidden lg:table-cell py-4 px-4 font-medium text-black dark:text-white">
               Users Applicated
              </th>
              <th className=" py-4 px-4 font-medium text-black dark:text-white">
                Status User
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
          {currentInterships.map((item, index) => (
              <tr key={index}>
                <td className="hidden lg:table-cell border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {item.interCommpanyName}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                 
                    <p key={index} className="text-black dark:text-white py-2">
                      {item.interTitle}
                    </p>
                
                </td>
                <td className="hidden lg:table-cell border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                 
                    <p key={index} className="text-esprit dark:text-esprit py-2">
                      {new Date(item.interApplicationDeadline).toLocaleDateString('fr-FR')}
                    </p>
                
                </td>
                <td className="hidden lg:table-cell border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                {item.internshipApplications.map((application, index) => (
                    <p key={index} className="text-black dark:text-white py-2">
                      {application.email}
                    </p>
                     ))}
                 
                </td>
                <td className=" border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                {item.internshipApplications.map((application, index) => (
                    <p key={index} className="text-black dark:text-white py-2">
                      {application.status}
                    </p>
                      ))}
                 
                </td>
                {/* parti de CRUD  */}
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                {item.internshipApplications.map((application, index) => (
                  <div className="flex items-center space-x-3.5 py-3">
                    <button onClick={() => setSelectedJob(application._id)} className="hover:text-primary">
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
                     {selectedJob === application._id && (
            <div className="fixed inset-0 flex items-center justify-center">
             <div className="relative p-0 w-full max-w-xl h-full md:h-auto">
             {/* <!-- Modal content --> */}
             <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5  "style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                     {/* <!-- Modal header --> */}
                     <div className="flex justify-between mb-4 rounded-t sm:mb-5">
                         <div className="text-lg text-gray-900 md:text-xl dark:text-white">
                             <h3 className=" font-bold text-modaltitreomayma dark:text-modaltitreomayma">
                             {item.interCommpanyName}
                             </h3>
                             <p className="font-semibold  text-esprit dark:text-esprit">
                                 {item.interTitle}
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
                         <dt className="mb-2 font-semibold leading-none text-gray-200 dark:text-black">Motivation Letter :</dt>
                         <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-800">
                          {showFullDescription ?application.motivationLetter : getDescriptionPreview(application.motivationLetter)}
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
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                      User name 
                      </div>
                      <p className='mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-800'>{application.applicantUsername}</p></div>
                      <div className="flex-1 ... mb-2 font-semibold leading-none text-gray-900 dark:text-black"> 
                      <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                        </svg>
                      Full Name
                      </div>
                       <p className='mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-800'>{application.fullName}</p></div>
                      <div className="flex-1 ... mb-2 font-semibold leading-none text-gray-900 dark:text-black">
                      <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>
                     Email
                      </div>
                         <p className='mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-800'>{application.email}</p></div>
                      
                     </div>
                    
                    <div className="flex ...">
                      <div className="flex-1 ... mb-2 font-semibold leading-none text-gray-900 dark:text-black">
                      <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                      Resume 
                      </div>
                      <a href={application.resume} target="_blank" rel="noopener noreferrer"
                         className="text-blue-500 hover:underline">View Resume</a>
                      </div>
                      <div className="flex-1 ... mb-2 font-semibold leading-none text-gray-900 dark:text-black">
                      <div className="flex items-center">
                      Status 
                      </div>
                      
                       <p className='mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-800'>
                       <div className="flex items-center">
                       {application.status === 'Pending' && (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-warning">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                        </svg>
                        )}
                        {application.status === 'Accepted' && (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-success">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                        </svg>
                        )}
                        {application.status === 'Rejected' && (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-black dark:text-white">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                        )}
                        {application.status}
                        </div>
                        </p></div>   
                    </div>
                    <div className="flex ...">
                      <div className="flex-1 ... mb-2 font-semibold leading-none text-gray-900 dark:text-black">
                      <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                      </svg>
                      Submit Date 
                      </div>
                      <p className='mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-800'>{new Date(application.submitDate).toLocaleDateString('fr-FR')}</p></div>
                      <div className="flex-1 ... mb-2 font-semibold leading-none text-gray-900 dark:text-black">
                       <div className="flex items-center">
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                        </svg>
                      Phone Number 
                      </div> 
                         <p className='mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-800'>{application.phoneNumber}</p></div>
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

export default IntershipApplicationsNotAvailable;