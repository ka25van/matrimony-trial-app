import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapComponent = ({ profiles }) => {
  return (
    <MapContainer center={[12.3375, 75.8069]} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {profiles.map((profile, index) => (
        <Marker key={index} position={[profile.lat, profile.lon]}>
          <Popup>
            {profile.name} - {profile.gender}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
