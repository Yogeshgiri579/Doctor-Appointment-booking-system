import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const { backendUrl, token, setToken } = useContext(AppContext)
  const navigate = useNavigate();

  const [state, setState] = useState('sign Up')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === 'sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        }
        else {
          toast.error(data.message)
        }
      }
      else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        }
        else {
          toast.error(data.message)
        }

      }

    } catch (error) {
      toast.error(error.message)
    }
  }
  
  useEffect(() => {

    if (token) {
      navigate('/')
    }
    
  }, [token])


  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg  '>
        <p className='text-2xl font-semibold'>{state === 'sign Up' ? 'Create Account' : 'Log in'}</p>
        <p>Please {state === 'sign Up' ? 'sign up' : 'Log in'} to book appointment </p>
        {
          state === 'sign Up' && <div className='w-full'>
            <p>Full Name</p>
            <input className='w-full border border-zinc-300 rounded p-2 mt-1' onChange={(e) => setName(e.target.value)} value={name} type="text" required />
          </div>
        }

        <div className='w-full'>
          <p>Email</p>
          <input className='w-full border border-zinc-300 rounded p-2 mt-1' onChange={(e) => setEmail(e.target.value)} value={email} type="email" required />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='w-full border border-zinc-300 rounded p-2 mt-1' onChange={(e) => setPassword(e.target.value)} value={password} type="password" required />
        </div>
        <button type='submit' className='bg-primary text-white w-full  py-2 rounded-md text-base'>{state === 'sign Up' ? 'Create Account' : 'Log in'}</button>
        {
          state === 'sign Up' ?
            <p>Already have an account ? <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>Login here</span> </p>
            :
            <p>Don't have an account ? <span onClick={() => setState('sign Up')} className='text-primary underline cursor-pointer'>Click here</span> </p>
        }
      </div>
    </form>
  )
}

export default Login