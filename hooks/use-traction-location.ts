'use client';

import { useState } from 'react';

type PositionType = {
  coords: { latitude: number; longitude: number };
};

const useTrackLocation = () => {
  const [isFindingLocation, setIsFindingLocation] = useState(false);
  const [longLat, setLongLat] = useState('');
  const [locationErrorMsg, setLocationErrorMsg] = useState('');

  function success(position: PositionType) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLongLat(`${longitude},${latitude}`);
    setIsFindingLocation(false);
    setLocationErrorMsg('');
    console.log(`Latitude: ${latitude} °, Longitude: ${longitude} °`);
  }

  function error(err?: GeolocationPositionError) {
    setIsFindingLocation(false);
    
    // Handle different error types more gracefully
    if (err) {
      switch (err.code) {
        case err.PERMISSION_DENIED:
          setLocationErrorMsg('Location access denied. You can still search for coffee shops manually.');
          console.log('User denied location access'); // Changed from console.error
          break;
        case err.POSITION_UNAVAILABLE:
          setLocationErrorMsg('Location information is unavailable.');
          console.log('Location unavailable:', err.message);
          break;
        case err.TIMEOUT:
          setLocationErrorMsg('Location request timed out.');
          console.log('Location timeout:', err.message);
          break;
        default:
          setLocationErrorMsg('Unable to retrieve your location');
          console.log('Location error:', err.message);
          break;
      }
    } else {
      setLocationErrorMsg('Unable to retrieve your location');
      console.log('Unable to retrieve your location'); // Changed from console.error
    }
  }

  const handleTrackLocation = () => {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
      setLocationErrorMsg('Geolocation is not supported by your browser');
    } else {
      console.log('Locating…');
      setIsFindingLocation(true);
      setLocationErrorMsg('');
      navigator.geolocation.getCurrentPosition(success, error, {
        enableHighAccuracy: true,
        timeout: 10000, // 10 seconds
        maximumAge: 300000, // 5 minutes
      });
    }
  };

  return {
    longLat,
    isFindingLocation,
    handleTrackLocation,
    locationErrorMsg,
  };
};

export default useTrackLocation;