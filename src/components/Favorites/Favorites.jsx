import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import './Favorites.css';


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function Favorites() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  // const dispatch = useDispatch;
  // const favoritesList = useSelector((store) => store.favoritesList)
  const store = useSelector((store) => store);
  // const [favorites_name, setFavoritesName] = useState('');

  const [favoritesList, setFavoritesList] = useState([]);
  const [favoritesName, setFavoritesName] = useState ('');
  const [favoritesNote, setFavoritesNote] = useState ('');
  const [favoritesValue, setFavoritesValue] = useState (0);
  const [userId, setUserId] = useState (0);
  

  useEffect(() => {
    getFavoritesList();
  }, []);

  // const getFavoritesList = () => {
  //   dispatch({ type: 'FETCH_FAVORITES_LIST' })
  // };

  const getFavoritesList = () => {
    axios.get('/api/favorites').then((response) => {
        setFavoritesList(response.data);
    }).catch((error) => {
        console.log(error);
        alert('Something went wrong with Favorites GET');
    });
  }

  const addFavorites = (event) => {
    event.preventDefault();
    axios.post('api/favorites', { favorites_name: favoritesName, favorites_note : favoritesNote, favorites_value : favoritesValue, user_id: userId})
    .then(response => getFavoritesList())
    .catch(error => {
      console.log(error);
      alert('Something went wrong with Favorites POST');
    });
  }

  const sendToAssets = (event) => {
    // event.preventDefault();
    axios.post('api/assets', { assets_name: favoritesName, assets_note: favoritesNote, assets_value: favoritesValue})
    .then(response => getAssetsList())
    .catch(error => {
      console.log(error);
      alert('Something went wrong with send to assets');
    });
  }

  const editFavorites = (favoriteEdit) => {
    axios.put(`api/favorites/${favoriteEdit}`)
    // , { favorites_value: favoritesValue })
    .then(response => {
      console.log(response);
      getFavoritesList()
    })
    .catch(error => {
      console.log(error);
      alert('Something went wrong with Favorites PUT');
    });
  }

  const deleteFavorites = (favoriteId) => {
    axios.delete(`/api/favorites/${favoriteId}`)
    .then((response) => {
      getFavoritesList();
    })
    .catch((error) => {
      console.error(error);
      alert("Something went wrong while deleting the entry");
    });
  }

  // const sumFavorites = () => {
  //   let total = 0;
  //   for(let i = 0; i < favoritesList.length; i +=1) {
  //     total += Number(favoritesList[i].favorites_value);
  //   }
  //   return total;
  // }

  return (
    <div>
      <h2>Welcome to Favorites</h2>
      <div>
        {
          favoritesList.map(favorites => (
            <div key={favorites.id} style={{padding: '10px', margin: '10px', borderRadius: '10px', boarder: '2px solid gray' }}>
              <h4>{favorites.favorites_name}  ${favorites.favorites_value}
                <input type="text" placeholder='edit amount' onChange={e => setFavoritesValue(e.target.value)} />
              <button onClick={() => editFavorites(favorites.value)} style={{ cursor: "pointer" }}>Edit</button>
              </h4>
              <p> {favorites.favorites_note} </p>
              <button onClick={() => deleteFavorites(favorites.id)} style={{ cursor: "pointer" }}>Delete</button>
              <button onClick={() => sendToAssets(favorites.id)} style={{ cursor: "pointer "}}>Send to Assets</button>
              <button >Send to Liabilities</button>
            </div>
          ))
        }
      </div>
      <br></br>
      <br></br>
      <h2>New Entry</h2>
      <form onSubmit={addFavorites}>
        Name: <input type="text" value={favoritesName} onChange={e => setFavoritesName(e.target.value)} />
        Note: <input type="text" value={favoritesNote} onChange={e => setFavoritesNote(e.target.value)} />
        Value: <input type="text" value={favoritesValue} onChange={e => setFavoritesValue(e.target.value)} />
        <br />
        <button>Submit</button>
   
      </form>
      <br />
      <br />
      {/* <h2>Monthly Total: ${sumFavorites()}</h2> */}
    </div>
  );
}

export default Favorites;
