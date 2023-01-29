import React from "react";
import { useState, useEffect, useRef } from "react";

const Question = (props) => {
  const [questionList, setQuestionList] = useState(["hello", "test", "test"]);
  const [selection, setSelection] = useState("");
  // input type reference

  // handle the submission
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(selection)
    props.func(selection);
    setSelection("");
  };
  
  useEffect(() => {
    setQuestionList(props.questionList);
  }, [props]);

  useEffect(() => {
  }, [selection]);


  function onValueChange(event) {
    event.preventDefault();
    setSelection(event.target.value)
  }
  
  return (
    <div className="bg-[#222222] px-3 py-3 rounded-xl w-72">
      <form id="form" onSubmit={submitHandler}>
        <p id="form-prompt">Question</p>
        <input type="radio" id="q1" name="group2" value="q1" onChange={onValueChange} />
        <label for="q1"> {questionList.at(0)}</label>
        <br />
        <input type="radio" id="q2" name="group2" value="q2" onChange={onValueChange}  />
        <label for="q2"> {questionList[1]}</label>
        <br />
        <input type="radio" id="q3" name="group2" value="q3" onChange={onValueChange} />
        <label for="q3"> {questionList[2]}</label>

        <div>
        <button
            className="mt-3 w-20 bg-gradient-to-r from-[#FCDC4D] to-[#BF0603] hover:bg-red-400 text-white font-medium py-3 px-3 rounded-md text-center"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Question;
