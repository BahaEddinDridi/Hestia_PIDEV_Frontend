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
            console.error('Error adding user experience:', response.statusText);
            throw new Error('Error adding user experience');
        }
    } catch (error) {
        console.error('Error adding user experience:', error);
        throw new Error('Error adding userexperience');
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
            console.error('Error adding user experience:', response.statusText);
            throw new Error('Error adding user experience');
        }
    } catch (error) {
        console.error('Error adding user experience:', error);
        throw new Error('Error adding userexperience');
    }
};



/////////////////////////////////////////////////////// END INTERSHIP ////////////////////////////////////////////////////////////
