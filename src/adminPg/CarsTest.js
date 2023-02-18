import React, { useState, useEffect } from "react";
import './List.css'
const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7079/api/Car')
      .then(response => response.json())
      .then(data => setCars(data));
  }, []);

  

  const addCar = async (car) => {
    const response = await fetch(`https://localhost:7079/api/Car?make=${car.make}&model=${car.model}&cost=${car.cost}&status=${car.status}&capacity=${car.capacity}&imagePath=${car.imagePath}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
    const result = await response.json();
    setCars([...cars, result]);
  };
  const deleteCar = carId => {
    fetch(`https://localhost:7079/api/Car/${carId}`, { method: "DELETE" })
      .then(() => setCars(cars.filter(c => c.car_id !== carId)));
  };



  return (
    <div>
      <h2>Cars List</h2>
      <ul>
        {cars.map(car => (
            <li key={car.car_id}>
            <p>Make:{car.make}</p>
             <p>Model:{car.model}</p>
             <p>Cost:{car.cost}</p>
            <p>Status:{car.status}</p>
            <p>Capacity:{car.capacity}</p>
            <img src={car.imagePath}></img>
            <button onClick={() => deleteCar(car.car_id)}>Delete</button>
           {/* <button onClick={() => bookCar(car.car_id)}>Book</button>*/}
          </li>
        ))}
      </ul> 
      <CarForm addCar={addCar} />
    </div>
  );
};

const CarForm = ({ addCar }) => {
  const [make, setMake] = useState(null);
  const [model, setModel] = useState(null);
  const [cost, setCost] = useState(null);
  const [capacity, setCapacity] = useState(null);
  const [status, setStatus] = useState("Free");
  const [imagePath, setImagePath] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    addCar({ make, model, cost, capacity, status, imagePath });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Make"
        value={make}
        onChange={(e) => setMake(e.target.value)}
      />
      <input
        type="text"
        placeholder="Model"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        />
        <input
        type="text"
        placeholder="Cost"
        value={cost}
        onChange={(e) => setCost(e.target.value)}
        />
        <input
        type="text"
        placeholder="Capacity"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
        />
        {/* <input
        type="text"
        placeholder="status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        /> */}
        <input
        type="text"
        placeholder="Image Path"
        value={imagePath}
        onChange={(e) => setImagePath(e.target.value)}
        />
        <button type="submit">Add Car</button>
        </form>
        );
        };

        export default CarList;
