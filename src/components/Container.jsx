import React, { useState } from 'react';
import Contacts from './Contacts';
import ChatBox from './ChatBox';

const style = {
  appContainer: `max-h-screen w-full text-center`,
  sectionContainer: `flex flex-col h-full relative`,
}

const Container = () => {
  const [receiver, setReceiver] = useState(null);
  const [currentView, setCurrentView] = useState('Contacts');

  return (
    <section className={style.appContainer}>
        <div className={style.sectionContainer}>
            {currentView==='Contacts'
                ?<Contacts
                    setReceiver={setReceiver}
                    setCurrentView={setCurrentView}
                 />
                :<ChatBox 
                    receiver={receiver} 
                    setCurrentView={setCurrentView}
                />
            }
        </div>
    </section>
  );
}

export default Container;
