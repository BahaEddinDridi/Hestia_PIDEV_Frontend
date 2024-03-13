import  { useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import ChartOne from '../components/Charts/ChartOne';
import ChartThree from '../components/Charts/ChartThree';
import ChartTwo from '../components/Charts/ChartTwo';
import DefaultLayout from '../layout/DefaultLayout';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import DefaultLayoutAdmin from '../backoffice/layaout/DefaultLayoutAdmin';

const Chart: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      navigate('/auth/signin');
    } else {
      const decodedToken: any = jwtDecode(accessToken);

      if (decodedToken.role !== 'admin') {
        navigate('/Unauthorized ');
      }
    }
  }, [navigate]);


  return (
    <DefaultLayoutAdmin>
      <Breadcrumb pageName="Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
      </div>
    </DefaultLayoutAdmin>
  );
};

export default Chart;
