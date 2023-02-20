import React, { useState, useEffect } from "react";
import './GridStyles.css';
import { useParams } from 'react-router-dom';

const CarGrid = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState({});
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
//  const [username,setUsername] = useParams();
  const { username } = useParams();
  const [make, setMake] = useState("null"); // define make state variable

  //const[make,setMake]=useState("");
  useEffect(() => {
    fetch('https://localhost:7079/api/Car')
      .then(response => response.json())
      .then(data => {setCars(data);
      console.log(data[0].make)
    });
    
  }, []);
  // useEffect(() => {
  //    //setUsername(username);
  //    });
  //https://localhost:7079/api/Booking/AddBooking?car_id=${car_id}&date_from=${dateFrom}&date_to=${dateTo}&user_id=${user_id} <- post booking api
  const handleBook = (car) => {
    setSelectedCar(car);
    setShowCalendar(true);
    setMake(car.make);
  };

  const handleBooking = async (dateFrom, dateTo, make, username ) => {
    const response = await fetch(`https://localhost:7079/api/Booking/AddBooking?Make=${make}&date_from=${dateFrom}&date_to=${dateTo}&username=${username}`, {
      method: 'POST',
      headers: {
        Accept: "application/json",
          "Content-Type": "application/json",
      },

      body: JSON.stringify({
        make: make,
        date_from: dateFrom,
        date_to: dateTo,
        username:username
      }),
    }).then((response) => {
      if (response.status === 200) {
        console.log(response);
        console.log(response.json());

      } else {
        console.log(response);
}
    })

    .catch((error) => {
      console.error(error);
    });
    const result = await response.json();
    setCars(cars.map(car => {
      if (car.make === selectedCar.make) {
        return {
          ...car,
        }
      }
      //return car;
    }));
    setShowCalendar(false);
  };

  return (
    <div className="car-grid">
      <h3 >Book a car, {username}!!!</h3>
      {cars.map(car => (
        <div className="car-card" key={car.car_id}>
          <img src={car.imagePath} alt={car.make + ' ' + car.model} />
          <p>Make: {car.make}</p>
          <p>Model: {car.model}</p>
          <p>Cost: {car.cost}</p>
          <p>Capacity: {car.capacity}</p>
          <p>Status: {car.status}</p>
          {car.status === "Free" && <button onClick={() => handleBook(car)}>Book</button>}
          {/* {car.status === "Booked" && <button onClick={() => handleCancel()}>Cancel</button>} */}

        </div>
      ))}
      {showCalendar && (
        <div className="calendar-popup">
          <h3>Choose dates:</h3>
          <p>From: <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} /></p>
          <p>To: <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} /></p>
          <button onClick={() => handleBooking(dateFrom, dateTo,make,username)}>Book</button>
          <button onClick={() => setShowCalendar(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default CarGrid;