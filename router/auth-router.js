// ----------Using Router---------------
const express = require('express');
const router = express.Router();
const authcontrollers = require ("../controllers/auth-controllers")
// const {register} = require("../controllers/auth-controllers")


router.route("/").get(authcontrollers.home);
router.route("/register").post(authcontrollers.register)


 module.exports= router;


 
//  router.route("/").get((req, res) =>{
    //     res
    //     .status(200)
    //     .send("Hey suvid this is another way")
    // })
    

// ----------------Using App--------------
// const express = require("express")
// const app = express();

// app.get('/', (req , res)=> {
//      res.status(200).send("Welcome world best mern series by suvid");
// });


