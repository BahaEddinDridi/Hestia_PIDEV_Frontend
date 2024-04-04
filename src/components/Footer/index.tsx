import React, { useState, useEffect } from 'react';
import Hestia from '../../images/logo/hestia-logo.png';
import LegalModal from './LegalModal';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [showPrivacyPolicyModal, setShowPrivacyPolicyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState('');
  const [termsOfService, setTermsOfService] = useState('');
  const [crmData, setCrmData] = useState<{
    Description: string;
    Location: string;
    PhoneNumber: string;
    Email: string;
    CompanyName: string;
    SocialMedia: {
      Facebook: string;
      Instagram: string;
      LinkedIn: string;
      Twitter: string;
    };
  } | null>(null);

  const openPrivacyPolicyModal = () => {
    setShowPrivacyPolicyModal(true);
  };

  const closePrivacyPolicyModal = () => {
    setShowPrivacyPolicyModal(false);
  };

  const openTermsModal = () => {
    setShowTermsModal(true);
  };

  const closeTermsModal = () => {
    setShowTermsModal(false);
  };

  useEffect(() => {
    // Fetch CRM data when component mounts
    fetchCRMData();
  }, []);

  const fetchCRMData = async () => {
    try {
      const response = await fetch('http://localhost:3001/CRM/getCRM');
      if (response.ok) {
        const data = await response.json();
        // Assuming data is an array and contains only one CRM object
        if (data.length > 0) {
          setCrmData(data[0]);
          setPrivacyPolicy(data[0].PrivacyPolicy);
          setTermsOfService(data[0].TermsOfService);
        }
      } else {
        console.error('Failed to fetch CRM data');
      }
    } catch (error) {
      console.error('Error fetching CRM data:', error);
    }
  };

  return (
    <footer className="bg-white dark:bg-black">
      <div className="mx-auto w-full max-w-screen-xl py-6 lg:py-8 h-auto ">
        <div className="md:flex md:justify-center ">
          <div>
            <img
              src={Hestia}
              className="h-[200px] mr-[400px] mt-6"
              alt="FlowBite Logo"
            />
          </div>

          <div>
            {crmData && (
              <div className="grid grid-cols-1 gap-8 sm:gap-4 sm:grid-cols-3">
                <h4 className="mb-4 font-semibold text-esprit uppercase dark:text-white ">
                  {crmData.CompanyName}
                </h4>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4 mr-4">
                    <a className="text-espritLightRed dark:text-white">Description :</a>
                    <a className="hover:">{crmData.Description}</a>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-esprit uppercase dark:text-white ">
              GET IN TOUCH
            </h4>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              {crmData && (
                <div>
                  <li className="mb-4">
                    <a className="text-espritLightRed dark:text-white">
                      Location:
                    </a>
                    <a className="hover:underline" href={crmData.Location}>
                      {crmData.Location}
                    </a>
                  </li>
                  <li className="mb-4">
                    <a className="text-espritLightRed dark:text-white">
                      Phone Number:
                    </a>
                    <a className="hover:underline">{crmData.PhoneNumber}</a>
                  </li>
                  <li className="mb-4">
                    <a className="text-espritLightRed dark:text-white">
                      Email:
                    </a>
                    <a className="hover:underline">{crmData.Email}</a>
                  </li>
                </div>
              )}
            </ul>
          </div>
          {/* Add modal trigger links */}
          <div>
            <div>
              <h4 className="mb-4 font-semibold text-esprit uppercase dark:text-white">
                LEGAL
              </h4>
              <ul className="text-black dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a
                    href="#"
                    className="hover:underline text-espritLightRed"
                    onClick={openPrivacyPolicyModal}
                  >
                    Privacy Policy
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="#"
                    className="hover:underline text-espritLightRed"
                    onClick={openTermsModal}
                  >
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
            {/* Render the modals */}
            {showPrivacyPolicyModal && (
              <LegalModal
                closeModal={closePrivacyPolicyModal}
                title="Privacy Policy"
                content={privacyPolicy}
              />
            )}
            {showTermsModal && (
              <LegalModal
                closeModal={closeTermsModal}
                title="Terms & Conditions"
                content={termsOfService}
              />
            )}
          </div>
        </div>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

      <div className="flex flex-wrap justify-center mb-4 ">
        <div className="flex mt-4 sm:justify-center sm:mt-0">
          {/* FACEBOOK */}
          <a
            href={crmData?.SocialMedia.Facebook}
            role="button"
            className="pr-8  mb-4"
          >
            <span className="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:fill-[#1877f2]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
              </svg>
            </span>
          </a>
          {/* INSTEGRAM */}
          <a
            href={crmData?.SocialMedia.Instagram}
            role="button"
            className="pr-8  mb-4"
          >
            <span className="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:fill-[#c13584]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
            </span>
          </a>
          {/* LinkeDin */}
          <a
            href={crmData?.SocialMedia.LinkedIn}
            role="button"
            className="pr-8  mb-4"
          >
            <span className="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:fill-[#ea4335]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#0288D1"
                  d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                ></path>
                <path
                  fill="#FFF"
                  d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
                ></path>
              </svg>
            </span>
          </a>
          {/* TWITTER */}
          <a
            href={crmData?.SocialMedia.Twitter}
            role="button"
            className=" dark:bg-white"
          >
            <span className="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:fill-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 512 512"
              >
                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
              </svg>
            </span>
          </a>
        </div>
      </div>
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2024{' '}
        <a href="#" className="hover:underline">
          HESTIA™
        </a>
        . All Rights Reserved.
      </span>
    </footer>
  );
};

export default Footer;
