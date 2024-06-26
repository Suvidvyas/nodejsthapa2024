const User = require("../models/user-model");
const bcrypt = require("bcrypt");


//* ----------- HOME LOGIC --------------

const home = async (req, res) => {
   try {
      res
         .status(200)
         .send("welcome to world first time with AbortController");
   }
   catch (error) {
      console.log(error);
   }
}


// {____________________________________}
//*-------- Registration Logic -----------------
// {_______________________________________}

const register = async (req, res, next) => {
   try {
      console.log(req.body);
      const { username, email, phone, password } = req.body

      const userExist = await User.findOne({ email })
      const userExistph = await User.findOne({ phone })

      if (userExist) {
         return res.status(400).json({ msg: "Email already exists" })
      }
      if (userExistph) {
         return res.status(400).json({ msg: "Phone already exists" })
      }
      if (!username ||!email ||!phone ||!password) {
         return res.status(400).json({ msg: "Please fill all fields" })
      }

      // const userpasswordexitst

      // Hash the password
      // const saltRound = await bcrypt.gensalt(10);
      const hash_password = await bcrypt.hash(password, 10)

      userCreated = await User.create({
         username,
         email,
         phone,
         password,
         password: hash_password
      });

      res.status(201).json({ 
         msg: "User created successfully",
         // userCreated, 
         token: await userCreated.generateAuthToken(),
         userId: userCreated._id.toString(),
   })
   }
   catch (error) {
      res.status(500).send({ msg: "Internal server error" })
   }
}

// {____________________________________}
//*-------- User login Logic -----------------
// {_______________________________________}

const login = async (req, res, next) => 
{
   try {
    
      const { email, password } = req.body;
      console.log(req.body);

      const userExist = await User.findOne({ email });
      console.log(userExist);
      
      if(!email || !password) {
         return res.status(400).json({msg: "Please enter all fields"}
         );
      }


      // const validPassword = await bcrypt.compare(password, userExist.password);
      
      const validPassword = await userExist.comparePassword(password);


      if(!validPassword){
         return res.status(400).json({msg: "Invalid credentials"});
      }
      const token = await userExist.generateAuthToken();
      res.status(200).json({
         msg: "User logged in successfully",
         token,
      })
   }
   catch (error) {
      res.status(500).send({ msg: "Internal server error" })
   }
}


module.exports = { home, register, login };