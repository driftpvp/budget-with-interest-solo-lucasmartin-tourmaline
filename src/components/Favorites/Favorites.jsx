import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import './Favorites.css';


function Favorites() {
  const store = useSelector((store) => store);
  const [favoritesList, setFavoritesList] = useState([]);
  const [favoritesName, setFavoritesName] = useState ('');
  const [favoritesNote, setFavoritesNote] = useState ('');
  const [favoritesValue, setFavoritesValue] = useState (0);
  const [userId, setUserId] = useState (0);
  

  useEffect(() => {
    getFavoritesList();
  }, []);


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

    // Validate inputs
    if (favoritesName.trim() === '' || favoritesValue.trim() === '') {
      alert('Name and Value must not be empty.');
      return;
    }

    axios.post('api/favorites', { favorites_name: favoritesName, favorites_note : favoritesNote, favorites_value : favoritesValue, user_id: userId})
    .then(response => {getFavoritesList()
      // Reset input fields
      setFavoritesName('');
      setFavoritesNote('');
      setFavoritesValue('');
    })
    .catch(error => {
      console.log(error);
      alert('Something went wrong with Favorites POST');
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


  return (
    <div className='container'>
      <h2 className='title' style={{ padding: '10px', margin: '10px', borderRadius: '10px', border: '2px solid gray' }}>
        Welcome to Favorites</h2>
      <div>
        {
          favoritesList.map(favorites => (
            <div className='entry' key={favorites.id} style={{ padding: '10px', margin: '10px', borderRadius: '10px', border: '2px solid gray' }}>
              <h4>{favorites.favorites_name}  ${favorites.favorites_value}
              </h4>
              <p> {favorites.favorites_note} </p>
              <button onClick={() => deleteFavorites(favorites.id)} style={{ cursor: "pointer" }}>Delete</button>
            </div>
          ))
        }
      </div>
      <br></br>
      <br></br>
      <h2 className='title' style={{ padding: '10px', margin: '10px', borderRadius: '10px', border: '2px solid gray' }}>
        New Entry</h2>
      <form className='form' onSubmit={addFavorites} style={{ padding: '10px', margin: '10px', borderRadius: '10px', border: '2px solid gray' }}>
        *Name: <input type="text" placeholder="*" value={favoritesName} onChange={e => setFavoritesName(e.target.value)} />
        Note: <input type="text" value={favoritesNote} onChange={e => setFavoritesNote(e.target.value)} />
        *Value: $<input type="text" placeholder="*" value={favoritesValue} onChange={e => setFavoritesValue(e.target.value)} />
        <br />
        <h6>* is required field</h6>
        <button>Submit</button>
   
      </form>
      <br />
      <br />
    </div>
  );
}

export default Favorites;
