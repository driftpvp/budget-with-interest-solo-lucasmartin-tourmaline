import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import './Liabilities.css';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function Liabilities() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Functional Component');

  const [liabilitiesList, setLiabilitiesList] = useState([]);
  const [liablilitiesName, setLiabilitiesName] = useState ('');
  const [liabilitiesNote, setLiabilitiesNote] = useState ('');
  const [liabilitiesValue, setLiabilitiesValue] = useState (number);

  useEffect(() => {
    fetchLiabilities();
  }, []);

  const fetchLiabilities = () => {
    axios.get('/api/liabilities').then((response) => {
        setLiabilitiesList(response.data);
    }).catch((error) => {
        console.log(error);
        alert('Something went wrong with Liabilities GET');
    });
  }

  return (
    <div>
      <h2>Welcome to Liabilities</h2>
    </div>
  );
}

export default Liabilities;
