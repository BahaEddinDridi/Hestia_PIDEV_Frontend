import React from 'react';

const Notification: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="notification">
      {message}
    </div>
  );
};

export default Notification;
