import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayoutAdmin from "../layaout/DefaultLayoutAdmin";
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {fetchNotifications} from '../api'
import { selectCurrentUser } from '../../ApiSlices/authSlice';
import { useSelector } from 'react-redux';
import {fetchNotificationsCountByUserIdByDate} from '../api'
import { format,parse } from 'date-fns';
import axios from 'axios';
import ReactModal from 'react-modal';

interface Notification {
  recipientId:string;
  type: string;
  message: string;
  jobId: string;
  applicantId: string;
  timestamp: Date;
  read: boolean;
}
const formatDate = (dateString: any) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `Date: ${year}-${month}-${day}    ${hours}:${minutes}`;
};

const CalendarAdmin = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const currentUser = useSelector(selectCurrentUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState<Notification[]>([]);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
 
  


  
  

    const handleDateClick = async (arg: any) => {
      try {
        const formattedDate = format(arg.date, 'dd-MM-yyyy');
        const response = await axios.get(`http://localhost:3001/notifications/NotificationsByDateAndRecepientId/${formattedDate}/${currentUser._id}`);
        const notifications = response.data.notifications;
    
        // Mettre à jour l'état des notifications sélectionnées
        setSelectedNotifications(notifications);
        // Ouvrir le modal
        setShowModal(true);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    
  //////////////////////////////////////////
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const holidaysResponse = await fetch('http://localhost:3001/dashboard/api/holidaysAdmin');
        // if (!holidaysResponse.ok) {
        //   throw new Error('Failed to fetch holidays');
        // }
        // const holidaysData = await holidaysResponse.json();
        // const holidays = holidaysData.response.holidays.map((holiday: any) => ({
        //   title: holiday.name,
        //   start: holiday.date.iso,
        // }));
  
        const notificationsCount = await fetchNotificationsCountByUserIdByDate(currentUser._id);
        const notificationEvents = Object.entries(notificationsCount).map(([date, count]) => {
          const parsedDate = parse(date, 'dd/MM/yyyy', new Date());
          return {
            title: `${count} Notifications`,
            start: format(parsedDate, 'yyyy-MM-dd'),
            allDay: true,
          };
        });
  
        // setEvents([...holidays, ...notificationEvents]);
        setEvents([ ...notificationEvents]);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
  
    fetchData();
  }, []);
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
     {/* Display the modal */}
{showModal&&(
    <div className="fixed inset-0 flex items-center justify-center z-50 mt-20 ">
  <div className="container mx-auto bg-white max-w-lg my-auto overflow-y-auto ">
  <div className="mx-auto p-6 pb-5 border bg-white rounded-md shadow-dashboard">
    <div className="flex flex-wrap items-center justify-between mb-1 -m-2">
      <div className="w-auto p-2">
        <h2 className="text-lg font-semibold text-black">My Notifications</h2>
        <p className="text-xs text-coolGray-500 font-medium">total Notifications</p>
      </div>
      <div className="w-auto p-2">
        <a href="#" className="text-sm text-esprit hover:text-black font-semibold"
        onClick={() => setShowModal(false)}
        >
          Concel
          
        </a>
      </div>
    </div>
    {selectedNotifications.map((notification) => (
      <div className="flex flex-wrap" key={notification.id}>
        <div className="w-full border-b border-coolGray-100">
          <div className="flex flex-wrap items-center justify-between py-4 -m-2">
            <div className="w-auto p-2">
              <div className="flex flex-wrap items-center -m-2">
                <div className="w-auto p-2">
                  <div className="flex items-center justify-center w-12 h-12 bg-yellow-50 rounded-md">
                  <svg className="w-6 h-6 text-esprit dark:text-white  hover:rotate-90 duration-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.193-.538 1.193H5.538c-.538 0-.538-.6-.538-1.193 0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365Zm-8.134 5.368a8.458 8.458 0 0 1 2.252-5.714m14.016 5.714a8.458 8.458 0 0 0-2.252-5.714M8.54 17.901a3.48 3.48 0 0 0 6.92 0H8.54Z"/>
                </svg>

                  </div>
                </div>
                <div className="w-auto p-2">
                  <h2 className="text-sm font-medium text-greenadd">
                    {notification.type}
                  </h2>
                  <h3 className="text-xs font-medium text-coolGray-400">
                    {notification.message}
                  </h3>
                </div>
              </div>
            </div>
            
          </div>
          <div className="w-auto p-0">
            <div className="text-xs text-black font-medium">
            {formatDate(notification.timestamp)}
          </div>
            </div>
        </div>
      </div>
    ))}
  </div>
</div>
</div>
     ) }



    </DefaultLayoutAdmin>
  );
};

export default CalendarAdmin;