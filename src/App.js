import React from 'react';
import Container from './components/Container';
import Banner from './components/Banner';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const style = {
  sectionContainer: `flex flex-col items-center justify-center min-h-screen w-full`,
}

function App() {
  const [user] = useAuthState(auth);

  return (
      <section className={style.sectionContainer}>
        {user ? <Container /> : <Banner sectionContainer={style.sectionContainer}/> }
      </section>
  );
}

export default App;
