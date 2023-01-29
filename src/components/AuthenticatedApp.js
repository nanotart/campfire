import React from "react";
import { doc, onSnapshot } from "@firebase/firestore";
import { firestore } from "../firebase_setup/firebase";
import { useAuth } from "../hooks/useAuth";
import {
  addPlayer,
  sendStartGame,
  clearPlayers,
} from "../utility/handleSubmit";
import { useState, useEffect, useRef } from "react";
import MainGame from "./MainGame";

let roomId = "1234";
let role = "player";

function AuthenticatedApp() {
  const { user } = useAuth();
  const [playerList, setPlayerList] = useState([]);
  const [showJoinButton, setShowJoinButton] = useState(true);
  const [showStartButton, setShowStartButton] = useState(false);
  const [startGame, setStartGame] = useState(false);

  const joinGame = (event) => {
    event.preventDefault();
    addPlayer(roomId, user);
    setShowJoinButton(false);
    setShowStartButton(true);
  };

  useEffect(() => {
    const checkGamestate = onSnapshot(
      doc(firestore, "game-rooms", roomId),
      (doc) => {
        console.log("Current data: ", doc.data());
        setPlayerList(
          doc.data().players.sort((a, b) => a.timestamp - b.timestamp)
        );
        if (doc.data().startGame) {
          setShowStartButton(false);
          setStartGame(true);
        } else {
          setShowStartButton(true);
          setStartGame(false);
        }
      }
    );

    return () => {
      checkGamestate();
    };
  }, [firestore]);

  // const checkGameStart = onSnapshot(
  //   doc(firestore, "game-rooms", roomId),
  //   (doc) => {
  //     // console.log("Current data: ", doc.data());
  //     if (doc.data().startGame) {
  //       getUsers();
  //       setShowStartButton(false);
  //       setStartGame(true);
  //     }else {
  //       setShowStartButton(true);
  //       setStartGame(false);
  //     }
  //   }
  // );

  const handleStartGame = () => {
    setShowStartButton(false);
    setStartGame(true);
    sendStartGame(roomId, {
      gameStart: true,
      imposterUid:
        playerList[Math.floor(Math.random() * playerList.length)].uid,
      questionerUid: playerList[0].uid,
      startQuestionList: 0,
      showQuestion: false,
      currentQuestion: null,
      showAskResponse: false,
      responses: []
    });
  };

  const handleStopGame = () => {
    setShowStartButton(true);
    setStartGame(false);
    sendStartGame(roomId, {
      gameStart: false,
      imposterUid: null,
      questionerUid: null,
      startQuestionList: null,
      showQuestion: false,
      currentQuestion: null,
      responses: []
    });
    clearPlayers(roomId);
  };

  useEffect(() => {
    if (playerList.map((player) => player.uid).includes(user.uid)) {
      setShowJoinButton(false);
      if (!startGame) {
        setShowStartButton(true);
      }
    } else {
      setShowJoinButton(true);
      setShowStartButton(false);
    }
  }, [playerList, showJoinButton, setShowStartButton, user, startGame]);

  return (
    <div>
      {showJoinButton && (
        <button type="submit" onClick={joinGame} style={{ marginTop: "10px", backgroundColor: "#1E1E1E", padding: "8px", borderRadius: "5px", fontSize: "32px" }}>
          Join Game
        </button>
      )}
      {!startGame && (
        <div className="player-list">
          <h3>Players:</h3>
          <ul>
            {playerList.map(function (item, i) {
              if (item.uid === user.uid) {
                return (
                  <li key={i}>
                    <h4 style={{ color: "yellow" }}>{item.displayName}</h4>
                  </li>
                );
              } else {
                return (
                  <li key={i}>
                    <h4>{item.displayName}</h4>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      )}
      {!showJoinButton && showStartButton && (
        <button type="submit" onClick={handleStartGame} style={{ marginTop: "10px", backgroundColor: "#1E1E1E", padding: "5px", borderRadius: "5px" }}>
          Start Game
        </button>
      )}
      {startGame && <MainGame players={playerList} roomId={roomId} />}

      {startGame && (
        <button
          type="submit"
          style={{ marginTop: "10px", backgroundColor: "red", padding: "5px", borderRadius: "5px" }}
          onClick={handleStopGame}
        >
          Stop Game
        </button>
      )}
    </div>
  );
}

export { AuthenticatedApp };
