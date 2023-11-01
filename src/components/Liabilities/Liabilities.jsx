import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import './Liabilities.css';

function Liabilities() {
  const dispatch = useDispatch();
  const liabilitiesList = useSelector((store) => store.liabilitiesList)
  const [liabilities_name, setLiabilitiesName] = useState('');
  const [liabilities_note, setLiabilitiesNote] = useState ('');
  const [liabilities_value, setLiabilitiesValue] = useState (0);

  useEffect(() => {
    getLiabilitiesList();
  }, []);

  const getLiabilitiesList = () => {
    dispatch({ type: 'FETCH_LIABILITIES' })
  };

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
