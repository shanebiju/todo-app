import { useState } from "react"
import axios from '../axios'
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password) => {
        setIsLoading(true)
        setError(null)        
        try {
            const response = await axios.post('/user/signup', { email, password })
            
            if (!response.data.success) {
                setError(response.data.error)
            } else {
                console.log(response);
                const {email:userEmail,token}=response.data.data
                console.log({ email: userEmail, token: token });
                
                localStorage.setItem('User', JSON.stringify({ email:userEmail, token: token }))
                dispatch({ type: 'LOGIN', payload: { email:userEmail, token: token } })
            }
        } catch (error) {
            //console.error('Axios error:', error.response ? error.response.data : error.message)
            setError(error.response.data.error)
        } finally {
            setIsLoading(false)
        }
    }

    return { signup, error, isLoading }
}
