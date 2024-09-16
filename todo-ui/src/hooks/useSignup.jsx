import { useState } from "react"
import axios from '../axios'
import { useAuthContext } from "./useAuthContext"
import { useNavigate } from "react-router-dom"

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()
    const navigate = useNavigate()

    const signup = async (email, password) => {
        setIsLoading(true)
        setError(null)        
        try {
            const response = await axios.post('/user/signup', { email, password })
            console.log(response);
            
            
            if (response.data.success) {
                console.log(response);
                const {email:userEmail,token}=response.data.data
                console.log({ email: userEmail, token: token });
                
                localStorage.setItem('User', JSON.stringify({ email:userEmail, token: token }))
                dispatch({ type: 'LOGIN', payload: { email:userEmail, token: token } })
                navigate('/login',{replace:true})
            }

        } catch (err) {
            //console.error('Axios error:', error.response ? error.response.data : error.message)
            console.log(err);
            
            setError(err.response.data.error)
        } finally {
            setIsLoading(false)
        }
    }

    return { signup, error, isLoading }
}
