import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { serverTimestamp, setDoc, doc } from 'firebase/firestore';

const style = {
    btnsWrapper: `flex flex-row justify-center gap-[15px] mt-[15%]`,
    formWrapper: `flex flex-col justify-center gap-[15px] mt-[15%]`,
    inputStyle: `cursor-pointer rounded-xl py-2 px-7 shadow-lg outline-none`,
    buttonStyle: `text-dark-gray font-bold`
}

const Signin = () => {
    const [display, setDisplay] = useState(false);
    const [formDisplay, setFormDisplay] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const googleSignin = async (e) => {
        e.preventDefault();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then((result) => {
            const user = result.user;
            setDoc(doc(db, 'users', user.uid), {
                displayName: user.displayName,
                email: user.email,
                uid: user.uid,
                photoURL: user.photoURL,
                timestamp: serverTimestamp()
            });
        })
    }

    const fbSignin = () => {
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider).then((result) => {
            const user = result.user;
            setDoc(doc(db, 'users', user.uid), {
                displayName: user.displayName,
                email: user.email,
                uid: user.uid,
                photoURL: user.photoURL,
                timestamp: serverTimestamp()
            });
        })
    }

    const emailSignUp = async (e) => {
        e.preventDefault();
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await updateProfile(auth.currentUser, {
            displayName: username
        }).then(
            setDoc(doc(db, 'users', user.uid), {
                displayName: username,
                email: email,
                uid: user.uid,
                photoURL: '',
                timestamp: serverTimestamp()
            })
        )
    }

    const emailSignIn = async (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password);
    }

    return (
        <section>
            <form onSubmit={emailSignUp} className={`${style.formWrapper} ${display ? '' : 'hidden'} ${formDisplay ? '' : 'hidden'}`}>
                <input onChange={(e) => setUsername(e.target.value)} value={username} type='text' name='username' placeholder='name' className={style.inputStyle} required/>
                <input onChange={(e) => setEmail(e.target.value)} value={email} type='email' name='email' placeholder='email' className={style.inputStyle} required/>
                <input onChange={(e) => setPassword(e.target.value)} value={password} type='password' name='password' placeholder='password' className={style.inputStyle} required/>
                <div className='flex flex-row justify-between items-center w-full mt-2'>
                    <input onClick={() => setDisplay(!display)} type='submit' value='Cancel' className={`${style.inputStyle} ${style.buttonStyle} bg-pink`}/>
                    <input type='submit' value='Submit' className={`${style.inputStyle} ${style.buttonStyle} bg-blue`}/>
                </div>
                <p>Already have an account? <button onClick={() => setFormDisplay(!formDisplay)} className='font-bold text-blue'>Sign in</button></p>
            </form>
            <form onSubmit={emailSignIn} className={`${style.formWrapper} ${display ? '' : 'hidden'} ${formDisplay ? 'hidden' : ''}`}>
                <input onChange={(e) => setEmail(e.target.value)} value={email} type='email' name='email' placeholder='email' className={style.inputStyle} required/>
                <input onChange={(e) => setPassword(e.target.value)} type='password' name='password' placeholder='password' className={style.inputStyle} required/>
                <div className='flex flex-row justify-between items-center w-full mt-2'>
                    <input onClick={() => setDisplay(!display)} type='submit' value='Cancel' className={`${style.inputStyle} ${style.buttonStyle} bg-pink`}/>
                    <input type='submit' value='Submit' className={`${style.inputStyle} ${style.buttonStyle} bg-blue`}/>
                </div>
                <p>Don't have an account? <button onClick={() => setFormDisplay(!formDisplay)} className='font-bold text-blue'>Sign up</button></p>
            </form>
            <div className={`${style.btnsWrapper} ${display ? 'hidden' : ''}`}>
                <button onClick={() => setDisplay(!display)} className='flex items-center justify-center w-[50px] h-[50px] bg-pink shadow-xl rounded-full'><HiOutlineMail className='w-full h-2/3 text-dark-gray'/></button>
                <button onClick={googleSignin} className='flex items-center justify-center w-[50px] h-[50px] bg-pink shadow-xl rounded-full'><FaGoogle className='w-1/2 h-full text-dark-gray'/></button>
                <button onClick={fbSignin} className='flex items-center justify-center w-[50px] h-[50px] bg-pink shadow-xl rounded-full'><FaFacebookF className='w-1/2 h-3/6 text-dark-gray'/></button>
            </div>
        </section>
    )
}

export default Signin;