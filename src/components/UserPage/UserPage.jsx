import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);

  const interestCalculator = () => {
    let amount;
    let rate = .10;
    let principal = 100

    for (let year = 1; year <= 10; year ++) {
      amount = principal * Math.pow(1 + rate, year);
      console.log(year, amount);
    }

    
  }
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />
      <div>
        <p>The average "ROI" Return on Investment in the stockmarket 
           over the last century is about 10%. How much would that purchase
           be worth if you invested it instead?
        </p>
        <form onSubmit = {interestCalculator}>
        Purchase Price: <input type="text" value onChange={e => (e.target.value)} />
        <br />
        <button>Submit</button>
   
      </form>
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
