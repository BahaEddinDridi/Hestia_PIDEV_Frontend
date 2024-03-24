export const getAllJobs = async (filters) => {
  try {
    let url = 'http://localhost:3001/job/GetAllJobs';

    if (filters) {
      const params = new URLSearchParams(filters);
      url += `?${params}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }
    const jobs = await response.json();
    return jobs;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};
