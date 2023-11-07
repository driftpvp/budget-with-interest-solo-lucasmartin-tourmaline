import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Liabilities.css';
import axios from 'axios';

function Liabilities() {
  const dispatch = useDispatch();
  const liabilitiesList = useSelector((store) => store.liabilities.liabilitiesList);
  const [liabilitiesName, setLiabilitiesName] = useState('');
  const [liabilitiesNote, setLiabilitiesNote] = useState('');
  const [liabilitiesValue, setLiabilitiesValue] = useState(0);
  const [liabilitiesRequired, setLiabilitiesRequired] = useState(false);
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    getLiabilitiesList();
  }, []);

  
  const getLiabilitiesList = () => {
    dispatch({ type: 'FETCH_LIABILITIES' });
  };


  const addLiabilities = (event) => {
    event.preventDefault();

    // Validate inputs
    if (liabilitiesName.trim() === '' || liabilitiesValue.trim() === '') {
      alert('Name and Value must not be empty.');
      return;
    }

    axios.post('api/liabilities', { liabilities_name: liabilitiesName, liabilities_note: liabilitiesNote, liabilities_value: liabilitiesValue, liabilities_required: liabilitiesRequired, user_id: userId })
      .then(response => {
        getLiabilitiesList();
        // Reset input fields
        setLiabilitiesName('');
        setLiabilitiesNote('');
        setLiabilitiesValue(0);
        setLiabilitiesRequired(false); // Reset the value to false
      })
      .catch(error => {
        console.log(error);
        alert('Something went wrong with Liabilities POST');
      });
  }


  const deleteLiabilities = (liabilitiesId) => {
    axios.delete(`/api/liabilities/${liabilitiesId}`)
      .then((response) => {
        getLiabilitiesList();
      })
      .catch((error) => {
        console.error(error);
        alert('Something went wrong while deleting the entry');
      });
  }


  const toggleLiabilities = (id) => {
    axios.put(`/api/liabilities/toggle/${id}`)
      .then((response) => {
        console.log(id);
        console.log(response);
        getLiabilitiesList();
      })
      .catch((error) => {
        console.log(error);
      });
  }


  const sumLiabilities = () => {
    let total = 0;
    for (let i = 0; i < liabilitiesList.length; i += 1) {
      total += Number(liabilitiesList[i].liabilities_value);
    }
    dispatch(updateSumLiabilities(total));

    return total;
  }


  const updateSumLiabilities = (sum) => {
    return {
      type: 'UPDATE_SUM_LIABILITIES',
      payload: sum,
    };
  };


  return (
    <div className='container'>
      <h2 className='title' style={{ padding: '10px', margin: '10px', borderRadius: '10px', border: '2px solid gray' }}>
        Welcome to Liabilities</h2>
      <div>
        {liabilitiesList.map(liabilities => (
          <div className='entry' key={liabilities.id} style={{ padding: '10px', margin: '10px', borderRadius: '10px', border: '2px solid gray' }}>
            <h4>{liabilities.liabilities_name} per month ${liabilities.liabilities_value} {liabilities.liabilities_required ? 'required' : 'discretionary'}</h4>
            <p> {liabilities.liabilities_note}</p>
            <button onClick={() => deleteLiabilities(liabilities.id)} style={{ cursor: "pointer" }}>Delete</button>
            {JSON.stringify(liabilities.liabilities_required)}
            <button onClick={() => toggleLiabilities(liabilities.id)}>Required</button>
          </div>
        ))}
      </div>
      <br></br>
      <br></br>
      <div>
        <h2 className='title' style={{ padding: '10px', margin: '10px', borderRadius: '10px', border: '2px solid gray' }}>
          Monthly Total: ${sumLiabilities()}</h2>
      </div>
      <br></br>
      <br></br>
      <h2 className='title' style={{ padding: '10px', margin: '10px', borderRadius: '10px', border: '2px solid gray' }}>
        New Entry</h2>
      <form className='form' onSubmit={addLiabilities} style={{ padding: '10px', margin: '10px', borderRadius: '10px', border: '2px solid gray' }}>
        *Name: <input type="text" placeholder="*" value={liabilitiesName} onChange={e => setLiabilitiesName(e.target.value)} />
        Note: <input type="text" value={liabilitiesNote} onChange={e => setLiabilitiesNote(e.target.value)} />
        *Value: $<input type="text" placeholder="*" value={liabilitiesValue} onChange={e => setLiabilitiesValue(e.target.value)} />
        Required: <input type="text" value={liabilitiesRequired} onChange={e => setLiabilitiesRequired(e.target.value)} />
        <br />
        <h6>* is a required field</h6>
        <button>Submit</button>
      </form>
    </div>
  );
}


export default Liabilities;


