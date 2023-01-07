import React, { useState, useEffect, useRef } from 'react';
import { query, collection, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import Message from './Message';
import { auth } from '../firebase';

const style = {
    section: `h-full overflow-y-scroll scrollbar-hide bg-ivory rounded-t-[50px] md:rounded-t-[5%] shadow-shadowIn`,
    main: `flex flex-col px-[0.7rem] pt-[1rem] pb-[4.5rem] relative overflow-y-scroll drop-shadow-sm`,
}

const Chat = ({receiver}) => {
    const [messages, setMessages] = useState([]);
    const scroll = useRef();
    const user = auth.currentUser;

    useEffect(() => {
        if(receiver) {
            const getData = onSnapshot(
                query(
                    collection(
                        db, 'users', user.uid, 
                        'chatUsers', receiver.uid, 
                        'messages'
                    ), 
                    orderBy('timestamp')
                ), 
                (snapshot) => {
                    setMessages(
                        snapshot.docs.map((doc) => ({
                            id: doc.id,
                            messages: doc.data()
                        }))
                    );
                }
            );
            return getData;
        }
    }, [receiver, user]);

    return (
        <section className={style.section}>
            <div className={style.main}>
                {messages && messages.map((message, index, arr) => (
                    <Message key={message.id} message={message.messages} displayName={arr[index-1]&&arr[index-1].messages.username===message.messages.username?false:true}/>
                ))}
            </div>
            <span ref={scroll}></span>
        </section>
    )
}

export default Chat;