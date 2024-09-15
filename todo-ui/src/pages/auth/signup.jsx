import { useState } from 'react'
import './auth.css'
import { Link,useNavigate } from 'react-router-dom'
import { useSignup } from '../../hooks/useSignup'

const signup = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const {signup,error,isLoading}=useSignup()
    const navigate = useNavigate()

    const handleSubmit=async(e)=>{
        e.preventDefault()
        console.log(email,password);
        await signup(email,password)
        if(!error){
          navigate('/login')
        }
        
    }
  return (
    <div className='login-wrapper'>
    <form className='authform' onSubmit={handleSubmit}>
        <h3>SIGNUP</h3>
        <label htmlFor="email">email</label>
        <input type="text" name="email" id="email" placeholder='johndoe@gmail.com' onChange={(e)=>setEmail(e.target.value)} value={email}/>
        <label htmlFor="password">password</label>
        <input type="password" name="password" id="password" placeholder='password' onChange={(e)=>setPassword(e.target.value)} value={password}/>
        <button type="submit" disabled={isLoading}>SIGNUP</button>
        {error && <div className='error'>{error}</div>}
        <h5>Already have an account? <Link to="/login">login</Link></h5>
    </form>
</div>
  )
}

export default signup