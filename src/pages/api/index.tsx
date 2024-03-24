const BASE_URL = 'http://localhost:3001'; 


export const getUserProfile = async (username: string) => {
    try {
      const response = await fetch(`${BASE_URL}/user/Otherprofiles/${username}`);
      
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error('Error fetching user profile:', response.statusText);
        throw new Error('Error fetching user profile');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw new Error('Error fetching user profile');
    }
  };
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
  export const updateUserProfile = async (username: string, updatedData: any) => {
    try {
      const response = await fetch(`${BASE_URL}/user/profile/update/${username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error('Error updating user profile:', response.statusText);
        throw new Error('Error updating user profile');
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw new Error('Error updating user profile');
    }
  };
export const UpdatePassword = async (userId: string, oldPassword: string, newPassword: string) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/updatePassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, oldPassword, newPassword }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Error updating password: 1', response.statusText);
      throw new Error('Error updating password');
    }
  } catch (error) {
    console.error('Error updating password: 2', error);
    throw new Error('Error updating password');
  }
};
/////////////////////////////
export const recoverymail = async (_id: string,recoveryEmail: string) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/addRecoveryMail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({_id,recoveryEmail }),
    });
     if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Error updating RecoveryEmail: 1', response.statusText);
      throw new Error('Error updating RecoveryEmail');
    }
  } catch (error) {
    console.error('Error updating RecoveryEmail: 2', error);
    throw new Error('Error updating RecoveryEmail');
  }
}
///////////////////////////////////
export const updateSecurityQuestions = async (userId: string, securityAnswers: { answer: string }[]) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/SecurityQuestion`, {
           method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id: userId, // Update to _id to match your backend
                securityAnswers, // Update to securityAnswers to match your backend
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to update security answers');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};
////////////////////////////////
export const sendEmail = async (email: string): Promise<any> => {
    try {
        const response = await fetch(`${BASE_URL}/auth/send-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errorMessage = await response.text(); // Get error message from response body
            console.error('Error sending email:', errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Error sending email');
    }
};
export const resetPassword = async (_id: string, token: string, password: string) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/Reset_Passwords_Mail/${_id}/${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        return data;
      } else {
        return { Status: 'Success' };
      }
    } else {
      const errorMessage = await response.text();
      console.error('Error resetting password:', errorMessage);
      throw new Error(`Error resetting password: ${errorMessage}`);
    }
  } catch (error) {
    console.error('Error resetting password:', error);
    if (error instanceof Error) {
        if (error.message === 'Passwords do not match') {
            throw new Error('Passwords do not match');
        } else if (error.message === 'New password must be different from the old password') {
            throw new Error('New password must be different from the old password');
        } else {
            throw new Error(`Error resetting password: ${error.message}`);
        }
    } else {
        throw new Error('Unknown error occurred while resetting password');
    }
}


  
};
  


  /////////////////////////////////////////////////////////        registerUser          ////////////////////////////////////////////////////////////////////////////



  export const registerUser = async (userData: any) => {
  try {
    const response = await fetch('http://localhost:3001/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Registration failed');
  }
};
///////////////////
export const verifySecurityAnswers = async  (email: string, securityAnswers: { answer: string }[]) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/verifySecurityQuestion`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, securityAnswers }),
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        const errorMessage = await response.text(); // Get error message from response body
        console.error('Error verifying security answers:', errorMessage);
        throw new Error(errorMessage);
    }
} catch (error) {
    console.error('Error verifying security answers:', error);
    throw new Error('Error verifying security answers');
}
}
/////////////////////////////////////////Education///////////////////////////////
export const addUserEducation = async (username:any, educationData:any) => {
  try {
    const response = await fetch(`${BASE_URL}/user/neweducation/${username}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(educationData),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Error adding user education:', response.statusText);
      throw new Error('Error adding user education');
    }
  } catch (error) {
    console.error('Error adding user education:', error);
    throw new Error('Error adding user education');
  }
};
export const deleteEducation = async (username:any, educationId:any) => {
  try {
      const response = await fetch(`${BASE_URL}/user/deleteeducation/${username}/${educationId}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
      });
      if (response.ok) {
          console.log('Education successfully removed');
          // Mettre à jour votre interface utilisateur ou votre état local après la suppression
      } else {
          console.error('Error deleting education');
      }
  } catch (error) {
      console.error('Erreur  :', error);
  }
};
//////////////////////////////////////experience
export const addUserExperience = async (username:any, experienceData:any) => {
  try {
    const response = await fetch(`${BASE_URL}/user/newexperience/${username}`, {
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
////////////////////////////////project 
export const addUserproject = async (username:any, projectData:any) => {
  try {
    const response = await fetch(`${BASE_URL}/user/newproject/${username}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Error adding user project:', response.statusText);
      throw new Error('Error adding user project');
    }
  } catch (error) {
    console.error('Error adding user project:', error);
    throw new Error('Error adding user project');
  }
};
/////////////desactive account 
export const deactivateAccount = async (username:any, duration:any,password:string) => {
  try {
    const response = await fetch(`${BASE_URL}/user/deactivateAccoun`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, duration,password})
    });
    const data = await response.json();
    if (response.ok) {
      return { success: true, message: data.message };
    
    } else {
      return { success: false, error: data.error };
     
    }
  } catch (error) {
    console.error('Error:', error);
   
  }
};