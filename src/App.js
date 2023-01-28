import React from "react";
import { Helmet } from "react-helmet";
import './App.css';

function App() {
  return (
    <div id="wrapper">

      {/* For Meta and Heading */}
      <Helmet>
        <title>Campfire</title>
        <meta name="keywords" content="HTML,CSS,JavaScript" />
        {/* <link rel="png" type="image/png" href="./images/campfire.png" sizes="16x16" /> */}
      </Helmet>

      {/* Heading/Title*/}
      <div className="p-5 text-6xl font-extrabold text-transparent bg-clip-text text-center bg-gradient-to-r from-yellow-400 to-pink-600">
        Round the Campfire
      </div>
    </div>
  );
}

export default App;
