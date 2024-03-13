import WelcomingCard from '../../images/cards/WelcomingCard.jpeg'
import { useState } from 'react';


const WelcomeCard = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };
  return (


    <section
      className="bg-center bg-no-repeat bg-cover bg-gray-700 bg-blend-multiply"
      style={{ backgroundImage: `url(${WelcomingCard})` }}>

      <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
        <div className="bg-white bg-opacity-50 p-8 rounded-lg shadow-lg">
          <h1
            className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-red-900 md:text-5xl lg:text-6xl">Empowering
            Students for Success</h1>
          <p className="mb-8 text-lg font-normal text-black sm:text-xl md:text-2xl sm:px-16 lg:px-48">Welcome to our
            platform where we empower students to discover exciting opportunities, connect with
            potential employers, and kick-start their careers through a variety of jobs and internships.</p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <a href="#"
               className="inline-flex justify-center hover:text-white items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-black rounded-lg border border-red-950 hover:bg-red-700 focus:ring-4 focus:ring-gray-400">
              Learn more
            </a>

          </div>
        </div>
      </div>

    </section>

  );
};

export default WelcomeCard;
