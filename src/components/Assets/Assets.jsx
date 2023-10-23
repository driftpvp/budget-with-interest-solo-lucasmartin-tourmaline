import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import './Assets.css';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function Assets() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  // const dispatch = useDispatch;
  // const assetsList = useSelector((store) => store.assetsList)
  const store = useSelector((store) => store);
  // const [assets_name, setAssetsName] = useState('');

  const [assetsList, setAssetsList] = useState([]);
  const [assetsName, setAssetsName] = useState ('');
  // const [assets_note, setAssetsNote] = useState ('');
  const [assetsValue, setAssetsValue] = useState (0);

  useEffect(() => {
    getAssetsList();
  }, []);

  // const getAssetsList = () => {
  //   dispatch({ type: 'FETCH_ASSETS_LIST' })
  // };

  const getAssetsList = () => {
    axios.get('/api/assets').then((response) => {
        setAssetsList(response.data);
    }).catch((error) => {
        console.log(error);
        alert('Something went wrong with Assets GET');
    });
  }

  return (
    <div>
      <h2>Welcome to Assets</h2>
      <div>
        {
          assetsList.map(assets => (
            <div key={assets.id} style={{padding: '10px', margin: '10px', borderRadius: '10px', boarder: '2px solid gray' }}>
              <h4>{assets.assets_name} per month ${assets.assets_value}</h4>
              <p> {assets.assets_note} </p>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Assets;
