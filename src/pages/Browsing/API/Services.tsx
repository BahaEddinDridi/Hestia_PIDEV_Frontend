import axios, { AxiosResponse } from 'axios';
export interface Job {
  jobImage: string;
  jobCommpanyName: string;
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

export interface Internship {
  interImage: string;
  interCommpanyName: string;
  interTitle: string;
  interAdress?: string;
  interLocation: 'Ariana' | 'Beja' | 'Ben Arous' | 'Bizerte' | 'Gabes' | 'Gafsa' | 'Jendouba' | 'Kairouan' | 'Kasserine' | 'Kebili' | 'Kef' | 'Mahdia' | 'Manouba' | 'Medenine' | 'Monastir' | 'Nabeul' | 'Sfax' | 'Sidi Bouzid' | 'Siliana' | 'Sousse' | 'Tataouine' | 'Tozeur' | 'Tunis' | 'Zaghouan' | 'Other';
  interDescription: string;
  interPost: string;
  interfield: 'Computer Science' | 'Mechanical Engineering' | 'Electromechanical Engineering' | 'Civil Engineering' | 'Business';
  interStartDate?: Date;
  interApplicationDeadline?: Date;
  interRequiredSkills?: string;
  interRequiredEducation: 'Bachelor degree 1st year' | 'Bachelor degree 2nd year' | 'Bachelor degree 3rd year' | 'Engineering degree 1st year' | 'Engineering degree 2nd year' | 'Engineering degree 3rd year' | 'PreEngineering 1st year' | 'PreEngineering 2nd year';
  interType: 'Summer Internship' | 'PFE Internship';
  contactNumber?: number;
  interOtherInformation?: string;
}

const API_BASE_URL = 'http://192.168.33.10:3001';

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
  getJobById: async (jobId: string): Promise<Job> => {
    try {
      const response: AxiosResponse<Job> = await axios.get(`${API_BASE_URL}/job/getJobById/${jobId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching job by ID:', error);
      throw error;
    }
  }
};
const internshipService = {
  getAllInternships: async (type?: string, location?: string, field?: string): Promise<Internship[]> => {
    try {
      const response: AxiosResponse<Internship[]> = await axios.get(`${API_BASE_URL}/intership/getAllInternships`, {
        params: {
          type,
          location,
          field
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching internships:', error);
      throw error;
    }
  },
  searchInternships: async (query: string): Promise<Internship[]> => {
    try {
      const response: AxiosResponse<Internship[]> = await axios.get(`${API_BASE_URL}/intership/searchInternships`, {
        params: {
          query
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching internships:', error);
      throw error;
    }
  },
  getInternshipById: async (internshipId: string): Promise<Internship> => {
    try {
      console.log(internshipId)
      const response: AxiosResponse<Internship> = await axios.get(`${API_BASE_URL}/intership/getInternshipById/${internshipId}`);

      return response.data;
    } catch (error) {
      console.error('Error fetching internship by ID:', error);
      throw error;
    }
  }

}
export { jobService, internshipService };