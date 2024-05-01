import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../ApiSlices/authSlice';

const API_KEY = 'fpgjs2qvgr486fijgrwouz8mozbiouj2xb9r4ucm';
const API_URL = 'https://www.meteosource.com/api/v1/free';

const MeteoCard: React.FC = () => {
  const [weatherData, setWeatherData] = useState(null);
  const currentUser=useSelector(selectCurrentUser);
  const location = currentUser.location
  useEffect(() => {
    async function fetchWeatherData() {
      try {
        const findPlacesResponse = await axios.get(`${API_URL}/find_places`, {
          params: {
            text: location,
            key: API_KEY
          }
        });

        const placeId = findPlacesResponse.data.find(place => place.country === 'Tunisian Republic').place_id;

        const pointResponse = await axios.get(`${API_URL}/point`, {
          params: {
            place_id: placeId,
            sections: 'current,daily',
            timezone: 'UTC',
            language: 'en',
            units: 'metric',
            key: API_KEY
          }
        });

        setWeatherData(pointResponse.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }

    fetchWeatherData();
  }, []);

  if (!weatherData) {
    return <div

      className="duration-300 font-mono text-white group  cursor-pointer relative overflow-hidden bg-[#5D0E41]
          w-60 h-18 dark:bg-[#22272B] rounded-3xl p-3 mb-3 hover:w-60 hover:h-56 hover:bg-[#A0153E] hover:dark:bg-black"
    >
      <h3
        className="text-xl text-center">Today</h3>
      <div className="gap-4 relative">
        <img src={`src/images/WeatherIcons/1.png`} alt="Weather Icon" className="w-16 scale-[100%]" />
        <h4
          className="font-sans duration-300 absolute left-1/2 -translate-x-1/2 top-6 text-5xl
              text-center opacity-0 group-hover:opacity-100 group-hover:translate-y-[-1rem] group-hover:text-black
              group-hover:dark:text-white"
        >

        </h4>
      </div>
      <div
        className="absolute duration-300 -left-32 mt-2 mr-2 text-left group-hover:left-4 opacity-0 group-hover:opacity-100">
        <p className="text-sm font-bold"> Sorry No Data Available</p>
        <p className="text-sm"></p>
      </div>
    </div>;
  }

  const currentWeather = weatherData.current;
  const dailyWeather = weatherData.daily.data.slice(0, 3);
  console.log(weatherData);
  return (
    <div className="w-full max-w-sm overflow-hidden shadow dark:bg-black p-5
    flex flex-col rounded-lg justify-center items-center relative"
         style={{
           background: 'url(\'src/images/cards/weather.jpg\')',
           backgroundSize: 'cover'
         }}>
      <div className=" absolute inset-0 backdrop-filter backdrop-blur-[2px]"></div>
      <div className="relative z-10">
        {dailyWeather.map((day, index) => (
          <div
            key={index}
            className="duration-300 font-mono text-white group  cursor-pointer relative overflow-hidden bg-[#5D0E41]
          w-60 h-18 dark:bg-[#22272B] rounded-3xl p-3 mb-3 hover:w-60 hover:h-56 hover:bg-[#A0153E] hover:dark:bg-black"
          >
            <h3
              className="text-xl text-center">{index === 0 ? 'Today' : new Date(day.day).toLocaleDateString('en-US', { weekday: 'long' })}</h3>
            <div className="gap-4 relative">
              <img src={`src/images/WeatherIcons/${day.icon}.png`} alt="Weather Icon" className="w-16 scale-[100%]" />
              <h4
                className="font-sans duration-300 absolute left-1/2 -translate-x-1/2 top-6 text-5xl
              text-center opacity-0 group-hover:opacity-100 group-hover:translate-y-[-1rem] group-hover:text-black group-hover:dark:text-white"
              >
                {day.all_day.temperature}°
              </h4>
            </div>
            <div className="absolute duration-300 -left-32 mt-2 mr-2 text-left group-hover:left-4 opacity-0 group-hover:opacity-100">
              <p className="text-sm font-bold">Wind: {day.all_day.wind.speed} km/h, {day.all_day.wind.dir}</p>
              <p className="text-sm">{day.summary}</p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default MeteoCard;
