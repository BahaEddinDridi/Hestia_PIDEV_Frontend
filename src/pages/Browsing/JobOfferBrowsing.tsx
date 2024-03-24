import React, { useEffect, useState } from 'react';
import {Job} from './API/Services';
import DefaultLayout from '../../layout/DefaultLayout';
import JobOfferCard from '../../components/Cards/JobOfferCard';
import BrowsingHeader from './BrowsingHeader';
import InternshipOfferCard from '../../components/Cards/InternshipOfferCard';
import jobService from './API/Services';
import FiltersSidebar from '../../components/Sidebar/BrowsingSideBar';

const OfferBrowsePage = () => {
  const [isJobs, setIsJobs] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState({
    locations: [],
    experience: '',
    industry: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const fetchJobs = async () => {
    try {
      const fetchedJobs = await jobService.getAllJobs(
        appliedFilters.locations.join(','), // Convert locations array to comma-separated string
        appliedFilters.experience,
        appliedFilters.industry
      );
      setJobs(fetchedJobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };
  const handleSearch = async (query) => {
    try {
      const filteredJobs = await jobService.searchJobs(query);
      setJobs(filteredJobs);
    } catch (error) {
      console.error('Error searching jobs:', error);
    }
  };


  useEffect(() => {
    fetchJobs();
  }, [appliedFilters]);

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      handleSearch(searchQuery);
    } else {
      fetchJobs();
    }
  }, [searchQuery]);
  const handleFilterChange = (filters) => {
    setAppliedFilters(filters);
  };
  const handleTabChange = () => {
    setIsJobs(!isJobs);
  };
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <DefaultLayout>
      <div className="grid grid-cols-4 ">
        <div className="col-span-1">
          <FiltersSidebar onFilterChange={handleFilterChange} isJobs={isJobs}/>
        </div>
        <div className="col-span-3">
          <BrowsingHeader
            activeTab={isJobs}
            onTabChange={handleTabChange}
            onSearch={handleSearch}
            searchQuery={searchQuery}
            onInputChange={handleInputChange}/>
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid gap-10 mt-10 grid-cols-1 sm:grid-cols-2">
              {jobs.map((job, index) => (
                isJobs ? (
                  <JobOfferCard key={index} job={job} />
                ) : (
                  <InternshipOfferCard key={index} job={job} />
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default OfferBrowsePage;
