import React from "react";

const ChatBubble = ( props ) => {

  return (
      <div className="bg-[#222222] px-3 py-3 rounded-md mt-5 text-white">
        Response: 
        <p>
          {props.getAnswer}
        </p>
      </div>
  );
};

export default ChatBubble;
