import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'

import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ( {speciality,docId}) => {

 const {doctors} = useContext(AppContext);
 const navigate = useNavigate();
 const [relDoc , setRelDoc] = useState([]);

 useEffect(()=>{
  if(doctors.length > 0 && speciality ){
    const doctorsData = doctors.filter((doc)=>doc.speciality === speciality && doc._id !== docId);
    setRelDoc(doctorsData);
  }
 },[doctors,speciality,docId])

 

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
        <h1 className=' text-3xl font-medium'>Top Doctors to Book</h1>
        <p className='sm:w-1/3 text-center text-sm'>Simply browse through our ectensive list of trusted doctors, <br className='hidden md:block'/> 
            schedule your appointment hassle free</p>
            <div className='w-full grid grid-cols-auto pt-5 gap-y-6 px-3 sm:px-0 gap-4'>
                {relDoc.slice(0,5).map((item,index)=>(
                  <div onClick={()=>{navigate(`/appointment/${item._id}`); scrollTo(0,0)}} className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"key={index}>
                    <img className="bg-blue-50 "src={item.image} alt="" />
                    <div className='p-4 '>
                        <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-500'} `} >
                            <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'}  rounded-full`}></p><p>{item.available ? 'Available' : 'Unavailable'}</p>
                        </div>
                        <p className='text-gray-900 text-lg font-medium '>{item.name}</p>
                        <p className=' text-gray-600 text-sm'>{item.speciality}</p>
                    </div>
                  </div>
                ))}
            </div>
            <button onClick={()=>{navigate('/doctors'); scrollTo(0,0)}} className='bg-blue-50 px-12 py-3 mt-10 rounded-full'>More</button>
    </div>
  )
}

export default RelatedDoctors