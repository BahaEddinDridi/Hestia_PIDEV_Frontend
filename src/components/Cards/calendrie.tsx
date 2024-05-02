import  { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { useParams } from 'react-router';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
const Calendrie =  ({ type }) =>{
  const [events, setEvents] = useState([]);
  const { companyName, username } = useParams(); // Récupération des paramètres de l'URL

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let apiUrl;

        if (type === 'candidate') {
          // Si le type est candidat, récupérez les événements pour le username
          apiUrl = `http://192.168.33.10:3001/application/calendrie/event?username=${username}`;
        } else if (type === 'company') {
          // Si le type est entreprise, récupérez les événements pour le companyName
          apiUrl = `http://192.168.33.10:3001/application/calendrie/event?companyName=${companyName}`;
        }
        const response = await axios.get(apiUrl);
  
        if (!response.data || !Array.isArray(response.data)) {
          throw new Error('Invalid response from server');
        }
  
        const events = response.data.map(event => {
          if (event.rendering === 'background') {
            // Holiday event
            return {
              title: event.title,
              start: event.start,
              rendering: 'background',
              backgroundColor: '#C62828',
              textColor: 'white'
            };
          } else if (event.title === 'Entretien') {
            // Interview event
            return {
              title: event.title,
              start: event.start,
              backgroundColor: 'blue',
              textColor: 'white'
            };
          }
          return null; // Ignore other types of events
        }).filter(event => event !== null); // Remove any null events
  
        setEvents(events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
  
    fetchEvents();
  }, [companyName, username]);
   
  
    return (
      <DefaultLayout>
     
     <div className="flex items-center mb-4">
     <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6 inline-block mr-2"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    <h1 className="text-2xl font-bold">Calendar</h1>
    </div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: 'today prev,next',
          center: '',
          end: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={events}
      />
    </DefaultLayout>
      );
    }
export default Calendrie;