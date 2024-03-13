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




