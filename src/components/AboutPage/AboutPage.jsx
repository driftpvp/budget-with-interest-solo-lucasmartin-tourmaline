import React from 'react';
import './AboutPage.css'

function AboutPage() {
  return (
    <div className="container">
      <div className="list" style={{ padding: '10px', margin: '10px', borderRadius: '10px', border: '2px solid gray' }}>
      <h3>--Created With--</h3>
      <ul className='tech used'>
        <p>Heroku</p>
        <p>Material UI</p>
        <p>Node.js</p>
        <p>React-Redux and Sagas</p>
        <p>Passport</p>
        <p>PostgreSQL</p>
        <p>Postico</p>
        <p>Background images provided by: Rawpixel.com</p>
      </ul>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className='icons'>
        <img src="images/heroku-icon.png" alt="Heroku" width="80" height="80" />
        <img src="images/materialUI.png" alt="Material UI" width="80" height="80" />
        <img src="images/node-js.svg" alt="Node.js" width="80" height="80" />
        <img src="images/react-logo.svg" alt="React-Redux and Saga" width="80" height="80" />
        <img src="images/passport-icon.png" alt="Passport" width="80" height="80" />
        <img src="images/postgre.png" alt="PostgreSQL" width="80" height="80" />
        <img src="images/postico.png" alt="Postico" width="80" height="80" />
        <img src="images/rawpixel.png" alt="Rawpixel.com" width="80" height="80" />
      </div>
    </div>
  );
}

export default AboutPage;
