const express = require('express');
const cors = require('cors');
const { Connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { authenticateUser } = require("./middlewares/authentication");
const { taskRouter } = require("./routes/task.route");
const app = express();
const PORT = process.env.PORT || 7079;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send("Welcome to Task Manager API ->>")
})

app.use('/users', userRouter);
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







