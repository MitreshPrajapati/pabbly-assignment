const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const {Connection} = require("./config/db");
const {userRouter} = require("./routes/user.route");
const {authenticateUser} = require("./middlewares/authentication");
const {taskRouter} = require("./routes/task.route");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(cors());



app.use('/users', userRouter );
app.use('/tasks', authenticateUser, taskRouter);



app.listen(PORT, async () => {
    try {
        await Connection;
        console.log(`listening on PORT ${PORT} `)
    } catch (err) {
        console.log('connection failed');
        console.log(err);
    }
})







