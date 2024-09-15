const express=require('express')
const app=express()
const connectDB=require('./db/connect')
const taskRoutes=require('./routes/task.js')
const userRoutes=require('./routes/user.js')
const cors=require('cors')
require('dotenv').config()

app.use(express.json())
app.use(cors())

app.use('/api/user',userRoutes)
app.use('/api',taskRoutes);

const start=async()=>{
    try {
        await connectDB(process.env.MONGO_URI).then(()=>{console.log('connected to db successfully..');})
        app.listen(3000,()=>{
            console.log('server is listening on port 3000...');
        })
    } catch (error) {
        console.log(error);
    }
}

start()