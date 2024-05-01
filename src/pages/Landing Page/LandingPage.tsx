import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import LandingUserCard from '../../components/Cards/LandingUserCard';
import MeteoCard from '../../components/Cards/MeteoCard';
import NewsCard from '../../components/Cards/NewsCard';
import Feed from '../../components/Cards/Feed';
import NotificationComponent from '../../components/Cards/Notification';


const LandingPage: React.FC = () => {
  return (

    <DefaultLayout>

      <div className="grid grid-cols-4 gap-4 ">
        <div className="col-span-1">
          <LandingUserCard />
        </div>
        <div className="col-span-2">
          <Feed />
        </div>
        <div className="col-span-1 flex flex-col">
          <div className="mb-3">
            <MeteoCard />
          </div>
          <NewsCard/>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default LandingPage;
