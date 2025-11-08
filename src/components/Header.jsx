import React, { useEffect, useRef, useState } from 'react';
import logo from './../assets/images/logo 2.png';
import { HiHome ,HiOutlineSearchCircle,HiPlus,HiStar,HiOutlinePlay,HiOutlineDotsVertical,HiOutlineFilm, HiDotsCircleHorizontal } from 'react-icons/hi';
import HeaderItem from './HeaderItem';

function Header() {

  const [showDropdown,setShowDropdown]=useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);


    const menu=[
        {
            name:'HOME',
            icon:HiHome
        },
        {
            name:'SEARCH',
            icon:HiOutlineSearchCircle
        },
        {
            name:'WATCH LIST',
            icon:HiPlus
        },
        {
            name:'ORIGINALS',
            icon:HiStar
        },
        {
            name:'MOVIES',
            icon:HiOutlineFilm
        },
        {
            name:'SERIES',
            icon:HiOutlinePlay
        }
    ]

  return (
  <div className="w-full flex items-center justify-between p-5">
  <div className='flex gap-8 items-center'>
  <img
    src={logo}
    className="max-w-[180px] object-cover"
    alt="StreamSpace Logo"
  />
  <div className='hidden md:flex gap-8'>
    {menu.map((item) => (
      <HeaderItem key={item.name} name={item.name} Icon={item.icon} />
    ))}
    </div>
    <div className='flex md:hidden gap-5'>
    {menu.map((item,index) =>index <3 && (
      <HeaderItem  name={''} Icon={item.icon} />
    ))}
    <div className='md:hidden relative' ref={dropdownRef}>

    <div className='md:hidden' onClick={()=>setShowDropdown(!showDropdown)}>
        <HeaderItem name={'More'} Icon={HiOutlineDotsVertical} />
       {showDropdown? <div className='absolute mt-3 z-10 bg-[#23242a] border-[1px] border-gray-700 p-3' showDropdown={false}>
           {menu.map((item,index) =>index >2 && (
      <HeaderItem name={item.name} Icon={item.icon} />
    ))}
        </div>:null}
    </div>
    </div>
    </div>
  </div>

 
  <img
    src="https://i.pinimg.com/736x/c5/76/7d/c5767da5b5f369c9c28a67444efc3a0d.jpg"
    className="w-[40px] md:w-[50px] rounded-full "
    alt="User Profile"
  />
</div>





  )
}

export default Header


