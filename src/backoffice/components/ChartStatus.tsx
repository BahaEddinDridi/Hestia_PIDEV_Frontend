import { ApexOptions } from 'apexcharts';
import React, { useState ,useEffect} from 'react';
import ReactApexChart from 'react-apexcharts';
import { getUserStatusStats } from '../api';



interface ChartThreeState {
  series: number[];
}



const options: ApexOptions = {
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'radialBar',
  },
  colors: ['#dc2626', '#15803d', '#f59e0b'],
  labels: ['banned', 'active', 'deactivated'],
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

const ChartStatus: React.FC = () => {

  const [statusStats, setStatusStats] = useState([]);
  const [state, setState] = useState<ChartThreeState>({
    series: [0, 0, 0], // Initialiser avec des valeurs par défaut
});




const fetchData = async () => {
  try {
    const response = await getUserStatusStats();
    console.log('Response data:', response); // Ajout du console.log ici
    if (response) {
      setStatusStats(response);
      const statusGroups = ['banned', 'active', 'deactivated'];
      const series = statusGroups.map((statusGroup) => {
        const stat = response.find((statstatus) => statstatus._id === statusGroup);
        return stat ? stat.count : 0;
      });
      setState({ series });
      console.log('Series data after setState:', series); // Ajout du console.log ici
    } else {
      console.error('Response is undefined');
    }
  } catch (error) {
    console.error('Error fetching age stats:', error);
  }
};

useEffect(() => {
  fetchData();
}, []);




  return (
    <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
          Total number of users by profile status
          </h5>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
        <ReactApexChart options={options} series={state.series} type="radialBar" />   
        </div>
      </div>
        <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        {statusStats.map((statstatus) => (
                    <div className="sm:w-1/2 w-full px-8" key={statstatus._id}>
                        <div className="flex w-full items-center">
                            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-esprit"></span>
                            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                                <span>{statstatus._id}</span>
                                <span>Total : {statstatus.count}</span>
                            </p>
                        </div>
                    </div>
         ))}
        </div>

    </div>
  );
};

export default ChartStatus;
