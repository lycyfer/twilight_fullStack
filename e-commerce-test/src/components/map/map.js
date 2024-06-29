import React from "react";
import { MapContainer, TileLayer, AttributionControl } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./map.css";
import Pin from "../pin/Pin";

function Map({ items }) {
    console.log("Map component received items:", items);
    const position = [55.7558, 37.6173];
    return (
        <MapContainer
            center={position}
            zoom={7}
            scrollWheelZoom={false}
            className='map'
            attributionControl={false}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <AttributionControl prefix="Leaflet | &copy; <a href='https://leafletjs.com/'>Leaflet</a>, <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors" />
            {items.map((item) => (
                <Pin item={item} key={item.id} />
            ))}
        </MapContainer>
    );
}

export default Map;
