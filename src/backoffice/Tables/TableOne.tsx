//affichages users 
import React ,{ useEffect,useState } from "react";
import { getUsers } from "../api";

import { Link } from "react-router-dom";

import { updateUsersRoleById } from "../api";
import { FaWhatsapp } from "react-icons/fa";
import Pagination from "../pagination/pagination";
import { exportExcel, exportPDF } from '../api';
import { deactivateAccount } from "../api";
import { desactiveProfilByIdAuto } from "../api";
import axios from 'axios';









interface User{
  _id:string;
  username:string;
  email:string;
  role:string;
  birthDate:string;
 
  image:string;
  gender:string;
  phoneNumber:string;
  ProfileStatus:string;
  deactivationExpiresAt?: Date | null;
}

const TableOne = () => {
  
  const [users,setUsers]=useState<User[]>([]);
  const [searchTerm,setSearchTerm]= useState("");
  
  const [editingUserId,setEditingUserId]=useState<string | null>(null);
  const [newUserRole,setNewUserRole]= useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4 ;
  
  const filteredUsers=users.filter((user)=>
    Object.values(user).some((value)=>
    typeof value =='string' && value.toLowerCase().includes(searchTerm.toLowerCase()))
  );
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
  

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  

  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const data =await getUsers();
        setUsers(data);
      }catch(error){
        console.error(error);
      }
    };
    fetchData();
    
  },[]);
  
  
  
  const handleUpdateRole = (userId: string, role: string) => {
    setEditingUserId(userId);
    setNewUserRole(role);
  };

  
  //fonction pour mettre a jour le role d'un utilisateur
  const updateUserRole = async () => {
    try {
      // Envoyer la demande de mise à jour au backend
      await updateUsersRoleById(editingUserId!, newUserRole);
      
      // Mettre à jour localement l'utilisateur dans la liste
      const updatedUsers = users.map((u) =>
        u._id === editingUserId ? { ...u, role: newUserRole } : u
      );
      setUsers(updatedUsers);
      setEditingUserId(null);
    } catch (error) {
      console.error('Failed to update user role:', error);
      alert('Echec de la mise à jour du rôle de l\'utilisateur');
    }
  };

  //exportation data 
    const [showModal, setShowModal] = useState(false);

    const handleExport = (format:any) => {
      setShowModal(false);
      if (format === 'pdf') {
        exportPDF();
      } else {
        exportExcel();
      }
    };

    //desactivated user
    const [editingUserId2,setEditingUserId2]=useState<string | null>(null);
    const [newStatus, setNewStatus] = useState<string>('');
    const [editingUserInfo, setEditingUserInfo] = useState<{ userId: string | null, type: string | null }>({ userId: null, type: null });

    const [showModal2, setShowModal2] = useState(false);
  
      const openModal2 = (userId: string) => {
        setEditingUserId2(userId);
        setShowModal2(true);
      };

      const closeModal2 = () => {
        setEditingUserId2(null);
        setShowModal2(false);
      };
          
    const handleDeactivateAccount = (userId: string, ProfilStatus: string) => {
      setEditingUserId2(userId);
      setNewStatus(ProfilStatus);
    };
    
    
    //desactivation du compte automatiquement
    const [isUpdatingUser, setIsUpdatingUser] = useState<string | null>(null);

// const handleUpdateStatus = async (userId: string, status: string) => {
//   if (isUpdatingUser === userId) {
//     return;
//   }

//   try {
//     setIsUpdatingUser(userId); // Marquer l'utilisateur comme étant mis à jour

//     await desactiveProfilByIdAuto(userId, status, customDeactivation);

//     // Mettre à jour localement l'utilisateur dans la liste
//     setUsers((prevUsers) =>
//       prevUsers.map((user) => (user._id === userId ? { ...user, ProfileStatus: status } : user))
//     );

//     // Afficher un message de succès ou mettre à jour l'interface utilisateur
//   } catch (error) {
//     console.error('Erreur lors de la désactivation du compte :', error);
//     // Afficher un message d'erreur à l'utilisateur
//   } finally {
//     setIsUpdatingUser(null); // Réinitialiser l'état après la mise à jour
//   }
// };
/////////////////////////////////////////////////////////////////////////////:
const handleDurationChange = (e:any) => {
  const { value } = e.target;
  setCustomDeactivation({
    ...customDeactivation,
    duration: value,
  });
};

// Mettre à jour le type de durée personnalisée en fonction du type de durée sélectionné par l'utilisateur
const handleDurationTypeChange = (e:any) => {
  const { value } = e.target;
  setCustomDeactivation({
    ...customDeactivation,
    durationType: value,
  });
};
const handleUpdateStatus = async (userId: string, status: string,customDeactivation: any) => {
  if (isUpdatingUser === userId) {
    return;
  }

  try {
    setIsUpdatingUser(userId); // Marquer l'utilisateur comme étant mis à jour

    await desactiveProfilByIdAuto(userId, status, customDeactivation);

    // Mettre à jour localement l'utilisateur dans la liste
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user._id === userId ? { ...user, ProfileStatus: status } : user))
    );

    // Afficher un message de succès ou mettre à jour l'interface utilisateur
  } catch (error) {
    console.error('Erreur lors de la désactivation du compte :', error);
    // Afficher un message d'erreur à l'utilisateur
  } finally {
    setIsUpdatingUser(null); // Réinitialiser l'état après la mise à jour
  }
};





// // Définir la fonction scheduleReactivation dans votre fichier frontend
// const scheduleReactivation = (userId: string, expirationDate: Date) => {
//   const delay = expirationDate.getTime() - Date.now();

//   if (delay <= 0) {
//     // Si le délai est négatif ou nul, réactivez immédiatement le compte
//     setUsers((prevUsers) =>
//       prevUsers.map((user) => (user._id === userId ? { ...user, ProfileStatus: 'active' } : user))
//     );
//   } else {
//     // Sinon, planifiez la réactivation après le délai spécifié
//     setTimeout(() => {
//       setUsers((prevUsers) =>
//         prevUsers.map((user) => (user._id === userId ? { ...user, ProfileStatus: 'active' } : user))
//       );
//     }, delay);
//   }
// };


// // Utiliser la fonction scheduleReactivation dans votre handleUpdateStatus
// const handleUpdateStatus = async (userId: string, status: string, customDeactivation: any) => {
//   if (isUpdatingUser === userId) {
//     return;
//   }

//   try {
//     setIsUpdatingUser(userId); // Marquer l'utilisateur comme étant mis à jour

//     await desactiveProfilByIdAuto(userId, status, customDeactivation);

//     // Planifier la réactivation du compte après la durée de désactivation spécifiée
//     if (status === 'deactivated' && customDeactivation) {
//       let duration = parseInt(customDeactivation.duration);
//       if (customDeactivation.durationType === 'minutes') {
//         duration *= 60 * 1000; // Convertir en millisecondes
//       } else if (customDeactivation.durationType === 'hours') {
//         duration *= 60 * 60 * 1000; // Convertir en millisecondes
//       } else if (customDeactivation.durationType === 'days') {
//         duration *= 24 * 60 * 60 * 1000; // Convertir en millisecondes
//       } else {
//         throw new Error('Type de durée de désactivation non valide');
//       }

//       const expirationDate = new Date(Date.now() + duration);
//       scheduleReactivation(userId, expirationDate); // Appeler la fonction pour planifier la réactivation
//     }

//     // Mettre à jour localement l'utilisateur dans la liste
//     setUsers((prevUsers) =>
//       prevUsers.map((user) => (user._id === userId ? { ...user, ProfileStatus: status } : user))
//     );

//     // Afficher un message de succès ou mettre à jour l'interface utilisateur
//   } catch (error) {
//     console.error('Erreur lors de la désactivation du compte :', error);
//     // Afficher un message d'erreur à l'utilisateur
//   } finally {
//     setIsUpdatingUser(null); // Réinitialiser l'état après la mise à jour
//   }
// };




    const [duration, setDuration] = useState('');
    const [durationType, setDurationType] = useState('minutes');
    const [customDeactivation, setCustomDeactivation] = useState({
      duration: '',
      durationType: 'minutes'
    });
    const [openDurationModal, setOpenDurationModal] = useState(false);
  




    
  
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Table Of Users
      </h4>
      <div className="flex items-center mb-4">
        {/* barre de recherche  */}
     <input
      type="text"
      value={searchTerm}
      onChange={(e)=>setSearchTerm(e.target.value)}
      placeholder="Search users..."
      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-red-800 focus:border-red-800 w-full"
    />
     <button className="px-3 py-2 mx-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-greenadd focus:border-greenadd" onClick={startVoiceSearch}>
  {/* icône de recherche vocale */}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
  <path d="M7 4a3 3 0 0 1 6 0v6a3 3 0 1 1-6 0V4Z" />
  <path d="M5.5 9.643a.75.75 0 0 0-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-1.5v-1.546A6.001 6.001 0 0 0 16 10v-.357a.75.75 0 0 0-1.5 0V10a4.5 4.5 0 0 1-9 0v-.357Z" />
</svg>

</button>
     </div>
     {/* button ajout */}
     <div className="flex justify-between">
      <Link to="/tables/AddUser">
        <button type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">+ Add</button>
      </Link>
      {/* export button */}
      <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
      onClick={() => setShowModal(true)}
      >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-strokedark rounded-md group-hover:bg-opacity-0 flex items-center">
          <svg className="w-6 h-6 text-gray-800 dark:text-white mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"/>
          </svg>
          Download
        </span>
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Choose export format:</h2>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => handleExport('pdf')}
              >
                PDF
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => handleExport('excel')}
              >
                Excel
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>



     

     
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Users
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Email
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Role
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
            phoneNumber
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Status
            </h5>
          </div>
        </div>

      
        {currentUsers.map((user, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === users.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
            <div className="h-12.5 w-15 rounded-md">
              {user.image ? (
                   <img src={`${user.image}`} alt="User" />
              ):(
                <img src={user.gender=='female'?'https://res.cloudinary.com/dc31jcevz/image/upload/v1710846932/unknownF_ohd798.jpg'
                :'https://res.cloudinary.com/dc31jcevz/image/upload/v1710846932/unknownH_oabt4p.jpg'} alt="Default User" />
              )}
               
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                {user.username}
              </p>
            </div>
     


            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{user.email}</p>
            </div>

            {editingUserId === user._id ? (
            <select
              className="border border-gray-300 rounded-md"
              value={newUserRole}
              onChange={(e) => setNewUserRole(e.target.value)}
            >
              <option value="jobSeeker">Job Seeker</option>
              <option value="professional">Professional</option>
              <option value="teacher">Teacher</option>
            </select>
          ) : (
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{user.role}</p>
            </div>
            )}

        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
          {user.phoneNumber ? (
            <a href={`https://wa.me/+${user.phoneNumber}`} className="flex items-center text-black dark:text-white">
              <p className="mr-2">{user.phoneNumber}</p>
              <FaWhatsapp width={18} height={18} className="text-green-500" />
            </a>
          ) : (
            <p className="text-black dark:text-white">Aucun numéro Dispo</p>
          )}
        </div>




            {editingUserId === user._id  ? (
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <div className="flex items-center space-x-3.5">
                <button
                  className="bg-transparent hover:bg-success text-success font-semibold hover:text-white py-2 px-4 border border-success hover:border-transparent rounded"
                  onClick={() => updateUserRole()}
                >
                  modify
                </button>
                <button
                  className="bg-transparent hover:bg-danger text-danger font-semibold hover:text-white py-2 px-4 border border-danger hover:border-transparent rounded"
                  onClick={() => {
                    setEditingUserId(null);
                    setNewUserRole('');
                  }}
                >
                  Cancel
                </button>
              </div>
              </div>
            ) : (
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white"> 
              <div className="flex items-center space-x-3.5">
              <Link to={`/userDetails/${user._id}`}>
              <button className="hover:text-primary">
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
              
              </Link>
              <button className="hover:text-primary"
                       onClick={() => handleUpdateRole(user._id, user.role)}
                      >
                    <i className="fas fa-pencil-alt text-orange-600"></i>
              </button>



      { editingUserId2 === user._id && showModal2 ? (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="bg-white p-4 rounded-lg">
                  <h1 className="text-xl font-semibold mb-4 dark:text-black">Change user status</h1>
                  <button
                    className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    onClick={() => {
                      handleUpdateStatus(user._id, 'active', customDeactivation);
                      closeModal2();
                      setOpenDurationModal(false);
                    }}
                  >
                    Active
                  </button>
                 
                  <button
                    className="text-gray-900 bg-gradient-to-r from-yellow-200 via-yellow-200 to-yellow-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    onClick={() => {
                      setOpenDurationModal(true);
                      // closeModal2();
                    }}
                  >
                    Deactivate
                  </button>
                  <button
                    className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    onClick={() => {
                      handleUpdateStatus(user._id, 'banned', customDeactivation);
                      closeModal2();
                      setOpenDurationModal(false);
                    }}
                  >
                    Banned
                    
                  </button>
                  <button 
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-black dark:border-black dark:hover:bg-gray-700 dark:hover:border-esprit dark:focus:ring-gray-700"
                    onClick={closeModal2}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3.5">
                {user.ProfileStatus === 'active' && (
                <button
                  className="hover:text-primary"
                  onClick={() => {
                    openModal2(user._id)
                    handleDeactivateAccount(user._id,user.ProfileStatus)
                    setOpenDurationModal(false);
                  }}
                >
                  <svg
                  className="fill-current text-success"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  height="18"
                  width="18"
                  
                >
                  <path
                    fillRule="evenodd"
                    d="M9.585.52a2.678 2.678 0 00-3.17 0l-.928.68a1.178 1.178 0 01-.518.215L3.83 1.59a2.678 2.678 0 00-2.24 2.24l-.175 1.14a1.178 1.178 0 01-.215.518l-.68.928a2.678 2.678 0 000 3.17l.68.928c.113.153.186.33.215.518l.175 1.138a2.678 2.678 0 002.24 2.24l1.138.175c.187.029.365.102.518.215l.928.68a2.678 2.678 0 003.17 0l.928-.68a1.17 1.17 0 01.518-.215l1.138-.175a2.678 2.678 0 002.241-2.241l.175-1.138c.029-.187.102-.365.215-.518l.68-.928a2.678 2.678 0 000-3.17l-.68-.928a1.179 1.179 0 01-.215-.518L14.41 3.83a2.678 2.678 0 00-2.24-2.24l-1.138-.175a1.179 1.179 0 01-.518-.215L9.585.52zM7.303 1.728c.415-.305.98-.305 1.394 0l.928.68c.348.256.752.423 1.18.489l1.136.174c.51.078.909.478.987.987l.174 1.137c.066.427.233.831.489 1.18l.68.927c.305.415.305.98 0 1.394l-.68.928a2.678 2.678 0 00-.489 1.18l-.174 1.136a1.178 1.178 0 01-.987.987l-1.137.174a2.678 2.678 0 00-1.18.489l-.927.68c-.415.305-.98.305-1.394 0l-.928-.68a2.678 2.678 0 00-1.18-.489l-1.136-.174a1.178 1.178 0 01-.987-.987l-.174-1.137a2.678 2.678 0 00-.489-1.18l-.68-.927a1.178 1.178 0 010-1.394l.68-.928c.256-.348.423-.752.489-1.18l.174-1.136c.078-.51.478-.909.987-.987l1.137-.174a2.678 2.678 0 001.18-.489l.927-.68zM11.28 6.78a.75.75 0 00-1.06-1.06L7 8.94 5.78 7.72a.75.75 0 00-1.06 1.06l1.75 1.75a.75.75 0 001.06 0l3.75-3.75z"
                  />
                </svg>
                </button>
                  )}
                  {user.ProfileStatus === 'deactivated' && (
                     <button
                     className="hover:text-primary"
                     onClick={() => {
                       openModal2(user._id)
                       handleDeactivateAccount(user._id,user.ProfileStatus)
                       setOpenDurationModal(false);
                     }}
                   >
                  <svg
                  className="fill-current text-warning "
                  viewBox="0 0 1024 1024"
                  fill="currentColor"
                  height="18"
                  width="18"
                 
                >
                  <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
                  <path d="M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z" />
                </svg>
                </button>
                  )}
                  {user.ProfileStatus !== 'active' && user.ProfileStatus !== 'deactivated' && (
                   
                    <svg
                    className="fill-current text-black dark:text-white"
                    viewBox="0 0 960 1000"
                    fill="none"
                    height="18"
                    width="18"
                  >
                    <path d="M480 20c133.333 0 246.667 46.667 340 140s140 206.667 140 340c0 132-46.667 245-140 339S613.333 980 480 980c-132 0-245-47-339-141S0 632 0 500c0-133.333 47-246.667 141-340S348 20 480 20M116 500c0 88 27.333 164.667 82 230l514-514c-66.667-54.667-144-82-232-82-101.333 0-187.333 35.667-258 107S116 398.667 116 500m364 364c101.333 0 187.667-35.667 259-107s107-157 107-257c0-86.667-27.333-164-82-232L250 782c65.333 54.667 142 82 230 82" />
                    {/* Icône pour le statut désactivé */}
                  </svg>
                     
                  
                )}
              </div>
            )} 
            {openDurationModal && editingUserId2 === user._id &&(
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="bg-white p-4 rounded-lg">
                <h1 className="text-xl font-semibold mb-4 dark:text-black">Choose the deactivation duration</h1>
                <label className="mb-2.5 block text-black dark:text-black">
                Duration Type <span className="text-meta-1">*</span>
                  </label>
                  <select
                    name="role"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={customDeactivation.durationType}
                    onChange={handleDurationTypeChange}
                  >
                    <option value="minutes">Minutes</option>
                    <option value="hours">Hours</option>
                    <option value="days">Days</option>
                  </select>
                  <label className="mb-2.5 block text-black dark:text-black">  
                  Duration <span className="text-meta-1">*</span>
                  </label>
                  <input
                      type="number"
                      placeholder="Enter Number Of Duration"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={customDeactivation.duration}
                      onChange={handleDurationChange}
                    />

                   <button 
                    className="text-gray-900 mt-2 bg-gradient-to-r from-lime-500 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-100 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                     onClick={() => {
                       handleUpdateStatus(user._id, 'deactivated', customDeactivation);
                       setOpenDurationModal(false);
                        }}
                      >
                      confirmer
                  </button>
                  <button 
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-33 dark:bg-gray-800 dark:text-black dark:border-black dark:hover:bg-gray-700 dark:hover:border-esprit dark:focus:ring-gray-700"
                     onClick={() => {
                        setOpenDurationModal(false);
                        }}
                      >
                      Concel
                  </button>
                </div>
              
                  
              </div>
            )}


      
                        
                    </div>
                        </p>
                        
                </div>
                )}
                
              </div>
              
            ))}
             

          </div>
          

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalUsers={filteredUsers.length}
      />
      
    </div>

    
    
  );
  
};




export default TableOne;
