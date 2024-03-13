import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../ApiSlices/authApiSlice';
import { setCredentials } from '../../ApiSlices/authSlice';
import DefaultLayoutLogin from '../../layout/DefaultLayoutLogin';
import Logo_PIDEV from '../../images/logo/Logo_PIDEV.png';
import { useDispatch } from "react-redux";
import usePersist from "../../hooks/userPersist";
import userLogin from "../../images/cover/UserLogin.png"
import userLoginDark from "../../images/cover/UserLoginDark.png"
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DarkModeSwitcher from "../../components/Header/DarkModeSwitcher";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";import SigninBreadcrumbs from "../../components/Breadcrumbs/SigninBreadcrumbs";

const SignIn: React.FC = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [persist, setPersist] = usePersist();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current?.focus();
  }, []);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { accessToken, currentUser } = await login({ email, password }).unwrap();
      dispatch(setCredentials({ accessToken, currentUser }));
      setEmail('');
      setPassword('');
      const successMessageText = currentUser.role === 'admin' ? 'Welcome back Admin' : 'Login successful!';
      setSuccessMessage(successMessageText);
      setTimeout(() => {
        setSuccessMessage('');
        navigate(currentUser.role === 'admin' ? `/Dashboard/ProfileAdmin/${currentUser.username}` : '/Profile');
      }, 3000);
    } catch (err) {
      if (!err.status) {
        setErrMsg('No Server Response');
      } else if (err.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current?.focus();
    }
  };
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePwdInput = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handlePersist = () => setPersist((prev: boolean) => !prev);
  const errClass = errMsg ? 'errmsg' : 'offscreen';
  if (isLoading) return <span className="loading loading-dots loading-lg"></span>;

  const initiateLinkedInLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      console.log('Initiating LinkedIn login...');
      window.location.href = `https://www.linkedin.com/oauth/v2/authorization?client_id=773qhnfkn4hbwy&redirect_uri=http://localhost:3001/auth/linkedin/callback&response_type=code&scope=r_liteprofile%20r_emailaddress`;
    } catch (error) {
      console.error('LinkedIn login initiation failed', error);
      setErrorMessage('Failed to initiate LinkedIn login');
    }
  };
  return (
    <DefaultLayoutLogin>
      <SigninBreadcrumbs pageName="Sign In" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ">

        <div className="flex py-1">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-5 px-26 text-center">
                <img className="dark:hidden" src={userLogin} alt="Logo" />
                <img className="hidden dark:block" src={userLoginDark} alt="Logo" />
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-1 sm:p-12.5 xl:p-10">
              <span className="mb-1.5 block font-medium text-center">Welcome</span>
              <h2 className="mb-2 text-2xl font-bold text-black dark:text-white sm:text-title-xl2 text-center">
                Sign In
              </h2>

              <form>
                <div className="mb-4">
                  <label className="mb-2 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      ref={userRef}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

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

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      placeholder="6+ Characters, 1 Capital letter"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4 " onClick={() => setShowPassword(!showPassword)}
                      style={{ cursor: 'pointer' }}>
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          opacity: showPassword ? 1 : 0.8,
                          stroke: showPassword ? '#333' : 'none',
                          strokeWidth: showPassword ? '0' : '1'
                        }}
                      >
                        <g opacity="0.5">
                          <path
                            d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                            fill=""
                          />
                          <path
                            d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="flex items-center mb-5">
                  <input
                    type="checkbox"
                    className="appearance-none w-9 focus:outline-none
                     h-5 bg-gray-300 dark:bg-graydark
                    rounded-full before:inline-block before:rounded-full
                    before:bg-red-800 before:h-4 before:w-4
                    checked:before:translate-x-full shadow-inner transition-all
                    duration-300 before:ml-0.5 dark:before:bg-cyan-800
                    dark:checked:bg-cyan-300"
                    onChange={handlePersist}
                    checked={persist}
                  />
                  <label className="text-black dark:text-white ml-2">Remember Me</label>
                </div>


                <div className="mb-5">
                  <input
                    type="submit"
                    value="Sign In"
                    onClick={(event) => handleSubmit(event)}
                    className="w-full cursor-pointer rounded-lg border
                    border-red-900 bg-red-800 p-4 text-white transition
                    hover:bg-opacity-90 dark:bg-cyan-900
               dark:hover:bg-cyan-700 dark:focus:ring-cyan-400 dark:border-cyan-900"
                  />
                </div>

                <div className="flex gap-4">
                  {/* <button
                    className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"
                  >
                    <span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_191_13499)">
                        <path
                          d="M19.999 10.2217C20.0111 9.53428 19.9387 8.84788 19.7834 8.17737H10.2031V11.8884H15.8266C15.7201 12.5391 15.4804 13.162 15.1219 13.7195C14.7634 14.2771 14.2935 14.7578 13.7405 15.1328L13.7209 15.2571L16.7502 17.5568L16.96 17.5774C18.8873 15.8329 19.9986 13.2661 19.9986 10.2217"
                          fill="#4285F4"
                        />
                        <path
                          d="M10.2055 19.9999C12.9605 19.9999 15.2734 19.111 16.9629 17.5777L13.7429 15.1331C12.8813 15.7221 11.7248 16.1333 10.2055 16.1333C8.91513 16.1259 7.65991 15.7205 6.61791 14.9745C5.57592 14.2286 4.80007 13.1801 4.40044 11.9777L4.28085 11.9877L1.13101 14.3765L1.08984 14.4887C1.93817 16.1456 3.24007 17.5386 4.84997 18.5118C6.45987 19.4851 8.31429 20.0004 10.2059 19.9999"
                          fill="#34A853"
                        />
                        <path
                          d="M4.39899 11.9777C4.1758 11.3411 4.06063 10.673 4.05807 9.99996C4.06218 9.32799 4.1731 8.66075 4.38684 8.02225L4.38115 7.88968L1.19269 5.4624L1.0884 5.51101C0.372763 6.90343 0 8.4408 0 9.99987C0 11.5589 0.372763 13.0963 1.0884 14.4887L4.39899 11.9777Z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M10.2059 3.86663C11.668 3.84438 13.0822 4.37803 14.1515 5.35558L17.0313 2.59996C15.1843 0.901848 12.7383 -0.0298855 10.2059 -3.6784e-05C8.31431 -0.000477834 6.4599 0.514732 4.85001 1.48798C3.24011 2.46124 1.9382 3.85416 1.08984 5.51101L4.38946 8.02225C4.79303 6.82005 5.57145 5.77231 6.61498 5.02675C7.65851 4.28118 8.9145 3.87541 10.2059 3.86663Z"
                          fill="#EB4335"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_191_13499">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                    Sign in with Google
                      </button>*/}
                  <GoogleLogin
                    onSuccess={credentialResponse => {
                      const credential = credentialResponse.credential ?? '';
                      const credentialResponseDecoded = jwtDecode(credential);
                      console.log(credentialResponseDecoded);
                    }}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                  />
                  <button
                    className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"
                    onClick={initiateLinkedInLogin}
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"

                        viewBox="0 0 72 72"
                        width="20"
                      >
                        <g fill="none" fillRule="evenodd">
                          <path
                            d="M8,72 L64,72 C68.418278,72 72,68.418278 72,64 L72,8 C72,3.581722 68.418278,-8.11624501e-16 64,0 L8,0 C3.581722,8.11624501e-16 -5.41083001e-16,3.581722 0,8 L0,64 C5.41083001e-16,68.418278 3.581722,72 8,72 Z"
                            fill="#007EBB"
                          />
                          <path
                            d="M62,62 L51.315625,62 L51.315625,43.8021149 C51.315625,38.8127542 49.4197917,36.0245323 45.4707031,36.0245323 C41.1746094,36.0245323 38.9300781,38.9261103 38.9300781,43.8021149 L38.9300781,62 L28.6333333,62 L28.6333333,27.3333333 L38.9300781,27.3333333 L38.9300781,32.0029283 C38.9300781,32.0029283 42.0260417,26.2742151 49.3825521,26.2742151 C56.7356771,26.2742151 62,30.7644705 62,40.051212 L62,62 Z M16.349349,22.7940133 C12.8420573,22.7940133 10,19.9296567 10,16.3970067 C10,12.8643566 12.8420573,10 16.349349,10 C19.8566406,10 22.6970052,12.8643566 22.6970052,16.3970067 C22.6970052,19.9296567 19.8566406,22.7940133 16.349349,22.7940133 Z M11.0325521,62 L21.769401,62 L21.769401,27.3333333 L11.0325521,27.3333333 L11.0325521,62 Z"
                            fill="#FFF"
                          />
                        </g>
                      </svg>
                    </span>
                    Sign in with LinkedIn
                  </button>

                </div>
                <div className="mt-4 text-center">
                  <p>
                    Don’t have any account?{' '}
                    <Link to="/" className=" text-red-900 dark:text-cyan-500">
                      Sign Up
                    </Link>
                  </p>
                </div>
                <div className="mt-4 text-center">
                    <Link to="/auth/EmailVerif" className="text-red-900 dark:text-cyan-500">
                      Forgot your password?
                    </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {successMessage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"
          onClick={() => setSuccessMessage('')}
        >
          <div className="bg-green-200 border border-green-500 text-green-700 px-6 py-4 rounded-lg relative z-50"
            role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> {successMessage}</span>
          </div>
        </div>
      )}

      {errorMessage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"
          onClick={() => setErrorMessage('')}
        >
          <div className="bg-red-400 border border-red text-red-700 px-6 py-4 rounded-lg relative z-50"
            role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {errorMessage}</span>
          </div>
        </div>
      )}
    </DefaultLayoutLogin>
  )
    ;
};

export default SignIn;
