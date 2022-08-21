
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Oauth from './Oauth';
import OauthSuccess from './Oauth/OauthSuccess';

function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Oauth />} />
        <Route path="oauth" element={<OauthSuccess />} />
      </Routes>
    </div>
  );
}

function AppWrapper() {


  return <BrowserRouter>
    <App />
  </BrowserRouter>
}

export default AppWrapper;
