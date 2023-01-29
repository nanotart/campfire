import {
  addDoc,
  updateDoc,
  collection,
  getFirestore,
  serverTimestamp,
  arrayUnion,
  Timestamp,
  doc,
  getDoc,
  onSnapshot,
} from "@firebase/firestore";
import { firestore } from "../firebase_setup/firebase";

const handleSubmit = async (testdata) => {
  let finalList = ["test1", "test2", "test3"];
  try {
    const docRef = await addDoc(collection(firestore, "Rounds"), {
      playerResponses: finalList,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const addPlayer = async (roomId, user) => {
  try {
    await updateDoc(doc(firestore, "game-rooms", roomId), {
      players: arrayUnion({
        uid: user.uid,
        displayName: user.displayName,
        timestamp: new Date().getTime(),
      }),
    });
  } catch (error) {
    console.error(error);
  }
};

const sendStartGame = async (roomId, gamestate) => {
  try {
    console.log("sending start game");
    console.log(gamestate);
    await updateDoc(doc(firestore, "game-rooms", roomId), {
      imposterUid: gamestate.imposterUid,
      startGame: gamestate.gameStart,
      questionerUid: gamestate.questionerUid,
      startQuestionList: gamestate.startQuestionList,
      currentQuestion: gamestate.currentQuestion,
      showQuestion: gamestate.showQuestion,
      showAskResponse: false,
      responses: gamestate.responses
    });
  } catch (error) {
    console.error(error);
  }
};

const clearPlayers = async (roomId) => {
  try {
    await updateDoc(doc(firestore, "game-rooms", roomId), {
      players: [],
    });
  } catch (error) {
    console.error(error);
  }
};

const updateQuestioner = async (roomId, prevQuestionStart) => {
  try {
    await updateDoc(doc(firestore, "game-rooms", roomId), {
      players: [],
      startQuestionList: prevQuestionStart + 3,
    });
  } catch (error) {
    console.error(error);
  }
};

const updateCurrentQuestion = async (roomId, question, showQuestion, showAskResponse) => {
  try {
    await updateDoc(doc(firestore, "game-rooms", roomId), {
      currentQuestion: question,
      showQuestion: showQuestion,
      showAskResponse: showAskResponse
    });
  } catch (error) {
    console.error(error);
  }
};

const updateResponses = async (roomId, userId, response) => {
  try {
    await updateDoc(doc(firestore, "game-rooms", roomId), {
      responses: arrayUnion({
        uid: userId,
        response: response,
      }),
    });
  } catch (error) {
    console.error(error);
  }
};

export {
  handleSubmit,
  addPlayer,
  sendStartGame,
  clearPlayers,
  updateCurrentQuestion,
  updateResponses
};
