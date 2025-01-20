import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import RelatedDoctors from '../components/RelatedDoctors';
import axios from 'axios';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)

  const daysOfWeek = ["Sunday", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState([])
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState("")

  const fetchDocINfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
    console.log(docInfo);

  }

  const getAvailableSlots = async () => {
    setDocSlots([])

    //getting current date
    let today = new Date()

    for (let i = 0; i < 7; i++) {
      //getting date with index
      let currrentDate = new Date(today)
      currrentDate.setDate(today.getDate() + i)

      //setting endtime of the date with index
      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      // setting hours\
      if (today.getDate() === currrentDate.getDate()) {
        currrentDate.setHours(currrentDate.getHours() > 10 ? currrentDate.getHours() + 1 : 10)
        currrentDate.setMinutes(currrentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currrentDate.setHours(10)
        currrentDate.setMinutes(0)
      }
      let timeSlots = []
      while (currrentDate < endTime) {
        let formattedTime = currrentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        let day = currrentDate.getDate()
        let month = currrentDate.getMonth() + 1
        let year = currrentDate.getFullYear()

        const slotDate = day + '_' + month + '_' + year
        const slotTime = formattedTime

        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

        if (isSlotAvailable) {
          // add slot to array
          timeSlots.push({
            datetime: new Date(currrentDate),
            time: formattedTime
          })
        }


        // Increment current time by 30 minutes
        currrentDate.setMinutes(currrentDate.getMinutes() + 30)
      }

      setDocSlots((prev) => [...prev, timeSlots])

    }
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment')
      return navigate('/login')
    }
    try {
      const date = docSlots[slotIndex][0].datetime
      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      const slotDate = day + '_' + month + '_' + year

      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }




  useEffect(() => {
    fetchDocINfo()
  }, [doctors, docId])

  useEffect(() => {
    getAvailableSlots()
  }, [docInfo])

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots])

  return (
    <div>
      {/* ----------Doctor Details-------- */}
      <div className='flex flex-col sm:flex-row gap-4 '>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
        </div>
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>

          {/* ----------Doctor Details-------- */}

          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docInfo.name}
            <img className='w-5' src={assets.verified_icon} alt="" />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p >{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full' >{docInfo.experience}</button>
          </div>

          {/* ----------Doctor About-------- */}

          <div >
            <p className='flex items-center gap-2 text-sm font-medium text-gray-900 mt-3'>
              About <img src={assets.info_icon} alt="" /></p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-1 '>{docInfo.about}</p>
          </div>
          <p className='text-gray-600 font-medium mt-4'>
            Appointment fees :<span className='text-gray-600'>{currencySymbol}</span> <span>{docInfo.fees}</span></p>
        </div>
      </div>

      {/* ----------Booking Slots-------- */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking Slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            docSlots.length && docSlots.map((item, index) => (
              <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : ' border border-gray-200'} `} key={index}>
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>
        <div className='flex itm-center gap-3 overflow-x-scroll mt-4'>
          {
            docSlots.length && docSlots[slotIndex].map((item, index) => (

              <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${slotTime === item.time ? 'bg-primary text-white' : ' border border-gray-200'}`} key={index}>
                {item.time.toLowerCase()}
              </p>

            ))
          }
        </div>
        <button onClick={bookAppointment} className='bg-primary text-white px-12 py-3 rounded-full mt-8 hover:scale-105 transition-all duration-300'>Book Appointment</button>
      </div>
      {/* ----------Listing related doctors -------- */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  )
}

export default Appointment