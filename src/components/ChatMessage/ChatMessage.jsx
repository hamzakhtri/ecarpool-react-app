import React from 'react'
import { useSelector } from 'react-redux';

function ChatMessage({ message }) {

    const date = new Date(message.messageTime);

    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    const localTimeString = date.toLocaleTimeString([], options);
    const user = useSelector(state => state.user.currentUser);


    return (

        <div className={`d-flex ${message.senderName === user.username ? "justify-content-end" : "justify-content-start"}`}>
            <div className={`${message.senderName === user.username ? "bg-dark-blue" : "bg-dark-lightblue"} message`}>
                <p className='m-0'>{message.msg}</p>
                <p className='m-0 small' style={{ textAlign: "right" }}><small>{localTimeString}</small></p>
            </div>
        </div>

    )
}

export default ChatMessage