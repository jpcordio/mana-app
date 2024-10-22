import React, { useState, useEffect } from "react";
import { isFollowing, setFollow, setUnfollow } from "../services/Connection.service";

function Companies(props) {
  const [isFollowed, setIsFollowed] = useState(false);
  const [moreInfo, setMoreInfo] = useState(true);

  useEffect(() => {
    const checkIfFollowed = async () => {
      const followed = await isFollowing(props.id);
      setIsFollowed(followed);
    };

    checkIfFollowed();
  }, [props.id]);

  const handleFollow = async () => {
    console.log("You are now following this company.");
    setFollow(props.id);
    setIsFollowed(true); 
  };

  const handleUnfollow = async () => {
    console.log("You are now unfollowing this company.");
    setUnfollow(props.id);
    setIsFollowed(false); 
  };

  if (moreInfo) {
    return (
      <div>
        <h4>
          {props.name + " (" + props.id + ") " + props.email}
          {isFollowed ? (
            <button onClick={handleUnfollow}>Unfollow</button>
          ) : (
            <button onClick={handleFollow}>Follow</button>
          )}
        </h4>
      </div>
    );
  }

  return null; 
}

export default Companies;
