import React from 'react';
import Signin from './Signin';
import logo from '../assets/img/chitchat.png';

const Banner = ({sectionContainer}) => {
  return (
    <div className={`${sectionContainer} bg-ivory`}>
        <div className='w-[70%] sm:w-[50%] lg:w-[40%] xl:w-[30%] h-auto'>
          <img src={logo} alt='Logo' className='object-cover'/>
        </div>
        <h1 className='text-[42px] text-dark-gray font-ubuntu font-bold'>chitchat</h1>
        <Signin /> 
    </div>
  )
}

export default Banner
