import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function UserPage() {
  const user = useSelector((store) => store.user);
  const [purchasePrice, setPurchasePrice] = useState(''); // State to store the input value
  const [futureValue, setFutureValue] = useState(null);

  const interestCalculator = () => {
    const rate = 0.10; // 10% annual interest rate
    const principal = parseFloat(purchasePrice); // Convert input to a number

    if (isNaN(principal)) {
      // Handle invalid input
      alert('Please enter a valid purchase price.');
      return;
    }

    let amount = principal;

    for (let year = 1; year <= 10; year++) {
      amount = amount * (1 + rate);
    }

    setFutureValue(amount);
  }

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <div>
        <p>The average "ROI" Return on Investment in the stock market 
           over the last century is about 10%. How much would that purchase
           be worth if you invested it instead?
        </p>
        <form onSubmit={interestCalculator}>
          Purchase Price: $<input
            type="text"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
          />
          <br />
          <button type="submit">Calculate</button>
        </form>
        {futureValue !== null && (
          <p>Future Value After Ten Years: ${futureValue.toFixed(2)}</p>
        )}
      </div>
    </div>
  );
}

export default UserPage;
