const express = require('express');
const router = express.Router();
const { createTask,
    getAllTasks,
    updateTaskById,
    getTaskById, deleteTaskById
    , getCompletedTasks,
    getIncompleteTasks,
getImportantTasks } = require('../controllers/task.js')
const requireAuth=require('../middleware/requireAuth.js')

router.use(requireAuth)

router.post('/', createTask);
router.get('/tasks/complete', getCompletedTasks);
router.get('/tasks/incomplete',getIncompleteTasks);
router.get('/tasks/important',getImportantTasks);
router.get('/tasks', getAllTasks);
router.put('/tasks/:id', updateTaskById);
router.get('/tasks/:id', getTaskById);
router.delete('/tasks/:id', deleteTaskById);

module.exports = router;