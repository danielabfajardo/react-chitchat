import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';

const style = {
    nav: `h-[9%] flex justify-between items-center px-6 py-3 bg-ivory`,
    img: `rounded-full h-[2.5rem] w-auto`,
    btn: `px-3 py-3 text-ivory rounded-full`,
}

const NavBar = ({receiver, setCurrentView}) => {
    return (
        <div className={style.nav}>
            <div className='flex flex-row h-full w-auto items-center gap-3'>
                <button onClick={() => setCurrentView('Contacts')}><MdOutlineArrowBackIosNew /></button>
                {receiver.photoURL
                    ?<img src={receiver.photoURL} alt='Profile' className={style.img}/>
                    :<CgProfile className='text-[32px]'/>
                }
                <h3 className='text-18 font-bold text-dark-gray'>{receiver.displayName}</h3>
            </div>
        </div>
    )
}

export default NavBar;
