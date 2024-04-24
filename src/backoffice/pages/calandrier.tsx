import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayoutAdmin from "../layaout/DefaultLayoutAdmin";
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';




const CalendarAdmin = () => {
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');
    


    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const response = await fetch('http://localhost:3001/dashboard/api/holidaysAdmin');
          if (!response.ok) {
            throw new Error('Failed to fetch holidays');
          }
          const data = await response.json();
          const fetchedEvents = data.response.holidays.map((holiday:any) => ({
            title: holiday.name,
            start: holiday.date.iso,
          }));
          setEvents(fetchedEvents);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchEvents();
    }, []);
    const handleDateClick = (arg :any) => {
      setSelectedDate(arg.date);
      setShowModal(true);
    };
  
    const closeModal = () => {
      setShowModal(false);
    };
    const handleAddEvent = () => {
      // Ajouter ici la logique pour ajouter l'événement
      console.log("Titre:", title);
      console.log("Date de début:", startDate);
      console.log("Date de fin:", endDate);
      console.log("Description:", description);
      
      // Réinitialiser les valeurs des champs
      setTitle('');
      setStartDate('');
      setEndDate('');
      setDescription('');
      
      // Fermer le modal
      setShowModal(false);
  };
    
    
  return (
    <DefaultLayoutAdmin>
      <Breadcrumb pageName="Calendar" />

      {/* <!-- ====== Calendar Section Start ====== --> */}
      <FullCalendar plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]} 
      initialView={"dayGridMonth"}
      headerToolbar={{
        start:"today prev,next",
        center:"",
        end:"dayGridMonth,timeGridWeek,timeGridDay",
      }}
      events={events} 
      dateClick={handleDateClick}/>
      {/* <!-- ====== Calendar Section End ====== --> */}
      {/* modal ajout d'evenement  */}
      {/* {showModal && (
                 <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
                 <div className="bg-white p-4 rounded-lg">
                 <h1 className="text-xl font-semibold mb-4 dark:text-black">Choose the deactivation duration</h1>
                 <label className="mb-2.5 block text-black dark:text-black">
                 Duration Type <span className="text-meta-1">*</span>
                   </label>
                   <select
                     name="role"
                     className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    
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
                     
                     />
 
                    <button 
                     className="text-gray-900 mt-2 bg-gradient-to-r from-lime-500 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-100 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                     >
                       confirmer
                   </button>
                   <button 
                     className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-33 dark:bg-gray-800 dark:text-black dark:border-black dark:hover:bg-gray-700 dark:hover:border-esprit dark:focus:ring-gray-700"
                      onClick={() => {
                        setShowModal(false);
                         }}
                       >
                       Concel
                   </button>
                 </div>
               
                   
               </div>

            )} */}



    </DefaultLayoutAdmin>
  );
};

export default CalendarAdmin;
