import React from 'react';
import { auth } from '../firebase';

const style = {
    message: `flex max-w-[70%] w-auto items-center shadow-lg py-2 px-3 rounded-tl-full rounded-tr-full`,
    name: `my-[0.5rem] text-dark-gray text-xs`,
    sent: `bg-blue text-dark-gray flex-row-reverse rounded-bl-full justify-self-end text-right`,
    received: `bg-gray-200 text-dark-gray rounded-br-full justify-self-start text-left`,
    sender: `justify-self-end`, receiver: `justify-self-start`,
}

const Message = ({message, displayName}) => {
  const messageClass = message.messageUserId === auth.currentUser.uid ? `${style.sent}` : `${style.received}`; 
  const nameClass = message.messageUserId === auth.currentUser.uid ? `${style.sender}` : `${style.receiver}`; 

  return (
    <div className='grid grid-cols-1 mx-4'>
        <p className={`${style.name} ${nameClass}`}>{displayName&&message.username}</p>
        <div className={`${style.message} ${messageClass}`}>
            <p className='w-full'>{message.message}</p>
        </div>
    </div>
  )
}

export default Message;
