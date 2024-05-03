// ----------Using Router---------------
require("dotenv").config();
const express = require('express');
const app = express();
const router =  require("./router/auth-router");
const connectDb = require("./utils/db")

app.use(express.json());
app.use("/api/auth", router);


const port = 4100;
connectDb().then(() => {

app.listen(port, ()=>{
    console.log(`Server is status : ${port} `);
});
});
  
// app.get('/', (req , res)=> {
//      res
//         .status(200)
//         .send("Welcome world best mern series by suvid");
// });

// app._router("/").get((req, res)=>{
//     res
//         .status(200)
//         .send("Welcome world best mern series by suvid");
// })

