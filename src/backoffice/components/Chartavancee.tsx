import { ApexOptions } from 'apexcharts';
import React, { useState ,useEffect} from 'react';
import ReactApexChart from 'react-apexcharts';
import { fetchUserGenderStats } from '../api';
import { selectCurrentUser } from '../../ApiSlices/authSlice';
import axios from 'axios';
import { useSelector } from 'react-redux';


interface Chartavancee {
  series: number[];
}





const Chartavancee: React.FC = () => {

const [chartData, setChartData] = useState({}); 
const currentUser = useSelector(selectCurrentUser);

useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://192.168.33.10:3001/notifications/getNotificationsCountStat/${currentUser._id}`);
        const notificationsCount = response.data.notificationsCount;
        const dates = Object.keys(notificationsCount);
        const series = Object.values(notificationsCount).map((countObj) => Object.values(countObj));

        setChartData({
          options: {
            chart: {
              fontFamily: 'Satoshi, sans-serif',
              type: 'bar',
            },
            colors: ['#450a0a', '#7f1d1d', '#dc2626','#f87171','#fecaca'],
            xaxis: {
              categories: dates,
            },
            legend: {
              show: true,
              position: 'bottom',
            },
          },
          tooltip: {
            enabled: true, // Activer les info-bulles
            shared: true, // Afficher les info-bulles partagées
            followCursor: true, // Suivre le curseur de la souris
            style: {
              fontSize: '12px', // Taille de police du texte des info-bulles
            },
          },
          series: [
            { name: 'job_application', data: series.map((s) => s[0] || 0) },
            { name: 'internship_application', data: series.map((s) => s[1] || 0) },
            { name: 'Intership Opportunities', data: series.map((s) => s[2] || 0) },
            { name: 'Job Opportunities', data: series.map((s) => s[3] || 0) },
            { name: 'New Compte', data: series.map((s) => s[4] || 0) },
          ],
        });
      } catch (error) {
        console.error('Error fetching notifications count:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedarkdark:bg-boxdark xl:col-span-7">
    <div className="mb-3 justify-between gap-4 sm:flex">
      <div>
        <h5 className="text-xl font-semibold text-black dark:text-white">
        Advanced statistics
        </h5>
      </div>
    </div>

    <div className="mb-2 pt-4">
      <div id="" className="pt-4">
        {Object.keys(chartData).length > 0 && (
          <ReactApexChart options={chartData.options} series={chartData.series} type="bar" />
        )}
      </div>
    </div>
  </div>
  );
};

export default Chartavancee;
