import React, {useState} from 'react';
import {Navigate} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Auth from '../utils/auth';
import {createPhysical} from '../utils/API';
import Header from '../components/Header';
// import physicalIcon from '../assets/images/physicalIcon.png';

export default function Physical()  {
    const [physicalForm, setPhysicalForm] = useState({
        name: '',
        weight: '',
        sets: '',
        reps: '',
        date: ''
});
const [startDate, setStartDate] = useState(new Date());
const [message, setMessage] = useState('');
const loggedIn = Auth.loggedIn();

const handleDateChange = (date) => {
    setStartDate(date);
    handlePhysicalChange({
        target: {
            name: 'date',
            value: date
        }
    });
}

const handlePhysicalChange = (event) => {
    const {name, value} = event.target;
    setPhysicalForm({...physicalForm, [name]: value});
}

const validateForm = (form) => {
    return form.name && form.weight && form.sets && form.reps && form.date;
}

const handlePhysicalSubmit = async (event) => {
    event.preventDefault();

    // get token
    cosnt token = loggedIn ? Auth.getToken() : null;
    if (!token) return false;

    // get user id
    const userId = Auth.getUserId();

    // physical submit
    if (validateForm(physicalForm)) {
        try {
            // add userid to physical form
            physicalForm.userId = userId;

            const response await createPhysical(physicalForm, token);

            if (!response.ok) {
                throw new Error('something went wrong!');
            }

            setMessage('Success! Your physical exercise has been added!');
            setTimeout(() => {
                setMessage('');
            }, 3000);
        } catch (err) {
            console.error(err);
        }
    }

    // clear form
    setPhysicalForm({
        name: '',
        weight: '',
        sets: '',
        reps: '',
        date: ''
    });
}

if (!loggedIn) {
    return <Navigate to='/login' />;
}

return (
    <div className='physical'>
            <Header />
            <div className="d-flex flex-column align-items-center">
                <h2 className='title text-center'>Add Exercise</h2>
                <form className='physical-form d-flex flex-column' onSubmit={handlePhysicalSubmit}>
                    <div className='d-flex justify-content-center'><img alt="physical" src={physicalIcon} className="exercise-form-icon" /></div>
                    <label>Name:</label>
                    <input type="text" name="name" id="name" placeholder="Bench Press"
                        value={physicalForm.name} onChange={handlePhysicalChange} />
                    <label>Weight (lbs):</label>
                    <input type="number" name="weight" id="weight" placeholder="0"
                        value={physicalForm.weight} onChange={handlePhysicalChange} />
                    <label>Sets:</label>
                    <input type="number" name="sets" id="sets" placeholder="0"
                        value={physicalForm.sets} onChange={handlePhysicalChange} />
                    <label>Reps:</label>
                    <input type="number" name="reps" id="reps" placeholder="0"
                        value={physcialForm.reps} onChange={handlePhysicalChange} />
                    <label >Date:</label>
                    <DatePicker selected={startDate} value={physicalForm.date} onChange={handleDateChange} placeholderText="mm/dd/yyyy" />
                    <button className='submit-btn' type="submit" disabled={!validateForm(physicalForm)} >Add</button>
                </form>
                <p className='message'>{message}</p>
            </div>
        </div>
    )
}
