import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Header.css';

function Header() {
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    getTotalSum();
  }, []);

  const getTotalSum = () => {
    axios.get('/api/assets')
      .then((response) => {
        const totalBalance = response.data[0].net_worth;
        setTotalBalance(totalBalance);
      })
      .catch((error) => {
        console.log(error);
        alert('Something went wrong with Header GET');
      });
  }

  console.log("total", totalBalance);

  return (
    <header className="header">
      <h1 className="header-title">Budget With Interest!</h1>
      <div className="balance-container" style={{ textAlign: 'center' }}>
        <h1>Total Balance: ${totalBalance}</h1>
      </div>
    </header>
  );
}

export default Header;
