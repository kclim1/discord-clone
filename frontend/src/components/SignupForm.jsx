import {useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

//conditionally render errors in signup and login form 

export const SignupForm = function () {
    const navigate = useNavigate()
    const [username , setUsername ] = useState('')
    const [password , setPassword ] = useState('')
    // const [error,setError] = useState(null)
    
    const handleUsernameInput = (event)=>{
      setUsername(event.target.value)
    }
    const handlePasswordInput = (event)=>{
    setPassword(event.target.value)
  }
    
    const handleSignup = async (event)=>{
      event.preventDefault()
        try{
            const response = await axios.post('http://localhost:3000/signup',{username,password})
            if(response.status === 201){
                console.log('signup successful')
                navigate('/dashboard')
            }else{
                // setError('signup fail')
                console.log('signup fail')
            }

        }catch(error){
            console.error(error)
            console.log('error signing up')
        }
    }
    

    return (
      <form onSubmit={handleSignup}>
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
            onChange={handleUsernameInput}
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
            onChange={handlePasswordInput}
            className="w-full p-3 border border-neutral-600 rounded bg-neutral-900 text-white focus:border-[#7770d6] focus:outline-none focus:ring focus:ring-[#7770d6]"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-[#7770d6] hover:bg-[#b8b3f5] text-white font-bold rounded-xl transition duration-200 pt-2 "
        >
          Sign Up
        </button>
      </form>
    );
  };
  
  
  