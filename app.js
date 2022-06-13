const dotenv = require('dotenv');
dotenv.config()
const express = require('express');
const cors = require('cors');
const db = require('./models');
const userRouter = require('./routes/userRoutes');


const port = process.env.PORT
 
const app = express();

app.use(cors())


// json
app.use(express.json())


//load route
app.use('/api/user',userRouter)
 
//database synchronization
db.sequelize.sync({alert:true})
.then(() => {console.log("db successfully synced")})
.catch(()=>{console.log("err while connecing to db")});

app.listen(port,(e)=>{
    console.log(`listening on http://localhost:${port} `);
})
