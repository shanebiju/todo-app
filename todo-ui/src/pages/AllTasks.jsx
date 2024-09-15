import { useEffect, useState } from 'react'
import AddTask from '../components/AddTask/AddTask'
import TaskCard from '../components/TaskCard/TaskCard'
import './MainContent.css'
import axios from '../axios'
import FadeLoader from "react-spinners/FadeLoader"
import {useAuthContext} from '../hooks/useAuthContext'
import { Bounce, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'

const AllTasks = () => {
  const [allTasks,setAllTasks]=useState([])
  const [shouldRefetch,setShouldRefetch]=useState(false)
  const [loading,setLoading]=useState(true)
  const {user}=useAuthContext()
  const navigate=useNavigate()

  const override={
    position: 'absolute',
    top:'45%',
    left:'50%',
  }
  const fetchTasks = async () => {
    try {
      if (!user){
        toast.error('Please login to fetch tasks', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
      }
      else{
      const result = await axios.get('/tasks',{
        headers: {
            'authorization': `Bearer ${user.token}`
        }
    });
      setAllTasks(result.data.data);
      setTimeout(()=>{
        setLoading(false)
      },1000)
    }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  useEffect(()=>{
    if (user){
      fetchTasks();
    }
      
  },[shouldRefetch,user])

  const handleUpdate=()=>{
    setShouldRefetch(!shouldRefetch)
  }
  return (
    <div className='main-content'>
        {(loading==true)?<FadeLoader
        color='#5C5C5C'
        loading={loading}
        cssOverride={override}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />:
      (
        <>
          {allTasks.map((task) => (
            <TaskCard key={task._id} taskinfo={task} refetch={handleUpdate} />
          ))}
          <AddTask refetch={handleUpdate} />
        </>
      )}
    </div>
  )
}

export default AllTasks