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




