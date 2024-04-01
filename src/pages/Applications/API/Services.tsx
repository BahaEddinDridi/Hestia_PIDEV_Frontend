import axios from 'axios';

const API_URL = 'http://localhost:3001';

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
      console.log(applicationData)
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
  }
};

export default ApplicationService;
