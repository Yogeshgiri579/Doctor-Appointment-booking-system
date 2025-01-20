import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        {/* -----------LEFT Section------------- */}
        <div>
           <img className='mb-5 w-40' src={assets.logo} alt="" />
           <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet numquam explicabo fuga distinctio odit maiores unde, provident voluptatum. Ut mollitia optio fugit iusto vel voluptatum molestiae doloremque quasi temporibus asperiores.</p>
        </div>

        {/* -----------MIDDLE Section------------- */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About Us</li>
            <li>Contact US</li>
            <li>Privacy Policy</li>
          </ul>

        </div>

        {/* -----------RIGHT Section------------- */}
        <div>
          <p className='text-xl font-medium mb-5'>Get in Touch</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+120-4569-7485</li>
            <li>Yogesh@gmail.com</li>
          </ul>

        </div>
        </div>
        {/* -----------Copyright Section------------- */}
        <div>
          <hr />
          <p className='py-5 text-sm text-center'>Copyright 2025@ Yogesh  All Rights Reserved</p>
        </div>
    </div>
  )
}

export default Footer