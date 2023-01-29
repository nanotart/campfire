import React from "react";
import { useState } from "react";

const VoteCard = (props) => {
  return (
    <div className="flex flex-row justify-center relative">
        <div>
            {props.name}
        </div>
    </div>
  )
};

export default VoteCard;