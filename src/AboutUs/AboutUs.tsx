import React from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import Mohsen from "../images/team/Mohsen.jpg"

import { WavyBackground } from "./wavy-background";
const AboutUs: React.FC = () => {
    return (
        <DefaultLayout>
            <WavyBackground className="max-w-4xl mx-auto pb-40">
                <p className="text-2xl md:text-4xl lg:text-7xl text-red-700 font-bold inter-var text-center">
                    About Us
                </p>
                <p className="text-base md:text-lg mt-4 text-black font-normal inter-var text-center">
                    Connect with potential employers, and kick-start their careers through a variety of jobs and internships.
                </p>
            </WavyBackground>

           
                <div className=''>
                    <section className="mx-auto containerr gap-5 grid m-5 mb-20 md:mt-8 mt-10 px-5">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                            <div>
                                <h2 className="font-semibold text-[#ff0000] mb-3 text-3xl underline">Who are we?</h2>
                                <p className="font-inter"> Our goal is to provide a mutually beneficial platform that helps interns start their professional careers with high-quality internships, while providing companies with access to qualified trainees. We believe that by facilitating these connections, we can help bridge the gap between students and industry, creating meaningful learning and growth opportunities for both parties.</p>
                                <p className="font-inter">The result is a win-win situation for all parties involved, where companies have access to the best, talented interns, while students gain valuable work experience and launch their careers.</p>
                            </div>
                            <div>
                                <h2 className="font-semibold text-[#ff0000] mb-3 text-3xl underline">Why are we doing this ?</h2>
                                <p className="font-inter">To solve a big problem, you have to think big. And the biggest problem of our generation and our region is the unemployment of young people. We are committed to breaking down barriers to employment and improving employability outcomes for higher education graduates. Our vision is to become the leading internship platform in the MENA region, recognized for its commitment to excellence and innovation in student career development. Our startup strives to create a world where every student has access to high-quality internship opportunities that enable them to reach their full potential and make a positive impact in their communities.</p>
                            </div>
                        </div>
                        <div className="place-self-center">
                            <h2 className="underline text-[#ff0000] text-3xl font-bold md:my-8 md:text-left my-10 text-center">Nos Fondateurs</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                                <div className="text-center">
                                    <img alt="Mohsen's headshot" className="mx-auto border-4 border-red-500 h-32 md:h-60 md:w-60 rounded-full w-32" decoding="async" height="3326" loading="lazy" src={Mohsen} width="3327" />
                                    <div className="mt-2 sm:mt-4">
                                        <h3 className="font-medium text-2xl text-gray-800">Mohsen Barnaou</h3>
                                        <p className="text-gray-400 text-lg">Team Leader</p>
                                        <p className="px-10 md:text-base">Étudiant ingénieur, passionné par la technologie et l'entrepreneuriat.</p>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <img alt="Khalil's headshot" className="mx-auto border-4 border-red-500 h-32 md:h-60 md:w-60 rounded-full w-32" decoding="async" height="477" loading="lazy" src="" width="477" />
                                    <div className="mt-2 sm:mt-4">
                                        <h3 className="font-medium text-2xl text-gray-800">Baha Eddine Dridi</h3>
                                        <p className="text-gray-400 text-lg">Scrum Master</p>
                                        <p className="px-10 md:text-base">Étudiant ingénieur, passionné par la technologie et l'entrepreneuriat.</p>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <img alt="Farah's headshot" className="mx-auto border-4 border-red-500 h-32 md:h-60 md:w-60 rounded-full w-32" decoding="async" height="3326" loading="lazy" src='../' width="3327" />
                                    <div className="mt-2 sm:mt-4">
                                        <h3 className="font-medium text-2xl text-gray-800">Farah Zekri</h3>
                                        <p className="text-gray-400 text-lg">Full-Stack Developer</p>
                                        <p className="px-10 md:text-base">Étudiant ingénieur, passionné par la technologie et l'entrepreneuriat.</p>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <img alt="Sarra's headshot" className="mx-auto border-4 border-red-500 h-32 md:h-60 md:w-60 rounded-full w-32" decoding="async" height="3326" loading="lazy" src='../' width="3327" />
                                    <div className="mt-2 sm:mt-4">
                                        <h3 className="font-medium text-2xl text-gray-800">Sarra Touhami</h3>
                                        <p className="text-gray-400 text-lg">Product Owner</p>
                                        <p className="px-10 md:text-base">Étudiant ingénieur, passionné par la technologie et l'entrepreneuriat.</p>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <img alt="Oumaima's headshot" className="mx-auto border-4 border-red-500 h-32 md:h-60 md:w-60 rounded-full w-32" decoding="async" height="3326" loading="lazy" src='../' width="3327" />
                                    <div className="mt-2 sm:mt-4">
                                        <h3 className="font-medium text-2xl text-gray-800">Oumaima Fersi</h3>
                                        <p className="text-gray-400 text-lg">Full-Stack Developer</p>
                                        <p className="px-10 md:text-base">Étudiant ingénieur, passionné par la technologie et l'entrepreneuriat.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
           
        </DefaultLayout>
    );

};

export default AboutUs;