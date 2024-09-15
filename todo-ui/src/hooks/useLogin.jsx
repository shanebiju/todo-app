import { useState,useEffect } from "react"
import axios from '../axios'
import { useAuthContext } from "./useAuthContext"
import { useNavigate } from "react-router-dom"

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()
    const navigate = useNavigate()

    const login = async (email, password) => {
        setIsLoading(true)       
        try {
            const response = await axios.post('/user/login', { email, password })
            
            if (response.data.success) {
                console.log(response);
                const {email:userEmail,token}=response.data.data
                console.log({ email: userEmail, token: token });
                
                localStorage.setItem('User', JSON.stringify({ email:userEmail, token: token }))
                dispatch({ type: 'LOGIN', payload: { email:userEmail, token: token } })
                navigate('/',{replace:true})
            }

        } catch (err) {
            //console.error('Axios error:', error.response ? error.response.data : error.message)         
            console.log('somethign');
            
            setError(err.response.data.error)
            //console.log(err.response.data.error);   
            
            
        } finally {
            setIsLoading(false)
        }
    }
    return { login, error, isLoading }
}
