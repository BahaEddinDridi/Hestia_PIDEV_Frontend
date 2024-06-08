import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './PhoneNumber.css'; // Import your custom CSS file

interface PhoneNumberProps {
  onChange: (value: string, isValid: boolean) => void;
}

const PhoneNumber: React.FC<PhoneNumberProps> = ({ onChange }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleChange = (value: string) => {
    setPhoneNumber(value);
    const valid = validatePhoneNumber(value);
    setIsValid(valid);
    onChange(value, valid); // Pass the phone number and validity to the parent
  };

  const validatePhoneNumber = (phone: string) => {
    const phoneNumberPattern = /^\d{10,}$/;
    return phoneNumberPattern.test(phone);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <label className="block mb-2 font-medium text-black dark:text-white">
        Phone Number
      </label>
      <div className="w-full">
        <PhoneInput
          country={'tn'}
          value={phoneNumber}
          inputProps={{ required: true }}
          onChange={handleChange}
          placeholder="Enter your phone number"
          containerClass="phone-input-container w-full"
          inputClass="phone-input w-full px-4 py-2 border rounded-md"
        />
      </div>
      {!isValid && <p className="text-red-500 mt-2">Please enter a valid phone number</p>}
    </div>
  );
}

export default PhoneNumber;
