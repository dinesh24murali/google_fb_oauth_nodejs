import React, { useEffect } from 'react';

import { baseUrl } from '../constants';

export default function () {

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
    if (!data || !data.credential)
      return;
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

  return <div className="">
    <h1>Oauth Example</h1>
    <div id="SignInbutton"></div>
  </div>;
}
