import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Card, CardActions, CardContent, Typography, Grid, IconButton } from '@mui/material';

import './Assets.css';


function Assets() {
  const dispatch = useDispatch();
  const assetsList = useSelector((store) => store.assets.assetsList);
  const [assetsName, setAssetsName] = useState ('');
  const [assetsNote, setAssetsNote] = useState ('');
  const [assetsValue, setAssetsValue] = useState (0);
  const [userId, setUserId] = useState (0);
  

  useEffect(() => {
    getAssetsList();
  }, []);


  const getAssetsList = () => {
    dispatch({ type: 'FETCH_ASSETS' })
  };


  const addAsset = (event) => {
    event.preventDefault();

    // Validate inputs
    if (assetsName.trim() === '' || assetsValue.trim() === '') {
      alert('Name and Value must not be empty.');
      return;
    }

    axios.post('api/assets', { assets_name: assetsName, assets_note: assetsNote, assets_value: assetsValue, user_id: userId })
      .then(response => {
        getAssetsList();
        // Reset input fields
        setAssetsName('');
        setAssetsNote('');
        setAssetsValue(0);
      })
      .catch(error => {
        console.log(error);
        alert('Something went wrong with Assets POST');
      });
  }


  const deleteAssets = (assetId) => {
    axios.delete(`/api/assets/${assetId}`)
    .then((response) => {
      getAssetsList();
    })
    .catch((error) => {
      console.error(error);
      alert("Something went wrong while deleting the entry");
    });
  }


  const sumAssets = () => {
    let total = 0;
    for(let i = 0; i < assetsList.length; i +=1) {
      total += Number(assetsList[i].assets_value);
    }
    dispatch(updateSumAssets(total));

    return total;
  }

  const updateSumAssets = (sum) => {
    return {
      type: 'UPDATE_SUM_ASSETS',
      payload: sum,
    };
  };


  return (
    <div className='container'>
      <h2 className='title' style={{ padding: '10px', margin: '10px', borderRadius: '10px', border: '2px solid gray' }}>
        Welcome to Assets</h2>
      <div>
        {assetsList.map(assets => (
          <div className='entry' key={assets.id} style={{ padding: '10px', margin: '10px', borderRadius: '10px', border: '2px solid gray' }}>
              <h3>{assets.assets_name} per month ${assets.assets_value}</h3>
              <p> {assets.assets_note} </p>
              <IconButton onClick={() => deleteAssets(assets.id)} style={{ cursor: "pointer" }} aria-label='Delete'>
                <DeleteIcon />
              </IconButton>

          </div>
        ))}
      </div>
      <br></br>
      <br></br>
      <div>
      <h2 className='title'style={{ padding: '10px', margin: '10px', borderRadius: '10px', border: '2px solid gray' }}>
        Monthly Total: ${sumAssets()}</h2>
      </div>
      <br></br>
      <br></br>
      <h2 className='title'style={{ padding: '10px', margin: '10px', borderRadius: '10px', border: '2px solid gray' }}>
        New Asset</h2>
      <form className='form' onSubmit={addAsset} style={{ padding: '10px', margin: '10px', borderRadius: '10px', border: '2px solid gray' }}>
        *Name: <input type="text" placeholder="*" value={assetsName} onChange={e => setAssetsName(e.target.value)} />
        Note: <input type="text" value={assetsNote} onChange={e => setAssetsNote(e.target.value)} />
        *Value: $<input type="text" placeholder="*" value={assetsValue} onChange={e => setAssetsValue(e.target.value)} />
        <br />
        <h6>* is required field</h6>
        <Button variant="contained" type="submit" color="success">Create</Button >
      </form>
    </div>
  );
}


export default Assets;
