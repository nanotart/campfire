import React from "react";
import { useState, useEffect, useRef } from 'react';
import {handleSubmit} from "../utility/handleSubmit";
import fetchResponse from "../utility/handleSubmit";

const Response = ( props ) => {

  // input type reference
  const dataRef = useRef();

  // handle the submission
  const submitHandler = (e) => {
    e.preventDefault(); 
    props.func(dataRef.current.value)
    handleSubmit(dataRef.current.value)
    dataRef.current.value = ""
  };

  return (
      <div className="bg-[#222222] px-3 py-3 rounded-xl w-72">
        Type Your Answer:
        <form className="-mt-3" onSubmit={submitHandler}>
            <div className="flex justify-around">
                <div>
                    <input type="text" className="text-black rounded-md" ref={dataRef} />
                </div>
                <div>
                    <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-400 text-white font-medium py-1 px-2 border-b-4 border-blue-700 hover:border-blue-500 rounded-md">Submit</button>
                </div>
            </div>
        </form>
      </div>
  );
};

export default Response;