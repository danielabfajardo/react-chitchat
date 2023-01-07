import React, { useEffect, useState } from 'react';
import Sheet from 'react-modal-sheet';
import Logout from './Logout';
import { db, auth, storage } from '../firebase';
import { updateProfile } from 'firebase/auth';
import { CgProfile } from 'react-icons/cg';
import { MdAddPhotoAlternate, MdOutlineCheckCircleOutline, MdOutlineCancel } from 'react-icons/md';
import { ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
//import { updateProfile } from 'firebase/auth';
import { updateDoc, deleteDoc, doc } from 'firebase/firestore';

const style = {
    sheetContent: `flex flex-col items-center justify-center gap-7 my-[7%] mx-[2%]`,
    sheetDiv: `flex flex-col justify-center items-center gap-4`,
    sheetForm: `flex flex-row gap-3 text-[15px]`,
    submitBtn: `px-2 h-[2rem] rounded-full font-bold text-blue cursor-pointer border-[2px] border-blue hover:bg-blue hover:text-ivory duration-[0.15s]`,
    deleteAccBtn: `flex flex-row items-center justify-center px-2 py-2 text-red-400 font-bold rounded-full bg-transparent border-[2px] border-red-400 hover:bg-red-400 hover:text-ivory duration-[0.2s]`
}

const MyProfile = ({isOpen, setOpen}) => {
  const [img, setImg] = useState(null);
  const [imgURL, setImgURL] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const user = auth.currentUser;

  useEffect(() => {
    const getImg = async () => {
        if(img) {
            const imageURL = await getDownloadURL(ref(storage, user.uid));
            setImgURL(imageURL);
        }
    }
    getImg();
  }, [user.uid, img])

  const changeProfileImg = async () => {
    const storageRef = ref(storage, user.uid);
    uploadBytesResumable(storageRef, img);
    await updateProfile(user, {
        photoURL: imgURL
    });
    await updateDoc((doc(db, 'users', user.uid), {
        photoURL: imgURL
    }));
    setImg(null);
  }

  const deleteAccount = () => {
    deleteDoc(doc(db, 'users', user.uid)).then(() => {
        user.delete();
    })
  }

  return (
    <section>
        <div className='absolute'>
            <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
                <Sheet.Container>
                <Sheet.Header />
                <Sheet.Content className={style.sheetContent}>
                    <div className={style.sheetDiv}>
                        {
                            user.photoURL
                            ?<img src={user.photoURL} alt='Profile' className='rounded-full w-[10rem] h-[10rem] object-cover'/>
                            :<CgProfile className='text-[160px]'/>
                        }
                        <div className={style.sheetForm}>
                            <input type='file' id='file' onClick={() => setImg(null)} onChange={(e) => setImg(e.target.files[0])} className='hidden'/>
                            <label htmlFor='file' className='font-bold flex flex-row items-center justify-center cursor-pointer text-purple px-2 h-[2rem] rounded-full border-[2px] border-purple hover:bg-purple hover:text-ivory duration-[0.15s]'>
                                <img src={img} alt='' className='text-[30px]'/>
                                <span className='flex flex-row gap-1'><MdAddPhotoAlternate className='text-[22px]'/>Edit</span>
                            </label>
                            {img&&<button onClick={changeProfileImg} className={style.submitBtn}>Upload</button>}
                        </div>
                        <div className='flex flex-row gap-3 mt-3'>
                            <h1 className='text-[22px]'>{user.displayName}</h1>
                            <Logout />
                        </div>
                        <p>{user.email}</p>
                    </div>
                    {!confirmDelete&&<button onClick={()=>setConfirmDelete(!confirmDelete)} className={style.deleteAccBtn}>Delete Account</button>}
                    {confirmDelete&&<div className='flex flex-col gap-3 items-center justify-center'>
                        <p className='font-bold'>Are you sure you want to delete your account?</p>
                        <p className='text-[12px]'>This action is irreversible and all your data will be lost.</p>
                        <div className='flex flex-row gap-3'>
                            <MdOutlineCheckCircleOutline onClick={deleteAccount} className='text-red-400 cursor-pointer text-[40px]'/>
                            <MdOutlineCancel onClick={()=>setConfirmDelete(!confirmDelete)}  className='text-blue cursor-pointer text-[40px]'/>
                        </div>
                    </div>}
                </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>
        </div>
    </section>
  )
}

export default MyProfile;
