import React, { useState } from 'react';
import './TaskCard.css';
import { FaRegHeart, FaEdit, FaTrash, FaHeart } from 'react-icons/fa';
import '../AddModal/AddModal'
import AddModal from '../AddModal/AddModal';
import axios from '../../axios';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from '../../hooks/useAuthContext';

const TaskCard = ({ taskinfo, refetch }) => {
  const { _id: id, title, description, status, important } = taskinfo
  const [isComplete, setIsComplete] = useState(status);
  const [isImportant, setIsImportant] = useState(important);
  const [showModal, setShowModal] = useState(false);
  const {user}=useAuthContext()

  const toggleCompletion = async (title) => {
    try {
      if (!user){
        toast.error('Please login to update tasks', {
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
      await axios.put(`/tasks/${id}`, { status: !isComplete },{
        headers: {
            'authorization': `Bearer ${user.token}`
        }
    })
      setIsComplete(!isComplete);
      refetch();
      toast.success(`Marked ${title} as ${isComplete?'incomplete':'complete'}`, {
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
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong. Please try again', {
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
  };

  const toggleImportant = async (title) => {
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
      await axios.put(`/tasks/${id}`, { important: !isImportant },{
        headers: {
            'authorization': `Bearer ${user.token}`
        }
    })
      setIsImportant(!isImportant);
      refetch();
      toast.success(`${isImportant?`Removed ${title} from important tasks`:`Marked ${title} as important task`}`, {
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
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong. Please try again', {
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
  };

  const handleDelete = async () => {
    try {
      if (!user){
        toast.error('Please login to delete tasks', {
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
      await axios.delete(`/tasks/${id}`,{
        headers: {
            'authorization': `Bearer ${user.token}`
        }
    })
      refetch();
      toast.success(`${title} deleted successfully !`, {
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
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong. Please try again', {
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

  }
  return (
    <div className="task-card">
      <div className="task-info">
        <h3 className="title">{title}</h3>
        <p className="description">
          {description}
        </p>
      </div>
      <div className="task-actions">
        <button className={`status-btn ${isComplete ? 'complete' : 'incomplete'}`} onClick={()=>toggleCompletion(title)}>{isComplete ? 'Complete' : 'Incomplete'}</button>
        <button className="btn heart-btn" onClick={()=>toggleImportant(title)}>{isImportant ? <FaHeart style={{ color: 'red' }} /> : <FaRegHeart />}</button>
        <button className="btn edit-btn" onClick={() => setShowModal(true)}><FaEdit /></button>
        <button className="btn delete-btn" onClick={handleDelete}><FaTrash /></button>
      </div>
      {showModal && <AddModal id={id} mode="Edit" onClose={() => setShowModal(false)} taskDetails={{ title, description }} refetch={refetch} />}
    </div>
  );
}

export default TaskCard;
