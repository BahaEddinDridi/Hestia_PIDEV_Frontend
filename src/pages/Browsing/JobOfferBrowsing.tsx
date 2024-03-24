import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import JobOfferCard from '../../components/Cards/JobOfferCard';
import BrowsingHeader from './BrowsingHeader';
import InternshipOfferCard from '../../components/Cards/InternshipOfferCard';
import { getAllJobs } from './API/Services'; // Assuming you're using React Router for navigation

const OfferBrowsePage = () => {
  const [isJobs, setIsJobs] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsData = await getAllJobs();
        setJobs(jobsData);
        setFilteredJobs(jobsData);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);
  const filterJobsByLocation = (location) => {
    if (location === '') {
      setFilteredJobs(jobs);
    } else {
      const filteredListings = jobs.filter(job => job.jobLocation === location);
      setFilteredJobs(filteredListings);
    }
  };

  const handleTabChange = () => {
    setIsJobs(!isJobs);
  };

  const jobListings = [
    { title: "Software Engineer Intern", company: "ABC Corp", location: "New York", type: "Internship", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum aliquam mi, vel fringilla lacus vestibulum et." },
    { title: "Marketing Specialist", company: "XYZ Inc", location: "San Francisco", type: "Full-time", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum aliquam mi, vel fringilla lacus vestibulum et." },
    { title: "Marketing Specialist", company: "XYZ Inc", location: "San Francisco", type: "Full-time", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum aliquam mi, vel fringilla lacus vestibulum et." },
    { title: "Marketing Specialist", company: "XYZ Inc", location: "San Francisco", type: "Full-time", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum aliquam mi, vel fringilla lacus vestibulum et." },
    { title: "Marketing Specialist", company: "XYZ Inc", location: "San Francisco", type: "Full-time", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum aliquam mi, vel fringilla lacus vestibulum et." },
    { title: "Marketing Specialist", company: "XYZ Inc", location: "San Francisco", type: "Full-time", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum aliquam mi, vel fringilla lacus vestibulum et." },
  ];

  return (
    <DefaultLayout>
      <BrowsingHeader activeTab={isJobs} onTabChange={handleTabChange} />
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid gap-10 mt-10 px-30 grid-cols-1 sm:grid-cols-2">
          {jobs.map((job, index) => (
            isJobs ? (
              <JobOfferCard key={index} job={job} />
            ) : (
              <InternshipOfferCard key={index} job={job} />
            )
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default OfferBrowsePage;
