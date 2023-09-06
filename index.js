
const express = require('express')
const cors=require('cors')
const { connection } = require('./db')
const Stu_router = require('./routes/studentRoute')
const Ins_router = require('./routes/instructorRoute')
const {Courserouter} = require('./routes/courseRoute')
const Enr_router = require('./routes/enrollmentRoute')
const {Asignmentrouter} = require('./routes/asignmentRoute')
const Sub_router = require('./routes/submissionRoute')
const Depart_router = require('./routes/departmentRoute')
const {Announcementrouter} = require('./routes/anouncementRoute')
const {auth} = require('./middleware/authMiddleware')

const app = express()

app.use(cors())
app.use(express.json())
require('dotenv').config()

// Routes
// app.use(auth);
app.use('/students',Stu_router);
app.use('/instructors',Ins_router)
app.use('/course',Courserouter)
app.use('/enrollments',Enr_router)
app.use('/assignment',Asignmentrouter)
app.use('/submissions',Sub_router)
app.use('/departments', Depart_router);
app.use('/announcement',Announcementrouter)


app.get("/", (req, res) => {
    res.send("Welcome to the API");
  });

app.listen(process.env.PORT,async()=>{
      console.log(`server is running on port ${process.env.PORT}` )
    try {
        await connection
        console.log('server gets connected with DB')
    } catch (error) {
          console.log(error)
    }
})