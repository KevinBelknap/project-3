import React, {useState} from "react";
import {Navigate} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Auth from "../utils/auth";
import {createYoga} from "../utils/API";
import Header from "./Header";
import yogaIcon from "../assets/images/yoga.png";

export default function Yoga() {
    const [yogaForm, setYogaForm] = useState({
        name: "",
        duration: "",
        date: new Date(),
        notes: ""
    });
    const [startDate, setStartDate] = useState(new Date());
    const [message, setMessage] = useState("");
    const loggedIn = Auth.loggedIn();

    const handleYogaChange = (event) => {
        const {name, value} = event.target;
        setYogaForm({...yogaForm, [name]: value});
    }

    const handleDateChange = (date) => {
        setStartDate(date);
        handleYogaChange({target: {name: "date", value: date}});
    }

    const validateForm = (form) => {
        return form.name && form.duration && form.date;
    }

    const handleYogaSubmit = async (event) => {
        event.preventDefault();

        //get token
        const token = loggedIn ? Auth.getToken() : null;
        if (!token) return false;
        
        //get user id
        const userId = Auth.getUserId();

        //yoga submit
        if (validateForm(yogaForm)) {
            try {
                yogaForm.userId = userId;

                const response = await createYoga(yogaForm, token);

                if (!response.ok) {
                    throw new Error("Something went wrong!");
                }

                setMessage("yoga successfully added!");
                setTimeout(() => {
                    setMessage("");
                }, 3000);
            } catch (err) {
                console.error(err);
            }
        }

        //clear form
        setYogaForm({
            name: "",
            duration: "",
            date: new Date(),
            notes: ""
        });
    }

    if (!loggedIn) {
        return <Navigate to="/login" />;
    }

    return (
        <div className='yoga'>
            <Header />
            <div className="d-flex flex-column align-items-center">
                <h2 className='title text-center'>Add Exercise</h2>
                <form className='yoga-form d-flex flex-column' onSubmit={handleYogaSubmit}>
                    <div className='d-flex justify-content-center'><img alt="yoga" src={yogaIcon} className="exercise-form-icon" /></div>
                    <label >Name:</label>
                    <input type="text" name="name" id="name" placeholder="meditation/stretching"
                        value={yogaForm.name} onChange={handleYogaChange} />
                    <label >Duration (minutes):</label>
                    <input type="number" name="duration" id="duration" placeholder="0"
                        value={yogaForm.duration} onChange={handleYogaChange} />
                    <label>Date:</label>
                    <DatePicker selected={startDate} value={yogaForm.date} onChange={handleDateChange} placeholderText="mm/dd/yyyy" />
                    <button className='submit-btn yoga-submit-btn' type="submit" disabled={!validateForm(yogaForm)} >Add</button>
                </form>
                <p className='message'>{message}</p>
            </div>
        </div>
    )
};
