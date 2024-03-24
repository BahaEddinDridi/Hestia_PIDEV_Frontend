import React, { useState } from 'react';

interface Filters {
  locations: string[];
  experience: string;
  industry: string;
  internshipTypes:string;
}
const FiltersSidebar: React.FC<{ onFilterChange: (filters: Filters) => void; isJobs: boolean }> = ({ onFilterChange, isJobs  }) => {
  const [filters, setFilters] = useState<Filters>({
    locations: [],
    experience: '',
    industry: '',
    internshipTypes: ''
  });
  const locations = [
    "Ariana","Beja","Ben Arous","Bizerte","Gabes","Gafsa","Jendouba","Kairouan","Kasserine",
    "Kebili","Kef","Mahdia","Manouba","Medenine","Monastir","Nabeul","Sfax",
    "Sidi Bouzid","Siliana","Sousse","Tataouine","Tozeur","Tunis","Zaghouan","Other"
  ];

  const experienceLevels = ['Junior', 'Intermediate','Senior','Entry-level','Mid-level','Experienced','Expert','Lead'];
  const industries = ['Computer Science', 'Mechanical Engineering','Electromechanical Engineering','Civil Engineering','Business'];
  const internshipTypes = ['First Year Internship', 'Second Year Internship', 'Third Year Internship','Fourth Year Internship','Final Course Project'];
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
  const handleApplyFilters = () => {
    // Pass the selected filters to the parent component
    onFilterChange(filters);
  };
  const renderLocationGroups = () => {
    const chunkSize = 10;
    const locationGroups = [];
    for (let i = 0; i < locations.length; i += chunkSize) {
      locationGroups.push(locations.slice(i, i + chunkSize));
    }
    return locationGroups;
  };

  return (
    <div className="bg-gray-200 p-4">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      {/* Location filter */}
      <div className="mb-4 flex flex-wrap">
        {renderLocationGroups().map((group, index) => (
          <ul key={index} className="mb-2 px-1">
            {group.map((location, i) => (
              <li key={i} className="flex items-center">
                <input
                  type="checkbox"
                  id={location}
                  name="location"
                  value={location}
                  checked={filters.locations.includes(location)}
                  onChange={handleLocationChange}
                  className="mr-1"
                />
                <label htmlFor={location}>{location}</label>
              </li>
            ))}
          </ul>
        ))}
      </div>
      {/* Experience level filter */}
      <div className="mb-4">
        <label htmlFor="experience" className="block font-medium mb-1">{isJobs ? 'Experience Level:' : 'Internship Type :'}</label>
        <select
          name="experience"
          id="experience"
          value={filters.experience}
          onChange={handleFilterChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">{isJobs ? 'All Experience Levels' : 'All Types'}</option>
          {isJobs ? experienceLevels.map((option, index) => (
            <option key={index} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              {option}
            </option>
          )) : internshipTypes.map((option, index) => (
            <option key={index} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              {option}
            </option>
          ))}

        </select>
      </div>
      {/* Industry filter */}
      <div className="mb-4">
        <label htmlFor="industry" className="block font-medium mb-1">Industry:</label>
        <select
          name="industry"
          id="industry"
          value={filters.industry}
          onChange={handleFilterChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">All Industries</option>
          {industries.map((option, index) => (
            <option key={index} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FiltersSidebar;
