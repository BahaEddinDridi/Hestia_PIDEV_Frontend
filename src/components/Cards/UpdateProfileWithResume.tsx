import React, { useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectCurrentToken,
    selectCurrentUsername,
    selectCurrentUser,
} from '../../ApiSlices/authSlice';

function UpdateProfileWithResume() {
    const [modalOpen, setModalOpen] = useState(false);
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleResumeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setResumeFile(selectedFile);
        }
    };

    const handleUploadResume = async () => {
        const userId = currentUser._id;
        if (resumeFile) {
            const data = new FormData();
            data.append('file', resumeFile);
            data.append('upload_preset', 'hestia');
            data.append('username', userId);

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
                    
                    localStorage.setItem(
                        `userImage_${currentUser.username}`,
                        result.secure_url,
                    );
                    await fetch(`http://localhost:3001/ProfileUpdater/CompareUserCv/${userId}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            resume: result.secure_url,
                        }),
                        
                        
                    });
                    console.error('Resume URL saved successfully:', result.message);
                    closeModal(); // Close modal after successful upload
                    window.location.reload();
                } else {
                    console.error('Failed to upload resume to Cloudinary.');
                }
            } catch (error) {
                console.error('Error uploading resume:', error);
            }
        }
    };

    return (
        <>
            <div className="flex justify-center mt-4">
                <button
                    onClick={openModal}
                    className="bg-red-700 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-full shadow-md transform hover:scale-105 transition duration-300 ease-in-out animate-pulse"
                    style={{ animationDuration: '3s' }}
                >
                    <span className="flex items-center">
                        <svg
                            className="w-6 h-6 mr-2 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-white">Update Profile Using Resume</span>
                    </span>
                </button>
            </div>

            {modalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
                    <div className="absolute inset-0 bg-gray-500 opacity-75">

                    </div>
                    <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl">
                        <div className="bg-red-600 px-4 py-2">
                            <h3 className="text-lg leading-6 font-medium text-white">
                                Update Profile Using Resume
                            </h3>
                        </div>
                        <div className="px-4 py-5 sm:p-6">
                            <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                <input
                                    type="file"
                                    name="resume"
                                    id="resume"
                                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                                    onChange={handleResumeChange}
                                />
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                onClick={handleUploadResume}
                                type="button"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Upload Resume
                            </button>
                            <button
                                onClick={closeModal}
                                type="button"
                                className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default UpdateProfileWithResume;
