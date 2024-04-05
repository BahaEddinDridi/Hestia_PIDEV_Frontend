//import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
//import DefaultLayout from '../../layout/DefaultLayout';
import DefaultLayout from '../../layout/DefaultLayout';
import { validateFirstName, validateLastName, validateUserName, validateEmail, validationLocation, validationPhoneNumber } from '../Profil/validation';
import Sidebarprofil from './Sidebar';
import { useEffect, useState } from 'react';
import DatePickerOne from '../../components/Forms/DatePicker/DatePickerOne';
import { getUserProfile } from '../../pages/api';
import { updateUserProfile } from "../api";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import {useSelector} from "react-redux";
import {selectCurrentUsername} from "../../ApiSlices/authSlice";
const UpdateProfile = () => {
  const [activeSection, setActiveSection] = useState('personal');
  const currentUsername = useSelector(selectCurrentUsername);
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
        if (currentUsername) {
          const data = await getUserProfile(currentUsername);
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
  }, [currentUsername]);

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    birthDate: '',
    email: '',
    location: '',
    phonenumber: '',
  });
  const handleInputChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    let errorMessage = '';
    if (name === 'firstName') {
      errorMessage = validateFirstName(value);
    } else if (name === 'lastName') {
      errorMessage = validateLastName(value);
    } else if (name === "userName") {
      errorMessage = validateUserName(value);
    } else if (name === "email") {
      errorMessage = validateEmail(value);
    } else if (name === "location") {
      errorMessage = validationLocation(value)
    } else if (name === "phonenumber") {
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
      if (currentUsername) {
        const result = await updateUserProfile(currentUsername, formData);
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
          navigate('/profile');
          window.location.reload()
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
      <DefaultLayout>
        <div className="flex flex-col md:flex-row">
          <Sidebarprofil activeSection={activeSection} setActiveSection={setActiveSection} />

          <div className="flex-1 md:ml-64 items-center justify-center ">
            <div className="gap-9 ">
              <div className={`rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex flex-col items-center `}>
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark w-full text-center ">
                  <h3 className="font-medium text-black dark:text-white">
                    {activeSection === 'personal' ? 'Personal Information' : activeSection === 'other' ? 'Other Information' : activeSection === 'account' ? 'Account  Visibility' : ''}
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
                    {/* *************************** Personal information   */}
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
                            className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-red-500 ${errors.firstName ? 'border-red-500' : ''
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
                            className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-red-500 ${errors.lastName ? 'border-red-500' : ''
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
                            onChange={handleDateChange} />
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
                            className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-red-500 ${errors.userName ? 'border-red-500' : ''
                              }`}
                          />
                          {errors.userName && (
                            <p className="text-red-500">{errors.userName}</p>
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
                            className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-red-500 ${errors.email ? 'border-red-500' : ''
                              }`}
                          />
                          {errors.email && (
                            <p className="text-red-500">{errors.email}</p>
                          )}
                        </div>
                      </>)}
                    {/* *************************** other information   */}
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
                            className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-red-500 ${errors.location ? 'border-red-500' : ''
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
                            name='phoneumber'
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-red-500 ${errors.phonenumber ? 'border-red-500' : ''
                              }`}
                          />
                          {errors.phonenumber && (
                            <p className="text-red-500">{errors.phonenumber}</p>
                          )}
                        </div>
                        <div>
                          <label className="mb-3 block text-black dark:text-white">
                            Title
                          </label>
                          <input
                            type="text"
                            placeholder="title"
                            name='title'
                            value={formData.title}
                            onChange={handleInputChange}
                            className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-red-500 `}
                          />
                         
                        </div>

                      </>
                    )}
                    {/* *************************** Acount  */}
                    {activeSection === 'account' && (
                      <><div>
                        <h1 className="text-2xl text-red-800  font-bold mb-2">Choose your default audiences</h1>
                        <p className="text-black mb-4 dark:text-white">
                          Choosing a default audience automatically sets the audience for the content you share, but you can change it at any time. You can change your settings at any time.
                        </p>

                        <div className=" flex-col items-start space-y-4 mt-4">
                          <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                            <input
                              checked={formData.accountVisibility === 'private'}
                              onChange={(e) => handleRadioChange(e)}
                              id="bordered-radio-2"
                              type="radio"
                              value="private"
                              name="bordered-radio"
                              className="w-4 h-4 text-red-800 bg-gray-100 border-gray-300  dark:focus:ring-blue-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                              htmlFor="bordered-radio-2"
                              className="w-full ml-2  py-4 ms-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              <b className='text-black dark:text-white'> Private</b> no one can see personal information.
                            </label>

                          </div>
                          <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                            <input
                              id="red-radio"
                              type="radio"
                              value="public"
                              name="bordered-radio"
                              checked={formData.accountVisibility === 'public'}
                              onChange={(e) => handleRadioChange(e)}
                              className="w-4 h-4  text-red-600 bg-gray-100 border-gray-300   dark:focus:ring-red-600 dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                              htmlFor="bordered-radio-2"
                              className="w-full ml-2  py-4 ms-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              <b className='text-black dark:text-white'>Public</b> everyone can see the information
                            </label>
                          </div>
                        </div>
                      </div>

                      </>
                    )}
                  </div>

                  <div className="flex justify-center gap-4.5 mb-5">
                    <Link to="/auth/account-security">
                      <button className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white">
                        Account Security
                      </button>
                    </Link>
                    <Link to="/profile">
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

      </DefaultLayout>
    </>

  );
}

export default UpdateProfile;