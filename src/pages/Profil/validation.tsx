export const validateFirstName = (value:string) => {
    if (value.length > 20) {
      return 'The firstname must be 20 characters or less.';
    }
    if (/\d/.test(value)) {
      return 'The firstname cannot contain numbers.';
    }
    return '';
  };

  export const validateLastName = (value:string) => {
    if (value.length > 20) {
      return 'The lastname must be 20 characters or less.';
    }
    if (/\d/.test(value)) {
      return 'The lastname cannot contain numbers.';
    }
    return '';
  };
  export const validateUserName=(value:string)=>{
    if(value.length>10){
        return 'The Username must be 10 characters or less.'
    }
    return'';
  }
  export const validateEmail=(value:string)=>{
    if ( !/\S+@\S+\.\S+/.test(value)) {
        return'The email address must contain the "@" character and a valid domain';
      }
      return '';
  }
  export const validationLocation=(value:string)=>{
    if (value.length > 100) {
        return 'The location must not exceed 100 characters';
      }
      return'';
  }
  export const validationPhoneNumber=(value:string)=>{
    if (!/^\+?[0-9\s\-]+$/.test(value)) {
        return 'The phone number must contain only numbers, spaces and hyphens';
      }
      if (value.length < 7 || value.length > 15) {
        return 'The phone number must be between 7 and 15 digits';
      }
     return '';   
  }


  export const validateFormEducation = (data: any) => {
    const errors: any = {};

   
    if (!data.degree) {
        errors.degree = "The field is required.";
    }
    if (!data.school) {
        errors.school = "The field is required.";
    }
    if (!data.startDate) {
        errors.startDate = "The field is required.";
    }
    if (!data.endDate) {
        errors.endDate = "The field is required.";
    }

    
    if (data.startDate && data.endDate && data.startDate >= data.endDate) {
        errors.endDate = "The end date must be after the start date.";
    }

    return errors;
};
export const validateFormExperience = (data: any) => {
  const errors: any = {};

 
  if (!data.title) {
      errors.title = "The field is required.";
  }
  if (!data.company) {
      errors.company = "The field is required.";
  }
  if (!data.startDate) {
      errors.startDate = "The field is required.";
  }
  if (!data.endDate) {
      errors.endDate = "The field is required.";
  }
  if (!data.description) {
    errors.description = "The field is required.";
}
  
  if (data.startDate && data.endDate && data.startDate >= data.endDate) {
      errors.endDate = "The end date must be after the start date.";
  }

  return errors;
};
export const validateFormproject = (data: any) => {
  const errors: any = {};

 
  if (!data.title) {
      errors.title = "The field is required.";
  }
  if (!data.startDate) {
      errors.startDate = "The field is required.";
  }
  if (!data.endDate) {
      errors.endDate = "The field is required.";
  }
  if (!data.description) {
    errors.description = "The field is required.";
}
  
  if (data.startDate && data.endDate && data.startDate >= data.endDate) {
      errors.endDate = "The end date must be after the start date.";
  }

  return errors;
};
