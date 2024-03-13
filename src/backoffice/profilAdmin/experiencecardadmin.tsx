import { useState } from 'react';
const ExperienceCardAdmin = () => {
    const experiences = [
        {
          title: 'Software Developer',
          company: 'XYZ Company',
          date: 'January 2020 - Present',
          description: 'As a software developer, I work on designing and implementing web applications using cutting-edge technologies.',
        },
        {
          title: 'Intern',
          company: 'ABC Corporation',
          date: 'May 2018 - August 2018',
          description: 'During my internship, I gained valuable experience in project management and collaborated with cross-functional teams.',
        },
        // Add more experiences as needed
      ];
      const [selectedExperience, setSelectedExperience] = useState(experiences[0]);
    return ( 
    <>
    <div className="mb-10 rounded-lg bg-white border border-stroke shadow-md dark:border-strokedark dark:bg-boxdark">
          <div className="flex items-center rounded-lg justify-between border-b border-stroke p-4 px-6.5 dark:border-strokedark bg-gradient-to-r from-graydegrade to-graydouble">
            <h3 className="font-medium text-lg  w-full h-full uppercase text-black">Experience</h3>
            <button
              className=" cursor-pointer outline-none hover:rotate-90 duration-300"
              title="Add New"
            >
              <svg
                className="stroke-black fill-none group-hover:fill-graydouble group-active:stroke-teal-200 group-active:fill-teal-600 group-active:duration-0 duration-300"
                viewBox="0 0 24 24"
                height="30px"
                width="30px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-width="1.5"
                  d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                ></path>
                <path stroke-width="1.5" d="M8 12H16"></path>
                <path stroke-width="1.5" d="M12 16V8"></path>
              </svg>
            </button>
          </div>

          <div className="flex p-4">
            <div className="w-1/4">
              <ul className="flex flex-col">
                {experiences.map((exp, index) => (
                  <li key={index} className={`cursor-pointer p-2 hover:bg-gray-100 ${exp === selectedExperience ? 'bg-gray-100' : ''}`} onClick={() => setSelectedExperience(exp)}>
                    <span className="text-sm font-semibold text-black dark:text-white">{exp.title}</span>
                    <span className="text-xs text-gray-500">{exp.company}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-3/4 p-4">
              {selectedExperience ? (
                <>
                  <h4 className="text-lg font-semibold text-red-700 dark:text-white">{selectedExperience.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-300">{selectedExperience.date}</p>
                  <p className="text-gray-600 dark:text-gray-400">{selectedExperience.description}</p>
                </>
              ) : (
                <p className="text-gray-500">Sélectionnez une expérience pour voir les détails.</p>
              )}
            </div>
          </div>
        </div>

    </> );
}
 
export default ExperienceCardAdmin;