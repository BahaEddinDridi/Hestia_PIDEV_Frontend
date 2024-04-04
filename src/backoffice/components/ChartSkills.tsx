import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { LinkeDinScraper, exportPDFJob, exportExcelJob } from '../api'; // Import export functions

interface ChartThreeState {
    series: number[];
}

const options: ApexOptions = {
    chart: {
        fontFamily: 'Satoshi, sans-serif',
        type: 'donut',
    },
    colors: ['#7D0A0A', '#BF3131', '#EAD196', '#F3EDC8'],
    legend: {
        show: true,
        position: 'bottom',
    },
    plotOptions: {
        pie: {
            donut: {
                size: '65%',
                background: 'transparent',
            },
        },
    },
    dataLabels: {
        enabled: true,
    },
    responsive: [
        {
            breakpoint: 2600,
            options: {
                chart: {
                    width: 500,
                },
            },
        },
        {
            breakpoint: 640,
            options: {
                chart: {
                    width: 200,
                },
            },
        },
    ],
};

const ChartSkills: React.FC = () => {
    const [skillsData, setSkillsData] = useState<string[][]>([]);
    const [state, setState] = useState<ChartThreeState>({
        series: [],
    });
    const [location, setLocation] = useState<string>('');
    const [job, setJob] = useState<string>('');
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
    const [fetchingMessage, setFetchingMessage] = useState<string>('');

    useEffect(() => {
        if (!isButtonDisabled) {
            return;
        }

        const timeout = setTimeout(() => {
            setIsButtonDisabled(false);
            setFetchingMessage('');
        }, 30000);

        return () => clearTimeout(timeout);
    }, [isButtonDisabled]);

    const fetchData = async () => {
        try {
            setIsButtonDisabled(true);
            setFetchingMessage('Fetching data...');
            const response = await LinkeDinScraper(job, location);
            if (response) {
                setSkillsData(response);
                const series = response.map(skill => skill[1]);
                setState({ series });
            } else {
                console.error('Response is undefined');
            }
        } catch (error) {
            console.error('Error fetching skills data:', error);
        }
    };

    const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(event.target.value);
    };

    const handleJobChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setJob(event.target.value);
    };

    const handleButtonClick = () => {
        if (location && job) {
            fetchData();
        } else {
            alert('Please enter both location and job.');
        }
    };

    return (
        <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
            <div className="mb-3 justify-between gap-4 sm:flex">
                <div>
                    <h5 className="text-xl font-semibold text-black dark:text-white">
                        Top Skills
                    </h5>
                </div>
            </div>

            <div className="mb-2">
                <div id="chartThree" className="mx-auto flex justify-center">
                    <ReactApexChart
                        options={options}
                        series={state.series}
                        type="donut"
                    />
                </div>
            </div>

            <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
                {skillsData.map((skill, index) => (
                    <div className="sm:w-1/2 w-full px-8" key={index}>
                        <div className="flex w-full items-center">
                            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-esprit"></span>
                            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                                <span>{skill[0]}</span>
                                <span>Total: {skill[1]}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4">
                <input
                    type="text"
                    value={location}
                    onChange={handleLocationChange}
                    placeholder="Location"
                    className="border-gray-300 bg-gray-100 rounded-md py-2 px-4 w-full focus:outline-none focus:border-indigo-500 focus:bg-white"
                />
            </div>

            <div className="mt-4">
                <input
                    type="text"
                    value={job}
                    onChange={handleJobChange}
                    placeholder="Job"
                    className="border-gray-300 bg-gray-100 rounded-md py-2 px-4 w-full focus:outline-none focus:border-indigo-500 focus:bg-white"
                />
            </div>

            <div className="mt-4 flex items-center ">
                <button
                    onClick={handleButtonClick}
                    disabled={isButtonDisabled}
                    className={`bg-${isButtonDisabled ? 'gray' : 'red'}-500 hover:bg-${isButtonDisabled ? 'gray' : 'red'}-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4`}
                >
                    {isButtonDisabled ? fetchingMessage : 'Fetch Data'}
                </button>
                {/* <button
          onClick={exportPDFJob}
          disabled={isButtonDisabled}
          className={`bg-${isButtonDisabled ? 'gray' : 'red'}-500 hover:bg-${isButtonDisabled ? 'gray' : 'red'}-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
        >
          Export PDF
        </button>
        <button
          onClick={exportExcelJob}
          disabled={isButtonDisabled}
          className={`bg-${isButtonDisabled ? 'gray' : 'red'}-500 hover:bg-${isButtonDisabled ? 'gray' : 'red'}-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4`}
        >
          Export Excel
        </button> */}
            </div>
        </div>
    );
};

export default ChartSkills;
