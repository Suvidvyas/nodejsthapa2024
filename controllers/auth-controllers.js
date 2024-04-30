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



//*-------- Registration Logic -----------------

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

      res.status(201).json({ msg: "User created successfully", userCreated })
   }
   catch (error) {
      res.status(500).send({ msg: "Internal server error" })
   }
}




module.exports = { home, register };