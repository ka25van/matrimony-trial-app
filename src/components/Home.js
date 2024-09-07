import React, { useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const Home = () => {
  const [place, setPlace] = useState('');
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:5000/home/search', { place });
      setProfiles(response.data);
      setError('');
    } catch (err) {
      setError('An error occurred while searching.');
    }
  };

  return (
    <div className="home-container">
      <h1>Welcome to Kodava Matrimony</h1>
      <div className="search-bar">
        <input
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          placeholder="Enter place"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p className="error-message">{error}</p>}
      <MapContainer center={[12.9716, 77.5946]} zoom={10} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {profiles.map((profile, index) => (
          <Marker
            key={index}
            position={[profile.lat, profile.lon]}  // Use dynamic lat and lon
            icon={L.icon({ iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png', iconSize: [25, 41] })}
          >
            <Popup>
              <strong>Name:</strong> {profile.name}<br />
              <strong>Gender:</strong> {profile.gender}<br />
              <strong>Place:</strong> {profile.place}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Home;
