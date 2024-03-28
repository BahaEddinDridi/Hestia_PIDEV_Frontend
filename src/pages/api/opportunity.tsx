const BASE_URL = 'http://localhost:3001';

/////////////////////////////////////////////////////// JOB ////////////////////////////////////////////////////////////
export const AddJob = async (username: any, jobData: any) => {
    try {
        const response = await fetch(`${BASE_URL}/job/AddJob/${username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jobData),
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('Error adding job:', response.statusText);
            throw new Error('Error adding job');
        }
    } catch (error) {
        console.error('Error adding job:', error);
        throw new Error('Error adding job');
    }
};


export const UpdateJob = async (jobId: string, jobData: any) => {
    try {
      const response = await fetch(`${BASE_URL}/job/UpdateJob/${jobId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error('Error updating job:', response.statusText);
        throw new Error('Error updating job');
      }
    } catch (error) {
      console.error('Error updating job:', error);
      throw new Error('Error updating job');
    }
  };

  export const getJobById =async(jobId:string)=>{
    try{
        const response =await fetch(`${BASE_URL}/job/getJobById/${jobId}`,{
            method:'GET',

        });
        if(!response.ok){
            throw new Error('Failed to fetch job');
        }

        const data =await response.json();
        return data;
    }catch(error){
        throw new Error('Failed to fetch job');
    }
};
/////////////////////////////////////////////////////// END JOB ////////////////////////////////////////////////////////////





/////////////////////////////////////////////////////// INTERSHIP ////////////////////////////////////////////////////////////

export const AddIntership = async (username: any, intershipData: any) => {
    try {
        const response = await fetch(`${BASE_URL}/intership/AddIntership/${username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(intershipData),
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('Error adding internship:', response.statusText);
            throw new Error('Error adding internship');
        }
    } catch (error) {
        console.error('Error adding internship:', error);
        throw new Error('Error adding internship');
    }
};



/////////////////////////////////////////////////////// END INTERSHIP ////////////////////////////////////////////////////////////
