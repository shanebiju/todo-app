import React, { useEffect, useState } from 'react'
import './AddModal.css'
import close from '../../assets/close-circle-svgrepo-com.svg'
import axios from '../../axios'
import { Bounce, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from '../../hooks/useAuthContext';

const AddModal = ({ onClose, mode = "Add", id = '', taskDetails,refetch }) => {
  const [formData, setFormData] = useState({ title: '', description: '' });
  const {user}=useAuthContext()

  useEffect(() => {
    if (mode === 'Edit' && taskDetails) {
      setFormData({
        title: taskDetails.title || '',
        description: taskDetails.description || ''
      });
    }
  }, [mode, taskDetails]);
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!user){
        toast.error('Please login to manipulate tasks', {
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
      if (mode == 'Edit') {
        await axios.put(`/tasks/${id}`, formData,{
          headers: {
              'authorization': `Bearer ${user.token}`
          }
      })
      } else {
        await axios.post('/', formData,{
          headers: {
              'authorization': `Bearer ${user.token}`
          }
      })
      }
      refetch();
      onClose()
      toast.success(`${mode=='Edit'?'Task Updated Successfully':'Task Created Successfully'}`, {
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }
  return (
    <div className='modal-wrapper'>
      <div className='modal-component'>
        <div className='close' onClick={onClose}><img src={close} alt="Close btn" style={{ width: '40px', height: '40px' }} /></div>
        <form className="add-form" action="" method="post" onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" placeholder='Title' onChange={handleChange} value={formData.title} />
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" rows="4" cols="50" placeholder="Enter your description here..." onChange={handleChange} value={formData.description}></textarea>
          <input type="submit" value={mode} />
        </form>
      </div>
    </div>
  )
}

export default AddModal