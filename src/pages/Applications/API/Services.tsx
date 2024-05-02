import axios from 'axios';

const API_URL = 'http://192.168.33.10:3001';
export interface Application {
  fullName: string;
  email: string;
  phoneNumber?: string;
  motivationLetter: string;
  resume?: string;
  submitDate?: Date;
  status?: 'Pending' | 'Accepted' | 'Rejected';
  applicantUsername?: string;
  companyName?: string;
  companyLogo?: string;
  jobTitle?: string;
  jobId?: string;
  internshipId?: string;
}
const ApplicationService = {
  saveApplication: async (applicationData) => {
    try {
      const response = await axios.post(`${API_URL}/application/saveApplication`, applicationData);
      return response.data;
    } catch (error) {
      console.log('service',error)
      throw error;
    }
  },
  saveInternshipApplication: async (applicationData) => {
    try {
      const response = await axios.post(`${API_URL}/application/saveInternshipApplication`, applicationData);
      return response.data;
    } catch (error) {
      console.log('service',error)
      throw error;
    }
  },
  updateApplication: async (applicationId, updatedData) => {
    try {
      const response = await axios.put(`${API_URL}/application/updateApplication/${applicationId}`, updatedData);
      return response.data; // Return response data
    } catch (error) {
      console.log('service',error)
      throw error;
    }
  },
  updateInternshipApplication: async (applicationId, updatedData) => {
    try {
      const response = await axios.put(`${API_URL}/application/updateInternshipApplication/${applicationId}`, updatedData);
      return response.data; // Return response data
    } catch (error) {
      console.log('service',error)
      throw error;
    }
  },
  getApplicationsByUsername: async (username: string): Promise<Application[]> => {
  try {
    const response = await axios.get(`${API_URL}/application/getApplicationsByUsername/${username}`);
    return response.data.applications;}
    catch (error) {
    throw error
  }
  },
  deleteApplication: async (applicationId: string) => {
    try {
      const response = await axios.delete(`${API_URL}/application/deleteApplication/${applicationId}`);
      return response.data;
    } catch (error) {
      console.log('service', error);
      throw error;
    }
  },
};

export default ApplicationService;