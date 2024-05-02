import CoverOne from '../../images/cover/cover-01.png';
import { useState } from 'react';
import { ChangeEvent } from 'react';
import userSix from '../../images/user/user-06.png';
import { Link } from 'react-router-dom';
import {  useDispatch, useSelector  } from 'react-redux';
import {
  selectCurrentToken,
  selectCurrentUsername,
  selectCurrentUser,
} from '../../ApiSlices/authSlice';
import {  useGetUserInfoQuery  } from '../../ApiSlices/userApiSlice';
import UpdateProfileWithResume from './UpdateProfileWithResume';
const ProfileCard = () => {
  const [user, setUser] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCoverImage, setSelectedCoverImage] = useState<string | null>(
    null,
  );
  //modifier le profile image

  const currentUser = useSelector(selectCurrentUser);
  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      const data = new FormData();
      data.append('file', selectedFile);
      data.append('upload_preset', 'hestia');
      data.append('username', currentUser.username);

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dasrakdbi/image/upload`,
          {
            method: 'POST',
            body: data,
          },
        );
        if (response.ok) {
          const result = await response.json();
          setSelectedImage(result.secure_url);
          //window.location.reload();
          localStorage.setItem(`userImage_${currentUser.username}`, result.secure_url);
          await fetch('http://localhost:3001/user/upload-image', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: currentUser.username,
              imageUrl: result.secure_url,
            }),
          });
          console.error('Image URL saved successfully:', result.message);
        } else {
          console.error('Failed to upload image to Cloudinary.');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };
  ///modifier coverture image
  const handlecoverImageChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      const data = new FormData();
      data.append('file', selectedFile);
      data.append('upload_preset', 'hestia');
      data.append('username', currentUser.username);

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dasrakdbi/image/upload`,
          {
            method: 'POST',
            body: data,
          },
        );
        if (response.ok) {
          const result = await response.json();
          setSelectedCoverImage(result.secure_url);
          window.location.reload();
          localStorage.setItem(
            `userImage_${currentUser.username}`,
            result.secure_url,
          );
          await fetch('http://localhost:3001/user/upload-coverimage', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: currentUser.username,
              coverimageUrl: result.secure_url,
            }),
          });
          console.error('Image URL saved successfully:', result.message);
        } else {
          console.error('Failed to upload image to Cloudinary.');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const dispatch = useDispatch();
  const currentUsername = useSelector(selectCurrentUsername);
  //const { data: userInfo = {} } = useGetUserInfoQuery(currentUsername);
  return (
    <>
      <div className="relative overflow-hidden rounded-sm border mr-7 ml-7 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20  h-48 md:h-80 lg:h-96 overflow-hidden rounded-t-lg">
          {currentUser.coverimage ? (
            <img
              src={currentUser.coverimage}
              alt="profile cover"
              className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
            />
          ) : selectedCoverImage ? (
            <img
              src={selectedCoverImage}
              alt="profile cover"
              className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
            />
          ) : (
            <img
              src={CoverOne}
              alt="profile cover"
              className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
            />
          )}

          {/* Edit cover photo button */}
          <div className="absolute bottom-4 right-4 z-30 xsm:bottom-8 xsm:right-8">
            <label
              htmlFor="cover"
              className="flex cursor-pointer items-center justify-center gap-2 rounded bg-black py-1 px-2 text-sm font-medium text-white hover:bg-opacity-90 xsm:px-4"
            >
              <input
                type="file"
                name="cover"
                id="cover"
                className="sr-only"
                onChange={handlecoverImageChange}
              />
              <span>
                <svg
                  className="fill-current"
                  width="16"
                  height="16"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Your SVG path */}
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                    fill="white"
                  />
                  {/* Your SVG path */}
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.99992 5.83329C6.03342 5.83329 5.24992 6.61679 5.24992 7.58329C5.24992 8.54979 6.03342 9.33329 6.99992 9.33329C7.96642 9.33329 8.74992 8.54979 8.74992 7.58329C8.74992 6.61679 7.96642 5.83329 6.99992 5.83329ZM4.08325 7.58329C4.08325 5.97246 5.38909 4.66663 6.99992 4.66663C8.61075 4.66663 9.91659 5.97246 9.91659 7.58329C9.91659 9.19412 8.61075 10.5 6.99992 10.5C5.38909 10.5 4.08325 9.19412 4.08325 7.58329Z"
                    fill="white"
                  />
                </svg>
              </span>
              <span>Edit</span>
            </label>
          </div>
        </div>

        <Link to={`/profile/update`} className="float-right  mr-2 mt-2 text-gray-500 hover:text-gray-700 cursor-pointer">
          <div
            className="group relative flex justify-center items-center text-zinc-600 text-sm font-bold"
          >
            <div
              className="absolute opacity-0 group-hover:opacity-100 group-hover:-translate-y-[150%] -translate-y-[300%] duration-500 group-hover:delay-500 skew-y-[20deg] group-hover:skew-y-0 shadow-md"
            >
              <div
                className="shadow-md bg-red-200 absolute bottom-0 translate-y-1/2 left-1/2 translate-x-full rotate-45 p-1"
              ></div>
              <div
                className="rounded-md bg-white group-hover:opacity-0 group-hover:scale-[115%] group-hover:delay-700 duration-500 w-full h-full absolute top-0 left-0"
              >
                <div
                  className="border-b border-r border-white bg-white absolute bottom-0 translate-y-1/2 left-1/2 translate-x-full rotate-45 p-1"
                ></div>
              </div>
            </div>

            <div className="shadow-md flex items-center group-hover:gap-2 bg-gradient-to-br from-red-200 to-red-300 p-3 rounded-full cursor-pointer duration-300">
              <i className="fas fa-edit fill-zinc-600"></i>
              <span className="text-[0px] group-hover:text-sm duration-300">
                Update Profile
              </span>
            </div>
          </div>
        </Link>

        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative mx-auto z-30 ml-10 -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2">
              {currentUser.image ? (
                <img
                  src={currentUser.image}
                  alt="profile"
                  className="w-50 h-40 sm:w-44 sm:h-44 rounded-full overflow-hidden object-cover"
                />
              ) : selectedImage ? (
                <img
                  src={selectedImage}
                  alt="profile"
                  className="w-50 h-40 sm:w-44 sm:h-44 rounded-full overflow-hidden object-cover"
                />
              ) : (
                <img src={userSix} alt="profile" />
              )}
              <label
                htmlFor="profile"
                className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-black text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
              >
                <svg
                  className="fill-current"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                    fill=""
                  />
                </svg>
                <input
                  type="file"
                  name="profile"
                  id="profile"
                  className="sr-only"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>

          <div className="mr-150 sm:mt-10 ">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              {/* Display user's full name */}
              {currentUser &&
                `${currentUser.firstName} ${currentUser.lastName}`}
            </h3>
            <p className="font-medium">
              {' '}
              {currentUser && `${currentUser.title} `}
            </p>
            <UpdateProfileWithResume />

          </div>
        </div>
        <div className="flex mb-2 ml-[1210px] mt-4 ">
         
         
          <Link to={`/calendar/${(currentUser.username)}`}>
            <button className="flex justify-center items-center gap-2 px-3 h-10 w-48 rounded-full bg-gradient-to-br from-red-200 to-red-300  text-blackgray font-sans font-medium text-base shadow-md hover:bg-red-600 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                viewBox="0 0 24 24"
                height="24"
                fill="none"
                className="w-6 h-6 stroke-current "
              >
                <g strokeWidth="2" strokeLinecap="round" stroke="#000">
                  <rect y="5" x="4" width="16" rx="2" height="16"></rect>
                  <path d="m8 3v4"></path>
                  <path d="m16 3v4"></path>
                  <path d="m4 11h16"></path>
                </g>
              </svg>
              <span className="text-lg">see the calendar</span>
            </button>
          </Link>
        </div>

      </div>
    </>
  );
};

export default ProfileCard;
