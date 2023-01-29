import React from 'react';
import ChatBubble from './ChatBubble';
import Ghost from '../images/final-ghost.png';
import Response from './Response';
import { useState, useEffect } from 'react';

const Player = ( props ) => {

    // useState for chat bubble answers
    const [answer, updateAnswer] = useState("")
    const [isVisible, updateisVisible] = useState(false)
    const isLeft = props.left;

    // updates the useState answer based on chat submissions
    const handleData = (chatData) => {
        updateAnswer(chatData)
    }

    useEffect(() => {
        updateAnswer(props.answer)
        console.log(answer)
    }, [props])

    // Gives us the order of the chat bubbles
    const chatBubbleOrder = (boolean) => {
        // if the camper is on the left side of the page
        if (boolean === true) {
            return (
                // if the ghost is on the left side
                <div className="flex flex-row justify-center relative">
                    <div>
                        {props.displayName}
                    </div>
                    <div className="">
                        {isVisible ? <ChatBubble getAnswer={answer}/> : null}
                    </div>
                    <div>
                        <img className="w-14 h-18" src={Ghost}/>
                    </div>
                </div>
            );
        } else {
            return (
                // if the ghost is on the right side
                <div className="flex flex-row justify-center relative">
                    <div>
                        {props.displayName}
                    </div>
                    <div>
                        <img className="w-14 h-18" src={Ghost}/>
                    </div>
                    <div className="">
                        {isVisible ? <ChatBubble getAnswer={answer}/> : null}
                    </div>
                </div>
            );
        }
    }

    useEffect(() => {
        updateisVisible(true);
    });

    // non async useEffect
    useEffect(() => { 
    },[answer])

    return (
        <div>
            { chatBubbleOrder(isLeft) }
        </div>
    );

}

export default Player;