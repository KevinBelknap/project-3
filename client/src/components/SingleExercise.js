import React, { useState, useEffect } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import Auth from "../utils/auth";
import {
  getCardioById,
  getPhysicalById,
  getYogaById,
  getSwimmingById,
  deleteCardio,
  deletePhysical,
  deleteYoga,
  deleteSwimming,
} from "../utils/API";
import { formatDate } from "../utils/dateFormat";
import Header from "../components/Header";
import cardioIcon from "../assets/images/cardio.png";
import physicalIcon from "../assets/images/physical.png";
import yogaIcon from "../assets/images/yoga.png";
import swimmingIcon from "../assets/images/swimming.png";

export default function SingleExercise() {
  const { id, type } = useParams();
  const [cardioData, setCardioData] = useState({});
  const [physicalData, setPhysicalData] = useState({});
  const [yogaData, setYogaData] = useState({});
  const [swimmingData, setSwimmingData] = useState({});

  const loggedIn = Auth.loggedIn();
  const navigate = useNavigate();
  const typeClass = (type) => {
    let className;
    switch (type) {
      case "cardio":
        className = "single-cardio";
        break;

      case "physical":
        className = "single-physical";
        break;

      case "yoga":
        className = "single-yoga";
        break;

      case "swimming":
        className = "single-swimming";
        break;

      default:
        className = "null";
    }
    return className;
  };

  useEffect(() => {
    const displayExercise = async (exerciseId) => {
      // get token
      const token = loggedIn ? Auth.getToken() : null;
      if (!token) return false;

      // fetch cardio data by id
      if (type === "cardio") {
        try {
          const response = await getCardioById(exerciseId, token);
          if (!response.ok) {
            throw new Error("something went wrong!");
          }

          const cardio = await response.json();
          cardio.date = formatDate(cardio.date);
          setCardioData(cardio);
        } catch (err) {
          console.error(err);
        }
      }

      // fetch physical data by id
      else if (type === "physical") {
        try {
          const response = await getPhysicalById(exerciseId, token);
          if (!response.ok) {
            throw new Error("something went wrong!");
          }

          const physical = await response.json();
          physical.date = formatDate(physical.date);
          setPhysicalData(physical);
        } catch (err) {
          console.error(err);
        }
      }

      // fetch physical data by id
      else if (type === "yoga") {
        try {
          const response = await getYogaById(exerciseId, token);
          if (!response.ok) {
            throw new Error("something went wrong!");
          }

          const yoga = await response.json();
          yoga.date = formatDate(yoga.date);
          setYogaData(yoga);
        } catch (err) {
          console.error(err);
        }
      } else if (type === "swimming") {
        try {
          const response = await getSwimmingById(exerciseId, token);
          if (!response.ok) {
            throw new Error("something went wrong!");
          }

          const swimming = await response.json();
          swimming.date = formatDate(swimming.date);
          setSwimmingData(swimming);
        } catch (err) {
          console.error(err);
        }
      }
    };
    displayExercise(id);
  }, [id, type, loggedIn]);

  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  const handleDeleteExercise = async (exerciseId) => {
    const token = loggedIn ? Auth.getToken() : null;
    if (!token) return false;

    confirmAlert({
      title: "Confirm to delete",
      message: "Do you want to delete this exercise?",
      buttons: [
        {
          label: "Yes",
        },
        {
          label: "No",
          onClick: async () => {
            if (type === "cardio") {
              try {
                const response = await deleteCardio(exerciseId, token);
                if (!response.ok) {
                  throw new Error("something went wrong!");
                }
              } catch (err) {
                console.error(err);
              }
            } else if (type === "physical") {
              try {
                const response = await deletePhysical(exerciseId, token);
                if (!response.ok) {
                  throw new Error("something went wrong!");
                }
              } catch (err) {
                console.error(err);
              }
            } else if (type === "yoga") {
              try {
                const response = await deleteYoga(exerciseId, token);
                if (!response.ok) {
                  throw new Error("something went wrong!");
                }
              } catch (err) {
                console.error(err);
              }
            } else if (type === "swimming") {
              try {
                const response = await deleteSwimming(exerciseId, token);
                if (!response.ok) {
                  throw new Error("something went wrong!");
                }
              } catch (err) {
                console.error(err);
              }
            }

            // go back to history page
            navigate("/history");
          },
        },
      ],
    });
  };

  return (
    <div className={typeClass(type)}>
      <Header />
      <h2 className="title text-center">History</h2>
      <div className="single-exercise d-flex flex-column align-items-center text-center">
        {type === "cardio" && (
          <div className="cardio-div ">
            <div className="d-flex justify-content-center">
              <img
                alt="cardio"
                src={cardioIcon}
                className="exercise-form-icon"
              />
            </div>
            <p>
              <span>Date: </span> {cardioData.date}
            </p>
            <p>
              <span>Name: </span> {cardioData.name}
            </p>
            <p>
              <span>Distance: </span> {cardioData.distance} miles
            </p>
            <p>
              <span>Duration: </span> {cardioData.duration} minutes
            </p>
            <button
              className="delete-btn"
              onClick={() => handleDeleteExercise(id)}
            >
              Delete Exercise
            </button>
          </div>
        )}
        {type === "physical" && (
          <div className="physical-div">
            <div className="d-flex justify-content-center">
              <img
                alt="physical"
                src={physicalIcon}
                className="exercise-form-icon"
              />
            </div>
            <p>
              <span>Date: </span> {physicalData.date}
            </p>
            <p>
              <span>Name: </span> {physicalData.name}
            </p>
            <p>
              <span>Weight: </span> {physicalData.weight} lbs
            </p>
            <p>
              <span>Sets: </span> {physicalData.sets}
            </p>
            <p>
              <span>Reps: </span> {physicalData.reps}
            </p>
            <button
              className="delete-btn"
              onClick={() => handleDeleteExercise(id)}
            >
              Delete Exercise
            </button>
          </div>
        )}
        {type === "yoga" && (
          <div className="yoga-div">
            <div className="d-flex justify-content-center">
              <img alt="yoga" src={yogaIcon} className="exercise-form-icon" />
            </div>
            <p>
              <span>Date: </span> {yogaData.date}
            </p>
            <p>
              <span>Name: </span> {yogaData.name}
            </p>
            <p>
              <span>time: </span> {yogaData.duration} minutes
            </p>
            <button
              className="delete-btn"
              onClick={() => handleDeleteExercise(id)}
            >
              Delete Exercise
            </button>
          </div>
        )}
        {type === "swimming" && (
          <div className="swimming-div">
            <div className="d-flex justify-content-center">
              <img
                alt="swimming"
                src={swimmingIcon}
                className="exercise-form-icon"
              />
            </div>
            <p>
              <span>Date: </span> {swimmingData.date}
            </p>
            <p>
              <span>Name: </span> {swimmingData.name}
            </p>
            <p>
              <span>laps count: </span> {swimmingData.lapsCount} laps
            </p>
            <p>
              <span>time: </span> {swimmingData.duration} minutes
            </p>
            <button
              className="delete-btn"
              onClick={() => handleDeleteExercise(id)}
            >
              Delete Exercise
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
