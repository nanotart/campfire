import React from "react";
import VoteCard from './VoteCard';
import { useState, useEffect, useRef } from "react";

const VotePage = (props) => {

  const playerList = [
    {"id": 123, "displayBubble": true, "displayName": "John"}, 
    {"id": 456, "displayBubble": true, "displayName": "Jane"}, 
    {"id": 789, "displayBubble": false, "displayName": "Ralph"}, 
    {"id": 987, "displayBubble": true, "displayName": "Sara"}
  ];

  // input type reference
  let dataRef = useRef();

  // handle the submission
  const submitHandler = (e) => {
    e.preventDefault();
    props.func(dataRef.current.value);
    dataRef.current.value = "";
  };

  //useref
  return (
    <div className="bg-[#222222] px-3 py-3 rounded-xl w-72 text-white">
      <form id="form">
        <p id="form-prompt">Voting</p>
          <input type="radio" id="q1" name="group1" value="q1" ref={dataRef} />
          <label for="q1"> {playerList[0].displayName}</label>
        <br />
          <input type="radio" id="q2" name="group1" value="q2" ref={dataRef} />
          <label for="q2"> {playerList[1].displayName}</label>
        <br />
          <input type="radio" id="q3" name="group1" value="q3" ref={dataRef}/>
          <label for="q3"> {playerList[2].displayName}</label>
        <br />
          <input type="radio" id="q3" name="group1" value="q3" ref={dataRef}/>
          <label for="q3"> {playerList[3].displayName}</label>
      </form>
      <button
          className="w-18 bg-gradient-to-r from-[#FCDC4D] to-[#BF0603] hover:bg-red-400 text-white font-medium py-2 px-2 rounded-md text-center"
          type="submit"
          onClick={submitHandler}
        >
          Submit
        </button>
    </div>
   );
}

export default VotePage;