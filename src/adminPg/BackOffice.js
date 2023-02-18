import React from 'react'
import './bo.css'
import UserList from './UserList';
import CarsTest from './CarsTest'
function BackOffice() {
  return (
    
    <div className="Backoffice">
      <div className="CarTest">
        <CarsTest />
      </div>
      <div className="UserList">
        <UserList />
      </div>
    </div>
    
  )
}
 
export default BackOffice;
