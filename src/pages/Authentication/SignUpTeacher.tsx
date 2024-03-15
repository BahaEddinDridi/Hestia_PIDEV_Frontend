import React, { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EspritCareer from '../../images/logo/siteLogo.png'
import DefaultLayoutLogin from '../../layout/DefaultLayoutLogin';
import { registerUser } from '../api';
import ReCAPTCHA from "react-google-recaptcha";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { setCredentials } from '../../ApiSlices/authSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import PhoneNumberValidation from './SignUpFiles/PhoneNumber';
import { useGoogleCallbackTeacherMutation } from '../../ApiSlices/authApiSlice';



const SignUpTeacher: React.FC = () => {

    const [googleCallback, { isLoading }] = useGoogleCallbackTeacherMutation();

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        try {
            const cred = jwtDecode(credentialResponse.credential);

            const { data } = await googleCallback({
                email: cred.email,
                firstName: cred.given_name,
                lastName: cred.family_name,
                role: 'teacher'
            });

            const { accessToken, currentUser } = data;
            dispatch(setCredentials({ accessToken: accessToken, currentUser: currentUser }));
            navigate('/Profile');
        } catch (error) {
            console.log('Error occurred during Google login callback:', error);
        }
    };



    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setgender] = useState('');
    const [password, setPassword] = useState('');
    const [RetypePass, setRetypePass] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showRetypePass, setShowRetypePass] = useState(false);
    const [error, setError] = useState(false)
    const [phoneNumber, setphoneNumber] = useState('')
    const [phoneNumberValid, setPhoneNumberValid] = useState(true);


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const BASE_URL = 'http://localhost:3001';


    ///////////////////////////////////// phonenumber ////////////////////////////////////////////////////////////

    const handlePhoneNumberChange = (value: string, isValid: boolean) => {
        setphoneNumber(value);
        setPhoneNumberValid(isValid);
    };
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    const toggleRetypePassVisibility = () => {
        setShowRetypePass(!showRetypePass);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (firstName.length === 0 || lastName.length === 0 || userName.length === 0 || email.length === 0 || password.length === 0 || RetypePass.length === 0 ||
            birthDate.length === 0 || gender.length === 0 || phoneNumber.length === 0 || !phoneNumberValid) {
            setError(true);
            return;
        }


        // Vérification de l'âge avant de soumettre le formulaire
        const today = new Date();
        const birthDateObj = new Date(birthDate);
        const age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = today.getMonth() - birthDateObj.getMonth();
        const dayDiff = today.getDate() - birthDateObj.getDate();
        if (age < 18 || (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
            setError(true);
            return;
        }

        //Terms & Conditions
        if (!isChecked) { // Vérifier si ReCAPTCHA n'est pas cochée
            setTermError(true); // Définir l'état de l'erreur de ReCAPTCHA
            return;
        }


        //Recaptcha
        if (!recaptchaChecked) { // Vérifier si ReCAPTCHA n'est pas cochée
            setRecaptchaError(true); // Définir l'état de l'erreur de ReCAPTCHA
            return;
        }

        // Création de l'objet userData avec les données du formulaire
        const userData = {
            firstName: firstName,
            lastName: lastName,
            birthDate: birthDate,
            username: userName,
            email: email,
            password: password,
            gender: gender,
            role: "teacher",
            phoneNumber: phoneNumber,
        };

        try {
            // Appel de la fonction registerUser avec les données utilisateur
            const response = await registerUser(userData);
            console.log(response); // Afficher la réponse du backend
            alert('Account created successfully');
            window.location.href = '/auth/signin';

        } catch (error: any) {
            if (error instanceof Error) {
                console.error('Registration failed:', error.message);
                alert('Registration failed');
            } else {
                console.error('An unknown error occurred:', error);
                alert('An unknown error occurred');
            }
        }
    };


    const [showFirstForm, setShowFirstForm] = useState(true);
    const [showSecondForm, setShowSecondForm] = useState(false);

    const handleShowSecondForm = () => {
        setShowFirstForm(false);
        setShowSecondForm(true);
    };

    const handleShowFirstForm = () => {
        setShowFirstForm(true);
        setShowSecondForm(false);
    };


    //Recaptcha
    const [recaptchaError, setRecaptchaError] = useState(false);
    const [recaptchaChecked, setRecaptchaChecked] = useState<boolean>(false);
    const onChangeRE = (value: any) => {
        setRecaptchaChecked(value);
        setRecaptchaError(false); // Réinitialiser l'état de l'erreur de ReCAPTCHA lorsqu'elle est cochée
    };


    //Terms & Conditions
    const [isChecked, setIsChecked] = useState(false);
    const [TermError, setTermError] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(prevState => !prevState);
        setTermError(false);
    };

    return (
        <DefaultLayoutLogin>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark h-200 w-200 ">
                <div className="flex flex-wrap items-center">
                    <div className="hidden w-full xl:block xl:w-1/2 ">
                        <div className="py-17.5 px-26 text-center ">
                            <Link className="mb-5.5  h-80 w-80" to={''}>
                                <img className="hidden dark:block" src={EspritCareer} alt="Logo" />
                                <img className="dark:hidden" src={EspritCareer} alt="Logo" />
                            </Link>
                            <p className="2xl:px-2">
                                Welcome to our WebSite Esprit Career . We hope you will find your dream job by using our Plateform.
                            </p>
                        </div>
                    </div>

                    <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2 ">
                        <div className="w-full p-4 sm:p-12.5 xl:p-17.5 ">
                            <h2 className="mb-9 text-2xl font-bold text-esprit dark:text-white sm:text-title-xl2">
                                Sign Up to Esprit Career
                            </h2>


                            {showFirstForm && (
                                <form className='form1' onSubmit={handleShowFirstForm}>
                                    <div className="grid grid-cols-2 gap-0 ">
                                        {/* ************************************************************************************************************************************************* */}

                                        <div className="mb-4 mr-4 ml-4">
                                            <label className="mb-2 block font-medium text-black dark:text-white">
                                                First Name
                                            </label>
                                            <div className="relative">
                                                <input
                                                    onChange={e => setFirstName(e.target.value)}
                                                    type="text"
                                                    placeholder="Enter your First Name"
                                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-green focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                />


                                                {error && firstName.length <= 0 ? (
                                                    <label className="text-esprit">First Name can't be Empty</label>
                                                ) : (

                                                    !/^[a-zA-Z\s]+$/.test(firstName) && firstName.length > 0 ? (
                                                        <label className="text-esprit">Your First Name should have only letters</label>
                                                    ) : null
                                                )
                                                }




                                                <span className="absolute right-4 top-4">
                                                    <svg
                                                        className="fill-current"
                                                        width="22"
                                                        height="22"
                                                        viewBox="0 0 22 22"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        {/*pour avoir l'icone */}
                                                        <g opacity="0.5">
                                                            <path
                                                                d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
                                                                fill=""
                                                            />
                                                            <path
                                                                d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
                                                                fill=""
                                                            />
                                                        </g>
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                        {/* ************************************************************************************************************************************************* */}

                                        <div className="mb-4 mr-4 ml-4">
                                            <label className="mb-2 block font-medium text-black dark:text-white">
                                                Last Name
                                            </label>
                                            <div className="relative">
                                                <input
                                                    onChange={e => setLastName(e.target.value)}
                                                    type="text"
                                                    placeholder="Enter your Last Name"
                                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-green focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                />

                                                {error && lastName.length <= 0 ? (
                                                    <label className="text-esprit">Last Name can't be Empty</label>
                                                ) : (
                                                    !/^[a-zA-Z\s]+$/.test(lastName) && lastName.length > 0 ? (
                                                        <label className="text-esprit">Your Last Name should have only letters</label>
                                                    ) : null
                                                )
                                                }


                                                <span className="absolute right-4 top-4">
                                                    <svg
                                                        className="fill-current"
                                                        width="22"
                                                        height="22"
                                                        viewBox="0 0 22 22"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        {/*pour avoir l'icone */}
                                                        <g opacity="0.5">
                                                            <path
                                                                d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
                                                                fill=""
                                                            />
                                                            <path
                                                                d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
                                                                fill=""
                                                            />
                                                        </g>
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                        {/* ************************************************************************************************************************************************* */}

                                        <div className="mb-4 mr-4 ml-4">
                                            <label className="mb-2 block font-medium text-black dark:text-white">
                                                User Name
                                            </label>
                                            <div className="relative">
                                                <input
                                                    onChange={e => setUserName(e.target.value)}
                                                    type="text"
                                                    placeholder="Enter your User Name"
                                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-green focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                />

                                                {error && userName.length <= 0 ? (
                                                    <label className="text-esprit">User Name can't be Empty</label>
                                                ) : (
                                                    userName.length > 0 && /\s/.test(userName) ? (
                                                        <label className="text-esprit">You can't have space in your User Name</label>
                                                    ) : (
                                                        userName.length > 10 ? (
                                                            <label className="text-esprit">User Name should not exceed 10 characters</label>
                                                        ) : (
                                                            userName.length > 0 && !/^[a-zA-Z0-9 _-]+$/.test(userName) ? (
                                                                <label className="text-esprit">Your User Name should contain only letters, numbers, hyphens and underscores</label>
                                                            ) : null
                                                        )
                                                    )
                                                )}


                                                <span className="absolute right-4 top-4">
                                                    <svg
                                                        className="fill-current"
                                                        width="22"
                                                        height="22"
                                                        viewBox="0 0 22 22"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        {/*pour avoir l'icone */}
                                                        <g opacity="0.5">
                                                            <path
                                                                d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
                                                                fill=""
                                                            />
                                                            <path
                                                                d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
                                                                fill=""
                                                            />
                                                        </g>
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                        {/* ******************************************************************************************************* */}

                                        {/* ********************************************************************************************************* */}

                                        <div className="mb-4 mr-4 ml-4">
                                            <label className="mb-2 block font-medium text-black dark:text-white">
                                                Date of Birth
                                            </label>
                                            <div className="relative">
                                                <input
                                                    onChange={e => setBirthDate(e.target.value)}
                                                    type="date"
                                                    placeholder="Enter your date of birth"
                                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-green focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                />
                                                {error && birthDate.length <= 0 ? (
                                                    <label className='text-esprit'>La date de naissance ne peut pas être vide</label>
                                                ) : (
                                                    // Condition pour afficher un message d'erreur si l'âge est inférieur à 18 ans
                                                    error && (age < 18 || (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) && (
                                                        <label className='text-esprit'>Vous devez avoir au moins 18 ans</label>
                                                    )
                                                )}

                                                <span className="absolute right-4 top-4">
                                                    <svg
                                                        className="fill-current"
                                                        width="22"
                                                        height="22"
                                                        viewBox="0 0 22 22"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                        {/* ******************************************************************************************************************************** */}


                                        <div className='mt-3 mr-4 ml-4'>
                                            <PhoneNumberValidation onChange={handlePhoneNumberChange} />
                                            {error && phoneNumber.length <= 0 ?
                                                <label className='text-esprit'>Phone Number can't be Empty</label> : ""
                                            }
                                        </div>


                                        {/* ************************************************************************************************************************************************* */}
                                        <div className="mb-4 mr-4 ml-4">
                                            <label className="mb-2 block font-medium text-black dark:text-white">
                                                Email
                                            </label>
                                            <div className="relative">
                                                <input
                                                    onChange={e => setEmail(e.target.value)}
                                                    type="email"
                                                    placeholder="Enter your email"
                                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-green focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                />

                                                {error && email.length <= 0 ? (
                                                    <label className='text-esprit'>Email can't be Empty</label>
                                                ) : (
                                                    email.length > 0 && !/^\S+@\S+\.\S+$/.test(email) ? (
                                                        <label className='text-esprit'>Email is invalid</label>
                                                    ) : null
                                                )}


                                                <span className="absolute right-4 top-4">
                                                    <svg
                                                        className="fill-current"
                                                        width="22"
                                                        height="22"
                                                        viewBox="0 0 22 22"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g opacity="0.5">
                                                            <path
                                                                d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                                                                fill=""
                                                            />
                                                        </g>
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                        {/* ************************************************************************************************************************************************* */}

                                        <div className="mb-4 mr-4 ml-4">
                                            <label className="mb-2 block font-medium text-black dark:text-white">
                                                Gender
                                            </label>
                                            <div className="relative">
                                                <select onChange={e => setgender(e.target.value)} className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-green focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                >
                                                    <option value="" disabled selected>Select your gender</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="other">Other</option>
                                                </select>
                                                {error && gender.length <= 0 ?
                                                    <label className='text-esprit'>gender can't be Empty</label> : ""
                                                }

                                                <span className="absolute right-4 top-4">
                                                    <svg
                                                        className="fill-current"
                                                        width="22"
                                                        height="22"
                                                        viewBox="0 0 22 22"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                        {/* ************************************************************************************************************************************************* */}


                                    </div>
                                    <button onClick={handleShowSecondForm} className='ml-auto relative inline-flex items-center justify-start py-3 pl-[20px] pr-12 overflow-hidden font-semibold shadow text-esprit transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 dark:bg-gray-700 dark:text-white dark:hover:text-gray-200 dark:shadow-none group'>
                                        <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-esprit group-hover:h-full"></span>
                                        <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" className="w-5 h-5 text-esprit">
                                                <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
                                            </svg>
                                        </span>
                                        <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" className="w-5 h-5 text-esprit">
                                                <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
                                            </svg>
                                        </span>
                                        <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white dark:group-hover:text-gray-200">Next</span>
                                    </button>
                                </form>
                            )}


                            {/* ////////////////////////////////////// 2eme formulaire ///////////////////////////////////////////////////// */}

                            {showSecondForm && (
                                <form className='form2' onSubmit={handleShowSecondForm}>
                                    <div className="grid grid-cols-2 gap-0 ">




                                        <div className="mb-4 mr-4 ml-4">
                                            <label className="mb-2 block font-medium text-black dark:text-white">
                                                Password
                                            </label>
                                            <div className="relative">
                                                <input
                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Enter your password"
                                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-green focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                />
                                                {password.length > 0 && password.length < 8 ? (
                                                    <label className='text-esprit'>Password must be at least 8 characters long</label>
                                                ) : null}

                                                {/* Message pour la composition du mot de passe */}
                                                {password.length >= 8 && !/(?=.*[A-Z])(?=.*\d)/.test(password) ? (
                                                    <label className='text-esprit'>Password must contain at least one uppercase letter and one digit</label>
                                                ) : null}

                                                {/* Message pour le champ vide */}
                                                {error && password.length <= 0 ? (
                                                    <label className='text-esprit'>Password can't be Empty</label>
                                                ) : null}
                                                {/* Bouton pour basculer la visibilité du mot de passe */}
                                                <button
                                                    type="button"
                                                    onClick={togglePasswordVisibility}
                                                    className="absolute right-4 top-4 focus:outline-none"
                                                >
                                                    {/* Afficher l'icône appropriée en fonction de l'état de visibilité */}
                                                    {showPassword ? (
                                                        <svg
                                                            className="fill-current"
                                                            width="22"
                                                            height="22"
                                                            viewBox="0 0 22 22"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                                                                fill=""
                                                            />
                                                            <path
                                                                d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                                                                fill=""
                                                            />
                                                        </svg>
                                                    ) : (
                                                        <svg
                                                            className="fill-current"
                                                            width="22"
                                                            height="22"
                                                            viewBox="0 0 22 22"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594ZM16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                                                                fill=""
                                                            />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mb-6 mr-4 ml-4">
                                            <label className="mb-2 block font-medium text-black dark:text-white">
                                                Re-type Password
                                            </label>
                                            <div className="relative">
                                                <input
                                                    onChange={(e) => setRetypePass(e.target.value)}
                                                    type={showRetypePass ? 'text' : 'password'}
                                                    placeholder="Re-enter your password"
                                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-green focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                />

                                                {/* Message pour la vérification de la correspondance des mots de passe */}
                                                {error && password !== RetypePass && RetypePass.length <= 0 ? (
                                                    <label className='text-esprit'>Passwords do not match</label>
                                                ) : null}

                                                {/* Message pour le champ vide */}
                                                {error && RetypePass.length <= 0 ? (
                                                    <label className='text-esprit'> Password can't be Empty</label>
                                                ) : null}

                                                {/* Bouton pour basculer la visibilité du mot de passe */}
                                                <button
                                                    type="button"
                                                    onClick={toggleRetypePassVisibility}
                                                    className="absolute right-4 top-4 focus:outline-none"
                                                >
                                                    {/* Afficher l'icône appropriée en fonction de l'état de visibilité */}
                                                    <svg
                                                        className="fill-current"
                                                        width="22"
                                                        height="22"
                                                        viewBox="0 0 22 22"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                                                            fill=""
                                                        />
                                                        <path
                                                            d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                                                            fill=""
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                    {/* ******************************************************************************************************************************* */}
                                    <div className=" mr-4 ml-4 mb-6">
                                        <label className="flex items-center checkbox-label ">
                                            <input
                                                type="checkbox"
                                                checked={isChecked}
                                                onChange={handleCheckboxChange}
                                                className="h-4 w-4 mr-1"
                                            />
                                            <span className="checkmark"></span>
                                            <span className="checkbox-text block font-medium text-black dark:text-white">Terms and Conditions</span>
                                        </label>
                                        {TermError && isChecked == false ? (
                                            <label className='text-esprit'>Please accept the Terms and Conditions</label>
                                        ) : null}
                                        {isChecked && (
                                            <div className="modal">
                                                <div className="modal-content">
                                                    <span className="close" onClick={() => setIsChecked(false)}></span>
                                                    <p className='pr-70 pl-2'>
                                                        By checking this box, you agree to all our terms and conditions. For further details, please access our conditions through the footer.
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* ******************************************************* RECAPTCHA*********************************************************************** */}

                                    <div className=" mr-4 ml-4">
                                        <div>
                                            <ReCAPTCHA
                                                className='mb-1'
                                                sitekey="6LdiZpIpAAAAAJarzPVB1PsQzvBD8zmz1v-u2hYs"
                                                onChange={onChangeRE}
                                            />
                                        </div>
                                        {recaptchaError && recaptchaChecked == false ? (
                                            <label className='text-esprit'>Please check the ReCaptcha Box</label>
                                        ) : null}
                                    </div>
                                    {/* ******************************************************************************************************************************************* */}

                                    <button onClick={handleShowFirstForm} className=' ml-4 relative inline-flex items-center justify-start py-3 pl-12 pr-4 overflow-hidden font-semibold shadow text-esprit transition-all duration-150 ease-in-out rounded hover:pr-10 hover:pl-6 bg-gray-50 dark:bg-gray-700 dark:text-white dark:hover:text-gray-200 dark:shadow-none group'>
                                        <span className="absolute bottom-0 right-0 w-full h-1 transition-all duration-150 ease-in-out bg-esprit group-hover:h-full"></span>
                                        <span className="absolute left-0 pl-4 duration-200 ease-out group-hover:-translate-x-12">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" className="w-5 h-5 text-esprit">
                                                <path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
                                            </svg>
                                        </span>
                                        <span className="relative w-full text-right transition-colors duration-200 ease-in-out group-hover:text-white dark:group-hover:text-gray-200">Previous</span>
                                    </button>

                                    <div className="mb-5 mt-5 ml-3 w-[700px]">
                                        <button
                                            onClick={(e) => handleSubmit(e)}
                                            type="submit"
                                            className="w-full cursor-pointer rounded-lg border border-esprit bg-esprit p-4 text-white transition hover:bg-opacity-90">
                                            Create account
                                        </button>
                                    </div>
                                    {/* **********************************************Sign Up with other acounts********************************************** */}
                                    <div className='mb-5 mt-5'>

                                        {/* <!-- Google --> */}
                                        <GoogleLogin
                                          locale="english"
                                          theme="outline"
                                          size="large"
                                          logo_alignment="center"
                                          onSuccess={handleGoogleLoginSuccess}
                                          onError={() => {
                                              console.log('Login Failed');
                                          }}
                                        />
                                    </div>
                                    {/* **********************************************End Sign Up with other acounts********************************************** */}

                                </form>

                            )}


                            <div className="mt-6 text-center">
                                <p>
                                    Already have an account?{' '}
                                    <Link to="/auth/signin" className="text-esprit">
                                        Sign in
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayoutLogin >
    );
};


export default SignUpTeacher;
