import React, { useEffect, useRef } from 'react';
import "./maptalks.css"

import * as maptalks from 'maptalks'; //npm i maptalks --save
import Stack from '@mui/material/Stack'; // npm install @mui/material @emotion/react @emotion/styled
import Button from '@mui/material/Button';



const MaptalksPin = () => {

  const mapRef = useRef(null);
  const mapInstance = useRef(null); // Ref to store the map instance
  // const markerLayer = useRef(null); // Ref to store the marker layer
  const markers = useRef([]); // Ref to store all markers

  

    


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



      // Create a vector layer to hold markers
      const markerLayer = new maptalks.VectorLayer('markerLayer').addTo(mapInstance.current);

      // Add event listener to add markers on map click
      mapInstance.current.on('click', function (e) {
        const clickedCoords = e.coordinate.toArray(); // Get the coordinates [longitude, latitude]


        const pin = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin-plus-inside"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><path d="M12 7v6"/><path d="M9 10h6"/></svg>`
        // Create a marker at the clicked location using the pin SVG
        const marker = new maptalks.Marker(clickedCoords, {
          symbol: {
            // textName: '📍', // Or you can use an image/icon
            // markerFile: `${process.env.PUBLIC_URL}/assets/map/tools/map-pin-svgrepo-com.png`, // Use the PNG image as the marker
            markerFile: `data:image/svg+xml;base64,${btoa(pin)}`, // Encode SVG as base64 data URL
            textFaceName: 'sans-serif',
            textFill: '#34495e',
            textHorizontalAlignment: 'center',
            textSize: 40
          }
        });
      
        // Add the marker to the map
        marker.addTo(markerLayer);

        // Store the marker in the markers array
        markers.current.push(marker);
      
        // Log the coordinates or use them as needed
        console.log('Pinned coordinates:', clickedCoords);
      });

      

      
    };



    const undoLastMarker = () => {
      if (markers.current.length > 0) {
        // Remove the last marker from the marker layer
        const lastMarker = markers.current.pop();
        lastMarker.remove();
        console.log('Undone last marker.');
      } else {
        console.log('No markers to undo.'); 
      }
    };
  
    const clearAllMarkers = () => {
      markers.current.forEach(marker => marker.remove());
      markers.current = []; // Clear the markers array
      console.log('Cleared all markers.');
    };


    useEffect(() => {
      const defaultCenter = [39.7823, 9.145]; // Ethiopian coordinates [Longitude, Latitude]

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userCenter = [position.coords.longitude, position.coords.latitude];
            initializeMap(userCenter, 16); // Set a higher zoom level for street view
            // console.log(userCenter)
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

      <Stack spacing={2} direction="row">
      <Button variant="outlined" onClick={undoLastMarker}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#236bfb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-undo"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg> Undo Last Marker</Button>
      <Button variant="outlined" onClick={clearAllMarkers}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#236bfb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rotate-ccw"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg> Clear All Markers</Button>
      </Stack>
    </div>

  )
}

export default MaptalksPin