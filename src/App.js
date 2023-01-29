import React from "react";
import { Helmet } from "react-helmet";
import { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { AuthenticatedApp } from './components/AuthenticatedApp';
import { UnauthenticatedApp } from './components/UnauthenticatedApp';
import VotePage from './components/VotePage';
import VoteCard from './components/VoteCard';
import Map from './images/final-map.png';
import Player from './components/Player';
import Response from './components/Response';
import Question from './components/Question';
import MainGame from './components/MainGame';
import './App.css';

function App() {
  const { user } = useAuth();
  const [startGame, setStartGame] = useState(false);
  // temporary list of players for voting functionality
  const [playerList, setPlayerList] = useState([
    {"id": 123, "displayBubble": true, "displayName": "John"}, 
    {"id": 456, "displayBubble": true, "displayName": "Jane"}, 
    {"id": 789, "displayBubble": false, "displayName": "Ralph"}, 
    {"id": 987, "displayBubble": true, "displayName": "Sara"}]);

  return (
    <div className="bg-[#1E1E1E]">

      {/* Head */}
      <Helmet>
        <title>Campfire</title>
        <meta name="keywords" content="HTML,CSS,JavaScript" />
      </Helmet>

      {/* Main Game */}
      <main>

        {/* Game Title */}
        <section className="flex justify-center items-center container mx-auto">
          <div className="p-5 text-6xl font-extrabold text-transparent bg-clip-text text-center bg-gradient-to-r from-[#FCDC4D] to-[#BF0603]">
            Around the Campfire
          </div>
        </section>

        {/* Image Container */}
        <section className="container relative mx-auto">
          <img className="flex mx-auto rounded-3xl w-1/2 h-1/2" src={Map} alt="" />

          {/* top right */}
          <div className="absolute left-1/2 top-1/2 translate-x-16 -translate-y-5">
            <Player left={false}/>
          </div>
          {/* bottom right */}
          <div className="absolute left-1/2 top-1/2 translate-x-8 translate-y-12">
            <Player left={false}/>
          </div>
          {/* top left */}
          <div className="absolute right-1/4 top-1/2 -translate-x-96 -translate-y-10">
            <Player left={true}/>
          </div>
          {/* bottom left */}
          <div className="absolute left-1/2 top-1/2 -translate-x-44 translate-y-10">
            <Player left={true}/>
          </div>
          
          <div className="invisible absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-48">
            <Response />
          </div> 

          {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-40">
            <Question />
          </div> */}
        </section>

        <section className="container relative mx-auto">
          <div className="mt-3 flex items-center justify-center">
              <div className="mt-3 mb-20 w-96 bg-gradient-to-r from-[#FCDC4D] to-[#BF0603] hover:bg-red-400 text-white font-medium py-3 px-3 rounded-md text-center">
                {user ? <AuthenticatedApp /> : <UnauthenticatedApp className="text-black"/>}
              </div>
          </div>
        </section>

        {/* <VotePage getPlayerList={playerList}/> */}
        {/* {user ? <AuthenticatedApp /> : <UnauthenticatedApp />} */}

      </main>
    </div>
  );
}

export default App;
