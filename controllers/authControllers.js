const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// REGISTER

exports.register = async(req,res)=>{

try{

const {name,email,password}=req.body;


const userExist = await User.findOne({email});


if(userExist){

return res.status(400).json({
message:"User already exists"
});

}


const salt = await bcrypt.genSalt(10);

const hashedPassword = await bcrypt.hash(
password,
salt
);



const user = await User.create({

name:name,

email:email,

password:hashedPassword

});



res.status(201).json({

message:"Register Success",

user:user

});


}

catch(error){

res.status(500).json({

message:error.message

});

}

};




// LOGIN

exports.login = async(req,res)=>{


try{


const {email,password}=req.body;


const user = await User.findOne({email});


if(!user){

return res.status(404).json({

message:"User not found"

});

}



const checkPassword = await bcrypt.compare(

password,

user.password

);



if(!checkPassword){

return res.status(400).json({

message:"Wrong password"

});

}



const token = jwt.sign(

{
id:user._id
},

process.env.JWT_SECRET,

{
expiresIn:"1d"
}

);



res.json({

message:"Login success",

token:token

});


}

catch(error){

res.status(500).json({

message:error.message

});

}


};