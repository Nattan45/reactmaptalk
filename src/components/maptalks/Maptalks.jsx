import React, { useEffect, useRef } from 'react';
import "./maptalks.css"

import * as maptalks from 'maptalks';



const Maptalks = () => {

  const mapRef = useRef(null);

  const mapInstance = useRef(null); // Ref to store the map instance

  useEffect(() => {

    const defaultCenter = [39.7823, 9.145]; // Ethiopian coordinates [Longitude, Latitude]
    const initializeMap = (center, zoomLevel = 10) => {
      
      // If a map instance already exists, remove it
      if (mapInstance.current) {
        mapInstance.current.remove();
      }

      // Initialize a new map instance and store it in the ref
      mapInstance.current = new maptalks.Map(mapRef.current, {
        center: center,      
        zoom: zoomLevel, // Initial zoom level
        baseLayer: new maptalks.TileLayer('base', {
          urlTemplate: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          subdomains: ['a', 'b', 'c'],
          attribution: 'Vehicle Tracking'
        })
      });

      // // Cleanup function to remove the map when the component is unmounted
      // return () => {
      //   map.remove();
      // };
    };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userCenter = [position.coords.longitude, position.coords.latitude];
        initializeMap(userCenter, 16); // Set a higher zoom level for street view
        console.log(userCenter)
      },
      () => {
        // If permission is denied or there's an error, use the default Ethiopian coordinates
        initializeMap(defaultCenter);
      }
    );
  } else {
    // If the Geolocation API is not available, use the default Ethiopian coordinates
    initializeMap(defaultCenter);
  }
  // Cleanup function to remove the map when the component is unmounted
  return () => {
    if (mapInstance.current) {
      mapInstance.current.remove();
    }
  };
}, []);


  return (

    <div className='matalksContainer'>
      <div ref={mapRef} style={{ width: '70vw', height: '80vh' }} />
    </div>

  )
}

export default Maptalks