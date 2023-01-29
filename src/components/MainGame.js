import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useState, useEffect, useRef } from "react";
import {
  addImposter,
  updateCurrentQuestion,
  updateShowQuestion,
  updateResponses,
} from "../utility/handleSubmit";
import { doc, getDoc, onSnapshot } from "@firebase/firestore";
import { firestore } from "../firebase_setup/firebase";
import Player from "./Player";
import Response from "./Response";

import Question from "./Question";

const MainGame = (props) => {
  const { user } = useAuth();
  const [players, setPlayers] = useState([]);
  const [imposterId, setImposterId] = useState(null);
  const [questionerId, setQuestionerId] = useState(null);
  const [role, setRole] = useState(null);

  const [askQuestion, setAskQuestion] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const [questionListStart, setQuestionListStart] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [showQuestion, setShowQuestion] = useState(false);

  const [showAskResponse, setShowAskResponse] = useState(false);
  const [responses, setResponses] = useState([
    { response: "" },
    { response: "" },
    { response: "" },
    { response: "" },
  ]);
  const [finished, setFinished] = useState(false);

  const getResponse = (response) => {
    updateResponses(props.roomId, user.uid, response);
  };

  const getQuestion = (question) => {
    console.log(parseInt(question.substring(1, 2)));
    console.log(questionList[parseInt(question.substring(1, 2)) - 1]);
    updateCurrentQuestion(
      props.roomId,
      questionList[parseInt(question.substring(1, 2)) - 1],
      true,
      true
    );
  };

  useEffect(() => {
    const checkGamestate = onSnapshot(
      doc(firestore, "game-rooms", props.roomId),
      (doc) => {
        setImposterId(doc.data().imposterUid);
        setPlayers(doc.data().players);
        setQuestionerId(doc.data().questionerUid);
        setQuestionListStart(doc.data().questionListStart);
        setCurrentQuestion(doc.data().currentQuestion);
        setShowQuestion(doc.data().showQuestion);
        setShowAskResponse(doc.data().showAskResponse);

        if (doc.data().responses.length >= players.length - 1) {
          setResponses(doc.data().responses);
          setFinished(true);
        }
      }
    );

    return () => {
      checkGamestate();
    };
  }, [firestore]);

  useEffect(() => {
    // const getData = async () => {
    //   const docSnap = await getDoc(doc(firestore, "game-rooms", props.roomId));
    //   setImposterId(docSnap.data().imposterUid);
    //   setPlayers(docSnap.data().players);
    //   setQuestionerId(docSnap.data().questionerUid);
    //   setQuestionListStart(docSnap.data().questionListStart);
    //   setCurrentQuestion(docSnap.data().currentQuestion);
    //   setShowQuestion(docSnap.data().showQuestion);
    // };

    const getQuestionData = async () => {
      const docSnap = await getDoc(doc(firestore, "question-bank", "set-1"));
      console.log(docSnap.data().question);
      console.log(
        docSnap.data().question.slice(questionListStart, questionListStart + 3)
      );
      setQuestionList(
        docSnap
          .data()
          .question.slice(questionListStart, questionListStart + 3)
          .map((question) => question.questionA)
      );
    };
    // getData();
    getQuestionData();
  }, [firestore]);

  useEffect(() => {
    if (user.uid === imposterId) {
      setRole("the Ozone Destroyer");
    } else {
      setRole("a camper");
    }

    console.log("you are asking the question" + user.uid === questionerId);
    if (user.uid === questionerId) {
      setAskQuestion(true);
    } else {
      setAskQuestion(false);
    }
  }, [imposterId, questionerId]);

  useEffect(() => {}, [
    players,
    questionList,
    questionListStart,
    currentQuestion,
    showQuestion,
    responses,
  ]);

  return (
    <div>
      <h1>Game</h1>
      <div>
        <h2>You are {role}</h2>
      </div>

      <div>
        {players.map((player, index) => {
          console.log(responses);
          console.log(index);
          let currResponse = "";
          if (responses.length != 0) {
            currResponse = responses[0].response;
          }

          return (
            <Player
              displayName={player.displayName}
              displayBubble={!askQuestion || finished}
              answer={currResponse}
            />
          );
        })}
      </div>

      {showQuestion && <h1>{currentQuestion}</h1>}
      {askQuestion && !showQuestion && (
        <Question questionList={questionList} func={getQuestion} />
      )}
      {!askQuestion && showAskResponse && <Response func={getResponse} />}
    </div>
  );
};

export default MainGame;
