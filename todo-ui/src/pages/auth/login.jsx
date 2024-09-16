import React, { useState,useEffect } from 'react'
import './auth.css'
import { Link, useNavigate } from 'react-router-dom'
import { useLogin } from '../../hooks/useLogin'

const login = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const {login,error,isLoading}=useLogin()
    

    const handleSubmit=async(e)=>{
        e.preventDefault()
        console.log(email,password);
        await login(email,password);
    }
    // if (isLoading){
    //     return <div>
    //         loading...
    //     </div>
    // }else if(error!==null){
    //     return <div>{error}</div>
    // }
    
    return (
        <div className='login-wrapper'>
            <form className='authform' onSubmit={handleSubmit}>
                <h3>LOGIN</h3>
                <label htmlFor="email">email</label>
                <input type="text" name="email" id="email" placeholder='johndoe@gmail.com' onChange={(e)=>setEmail(e.target.value)} value={email}/>
                <label htmlFor="password">password</label>
                <input type="password" name="password" id="password" placeholder='password' onChange={(e)=>setPassword(e.target.value)} value={password}/>
                <button type="submit" disabled={isLoading}>LOGIN</button>
                {error && <div className='error'>{error}</div>}
                <h5>Don't have an account yet? <Link to="/signup">signup</Link></h5>
            </form>
        </div>
    )
}

export default login