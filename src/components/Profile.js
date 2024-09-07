import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    const { email } = useParams();
    const [profile, setProfile] = useState({
      name: '',
      place: '',
      gender: '',
      email: ''
    });
  
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/profiles?email=${email}`);
          setProfile(response.data[0]); // Assuming you fetch profile based on email
        } catch (err) {
          console.error(err);
        }
      };
      fetchProfile();
    }, [email]);
  
    const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });
  
    const handleSubmit = async () => {
      try {
        await axios.put(`http://localhost:5000/profile/${email}`, profile);
        alert('Profile updated successfully');
      } catch (err) {
        console.error(err);
      }
    };
  
    return (
      <div className="profile-container">
        <h2>Edit Profile</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <label>Name:</label>
          <input type="text" name="name" value={profile.name} onChange={handleChange} required />
          
          <label>Place:</label>
          <input type="text" name="place" value={profile.place} onChange={handleChange} required />
          
          <label>Gender:</label>
          <select name="gender" value={profile.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          
          <label>Email:</label>
          <input type="email" name="email" value={profile.email} onChange={handleChange} readOnly />
  
          <button type="submit">Save Changes</button>
        </form>
      </div>
    );
  };
  
  export default Profile;
  