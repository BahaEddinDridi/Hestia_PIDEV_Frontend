import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { TopCompanies } from '../api'; // Import the function to retrieve top companies

interface ChartCompaniesState {
    series: number[];
    options: ApexOptions;
}

const ChartCompanies: React.FC = () => {
    const [topCompanies, setTopCompanies] = useState<[string, number][]>([]);
    const [state, setState] = useState<ChartCompaniesState>({
        series: [],
        options: {
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
        },
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const companies = await TopCompanies(); // Retrieve top companies from the API
            setTopCompanies(companies);

            // Prepare data for chart
            const seriesData = companies.map(([company, count]) => count);
            setState(prevState => ({
                ...prevState,
                series: seriesData,
            }));
        } catch (error) {
            console.error('Error fetching top companies:', error);
        }
    };

    return (
        <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
            <div className="mb-3 justify-between gap-4 sm:flex">
                <div>
                    <h5 className="text-xl font-semibold text-black dark:text-white">
                        Top Companies
                    </h5>
                </div>
            </div>

            <div className="mb-2">
                <div id="chartThree" className="mx-auto flex justify-center">
                    <ReactApexChart
                        options={state.options}
                        series={state.series}
                        type="donut"
                    />
                </div>
            </div>

            <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
                {topCompanies.map(([company, count], index) => (
                    <div className="sm:w-1/2 w-full px-8" key={index}>
                        <div className="flex w-full items-center">
                            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-esprit"></span>
                            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                                <span>{company}</span>
                                <span>Total: {count}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChartCompanies;
