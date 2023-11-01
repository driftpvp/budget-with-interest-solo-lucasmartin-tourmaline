import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import './Liabilities.css';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function Liabilities() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const dispatch = useDispatch();
  const liabilitiesList = useSelector((store) => store.liabilitiesList)
  // const store = useSelector((store) => store);
  const [liabilities_name, setLiabilitiesName] = useState('');

  // const [liabilitiesList, setLiabilitiesList] = useState([]);
  // const [liablilitiesName, setLiabilitiesName] = useState ('');
  const [liabilities_note, setLiabilitiesNote] = useState ('');
  const [liabilities_value, setLiabilitiesValue] = useState (0);

  useEffect(() => {
    getLiabilitiesList();
  }, []);

  const getLiabilitiesList = () => {
    dispatch({ type: 'FETCH_LIABILITIES' })
  };

  // const fetchLiabilities = () => {
  //   axios.get('/api/liabilities').then((response) => {
  //       setLiabilitiesList(response.data);
  //   }).catch((error) => {
  //       console.log(error);
  //       alert('Something went wrong with Liabilities GET');
  //   });
  // }

  return (
    <div>
      <h2>Welcome to Liabilities</h2>
      <div>
        {
          liabilitiesList.map(liabilities => (
            <div key={liabilities.id} style={{padding: '10px', margin: '10px', borderRadius: '10px', border: '2px solid gray' }}>
              <h4>{liabilities.liabilities_name} per month ${liabilities.liabilities_value}</h4>
              <p> {liabilities.liabilities_note} </p>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Liabilities;
