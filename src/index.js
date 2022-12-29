import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import VideoConference from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>

    <div className="video-conference"><VideoConference /></div>
    
  </React.StrictMode>
);

