import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@mui/material/Button';
import { Card, CardActions, CardContent, Typography } from '@mui/material';

import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Ready to grow your future!');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <Card sx={{ minWidth: 100, maxWidth: 300}} variant='outlined' style={{backgroundColor: "#B3CABD"}}>
        <CardContent>
          <Typography>
            {heading}
          </Typography>
        </CardContent>
      </Card>
      <br />

      <div className="grid">
        <div className="grid-col grid-col_8">
          <Card style={{backgroundColor: "#B3CABD"}}>
            <CardContent>
              <Typography>
                Welcome to Budget with Interest. Budgeting isn't what most would consider
                fun. This application asks the questions: "Why are we budgeting?" and "How 
                can we keep motivated?" We believe the best answer is "Seeing our wealth grow"
                and this application has a unique tool to help you see that. It includes a 
                compound interest calculator so you can see how any spare cash at the end of the 
                month can grow!
              </Typography>
            </CardContent>
          </Card>

        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4 className='member'>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
