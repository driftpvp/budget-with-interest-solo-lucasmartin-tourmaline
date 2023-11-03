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
  const [assetsNote, setAssetsNote] = useState ('');
  const [assetsValue, setAssetsValue] = useState (0);
  const [userId, setUserId] = useState (0);
  

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
        setAssetsValue('');
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
    return total;
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
              <button onClick={() => deleteAssets(assets.id)} style={{ cursor: "pointer" }}>Delete</button>
            </div>
          ))
        }
      </div>
      <br></br>
      <br></br>
      <h2>New Entry</h2>
      <form onSubmit={addAsset}>
        *Name: <input type="text" placeholder="*" value={assetsName} onChange={e => setAssetsName(e.target.value)} />
        Note: <input type="text" value={assetsNote} onChange={e => setAssetsNote(e.target.value)} />
        *Value: $<input type="text" placeholder="*" value={assetsValue} onChange={e => setAssetsValue(e.target.value)} />
        <br />
        <h6>* is required field</h6>
        <button>Submit</button>
      </form>
      <br />
      <br />
      <h2>Monthly Total: ${sumAssets()}</h2>
    </div>
  );
}

export default Assets;
