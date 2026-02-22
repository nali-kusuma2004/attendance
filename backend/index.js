
const express=require("express");

const PORT=8000;
const server=express();
const mongoose=require("mongoose");
const cors=require("cors");
const User1 = require("./schemas");
const jwt=require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secretkey="secret";
const userroutes=require("./routes/userroutes");


server.use(cors());
server.use(express.json());
server.use("/api",userroutes);
const url="mongodb+srv://nalikusuma2004_db_user:kusuma12@cluster0.wtyue9h.mongodb.net/userdata?retryWrites=true&w=majority";

mongoose.connect(url)
.then(()=>console.log("Connected to MongoDB"))
.catch((err)=>console.error("Could not connect to MongoDB",err));


server.get("/",(req,res)=>{
    res.send("Hello World!");
});
server.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});

// sign in api 
server.post("/sign",async  (req, res) => {
  const { username, password ,role} = req.body;
 const exist= await User1.findOne({ username: username });
    if (exist) {
      // user already exists
      return res.status(409).send({
        message: "User already exists",
      });
    }
    const hashedPassword =await bcrypt.hash(password, 10);
      
      // create new user
      const newUser = new User1({ username, password:hashedPassword ,role});
     await newUser
        .save()
        .then(() => {
          res.status(201).send({ message: "User Created" });
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error Creating User",
            error: err.message,
          });
        });
    });


//login api
server.post("/login",async (req,res)=>{
    const {username,password}=req.body;
    const data= await User1.findOne({username:username});
      if(!data){
        return res.status(401).send({
          message:"Invalid Username or Password"
        })
      }
      // check the password that is stored in database 
      const isPasswordValid = await bcrypt.compare(password, data.password);
    if(!isPasswordValid){
      return res.status(401).send({
        message:"Invalid Username or Password"
      })
    }
    
    //create jwt token to send it to the client
    const token=jwt.sign({id:data._id,username:data.username},secretkey,{expiresIn:'1h'})
    res.json({
      token,
      username:data.username,
      role:data.role
    })
    
})