import { useState } from "react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface PhoneNumberProps {
  onChange: (value: string, isValid: boolean) => void;
}
const PhoneNumber : React.FC<PhoneNumberProps> = ({ onChange }) => {

  const [PhoneNumber, setPhoneNumber] = useState('');
  const [valid, setValid] = useState(true);


  const handlechange = (value: string) => {
    setPhoneNumber(value);
    const isValid = validationPhoneNumber(value);
    setValid(isValid);
    onChange(value, isValid); // Pass the phone number and validity to the parent
  };

  const validationPhoneNumber = (phonenumber: any) => {
    const phonenumberPatern = /^\d{10,}$/;
    return phonenumberPatern.test(phonenumber);
  }
  return (
    <div>
      <label className="mb-2.5 block font-medium text-black dark:text-white">
        Phone Number

          <PhoneInput
            country={'tn'}
            value={PhoneNumber}
            inputProps={{
              required: true
            }}

            onChange={handlechange}
            placeholder="Enter your phone number" />

      </label>
      {!valid && <p className="text-esprit">Please enter a valid phone number</p>}

    </div>
  )

}
export default PhoneNumber;