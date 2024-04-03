import React from 'react';

const governorates: string[] = [
  "",
  "Ariana",
  "Beja",
  "Ben Arous",
  "Bizerte",
  "Gabes",
  "Gafsa",
  "Jendouba",
  "Kairouan",
  "Kasserine",
  "Kebili",
  "Kef",
  "Mahdia",
  "Manouba",
  "Medenine",
  "Monastir",
  "Nabeul",
  "Sfax",
  "Sidi Bouzid",
  "Siliana",
  "Sousse",
  "Tataouine",
  "Tozeur",
  "Tunis",
  "Zaghouan",
  "Other"
];

interface JobLocationProps {
  value: string;
  onChange: (value: string) => void;
}

const JobLocation: React.FC<JobLocationProps> = ({ value, onChange }) => {
  return (
    <div className='mb-4'>
      <label className="block uppercase tracking-wide text-xs font-bold text-OppSarra2R">location</label>
      <select
        className="w-full shadow-4 p-4 border-0"
        name="jobLocation"
        value={value}
        onChange={(e) => {
          const selectedValue = e.target.value ?? '';
          onChange(selectedValue); // Utilisez la fonction onChange pour mettre à jour la valeur de la localisation de l'emploi
        }}
      >
        {governorates.map((governorate, index) => (
          <option key={index} value={governorate}>{governorate}</option>
        ))}
      </select>
    </div>
  );
}

export default JobLocation;
