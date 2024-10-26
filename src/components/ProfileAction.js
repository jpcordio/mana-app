import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCompanyProfile } from '../services/Profile.service';
import ArticleList from './ArticlesList';

function ProfileAction() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id"); // get the id from the URL
  const name = searchParams.get("name"); // get the id from the URL
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getCompanyProfile(id); 
        setProfile(data); 
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    }
    fetchProfile();
  }, [id]);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    //return {error}
    return <p>This company didn't fill their profile yet. <br /><a href="/company">Back</a> <br /></p>;
  }

  return (
    <div className="">
      {profile ? (
        <div>
          <h2>{name}</h2>
          <p>Address: {profile.address1}, {profile.address2}</p>
          <p>City: {profile.city}, County: {profile.county}</p>
          <p>Country: {profile.country}, Postcode: {profile.postcode}</p>
          <p>Phone: {profile.phone}, Mobile: {profile.mobile}</p>
          <p>Website: <a target="_blank" href={profile.website}>{profile.website}</a></p>
          <p>Email: {profile.email}</p>

          <hr />

          <h2>Posts</h2>

          <ArticleList />

        </div>
      ) : (
        <p>No profile found. <br /><a href="/company">Back</a> <br /></p>
        
      )}
    </div>
  );
}

export default ProfileAction;
