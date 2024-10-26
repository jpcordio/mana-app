import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCompanyProfile } from '../services/Profile.service';
import ArticleList from './ArticlesList';
import { Button, Card } from 'react-bootstrap';

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
  // if (error) {
  //   //return {error}
  //   return <p>This company didn't fill their profile yet. <br /><a href="/company">Back</a> <br /></p>;
  // }

  return (
    <div className="">
      {profile ? (
        <Card className="mt-4 shadow-sm">
          <Card.Body>
            <Card.Title className="text-center">{name}</Card.Title>
            <Card.Text>
              <strong>Address: </strong> {profile.address1}, {profile.address2} <br />
              <strong>City: </strong> {profile.city}, <strong>County:</strong> {profile.county} <br />
              <strong>Country: </strong> {profile.country}, <strong>Postcode:</strong> {profile.postcode} <br />
              <strong>Phone: </strong> {profile.phone}, <strong>Mobile:</strong> {profile.mobile} <br />
              <strong>Website: </strong> 
              <a target="_blank" href={profile.website} rel="noopener noreferrer" className="text-decoration-none">
                {profile.website}
              </a>
              <br />
              <strong>Email: </strong> {profile.email}
            </Card.Text>
            <Button variant="warning" className="btn-sm" onClick={() => window.history.back()}>
              Back
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <div>
          <p>No profile found.</p>
          <Button variant="warning" className="btn-sm me-2 mb-3" onClick={() => window.history.back()}>
            Back
          </Button>
        </div>
        
        
      )}

      <h2 className="mt-3">Posts</h2>

      <ArticleList user_Id={id} />
    </div>
  );
}

export default ProfileAction;
