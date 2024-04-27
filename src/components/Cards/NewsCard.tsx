import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = 'bad646b0bb8440bb96ef50f52c1b8d1b'; // Replace 'YOUR_API_KEY' with your actual API key
const API_URL = 'https://newsapi.org/v2/top-headlines';

const NewsCard: React.FC = () => {
  const [newsData, setNewsData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchNewsData() {
      try {
        const response = await axios.get(API_URL, {
          params: {
            apiKey: API_KEY,
            category: 'general',
            country: 'us',
            pageSize: 10
          }
        });
        setNewsData(response.data.articles);
      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    }

    fetchNewsData();
  }, []);

  // Function to increment the current index to cycle through news
  const nextNews = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % newsData.length);
  };

  // Function to decrement the current index to cycle through news
  const prevNews = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + newsData.length) % newsData.length);
  };

  // Automatically cycle through news every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      nextNews();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentIndex, newsData]);

  return (
    <div>
      <div className="relative overflow-hidden h-125 shadow-lg bg-white">
        {newsData.map((article: any, index: number) => (
          <div
            key={index}
            className={`items-center justify-center absolute top-0 left-0 w-full transition-opacity  ease-in-out`}
            style={{ opacity: currentIndex === index ? 1 : 0 }}
          >
            <div className="bg-gray-800 bg-opacity-90 backdrop-blur-md rounded-lg p-6">
              <h3 className="text-xl font-bold text-black">{article.title}</h3>
              <p className="text-sm text-black">{article.description}</p>
            </div>
          </div>
        ))}
        <div className="absolute bottom-0 justify-center space-x-4 w-full flex p-4">
          <button
            type="button"
            className="text-2xl text-black focus:outline-none"
            onClick={prevNews}
          >
            &lt;
          </button>
          <button
            type="button"
            className="text-2xl text-black focus:outline-none"
            onClick={nextNews}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>


  );
}

export default NewsCard;