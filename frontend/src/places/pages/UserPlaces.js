import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

// import Button from "../../shared/components/FormElements/Button";
import Auth from "../../user/pages/Auth";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { Link } from "react-router-dom";

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const { userId } = useParams();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
        );
        setLoadedPlaces(responseData.places);
      } catch (err) {
        console.error("Failed to fetch places:", err);
      }
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  const placeDeletedHandler = (deletedPlaceId) => {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && loadedPlaces.length === 0 && (
        <div className="center">
          <div className="no-places-box">
            <h2>No places found. Maybe create one?</h2>
            {Auth.isLoggedIn && (
              <Link to="/places/new" className="btn">
                Create New Place
              </Link>
              
            )}
            {!Auth.isLoggedIn && (
              <Link to="/auth" className="btn">
                Please Login to Create Place
              </Link>
            )}
          </div>
        </div>
      )}

      {!isLoading && loadedPlaces && loadedPlaces.length > 0 && (
        <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />
      )}
    </React.Fragment>
  );
};

export default UserPlaces;
