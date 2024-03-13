import { useState } from 'react';

const SwitcherTwo = ({ checked, onChange }) => {
  const [enabled, setEnabled] = useState(checked);

  const handleToggle = () => {
    const newState = !enabled;
    setEnabled(newState);
    // Call the onChange function passed from the parent component
    onChange(newState);
  };

  return (
    <div>
      <label htmlFor="toggle2" className="flex cursor-pointer select-none items-center">
        <div className="relative">
          <input
            id="toggle2"
            type="checkbox"
            className="sr-only"
            onChange={handleToggle}
            checked={enabled} // Set the checked state of the input
          />
          <div className="h-5 w-14 rounded-full bg-meta-9 shadow-inner dark:bg-[#5A616B]"></div>
          <div
            className={`dot absolute left-0 -top-1 h-7 w-7 rounded-full bg-white shadow-switch-1 transition ${
              enabled && '!right-0 !translate-x-full !bg-primary dark:!bg-white'
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default SwitcherTwo;