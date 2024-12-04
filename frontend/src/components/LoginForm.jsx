import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {useState} from 'react'

export const LoginForm = function () {

  const navigate = useNavigate()
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  
  const handleUsername = (event)=>{
    setUsername(event.target.value)
  }
  const handlePassword = (event)=>{
    setPassword(event.target.value)
  }
  
  const handleLogin = async (event)=>{
    event.preventDefault()
    try{
      const response = await axios.post('http://localhost:3000/login',{username,password})
      if(response.status === 200){
        console.log('local login success')
        navigate('/dashboard')
      }
    }catch(error){
      console.log(error,"local auth failed")
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div className="mb-6">
        <label
          className="block text-white text-sm font-bold mb-2 pt-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsername}
          className="w-full p-3 border border-neutral-600 rounded bg-neutral-900 text-white focus:border-[#7770d6] focus:outline-none focus:ring focus:ring-[#7770d6]"
          placeholder="Enter your username"
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePassword}
          className="w-full p-3 border border-neutral-600 rounded bg-neutral-900 text-white focus:border-[#7770d6] focus:outline-none focus:ring focus:ring-[#7770d6]"
          placeholder="Enter your password"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 px-4 bg-[#7770d6] hover:bg-[#b8b3f5] text-white font-bold rounded-xl transition duration-200 pt-2 "
      >
        Sign In
      </button>
    </form>
  );
};


