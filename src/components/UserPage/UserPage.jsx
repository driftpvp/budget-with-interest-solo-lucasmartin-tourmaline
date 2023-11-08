import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Button from '@mui/material/Button';
import { Card, CardActions, CardContent, Typography } from '@mui/material';

import './UserPage.css';



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
        <Card sx={{ minWidth: 275, maxWidth:600}} variant='outlined' style={{backgroundColor: "#B3CABD"}}>
        <CardContent>
          <Typography sx={{fontSize: 30}}>
           Welcome, {user.username}!
          </Typography>
        </CardContent>
        <CardContent>
          <Typography  sx={{fontSize: 24}}>
            The average Return on Investment or ROI in the stock market 
            over the last century is about 10%. How much would that purchase
            be worth if you invested it instead?
          </Typography>
        </CardContent>
        </Card>
        <br />
        <Card sx={{ minWidth: 275, maxWidth:400}} variant='outlined' style={{backgroundColor: "#B3CABD"}}>
        <CardActions>
          <form onSubmit={interestCalculator}>
            Purchase Price: $<input
              type="text"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
            />
            <br />
            <Button variant="contained" 
                    type="submit"
                    color="success">
                    Calculate
            </Button >
          </form>
          {futureValue !== null && (
            <Typography>Future Value After Ten Years: ${futureValue.toFixed(2)}</Typography>
          )}
        </CardActions>
      </Card>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default UserPage;
