import React from 'react';
import './Header.css';
import Assets from '../Assets/Assets';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Header() {
  return <header className="header">
            <h1 className="header-title">Budget With Interest!  {}</h1>
         </header>;
}

export default Header;