import React, { useState } from 'react';

interface Filters {
  locations: string[];
  experience: string;
  industry: string;
  interType:string;
}
const FiltersSidebar: React.FC<{ onFilterChange: (filters: Filters) => void; isJobs: boolean }> = ({ onFilterChange, isJobs  }) => {
  const [filters, setFilters] = useState<Filters>({
    locations: [],
    experience: '',
    industry: '',
    interType: ''
  });
  const locations = [
    "Ariana","Beja","Ben Arous","Bizerte","Gabes","Gafsa","Jendouba","Kairouan","Kasserine",
    "Kebili","Kef","Mahdia","Manouba","Medenine","Monastir","Nabeul","Sfax",
    "Sidi Bouzid","Siliana","Sousse","Tataouine","Tozeur","Tunis","Zaghouan",""
  ];

  const experienceLevels = ['Junior', 'Senior','Experienced'];
  const industries = ['Computer Science', 'Mechanical Engineering','Electromechanical Engineering','Civil Engineering','Business'];
  const internshipType = ['Summer Internship','PFE Internship'];
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    onFilterChange({ ...filters, [name]: value });
  };
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      locations: prevFilters.locations.includes(value)
        ? prevFilters.locations.filter((location) => location !== value)
        : [...prevFilters.locations, value],
    }));
    onFilterChange({ ...filters, locations: filters.locations.includes(value)
        ? filters.locations.filter((location) => location !== value)
        : [...filters.locations, value] });
  };
  const handleEducationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      interType: value,
    }));
    onFilterChange({ ...filters, interType: value });
  };
  const handleApplyFilters = () => {
    // Pass the selected filters to the parent component
    onFilterChange(filters);
  };
  const renderLocationGroups = () => {
    const chunkSize = 8;
    const locationGroups = [];
    for (let i = 0; i < locations.length; i += chunkSize) {
      locationGroups.push(locations.slice(i, i + chunkSize));
    }
    return locationGroups;
  };

  return (
    <div className="bg-gradient-to-r from-red-400 via-red-600 to-red-800 p-4 rounded-lg shadow-md"
         style={{
           background: "url('src/images/cards/filterBar.png')",
           backgroundSize: 'cover',
         }}>
      <h2 className="text-lg font-semibold text-white text-start ml-2 mb-4">Filters</h2>
      <label htmlFor="location" className="font-medium text-white mb-1 ml-2">Location:</label>
      <div className="mb-4 flex flex-wrap bg-white rounded-lg p-1 py-5">
        {renderLocationGroups().map((group, index) => (
          <ul key={index}  className={`mb- px-1 ${index < renderLocationGroups().length - 1 ? 'border-l border-gray-300' : ''}`}>
            {group.map((location, i) => (
              <li key={i} className="flex text-black items-center">
                <input
                  type="checkbox"
                  id={location}
                  name="location"
                  value={location}
                  checked={filters.locations.includes(location)}
                  onChange={handleLocationChange}
                  className="hidden"
                />
                <label htmlFor={location} className="relative cursor-pointer flex items-center">
                  <div className="w-5 flex-shrink-0">
                    {filters.locations.includes(location) && (
                      <svg className="h-4 w-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                           strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    )}
                  </div>
                  <span className="ml-1">{location}</span>
                </label>
              </li>

            ))}
          </ul>
        ))}
      </div>
      <div className="mb-4">
        <label htmlFor="experience"
               className="block font-medium mb-1 text-white ml-2">{isJobs ? 'Experience Level :' : 'Internship Type :'}</label>
        <select
          name="experience"
          id="experience"
          value={isJobs ? filters.experience : filters.interType}
          onChange={isJobs ? handleFilterChange : handleEducationChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">{isJobs ? 'All Experience Levels' : 'All Internship Types'}</option>
          {isJobs ? experienceLevels.map((option, index) => (
            <option key={index} value={option} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              {option}
            </option>
          )) : internshipType.map((option, index) => (
            <option key={index} value={option} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              {option}
            </option>
          ))}
        </select>
      </div>
      {/* Industry filter */}
      <div className="mb-4">
        <label htmlFor="industry" className="block text-white font-medium mb-1 ml-2">Industry:</label>
        <select
          name="industry"
          id="industry"
          value={filters.industry}
          onChange={handleFilterChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">All Industries</option>
          {industries.map((option, index) => (
            <option key={index} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FiltersSidebar;
