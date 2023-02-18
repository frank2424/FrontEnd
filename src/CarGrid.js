import React, { useState, useEffect } from "react";
import './GridStyles.css';
const CarGrid = (props) => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState({});
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [user_id, setUser_id] = useState(props.user_id);
  useEffect(() => {
    fetch('https://localhost:7079/api/Car')
      .then(response => response.json())
      .then(data => setCars(data));
  }, []);
  useEffect(() => {
    setUser_id(props.user_id);
    }, [props.user_id]);
  //https://localhost:7079/api/Booking/AddBooking?car_id=${car_id}&date_from=${dateFrom}&date_to=${dateTo}&user_id=${user_id} <- post booking api
  const handleBook = (car) => {
    setSelectedCar(car);
    setShowCalendar(true);
  };

  const handleBooking = async (dateFrom, dateTo, car_id, user_id) => {
    const response = await fetch(`https://localhost:7079/api/Booking/AddBooking?car_id=${car_id}&date_from=${dateFrom}&date_to=${dateTo}&user_id=${user_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        car_id: selectedCar.car_id,
        date_from: dateFrom,
        date_to: dateTo,
        user_id: user_id
      }),
    });
    const result = await response.json();
    setCars(cars.map(car => {
      if (car.car_id === selectedCar.car_id) {
        return {
          ...car,
          status: "Booked"
        }
      }
      return car;
    }));
    setShowCalendar(false);
  };

  return (
    <div className="car-grid">
      <h3>Book a car!!!! {props.user_id}</h3>
      {cars.map(car => (
        <div className="car-card" key={car.car_id}>
          <img src={car.imagePath} alt={car.make + ' ' + car.model} />
          <p>Make: {car.make}</p>
          <p>Model: {car.model}</p>
          <p>Cost: {car.cost}</p>
          <p>Capacity: {car.capacity}</p>
          <p>Status: {car.status}</p>
          {car.status === "Free" && <button onClick={() => handleBook(car)}>Book</button>}
        </div>
      ))}
      {showCalendar && (
        <div className="calendar-popup">
          <h3>Choose dates:</h3>
          <p>From: <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} /></p>
          <p>To: <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} /></p>
          <button onClick={() => handleBooking(dateFrom, dateTo)}>Book</button>
          <button onClick={() => setShowCalendar(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default CarGrid;