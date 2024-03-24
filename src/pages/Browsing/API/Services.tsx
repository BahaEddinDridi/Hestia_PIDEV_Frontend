import axios, { AxiosResponse } from 'axios';
export interface Job {
  jobTitle: string;
  jobAdress?: string;
  jobLocation: 'Ariana' | 'Beja' | 'Ben Arous' | 'Bizerte' | 'Gabes' | 'Gafsa' | 'Jendouba' | 'Kairouan' | 'Kasserine' | 'Kebili' | 'Kef' | 'Mahdia' | 'Manouba' | 'Medenine' | 'Monastir' | 'Nabeul' | 'Sfax' | 'Sidi Bouzid' | 'Siliana' | 'Sousse' | 'Tataouine' | 'Tozeur' | 'Tunis' | 'Zaghouan' | 'Other';
  jobDescription: string;
  salary: number;
  jobPost: string;
  jobfield: 'Computer Science' | 'Mechanical Engineering' | 'Electromechanical Engineering' | 'Civil Engineering' | 'Business';
  jobStartDate?: Date;
  jobApplicationDeadline?: Date;
  jobRequiredSkills?: string;
  jobRequiredEducation: 'Bachelor degree' | 'Engineering degree';
  jobRequiredExperience: 'Junior' | 'Intermediate' | 'Senior' | 'Entry-level' | 'Mid-level' | 'Experienced' | 'Expert' | 'Lead';
  contactNumber?: number;
  jobOtherInformation?: string;
}

const API_BASE_URL = 'http://localhost:3001';

const jobService = {
  getAllJobs: async (location?: string, jobExperience?: string, jobField?: string): Promise<Job[]> => {
    try {
      const response: AxiosResponse<Job[]> = await axios.get(`${API_BASE_URL}/job/GetAllJobs`, {
        params: {
          location,
          jobExperience,
          jobField
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  },
  searchJobs: async (query: string): Promise<Job[]> => {
    try {
      console.log('Search service Query:', query);
      const response: AxiosResponse<Job[]> = await axios.get(`${API_BASE_URL}/job/searchJobs`, {
        params: {
          query
        }
      });
      console.log('Search Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error searching jobs:', error);
      throw error;
    }
  },

};

export default jobService;