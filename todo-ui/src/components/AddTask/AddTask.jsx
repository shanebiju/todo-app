import React, { useState } from 'react'
import './AddTask.css'
import plus from '../../assets/plus-circle-svgrepo-com.svg';
import AddModal from '../AddModal/AddModal';

const AddTask = ({refetch}) => {
  const [showModal,setShowModal]=useState(false)

  return (
    <>
    <div className='add-task-card' onClick={()=>setShowModal(true)}>
        <img src={plus} alt="image not loaded"/>
        <h1>Add Task</h1>
    </div>
    {showModal && <AddModal onClose={()=>setShowModal(false)} refetch={refetch}/>}
    </>
  )
}

export default AddTask