import React, { useEffect } from 'react';
// import GoogleLogin from 'react-google-login';

import { baseUrl } from '../constants';

export default function () {

  const handleCredentialResponse = (response) => {
    const gt = response;
    console.log("Encoded JWT ID token: " + response.credential);
    debugger;
  }

  const onScriptReady = () => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_OAUTH_CLIENTID,
        callback: onSuccess
      });
      window.google.accounts.id.renderButton(
        document.getElementById("SignInbutton"),
        { theme: "outline", size: "large" }  // customization attributes
      );
    }
  }

  useEffect(() => {
    var script = document.createElement('script');

    script.setAttribute('src', 'https://accounts.google.com/gsi/client');

    script.onload = () => {
      onScriptReady();
    }

    document.head.appendChild(script);
  }, []);

  const onSuccess = async (data) => {
    const gt = data;
    debugger
    const res = await fetch(`${baseUrl}/oauth/google`, {
      method: "POST",
      body: JSON.stringify({
        token: data.credential
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const temp = await res.json()
    debugger
  }

  const onFailure = (error) => {
    const gt = error;
    debugger
  }

  console.log({
    env: process.env.REACT_APP_GOOGLE_OAUTH_CLIENTID
  })

  return <div className="">
    <h1>Oauth Example</h1>
    <div id="SignInbutton"></div>
    {/* <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENTID}
      buttonText="Login"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
      isSignedIn={true}
    /> */}
  </div>;
}
