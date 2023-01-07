import { signOut } from 'firebase/auth';
import React from 'react';
import { auth } from '../firebase';
import { BiLogOutCircle } from 'react-icons/bi';

const style = {
    logoutBtn: `flex flex-row items-center justify-center gap-2 px-2 py-2 text-pink font-bold rounded-full bg-transparent border-[2px] border-pink hover:bg-pink hover:text-ivory duration-[0.2s]`
}

const logoutGoogle = () => { signOut(auth); }

const Logout = () => {
    return (
        <button className={style.logoutBtn} onClick={logoutGoogle}>
            <BiLogOutCircle className='text-[18px]'/>
        </button>
    )
}

export default Logout;