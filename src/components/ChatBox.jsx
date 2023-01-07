import React from 'react';
import NavBar from './NavBar';
import Chat from './Chat';
import SendMessage from './SendMessage';

const style = {
  appContainer: `text-center h-screen bg-ivory`,
  sectionContainer: `flex flex-col h-full`,
}

const ChatBox = ({receiver, setCurrentView}) => {

  return (
    <section className={style.appContainer}>
        <div className={style.sectionContainer}>
            <NavBar receiver={receiver} setCurrentView={setCurrentView}/>
            <Chat receiver={receiver}/>
            <SendMessage receiver={receiver}/>
        </div>
    </section>
  );
}

export default ChatBox;