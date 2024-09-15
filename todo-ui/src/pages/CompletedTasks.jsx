import { useEffect, useState } from 'react';
import './MainContent.css'
import axios from '../axios'
import TaskCard from '../components/TaskCard/TaskCard';
import FadeLoader from "react-spinners/FadeLoader"
import {useAuthContext} from '../hooks/useAuthContext'
import { Bounce, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const CompletedTasks = () => {
  const [CompletedTasks,setCompletedTasks]=useState([])
  const [shouldRefetch,setShouldRefetch]=useState(false)
  const [loading,setLoading]=useState(true)
  const {user}=useAuthContext()


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
      }else{
      const result = await axios.get('/tasks/complete',{
        headers: {
            'authorization': `Bearer ${user.token}`
        }
    });
      setCompletedTasks(result.data.data);
      setTimeout(()=>{
        setLoading(false)
      },1000)
    }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  useEffect(()=>{
    fetchTasks();
      
  },[shouldRefetch])

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
        (CompletedTasks.length==0)?<h1 className='no-data-message'>No completed Tasks Present</h1>:CompletedTasks.map((task)=>
          <TaskCard key={task._id} taskinfo={task} refetch={handleUpdate}/>)}
    </div>
  )
}

export default CompletedTasks