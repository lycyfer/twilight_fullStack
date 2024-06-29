
import "./pin.css";
import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import twilight from './twilight_front.png';

// Create a custom icon using the provided image
const customIcon = new L.Icon({
  iconUrl: twilight,
  iconSize: [40, 40], // Adjust the size of the icon as needed
  iconAnchor: [20, 40], // Adjust the anchor point of the icon
  popupAnchor: [0, -40], // Adjust the position of the popup relative to the icon
});

function Pin({ item }) {
  return (
    <Marker position={[55.7558, 37.6173]} icon={customIcon}>
      <Popup>
        <div className="popupContainer">
          <div className="textContainer">
            <div>Twilight</div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;