import axios from 'axios';

const API_URL = 'http://localhost:3001'; // Update with your server URL

const ApplicationService = {
  saveApplication: async (applicationData) => {
    try {
      const response = await axios.post(`${API_URL}/application/saveApplication`, applicationData);
      return response.data; // Return response data
    } catch (error) {
      console.log('service',error)
      throw error;
    }
  }
};

export default ApplicationService;
