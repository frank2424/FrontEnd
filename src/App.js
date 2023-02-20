import './header.css';

import './App.css';
import { Routes, Route } from "react-router-dom";
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import CarGrid from './CarGrid';
import UserList from './adminPg/UserList';
import CarsTest from './adminPg/CarsTest'
import BackOffice from './adminPg/BackOffice';
function App() {
  return (
    /*<div className="Header"><Header/></div>*/
      
    <div className="App">
    <Routes>
        <Route path="/" element={ <LoginForm/> } />
        <Route path="RegisterForm" element={ <RegisterForm/> } />
        <Route path="CarGrid/:username" element={<CarGrid/>}/>
        <Route path="CarsTest" element={<CarsTest/>}/>      
        <Route path="UserList" element={<UserList/>}/>
        <Route path="BackOffice" element={<BackOffice/>}/>
        </Routes>
      </div>
  );
}

export default App;
