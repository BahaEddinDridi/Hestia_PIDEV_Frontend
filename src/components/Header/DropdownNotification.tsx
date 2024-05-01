import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../ApiSlices/authSlice';

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const currentUser = useSelector(selectCurrentUser);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const userId = currentUser._id
        const response = await fetch(`http://localhost:3001/notifications/getNotificationsByUser/${userId}`);
        const data = await response.json();
        setNotifications(data.notifications);
        const hasUnreadNotifications = data.notifications.some(notification => !notification.read);
        setNotifying(hasUnreadNotifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    const fetchAndMarkNotificationsAsRead = async () => {
      try {
        const userId = currentUser._id;
        const response = await fetch(`http://localhost:3001/notifications/getNotificationsByUser/${userId}`);
        const data = await response.json();
        setNotifications(data.notifications);
        // Extract notification ids
        const notificationIds = data.notifications.map(notification => notification._id);
        // Call markNotificationsAsRead API
        await fetch('http://localhost:3001/notifications/markNotificationsAsRead', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ notificationIds }),
        });
      } catch (error) {
        console.error('Error fetching notifications or marking as read:', error);
      }
    };

    if (dropdownOpen) {
      fetchAndMarkNotificationsAsRead();
    }
  }, [dropdownOpen, currentUser._id]);

  const formatDate = (dateString) => {
    const submitDate = new Date(dateString);
    const year = submitDate.getFullYear();
    const month = (submitDate.getMonth() + 1).toString().padStart(2, '0');
    const day = submitDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (!dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      ) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <li className="relative">
      <Link
        ref={trigger}
        onClick={() => {
          setNotifying(false);
          setDropdownOpen(!dropdownOpen)
        }}
        to="#"
        className="group flex justify-center border-[0.5px] border-stroke p-2 rounded-md drop-shadow-xl
        text-gray-2 bg-red-600
         from-gray-800 to-black font-semibold hover:translate-y-3 hover:rounded-[50%]
          transition-all duration-500 hover:from-[#331029] hover:to-[#310413] w-10.5 h-10.5"
      >

        <span
          className={`absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1 ${notifying === false ? 'hidden' : 'inline'
            }`}
        >
          <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
        </span>

        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z" />
        </svg>

        <span
                  className="absolute opacity-0 text-red-900 group-hover:opacity-100 group-hover:text-gray-700
                    group-hover:text-sm group-hover:-translate-y-10 duration-700">Notification</span>
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80 ${dropdownOpen === true ? 'block' : 'hidden'
          }`}
      >
        <div className="px-4.5 py-3">
          <h5 className="text-sm font-medium text-bodydark2">Notification</h5>
        </div>

        <ul className="flex h-auto flex-col overflow-y-auto">
          {notifications.map(notification => (
            <li key={notification._id}>
              <Link
                className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3
                hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                to={
                  notification.type === 'job_application'
                    ? `/detailsoffer/${notification.jobId}`
                    : notification.type === 'internship_application'
                      ? `/detailsinternship/${notification.jobId}`
                      : '/AcceptedDate'
                }
              >
                <p className="text-sm">{notification.message}</p>
                <p className="text-xs">{formatDate(notification.timestamp)}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default DropdownNotification;
