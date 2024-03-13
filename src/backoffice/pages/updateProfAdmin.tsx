//import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
//import DefaultLayout from '../../layout/DefaultLayout';
import DefaultLayout from '../../layout/DefaultLayout';
import { validateFirstName, validateLastName,validateUserName,validateEmail,validationLocation,validationPhoneNumber} from '../../../src/pages/Profil/validation';
import Sidebarprofil from './SideBarupdateAdmin';
import {useEffect, useState} from 'react';
import DatePickerOne from '../../components/Forms/DatePicker/DatePickerOne';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUsername} from "../../ApiSlices/authSlice";
import {useGetUserInfoQuery} from "../../ApiSlices/userApiSlice";
import {updateUserProfile} from "../../../src/pages/api";
import {Link, useNavigate} from "react-router-dom";

/////////////////////////////////////////parti ili zedtha
import DefaultLayoutAdmin from '../layaout/DefaultLayoutAdmin';
import {updateByUsernameAdmin} from "../api/index";
import { useParams } from 'react-router-dom';
import {fetchAdminByUsername} from '../api/index'


const UpdateProfileAdmin = () => {
  const [activeSection, setActiveSection] = useState('personal');

  const [userProfile, setUserProfile] = useState(null);

  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { username } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    birthDate: '',
    email: '',
    location: '',
    phoneNumber: '',
    accountVisibility: '',
    title:'',
  });

  useEffect(() => {

    const fetchUserProfile = async () => {
      try {
        if (username) {
          const data = await fetchAdminByUsername(username);
          setUserProfile(data);

          setFormData({
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            username: data.username || '',
            birthDate: data.birthDate || '',
            email: data.email || '',
            location: data.location || '',
            phoneNumber: data.phoneNumber || '',
            accountVisibility: data.accountVisibility || '',
            title:data.title ||'',
          });
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);

      }
    };
    fetchUserProfile();
  }, [username]);

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    username: '',
    birthDate: '',
    email: '',
    location: '',
    phoneNumber: '',
  });
  const handleInputChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    let errorMessage = '';
    if (name === 'firstName') {
      errorMessage = validateFirstName(value);
    } else if (name === 'lastName') {
      errorMessage = validateLastName(value);
    } else if (name === "username") {
      errorMessage = validateUserName(value);
    } else if (name === "email") {
      errorMessage = validateEmail(value);
    } else if (name === "location") {
      errorMessage = validationLocation(value)
    } else if (name === "phoneNumber") {
      errorMessage = validationPhoneNumber(value);
    }
    setErrors({
      ...errors,
      [name]: errorMessage,
    });
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (value: string) => {
    handleInputChange({ target: { name: 'birthday', value } });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (username) {
        const result = await updateUserProfile(username, formData);
        console.log('Profile updated successfully:', result);
        setFormData(prevFormData => ({
          ...prevFormData,
          username: formData.username,
          firstName: formData.firstName,
          lastName: formData.lastName,
          location: formData.location,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          accountVisibility: formData.accountVisibility,
          title:formData.title,
        }));

        setSuccessMessage('Profile updated successfully');

        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        const updatedUser = { ...storedUser, ...formData };
        localStorage.setItem('user', JSON.stringify(updatedUser));

        setTimeout(() => {
          navigate(`/Dashboard/ProfileAdmin/${formData.username}`);;
        }, 2000);
      } else {

        console.error('Error updating profile: Username is undefined');
        setErrorMessage('Error updating profile');
      }
    } catch (error) {
      console.error('Error updating profile:');
      setErrorMessage('Error updating profile');
    }
  };
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      accountVisibility: e.target.value,
    }));
  };

    return ( 
        
         
        <>
        <DefaultLayoutAdmin>
  <div className="flex flex-col md:flex-row"> 
    <Sidebarprofil activeSection={activeSection} setActiveSection={setActiveSection} />

    <div className="flex-1 md:ml-64 items-center justify-center "> 
      <div className="gap-9 ">
        <div className={`rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex flex-col items-center `}>
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark w-full text-center ">
            <h3 className="font-medium text-black dark:text-white">
            {activeSection === 'personal' ? 'Personal Information' : 'Other Information'}
            </h3>
          </div>
          <div>
            {successMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mt-4">
                {successMessage}
              </div>
            )}

          {errorMessage && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mt-4">
                {errorMessage}
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5.5 p-6.5 w-full">
          {activeSection === 'personal' && (
            <>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                First Name
              </label>
              <input
                type="text"
                placeholder="FirstName"
                name='firstName'
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-red-500 ${
                  errors.firstName ? 'border-red-500' : '' 
                }`}
              />
               {errors.firstName && (
                            <p className="text-red-500">{errors.firstName}</p>
                          )}
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Last Name
              </label>
              <input
                type="text"
                placeholder="LastName"
                name='lastName'
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-red-500 ${
                  errors.lastName ? 'border-red-500' : '' 
                }`}
              />
               {errors.lastName && (
                            <p className="text-red-500">{errors.lastName}</p>
                          )}
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Birthday
              </label>
              <DatePickerOne
                  value={formData.birthDate}
                  onChange={handleDateChange}/>
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                UserName
              </label>
              <input
                type="text"
                placeholder="UserName"
                name='username'
                value={formData.username}
                onChange={handleInputChange}
                className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-red-500 ${
                  errors.username ? 'border-red-500' : '' 
                }`}
              />
               {errors.username && (
                            <p className="text-red-500">{errors.username}</p>
                          )}
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Email
              </label>
              <input
                type="text"
                placeholder="Email"
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-red-500 ${
                  errors.email ? 'border-red-500' : '' 
                }`}
              />
              {errors.email && (
                            <p className="text-red-500">{errors.email}</p>
                          )}
            </div>
            </>)}
            {activeSection === 'other' && (
                    <>
                      <div>
                        <label className="mb-3 block text-black dark:text-white">
                          Location
                        </label>
                        <input
                          type="text"
                          placeholder="Location"
                          name='location'
                          value={formData.location}
                          onChange={handleInputChange}
                          className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-red-500 ${
                            errors.location ? 'border-red-500' : '' 
                          }`}
                        />
                         {errors.location && (
                            <p className="text-red-500">{errors.location}</p>
                          )}
                      </div>
                      <div>
                        <label className="mb-3 block text-black dark:text-white">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          placeholder="Phone Number"
                          name='phoneNumber'
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-red-500 ${
                            errors.phoneNumber ? 'border-red-500' : '' 
                          }`}
                        />
                         {errors.phoneNumber && (
                            <p className="text-red-500">{errors.phoneNumber}</p>
                          )}
                      </div>
                      
                    </>
                  )}
          </div>

          <div className="flex justify-center gap-4.5 mb-5">
                      <Link to="/Dashboard/ProfileAdmin/account-security">
                        <button className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white">
                          Account Security
                        </button>
                      </Link>
                      <Link to={`/Dashboard/ProfileAdmin/${formData.username}`}>
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"

                    >
                      Cancel
                    </button>
                    </Link> 
                    
                    <button
                      className=" flex  justify-center rounded-md border  py-2 px-6  text-center font-medium  hover:bg-opacity-90 lg:px-8 xl:px-10 focus:outline-none focus:shadow-outline cursor-pointer 
                    border-red-900 bg-red-800 p-4 text-white transition
                     dark:bg-red-500
               dark:hover:bg-red-400 dark:focus:ring-red-300 dark:border-red-900"
                      type="submit"
                    >
                      Save

                    </button>
                    
                  </div>
          </form>




        </div>
      </div>
    </div>
  </div>

</DefaultLayoutAdmin>
        </>
        
     );
}
 
export default UpdateProfileAdmin;