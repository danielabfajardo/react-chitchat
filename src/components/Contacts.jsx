import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineArrowForwardIos, MdPersonAddAlt1 } from 'react-icons/md';
import { collection, onSnapshot, getDocs, setDoc, doc, serverTimestamp, where, query } from 'firebase/firestore';
import MyProfile from './MyProfile';
import Logout from './Logout';

const style = {
    appContainer: `w-full text-center h-screen`,
    sectionContainer: `flex flex-col min-h-screen`,
    innerContainer: `rounded-t-[50px] md:rounded-t-[5%] bg-ivory h-full shadow-shadowIn`,
    navBar: `h-[8.5%] flex flex-row items-center justify-between px-5 text-dark-gray bg-ivory`,
    searchForm: `text-[15px] flex flex-row items-center justify-center gap-3 pt-10`,
    searchBar: `w-2/3 px-5 py-2 border-[1.5px] border-blue rounded-[30px] outline-none bg-ivory`,
    searchBtn: `px-5 py-2 hover:bg-blue rounded-[30px] hover:text-ivory cursor-pointer border-[2px] border-blue bg-transparent text-purple duration-[0.2s]`,
    contactEach: `flex flex-row justify-between items-center hover:bg-gray-200 py-4 px-4 cursor-pointer rounded-[15px] duration-[0.25s]`,
    contactText: `text-dark-gray text-18 flex flex-row gap-3 items-center flex-1`,
    btn: `px-3 py-3 text-ivory rounded-full`,
    img: `rounded-full h-[2.1rem] w-[2.1rem] object-cover`,
}

const Contacts = ({setReceiver, setCurrentView}) => {
    const [isOpen, setOpen] = useState(false);
    const [result, setResult] = useState(null);
    const [searchEmail, setSearchEmail] = useState('');
    const [err, setErr] = useState(false);
    const [chatUsers, setChatUsers] = useState([]);
    const [searchEmailIsFriend, setSearchEmailIsFriend] = useState(false);

    useEffect(() => {
        const getChatUsers = onSnapshot(collection(db, 'users', auth.currentUser.uid, 'chatUsers'), 
            (snapshot) => {
                setChatUsers(snapshot.docs.map((doc) => doc.data()))
            }
        );
        return () => getChatUsers();
    }, [setChatUsers]);

    const handleSearch = async (e) => {
        e.preventDefault();
        const q = query(
            collection(db, 'users'),
            where('email', '==', searchEmail)
        );
        try {
            const snapshot = await getDocs(q);
            snapshot.forEach((doc) => {
                setResult(doc.data());
            });
            setSearchEmailIsFriend(chatUsers.filter(item => searchEmail===item.email)>-1?false:true);
        } catch (err) {
            setErr(true);
        }
    }

    const addFriend = () => {
        setDoc(doc(db, 'users', auth.currentUser.uid, 'chatUsers', result.uid), {
            uid: result.uid,
            displayName: result.displayName,
            email: result.email,
            photoURL: result.photoURL,
            timestamp: serverTimestamp()
        })
        setDoc(doc(db, 'users', result.uid, 'chatUsers', auth.currentUser.uid), {
            uid: auth.currentUser.uid,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL,
            timestamp: serverTimestamp()
        })
        setSearchEmail('');
        setResult(null);
    }

    const searchedFriend = async (e) => {
        if(searchEmailIsFriend) {
            setCurrentView('ChatBox'); 
            setSearchEmail('');
            setResult(null);
        } else {
            addFriend(e);
        }
    }

  return (
    <section className={style.sectionContainer}>
        <div className={style.appContainer}>
            <div className={style.navBar}>
                <div className='flex flex-row items-center'>
                    {auth.currentUser.photoURL
                        ?<button onClick={() => setOpen(true)} className={`${style.btn}`}>
                            <img src={auth.currentUser.photoURL} alt='Profile' className={style.img}/>
                        </button>
                        :<button onClick={() => setOpen(true)} className={`${style.btn}`}>
                            <CgProfile className={`${style.img} text-dark-gray`}/>
                        </button>
                    }
                    <h3 className='text-18 font-bold'>{auth.currentUser.displayName}</h3>
                </div>
                <Logout />
            </div>
            <div className='bg-ivory h-full'>
                <div className={style.innerContainer}>
                    <form onSubmit={handleSearch} className={style.searchForm}>
                        <input type='search' onChange={(e) => { setSearchEmail(e.target.value); }} 
                            value={searchEmail} placeholder='Search by email...' className={style.searchBar}/>
                        <input type='submit' value='Search' className={style.searchBtn}/>
                    </form>
                    {searchEmail&&result&&
                        <div className='px-8 pt-8 flex flex-col'>
                            <button onClick={
                                    (e) => {
                                        setReceiver(result); 
                                        searchedFriend(e);
                                    }
                                } className={`${style.contactEach} border border-purple`}>
                                <span className={style.contactText}>
                                    {result.photoURL
                                        ?<img src={result.photoURL} alt='User Profile' className={style.img}/>
                                        :<CgProfile className={`${style.img} text-[25px] text-dark-gray`}/>
                                    }
                                    <span>{result.displayName}</span>
                                </span>
                                {
                                    searchEmailIsFriend?<MdOutlineArrowForwardIos />
                                    :<div><MdPersonAddAlt1 className={`${style.img} h-[1.6rem] duration-[0.15s]`}/></div>
                                }
                            </button>
                        </div>
                    }
                    {err&&<span>User not found.</span>}
                    <div className='p-8 flex flex-col'>{chatUsers.map(item => {
                        return (
                            <button key={item.uid} onClick={() => {setReceiver(item); setCurrentView('ChatBox');}} className={style.contactEach}>
                                <span className={style.contactText}>
                                    {item.photoURL
                                        ?<img src={item.photoURL} alt='User Profile' className={style.img}/>
                                        :<CgProfile className={`${style.img} text-dark-gray`}/>
                                    }
                                    <span>{item.displayName}</span>
                                </span>
                                <MdOutlineArrowForwardIos />
                            </button>
                        )
                    })}
                    </div>
                </div>
            </div>
        </div>
        <MyProfile setOpen={setOpen} isOpen={isOpen}/>
    </section>
  )
}

export default Contacts;
