import { FC } from 'react';
interface LogoutConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutConfirmation: FC<LogoutConfirmationProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="logout-confirmation">
      <p>Are you sure you want to logout?</p>
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onCancel}>No</button>
    </div>
  );
};

export default LogoutConfirmation;
