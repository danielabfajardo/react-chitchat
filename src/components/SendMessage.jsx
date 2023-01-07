import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
//import { RiSendPlaneFill } from 'react-icons/ri';
import InputEmoji from 'react-input-emoji';

const SendMessage = ({scroll, receiver}) => {
    const [input, setInput] = useState('');

    const sendMessage = async () => {
        if (input === '') { alert('Please enter a valid message'); return; }
        const user = auth.currentUser;
        await addDoc(collection(db, 'users', user.uid, 'chatUsers', receiver.uid, 'messages'), {
                username: user.displayName,
                messageUserId: user.uid,
                message: input,
                timestamp: serverTimestamp()
        }).then(
            await addDoc(collection(db, 'users', receiver.uid, 'chatUsers', user.uid, 'messages'), {
                username: user.displayName,
                messageUserId: user.uid,
                message: input,
                timestamp: serverTimestamp()
            })
        )
        setInput('');
        //scroll.current.scrollIntoView({behavior: 'smooth'});
    }

    return (
        <InputEmoji value={input} onChange={setInput} cleanOnEnter onEnter={sendMessage} placeholder='Type a message...' borderColor={'#230738'}/> 
    )
}

export default SendMessage;
