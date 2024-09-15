const task = require('../models/task.js');
const createTask = async (req, res) => {
    const { title, description } = req.body;
    const userId=req.user;
    try {
        const newTask = await task.create({ title, description,user:userId})
        res.status(201).json({ success: true, data: newTask })
    } catch (error) {
        res.status(400).json({ success: false, error: error.message })
    }
}

const getAllTasks=async(req,res)=>{
    const userId=req.user;
    try {
        const allTasks=await task.find({user:userId});
        res.status(200).json({ success: true, data: allTasks })
    } catch (error) {
        res.status(400).json({ success: false, error: error.message })
    }
}

const getTaskById=async(req,res)=>{
    const {id}=req.params;
    const userId=req.user;
    try {
        const mytask=await task.findById({_id:id,user:userId});
        res.status(200).json({success:true,data:mytask});
    } catch (error) {
        res.status(400).json({success:false,error:error.message});
    }
}

const updateTaskById=async(req,res)=>{
    const {id}=req.params;
    const userId=req.user;
    const updatedData=req.body;

    try {
        const taskToUpdate = await task.findOne({ _id: id, user: userId });

        if (!taskToUpdate) {
            return res.status(404).json({ success: false, error: 'Task not found or not authorized' });
        }
        const updatedTask=await task.findByIdAndUpdate(id,updatedData,{new:true});
        res.status(200).json({success:true,data:updatedTask});
    } catch (error) {
        res.status(400).json({success:false,error:error.message})
    }
}

const deleteTaskById=async(req,res)=>{
    const {id}=req.params;
    const userId=req.user;
    try {
        const taskToDelete = await task.findOne({ _id: id, user: userId });

        if (!taskToDelete) {
            return res.status(404).json({ success: false, error: 'Task not found or not authorized' });
        }
        const deletedTask=await task.findByIdAndDelete(id);
        res.status(200).json({success:true,data:deletedTask});
    } catch (error) {
        res.status(400).json({success:false,error:error.message})
    }
}

const getCompletedTasks=async(req,res)=>{
    const userId=req.user;
    try {
        const completedTasks=await task.find({status:true,user:userId})
        res.status(200).json({success:true,data:completedTasks});
    } catch (error) {
        res.status(400).json({success:false,error:error.message})
    }
}

const getIncompleteTasks=async(req,res)=>{
    const userId=req.user;
    try {
        const incompleteTasks=await task.find({status:false,user:userId})
        res.status(200).json({success:true,data:incompleteTasks});
    } catch (error) {
        res.status(400).json({success:false,error:error.message})
    }
}

const getImportantTasks=async(req,res)=>{
    const userId=req.user;
    try {
        const importantTasks=await task.find({important:true,user:userId})
        res.status(200).json({success:true,data:importantTasks});
    } catch (error) {
        res.status(400).json({success:false,error:error.message})
    }
}

module.exports = {
    createTask,
    getAllTasks,
    updateTaskById,
    getTaskById,
    deleteTaskById,
    getCompletedTasks,
    getIncompleteTasks,
    getImportantTasks
}