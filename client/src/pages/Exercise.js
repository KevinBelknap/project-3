import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Auth from "../utils/auth";
import Header from "../components/Header";
import cardioIcon from "../assets/images/cardio.png";
import physicalIcon from "../assets/images/physical.png";
import yogaIcon from "../assets/images/yoga.png";
import swimmingIcon from "../assets/images/swimming.png";

export default function Exercise() {
  const loggedIn = Auth.loggedIn();
  const navigate = useNavigate();

  // If the user is not logged in, redirect to the login page
  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Header />
      <div className="exercise d-flex flex-column align-items-center">
        <h2 className="title">Add Exercise</h2>
        <div class="row">
          <div class="column">
            <button
              className="cardio-btn d-flex flex-column  align-items-center justify-content-center"
              onClick={() => navigate("/exercise/cardio")}
            >
              <img alt="cardio" src={cardioIcon} className="exercise-icon" />
              Cardio
            </button>
          </div>
          <div class="column">
            <button
              className="physical-btn d-flex flex-column  align-items-center justify-content-center"
              onClick={() => navigate("/exercise/physical")}
            >
              <img
                alt="physical"
                src={physicalIcon}
                className="exercise-icon"
              />
              Physical
            </button>
          </div>
        </div>
        <div class="row">
          <div class="column">
            <button
              className="yoga-btn d-flex flex-column  align-items-center justify-content-center"
              onClick={() => navigate("/exercise/yoga")}
            >
              <img alt="yoga" src={yogaIcon} className="exercise-icon" />
              Yoga
            </button>
          </div>
          <div class="column">
            <button
              className="swimming-btn d-flex flex-column  align-items-center justify-content-center"
              onClick={() => navigate("/exercise/swimming")}
            >
              <img
                alt="swimming"
                src={swimmingIcon}
                className="exercise-icon"
              />
              Swimming
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
