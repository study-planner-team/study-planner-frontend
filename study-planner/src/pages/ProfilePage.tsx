import React, { useEffect, useState } from 'react';
import ProfileService from '../services/ProfileService';

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<any>(null); // Define a type for profile 

  const fetchProfile = async () => {
    console.log('Fetching profile...');
    try {
      const data = await ProfileService.getProfile();
      setProfile(data);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  useEffect(() => {
    fetchProfile(); // Call the fetch function when the component mounts
  }, []); // Empty dependency array ensures it only runs on mount

  return (
    <div>
      <h1>Profile Page</h1>
      {profile ? (
        <div>
          <p>Message: {profile}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default ProfilePage;