import React, { useEffect, useState } from 'react';
import { Internship, internshipService, Job } from './API/Services';
import DefaultLayout from '../../layout/DefaultLayout';
import JobOfferCard from '../../components/Cards/JobOfferCard';
import BrowsingHeader from './BrowsingHeader';
import InternshipOfferCard from '../../components/Cards/InternshipOfferCard';
import { jobService } from './API/Services';
import FiltersSidebar from '../../components/Sidebar/BrowsingSideBar';

const OfferBrowsePage = () => {
  const [isJobs, setIsJobs] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [offers, setOffers] = useState<(Job | Internship)[]>([]);
  const [appliedFilters, setAppliedFilters] = useState({
    locations: [],
    experience: '',
    industry: '',
    interType: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const fetchOffers = async () => {
    try {
      if (isJobs) {
        const fetchedJobs = await jobService.getAllJobs(
          appliedFilters.locations.join(','),
          appliedFilters.experience,
          appliedFilters.industry
        );
        setOffers(fetchedJobs);
      } else {
        const fetchedInternships = await internshipService.getAllInternships(
          appliedFilters.interType,
          appliedFilters.locations.join(','),
          appliedFilters.industry
        );
        console.log("internships", fetchedInternships);
        setOffers(fetchedInternships);
      }
    } catch (error) {
      console.error('Error fetching offers:', error);
    }
  };
  const handleSearch = async (query: string) => {
    try {
      const filteredOffers = isJobs ? await jobService.searchJobs(query) : await internshipService.searchInternships(query);
      setOffers(filteredOffers);
    } catch (error) {
      console.error('Error searching offers:', error);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, [appliedFilters, isJobs]);

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      handleSearch(searchQuery);
    } else {
      fetchOffers();
    }
  }, [searchQuery, isJobs]);

  const handleFilterChange = (filters: any) => {
    setAppliedFilters(filters);
  };
  const handleTabChange = () => {
    setIsJobs(!isJobs);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
              {offers.map((offer, index) => (
                isJobs ? (
                  <JobOfferCard key={index} job={offer as Job} />
                ) : (
                  <InternshipOfferCard key={index} internship={offer as Internship} />
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
