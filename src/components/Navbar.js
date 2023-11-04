import React, { useState } from 'react'
import {
    Link, useNavigate
} from "react-router-dom";
import {HiMenuAlt4} from 'react-icons/hi';
import {AiOutlineClose} from 'react-icons/ai';
import logo from '../images/logo3.png';
const NavbarItems=({title,classProps})=>{
    return (
        <li className={`mx-4 cursor-pointer ${classProps}`}>
            {title}
        </li>
    )
}


const Navbar = () => {
    const [toggleMenu,setToggleMenu]=useState(false);
    let history=useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem('token');
        history('/login');
    }

  return (
    <nav className=' fixed bg-black w-full flex md:justify-center justify-between items-center '>
        <div className='md:flex-[0.5] flex-initial justify-center items-center  '>
            <img src={logo} alt='logo' className='w-44 cursor-pointer '/>
        </div>
        <ul className='text-white md:flex hidden list-none flex-row justify-between text-center flex-initial'>
            {["Market","Exchange","Tutorials","Wallets"].map((item,index)=>(
                <NavbarItems key={item+index} title={item} />
            ))}
            {!localStorage.getItem('token')?
            <>
            <li className='bg-blue-800 py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-white hover:text-black'>
            <Link className="" aria-current="page" to="/login">Login</Link>
            </li>
            <li className='bg-white text-black py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-black hover:text-white duration-300'>
            <Link className="" aria-current="page" to="/signup">SignUp</Link>
            </li></>:
            <li onClick={handleLogout} className='bg-blue-700 text-white py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-blue-900 hover:text-white duration-300'>
            Logout
            </li>
            }
        </ul>
        <div className='flex relative state'>
                {toggleMenu
                ? <AiOutlineClose fontSize={28} className='text-white md:hidden cursor-pointer' onClick={()=>setToggleMenu(false)}/>
                : <HiMenuAlt4 fontSize={28} className='text-white md:hidden cursor-pointer' onClick={()=>setToggleMenu(true)}/>
            }
            {toggleMenu && (
                <ul className='z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in'>
                    <li className='text-xl w-full my-2 '>
                        <AiOutlineClose className='' onClick={()=>setToggleMenu(false)}/>
                    </li>
                    {["Market","Exchange","Tutorials","Wallets"].map((item,index)=>(
                <NavbarItems key={item+index} title={item} classProps="m-2 text-lg"/>
            ))}
                </ul>
            )}
        </div>
    </nav>
  )
}

export default Navbar
