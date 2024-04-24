import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const Map = () => {
    const mapStyles = {
        height: "400px",
        width: "100%"
    };

    const defaultCenter = {
        lat: 37.7749, // Latitude de San Francisco
        lng: -122.4194 // Longitude de San Francisco
    };

    return (
        <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
            <LoadScript googleMapsApiKey="AIzaSyDWgw5E20lDr3lYNvE-pngC13SyIJz0Eps">
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={defaultCenter}
            >
                {/* Ajoutez ici d'autres composants Google Maps, par exemple des markers */}
            </GoogleMap>
        </LoadScript>
        </div>
        
    );
};

export default Map;
