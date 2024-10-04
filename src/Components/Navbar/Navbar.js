import React from 'react'
import { Link } from 'react-router-dom'




//imported icons
import { IoSearchOutline } from "react-icons/io5";


export default function Navbar() {
  return (
    <div>
      <div className='w-full bg-[#0f1120] flex justify-between items-center fixed top-0 z-50 py-5 px-10'>
    	<div>
            <img src="https://i.imgur.com/RG6qk7K.png" alt=""  className='w-[160px]'/>
        </div>
        <div className='flex justify-between items-center'>
            <li className='list-none text-white mx-5 tracking-wider hover:text-[#942d94] duration-150 ease-in-out'><Link to="/animevers_x/">Home</Link></li>
            <li className='list-none text-white mx-5 tracking-wider hover:text-[#942d94] duration-150 ease-in-out'><Link to="/animevers_x/watch">Watch</Link></li>
            <li className='list-none text-white mx-5 tracking-wider hover:text-[#942d94] duration-150 ease-in-out'><Link to="/animevers_x/">About</Link></li>
            <li className='list-none text-white mx-5 tracking-wider hover:text-[#942d94] duration-150 ease-in-out'><Link to="/animevers_x/">Contact</Link></li>
        </div>
        {/* <div>
            <div className='flex justify-start items-center'>
                <input type="text" className='py-3 pl-5 pr-20 bg-[#1d2032]  text-white rounded-md outline-none focus:outline-[#971697] ' placeholder='Search...'/>
                <button className='p-3 text-white bg-[#952295] text-2xl rounded-md mx-3'><IoSearchOutline /></button>
            </div>
        </div> */}
        <div className='flex justify-end'>
            <Link className='py-3 px-8 bg-white text-black rounded-md font-medium tracking-wider mx-2 transition-all duration-500 ease-in-out relative overflow-hidden group'>
                <span className='absolute inset-0 bg-black w-full h-full transform translate-x-full group-hover:translate-x-0 transition-all duration-500 ease-in-out'></span>
                <span className='relative z-10 group-hover:text-white transition-all duration-500 ease-in-out'>Login</span>
            </Link>

            <Link className='py-3 px-8 bg-[#952295] text-white rounded-md font-medium tracking-wider mx-2 transition-all duration-500 ease-in-out relative overflow-hidden group'>
                <span className='absolute inset-0 bg-black w-full h-full transform translate-x-full group-hover:translate-x-0 transition-all duration-500 ease-in-out'></span>
                <span className='relative z-10 group-hover:text-white transition-all duration-500 ease-in-out'>Register</span>
            </Link>
        </div>
      </div>
    </div>
  )
}
