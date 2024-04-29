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




interface Notification {
  recipientId:string;
  type: string;
  message: string;
  jobId: string;
  applicantId: string;
  timestamp: Date;
  read: boolean;
}

const CalendarAdmin = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const currentUser = useSelector(selectCurrentUser);
  const [notificationsCount, setNotificationsCount] = useState<any>({});

 
  
    useEffect(() => {
      const fetchNotificationsForUser = async () => {
        const userNotifications = await fetchNotifications(currentUser._id);
        setNotifications(userNotifications);
      };
  
      fetchNotificationsForUser();
    }, []);
  


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
  
          // Ajoutez les notifications comme événements
          const notificationEvents = notifications.map((notification) => ({
            title: notification.type,
            start: notification.timestamp,
          }));
  
          setEvents([...fetchedEvents, ...notificationEvents]);
          setEvents([...fetchedEvents]);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchEvents();
    }, [notifications]); // Utilisez notifications comme dépendance pour mettre à jour les événements lorsque les notifications changent
  
    const handleDateClick = (arg :any) => {
      setSelectedDate(arg.date);
    };
  //////////////////////////////////////////
  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     try {
  //       const response = await fetch('http://localhost:3001/dashboard/api/holidaysAdmin');
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch holidays');
  //       }
  //       const data = await response.json();
  //       const fetchedEvents = data.response.holidays.map((holiday: any) => ({
  //         title: holiday.name,
  //         start: holiday.date.iso,
  //         classNames: 'holiday',
  //       }));
  //       setEvents([...fetchedEvents]);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchEvents();
  // }, []); // Utilisez une dépendance vide pour exécuter la requête une seule fois lors du montage

  // useEffect(() => {
  //   const fetchNotifications = async () => {
  //     try {
  //       const notificationsCount = await fetchNotificationsCountByUserIdByDate(currentUser.id);
  //       const notificationEvents = Object.entries(notificationsCount).map(([date, count]) => ({
  //         title: `Notifications: ${count}`,
  //         start: new Date(date),
  //         classNames: 'notification',
  //       }));        
  //       setEvents((prevEvents) => [...prevEvents, ...notificationEvents]);
  //     } catch (error) {
  //       console.error('Error fetching notifications count:', error);
  //     }
  //   };

  //   fetchNotifications();
  // }, []); // Utilisez l'ID de l'utilisateur comme dépendance pour mettre à jour les notifications lorsque l'utilisateur change

   
    
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



    </DefaultLayoutAdmin>
  );
};

export default CalendarAdmin;
