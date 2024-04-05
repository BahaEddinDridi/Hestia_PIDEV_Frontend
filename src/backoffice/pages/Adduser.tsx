import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayoutAdmin from '../layaout/DefaultLayoutAdmin';
import React, { useState,useEffect } from 'react';
import { ajoutUser } from '../api';
import { Link } from 'react-router-dom';

import PhoneNumberValidation from '../../pages/Authentication/SignUpFiles/PhoneNumber';




const FormLayout = () => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  
  useEffect(()=>{
    if (showSuccessAlert){
      setTimeout(()=>{
        window.location.href='/Dashboard/tables-Of-Users';
      },2000);
    }
  },[showSuccessAlert]);

  const [userData,setUserData]=useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    username: '',
    email: '',
    password: '',
    retypePassword: '',
    role: '', 
    image: '', 
    gender: '',
    location: '',
    phoneNumber: '',
    title: '',
    experience: [],
    education: [],
    project: [],
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    role: '',
    birthDate: '',
    gender: '',
    location: '',
    phoneNumber: '',
    password: '',
    retypePassword: '',
   
  });
  const handlePhoneNumberChange = (value: string, isValid: boolean) => {
    setUserData({...userData, phoneNumber: value});
    setErrors({ ...errors, phoneNumber: isValid ? '' : 'Phone number is not valid' });
  };

  const handleChange=(e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
    const{name,value}=e.target;
   
      setUserData({...userData,[name]:value});
      setErrors({ ...errors, [name]: '' });
  
      // Vérification pour le numéro de téléphone
    if (name === 'phoneNumber' && !/^\d{10}$/.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: 'Phone number must be 10 digits',
      }));
      
    }
    // Vérification pour l'email
    if (name === 'email' && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Email is not valid',
      }));
      
    }
  
    // Validation pour le mot de passe
  if (
    name === 'password' &&
    !/(?=.*[a-z])(?=.*[A-Z])(?=.*[.\/:*]).{8,}/.test(value)
  ) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      password:
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one of the following characters: . / : *',
    }));
   
  }
  
    // Vérification pour l'âge
  const today = new Date();
  const birthDate = new Date(userData.birthDate);
  const age = today.getFullYear() - birthDate.getFullYear();
  
  if (age < 18) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      birthDate: 'You must be at least 18 years old',
    }));
   
    
  }
    
    


     
  };

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
   
    e.preventDefault();

  // Vérification s'il y a des erreurs
  const hasErrors = Object.values(errors).some((error) => error !== '');

  // Si des erreurs existent, ne pas ajouter l'utilisateur
  if (hasErrors) {
    console.log('Validation errors. User not added.');
    return;
  }

  if (userData.password !== userData.retypePassword) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: 'Passwords do not match',
      retypePassword: 'Passwords do not match',
    }));
    return;
  }
  

    // Vérification pour le prénom
    if (!userData.firstName.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstName: 'First name is required',
      }));
      return;
    }

  // Vérification pour le nom
  if (!userData.lastName.trim()) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      lastName: 'Last name is required',
    }));
    return;
  }

  // Vérification pour le nom d'utilisateur
  if (!userData.username.trim()) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      username: 'User name is required',
    }));
    return;
  }

  // Vérification pour l'email
  if (!userData.email.trim()) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: 'Email is required',
    }));
    return;
  }

  // Vérification pour le rôle
  if (!userData.role.trim()) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      role: 'role is required',
    }));
    return;
  }

  // Vérification pour la date de naissance
  if (!userData.birthDate.trim()) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      birthDate: 'Birthdate is required',
    }));
    return;
  }

  // Vérification pour le genre
  if (!userData.gender.trim()) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      gender: 'gender is required',
    }));
    return;
  }

  // Vérification pour l'emplacement
  if (!userData.location.trim()) {
    setErrors((prevErrors) => ({
      ...prevErrors,
     location: 'Location is required',
    }));
    return;
  }

  // Vérification pour le numéro de téléphone
  if (!userData.phoneNumber.trim()) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      phoneNumber: 'PhoneNumber is required',
    }));
    return;
  }

  // Vérification pour le mot de passe
  if (!userData.password.trim()) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: 'Passworld is required',
    }));
    return;
  }

  setErrors({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    role: '',
    birthDate: '',
    gender: '',
    location: '',
    phoneNumber: '',
    password: '',
    retypePassword: '',
  
});
  
    try {
      const response = await ajoutUser(userData); 
      console.log(response);
      setShowSuccessAlert(true);
      setUserData({
        firstName: '',
        lastName: '',
        birthDate: '',
        username: '',
        email: '',
        password: '',
        retypePassword: '',
        role: 'professional',
        image: '',
        gender: '',
        location: '',
        phoneNumber: '',
        title: '',
        experience: [],
        education: [],
        project: [],
      });
   
    } catch (error) {
      console.error('Failed to add user:', error);
    }
  };

  


  
  return (
    <DefaultLayoutAdmin>
      <Breadcrumb pageName="Add User" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* forms Add user */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            {/* <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Add User
              </h3>
            </div> */}
            <form action="#" onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      First name<span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your first name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={userData.firstName}
                      onChange={handleChange}
                      name="firstName"
                    />
                    {errors.firstName && (
                    <p className="text-danger">{errors.firstName}</p>
                  )}
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Last name<span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your last name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={userData.lastName}
                      onChange={handleChange}
                      name="lastName"
                    />
                    {errors.lastName && (
                      <p className="text-danger">{errors.lastName}</p>
                    )}
                  </div>
                </div>
                <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      User Name<span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your user name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={userData.username}
                      onChange={handleChange}
                      name="username"
                    />
                    {errors.username && (
                      <p className="text-danger">{errors.username}</p>
                    )}
                  </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Email <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={userData.email}
                    onChange={handleChange}
                    name="email"
                  />
                  {errors.email && (
                      <p className="text-danger">{errors.email}</p>
                    )}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Role <span className="text-meta-1">*</span>
                  </label>
                  <select
                    name="role"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={userData.role}
                    onChange={handleChange}
                  >
                    <option value="">Select role</option>
                    <option value="jobSeeker">Job Seeker</option>
                    <option value="professional">Professional</option>
                    <option value="teacher">Teacher</option>
                  </select>
                  {errors.role && (
                      <p className="text-danger">{errors.role}</p>
                    )}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Date of Birth <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="date"
                    placeholder="Enter your date of birth"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={userData.birthDate}
                    onChange={handleChange}
                    name="birthDate" 
                  />
                  {errors.birthDate && (
                      <p className="text-danger">{errors.birthDate}</p>
                    )}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Gender <span className="text-meta-1">*</span>
                  </label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        className="mr-2"
                        checked={userData.gender=='female'}
                        onChange={handleChange}
                      />
                      Female
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        className="mr-2"
                        checked={userData.gender=='male'}
                        onChange={handleChange}
                      />
                      Male
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="other"
                        className="mr-2"
                        checked={userData.gender=='other'}
                        onChange={handleChange}
                      />
                      Other
                    </label>
                  </div>
                  {errors.gender && (
                      <p className="text-danger">{errors.gender}</p>
                    )}
                </div>

               

               
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            
            <form action="#"  onSubmit={handleSubmit}>
              <div className="p-6.5">
              <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Location <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your location"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={userData.location}
                    onChange={handleChange}
                    name="location" 
                  />
                  {errors.location && (
                      <p className="text-danger">{errors.location}</p>
                    )}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Phone Number <span className="text-meta-1">*</span>
                  </label>
                  <PhoneNumberValidation
            
            onChange={handlePhoneNumberChange} />

                  {/* <input
                    type="text"
                    placeholder="Enter your phone number"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={userData.phoneNumber}
                    onChange={handleChange} 
                    name="phoneNumber"                
                 /> */}
                 {errors.phoneNumber && (
                      <p className="text-danger">{errors.phoneNumber}</p>
                    )}
                </div>
              {/* <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Experience
                </label>
                <textarea
                  rows={6}
                  placeholder="Enter your experience"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>
              </div> */}

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Password <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={userData.password}
                    onChange={handleChange}
                    name="password"
                 />
                 {errors.password && (
                      <p className="text-danger">{errors.password}</p>
                    )}
                </div>

                <div className="mb-5.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Re-type Password <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Re-enter password"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={userData.retypePassword}
                    onChange={handleChange}
                    name="retypePassword"
                  />
                  {errors.retypePassword && (
                    <p className="text-danger">{errors.retypePassword}</p>
                  )}
                </div>

                <button className="flex w-full justify-center rounded bg-esprit p-3 font-medium text-gray hover:bg-opacity-90" type='submit'>
                  Add User  
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
     {/* alert */}
     {showSuccessAlert && (

            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                <span className="font-medium">User added successfully.</span> 
              </div>
          )}




    </DefaultLayoutAdmin>
  );
};

export default FormLayout;
