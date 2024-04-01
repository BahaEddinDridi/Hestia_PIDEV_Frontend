
export const validatejobTitle = (value:string) => {
    if (value.length > 2) {
        return 'The Title must have more than 2 caracters.';
      }
      return '';
};

export const validatejobAdress = (value:string) => {
    if (value.length > 20) {
        return 'The Address must be 20 characters .';
      }
      return '';
};

export const validatejobLocation = (value:string) => {
    if (value.length > 10) {
        return 'The Location must be 10 characters .';
      }
      return '';
};

export const validationjobDescription = (value:string) => {
    if (!value) {
        return 'The description is required.';
    }
      return '';
};

export const validationsalary = (value:string) => {
    if (!/^\d+$/.test(value)) {
        return 'The salary must contain only numbers.';
    }
      return '';
};

export const validatejobPost = (value:string) => {
    if (value.length > 10) {
        return 'The post must be 10 characters .';
      }
      return '';
};

export const validationjobApplicationDeadline = (value:string) => {
    // Convertir la date entrée en objet Date
    const deadlineDate = new Date(value);
    // Obtenir la date actuelle
    const currentDate = new Date();

    // Vérifier si la date de candidature est postérieure à la date actuelle
    if (deadlineDate <= currentDate) {
        return 'The deadline date must be superior at te current date.';
    }
};

export const validationjobRequiredSkills = (value:string) => {
    if (!value) {
        return 'The Skills are required.';
    }
      return '';
};

export const validationcontactNumber = (value:string) => {
    if (!/^\d+$/.test(value)) {
        return 'The Contact Number must contain only numbers.';
    }
      return '';
};

export const validationjobfield = (value:string) => {
    if (!value) {
        return 'The field is required.';
    }
      return '';
};
export const validationjobLocation = (value:string) => {
    if (!value) {
        return 'The location is required.';
    }
      return '';
};