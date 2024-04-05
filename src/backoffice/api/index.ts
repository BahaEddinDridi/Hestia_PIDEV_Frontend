import axios from 'axios';


// affichage users
export const getUsers =async()=>{
    try{
      const response =await fetch('http://localhost:3001/dashboard/users',{
        method:'GET',
       
      });
      if(!response.ok){
        throw new Error('Failed to fetch users');
      }

      const data =await response.json();
      return data;
    }catch(error){
      throw new Error('Failed to fetch users');
    }
};

//affichage user details par rapport son id 
export const getUserById=async(userId:string)=>{
  try {
    const response=await fetch(`http://localhost:3001/dashboard/user/${userId}`,{
      method:'GET',
    });
    if (!response.ok){
      throw new Error('Failed to fetch user');
    }
    const data =await response.json();
    return data;
  }catch(error){
    throw new Error('Failed to fetch user');
  }
};

//supprimer user
export const deleteUsersById= async(userId:string)=>{
  try{
    const confirmed=window.confirm("Etes-vous sur de vouloir supprimer cet utilisateur?");
    if(!confirmed){
      return;
    }
    const response =await fetch(`http://localhost:3001/dashboard/users/${userId}`,{
      method:'DELETE',
    });
    if(!response.ok){
      throw new Error('Failed to delete user');
    }
    const data =await response.json();
    return data;
  }catch(error){
    throw new Error('Failed to delete user');
  }
};

// update user role 
export const updateUsersRoleById = async (userId: string, role: string) => {
  try {
    const response = await fetch(`http://localhost:3001/dashboard/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role }),
    });
    if (!response.ok) {
      throw new Error('Failed to update user role');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to update user role');
  }
};

//add user 
export const ajoutUser =async(userData:any)=>{
    try{
      const response = await fetch(`http://localhost:3001/dashboard/adduser`,{
        method:'POST',
        headers:{
          'content-Type':'application/json',
        },
        body:JSON.stringify(userData),
      });
      if(!response.ok){
        throw new Error ('Failed to add user');
      }
      const data =await response.json();
      return data;
    }catch(error){
      throw new Error('Failed to add user');
    }
};

//exportation data 
//excel
export const exportExcel = () => {
  axios.get('http://localhost:3001/dashboard/export-excel', { responseType: 'blob' })
      .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'users.xlsx');
          document.body.appendChild(link);
          link.click();
      })
      .catch(error => {
          console.error(error);
      });
};
//pdf
export const exportPDF = () => {
  axios.get('http://localhost:3001/dashboard/export-pdf', { responseType: 'blob' })
      .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'users.pdf');
          document.body.appendChild(link);
          link.click();
      })
      .catch(error => {
          console.error(error);
      });
};

//desactiver le compte 
export const deactivateAccount = async (userId: string, newStatus: string) => {
  try {
    const response = await axios.put(`http://localhost:3001/dashboard/users/${userId}/change-status`, { newStatus });
    console.log(response.data); // Afficher la réponse de l'API backend
  } catch (error) {
    console.error('Erreur lors de la désactivation du compte :', error);
    throw error; // Re-lancer l'erreur pour que la fonction appelante puisse la gérer
  }
};
//desactivation le compte automatiquement
// export const desactiveProfilByIdAuto = async (userId: string, newStatus: string, customDeactivation: any) => {
//   try {
//     const response = await axios.put(`http://localhost:3001/dashboard/${userId}/deactivate`, { newStatus, customDeactivation });
//     console.log(response.data); // Afficher la réponse de l'API backend
//   } catch (error) {
//     console.error('Erreur lors de la désactivation du profil :', error);
//     throw error; // Re-lancer l'erreur pour que la fonction appelante puisse la gérer
//   }
// };

export const desactiveProfilByIdAuto = async (userId:string, newStatus:string, customDeactivation:any) => {
  try {
      const response = await fetch(`http://localhost:3001/dashboard/${userId}/deactivate`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ newStatus, customDeactivation }),
      });
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Erreur lors de la désactivation du profil :', error);
      throw error;
  }
};



//get profilAdmin 
export const fetchAdminByUsername = async (username: string) => {
  try {
    const response = await fetch(`http://localhost:3001/dashboard/ProfilAdmin/${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Admin not found');
    }
    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error('Error fetching admin:', error);
    throw error;
  }
};


//update profil Admin 
export const updateByUsernameAdmin = async (username, updatedAdminData) => {
  try {
    const response = await fetch(`http://localhost:3001/dashboard/ProfilAdmin/${username}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedAdminData)
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    return { error: 'Internal server error' };
  }
};

//get all opportunities Job Disponible
export const fetchJobsByRoleAndFutureDeadline = async () => {
  try {
    const response = await fetch(`http://localhost:3001/job/getAllJobsOpportFutureDeadline`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Jobs not found');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};
//get all opportunities Job Not Disponible
export const fetchJobsByRoleAndDeadline = async () => {
  try {
    const response = await fetch(`http://localhost:3001/job/getAllJobsOpportDeadlinefinalized`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Jobs not found');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};
//delete Job opportunities 
export const deleteJobByIdAndUsername = async (id:string, username:string) => {
  try {
      const response = await axios.delete(`http://localhost:3001/job/deleteJob/${username}/${id}`);

      return response.data;
  } catch (error) {
      console.error(error);
      throw new Error('Failed to delete job');
  }
};

//get all opportunities Interships Disponible
export const fetchIntershipsByRoleAndFutureDeadline = async () => {
  try {
    const response = await fetch(`http://localhost:3001/intership/getAllFuturIntershipsOpport`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Jobs not found');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

//get all opportunities Interships Not Disponible
export const fetchIntershipsByRoleAndDeadline = async () => {
  try {
    const response = await fetch(`http://localhost:3001/intership/getAllIntershipsOpportDeadlinefinalized`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Jobs not found');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};
//delete interships opportunities 
export const deleteIntershipByIdAndUsername = async (id:string, username:string) => {
  try {
      const response = await axios.delete(`http://localhost:3001/intership/deleteIntership/${username}/${id}`);

      return response.data;
  } catch (error) {
      console.error(error);
      throw new Error('Failed to delete job');
  }
};
//get all Applications Jobs Disponible
export const fetchApplicationsJobAvailable = async () => {
  try {
    const response = await fetch(`http://localhost:3001/application/getJobApplicationAvailable`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Jobs not found');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};
//get all Applications Jobs Disponible
export const fetchApplicationsJobNotAvailable = async () => {
  try {
    const response = await fetch(`http://localhost:3001/application/getJobApplicationNotAvailable`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Jobs not found');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

// get all Applications Interships Disponible 
export const fetchApplicationsIntershipAvailable = async () => {
  try {
    const response = await fetch(`http://localhost:3001/application/getIntershipsApplicationAvailable`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Jobs not found');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

//get all Applications Interships Not Disponible
export const fetchApplicationsIntershipNotAvailable = async () => {
  try {
    const response = await fetch(`http://localhost:3001/application/getIntershipsApplicationNotAvailable`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Jobs not found');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};




//ajout experience 
export const addUserExperienceAdmin = async (username:String, experienceData:any) => {
  try {
    const response = await fetch(`http://localhost:3001/user/newexperience/${username}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(experienceData),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Error adding user experience:', response.statusText);
      throw new Error('Error adding user experience');
    }
  } catch (error) {
    console.error('Error adding user experience:', error);
    throw new Error('Error adding userexperience');
  }
};

//delete education
export const deleteEducation = async (username, educationId) => {
  try {
      const response = await axios.delete(`http://localhost:3001/user/deleteEducation/${username}/${educationId}`);
      return response.data;
  } catch (error) {
      console.error('Error:', error.message);
      throw error;
  }
};

//update education 
export const updateEducation = async (username: string, educationId: string, newData: any) => {
  try {
    const response = await axios.put(`http://localhost:3001/user/updateEducation/${username}/${educationId}`, newData);
    return response.data;
  } catch (error) {
    console.error('Failed to update education. Server responded with:', error.response.data);
    throw new Error('Failed to update education');
  }
};
//delete Experience 
export const deleteExperience = async (username, experienceId) => {
  try {
    const response = await axios.delete(`http://localhost:3001/user/deleteExperiences/${username}/${experienceId}`);
    console.log('Experience deleted successfully:', response.data);
  } catch (error) {
    console.error('Error deleting experience:', error.message);
    throw new Error('Failed to delete experience');
  }
};
//update Experience 
export const updateExperience = async (username:string , experienceId:string, updatedExperience:any) => {
  try {
    const response = await axios.put(
      `http://localhost:3001/user/updateExperiences/${username}/${experienceId}`,
      updatedExperience
    );
    return response.data;
  } catch (error) {
    console.error('Error updating experience:', error.response.data.error);
    throw error;
  }
};




///////////////////////////////////////////////////////////////////////////////
//statistiques
//total_users
export const fetchUserData = async () => {
  try {
    const response = await fetch('http://localhost:3001/stats/count', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.count;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};
//total_users by role
export const fetchUserRoleStats = async () => {
  try {
    const response = await fetch('http://localhost:3001/stats/user-role', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};
//total uers par ages 
export const fetchUserAgeGroupStats = async () => {
  try {
    const response = await axios.get('http://localhost:3001/stats/user-age-group');
    const stats = response.data;
    console.log('User age group statistics:', stats);
    return stats;
  } catch (error) {
    console.error('Error fetching user age group statistics:', error.message);
    return null;
  }
};
//total users par gender 
export const fetchUserGenderStats = async () => {
  try {
    const response = await fetch('http://localhost:3001/stats/user-gender', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const stats = await response.json();
      console.log('User gender statistics:', stats);
      return stats;
    } else {
      console.error('Failed to fetch user gender statistics');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user gender statistics:', error.message);
    return null;
  }
};

//get all uers by status
export const getUserStatusStats = async () => {
  try {
    const response = await fetch('http://localhost:3001/stats/user-status', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const stats = await response.json();
      console.log('User status statistics:', stats);
      return stats;
    } else {
      console.error('Failed to fetch user status statistics');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user status statistics:', error.message);
    return null;
  }
};



export const LinkeDinScraper = async (job:string,location:string) => {
  try {
    const response = await fetch(`http://localhost:3001/Scraping/scraper/${location}/${job}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 120000 // 2 minutes
    });
    await delay(5000);
    const response1=await fetch(`http://localhost:3001/Scraping/scraper/skills`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 240000 // 4 minutes
    });
    await delay(5000);
    const response2 = await fetch(`http://localhost:3001/Scraping/scraper/topSkills`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response2.ok) {
      const data = await response2.json();
      console.log('Top skills', data);
      return data;
    } else {
      console.error('Failed to scrape LinkedIn profile');
      return null;
    }
  } catch (error) {
    console.error('Error scraping LinkedIn profile:', error);
    return null;
  }
}
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export const TopCompanies = async () => {
  try {
    const response = await fetch('http://localhost:3001/Scraping/scraper/topCompanies', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const data = await response.json();
      console.log('Top companies:', data);
      return data;
    } else {
      console.error('Failed to scrape top companies');
      return null;
    }
  } catch (error) {
    console.error('Error scraping top companies:', error);
    return null;
  }
}
export const topLocations = async () => {
  try {
    const response = await fetch('http://localhost:3001/Scraping/scraper/topLocations', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const data = await response.json();
      console.log('Top locations:', data);
      return data;
    } else {
      console.error('Failed to scrape top locations');
      return null;
    }
  } catch (error) {
    console.error('Error scraping top locations:', error);
    return null;
  }
}
export const TopSeniorityLevel = async () => {
  try {
    const response = await fetch('http://localhost:3001/Scraping/scraper/topSeniorityLevel', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const data = await response.json();
      console.log('Top seniority levels:', data);
      return data;
    } else {
      console.error('Failed to scrape top seniority levels');
      return null;
    }
  } catch (error) {
    console.error('Error scraping top seniority levels:', error);
    return null;
  }
}
export const exportPDFJob=()=>{
  axios.get('http://localhost:3001/Scraping/scraper/exportPDF',{responseType:'blob'})
  .then(response=>{
    const url=window.URL.createObjectURL(new Blob([response.data]));
    const link=document.createElement('a');
    link.href=url;
    link.setAttribute('download','Jobs.pdf');
    document.body.appendChild(link);
    link.click();
  })
  .catch(error=>{
    console.error(error);
  });
}
export const exportExcelJob=()=>{
  axios.get('http://localhost:3001/Scraping/scraper/exportExcel',{responseType:'blob'})
  .then(response=>{
    const url=window.URL.createObjectURL(new Blob([response.data]));
    const link=document.createElement('a');
    link.href=url;
    link.setAttribute('download','Jobs.xlsx');
    document.body.appendChild(link);
    link.click();
  })
  .catch(error=>{
    console.error(error);
  });
}