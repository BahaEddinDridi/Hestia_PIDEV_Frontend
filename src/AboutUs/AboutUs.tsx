import React, { useRef, useState } from 'react';
import {useTranslation} from 'react-i18next';
import DefaultLayout from '../layout/DefaultLayout';
import Mohsen from '../images/team/Mohsen.jpg';
import Baha from '../images/team/BahaEddine.jpg';
import Sarra from '../images/team/Sarrah.jpg';
import Farah from '../images/team/Farah.jpg';
import Omayma from '../images/team/Oumaima.jpg';
import HomePageLayout from '../layout/HomePageLayout';
import HomeNavbar from '../components/Header/HomeNavBar';

import { WavyBackground } from './wavy-background';
const AboutUs: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const signUpRef = useRef<HTMLDivElement>(null);
  const[t,i18n]=useTranslation();
  return (
    <HomePageLayout>
      <WavyBackground className="max-w-4xl mx-auto pb-40">
        <p className="text-2xl md:text-4xl lg:text-7xl text-red-700 font-bold inter-var text-center">
        {t('About Us')}
        </p>
        <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
        {t('parg1')}
        </p>
      </WavyBackground>

      <div className="">
        <section className="mx-auto containerr gap-5 grid m-5 mb-20 md:mt-8 mt-10 px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="font-semibold text-[#ff0000] mb-3 text-3xl underline">
              {t('Se former autrement')} 
              </h2>
              <p className="font-inter">
              {t('parg2')}
              </p>
              <p className="font-inter">
              {t('parg3')}
              </p>
            </div>
            <div>
              <h2 className="font-semibold text-[#ff0000] mb-3 text-3xl underline">
              {t('La notion de responsabilité et d’inclusion sociales')}
              </h2>
              <p className="font-inter">
              {t('parg4')}
              </p>
            </div>
          </div>
          <div className="place-self-center ">
            <h2 className="underline text-[#ff0000] text-3xl font-bold md:my-8 md:text-center my-10 text-center">
            {t(`Les plus d'ESPRIT`)} 
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="text-center">
                <div className="mt-2 sm:mt-4">
                  <h3 className="font-medium text-2xl text-red-800 ">
                  {t(`Les qualités d'ingénieur et de manager`)}
                  </h3>
                  <p className="text-gray-400 text-lg">
                  {t(`La touche Esprit pour les formations d’ingénieurs`)}
                  </p>
                  <p className="px-10 md:text-base">
                  {t(`parg5`)}
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="mt-2 sm:mt-4">
                  <h3 className="font-medium text-2xl text-red-800 ">
                  {t(`La formation`)} 
                  </h3>
                  <p className="text-gray-400 text-lg">
                  {t(`parg6`)}
                  </p>
                  <p className="px-10 md:text-base">
                  {t(`parg7`)}
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="mt-2 sm:mt-4">
                  <h3 className="font-medium text-2xl text-red-800 ">
                  {t(`La vie étudiante`)} 
                  </h3>
                  <p className="text-gray-400 text-lg">
                  {t(`parg8`)}
                  </p>
                  <p className="px-10 md:text-base">
                  {t(`parg9`)}
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="mt-2 sm:mt-4">
                  <h3 className="font-medium text-2xl text-red-800 ">
                  {t(`Des classes préparatoires aux grandes écoles très performantes`)} 
                  </h3>
                  <p className="text-gray-400 text-lg">
                  {t(`parg10`)}
                  </p>
                  <p className="px-10 md:text-base">
                  {t(`parg11`)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <HomeNavbar
        signUpRef={signUpRef}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
    </HomePageLayout>
  );
};

export default AboutUs;
