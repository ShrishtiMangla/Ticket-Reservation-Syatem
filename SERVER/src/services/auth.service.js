import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const registerUserService = async (userData) => {
    if(!userData.name || !userData.email || !userData.password){
        throw new Error("Name, email and password are required");
        
    }

    const existingUser = await User.findOne({email: userData.email}.select);
    if(existingUser){
        throw new Error("User with this email already exists");
    }
    if(userData.password.length < 6){
        throw new Error("Password must be at least 6 characters long");
    }

    const hashedPassword = await bcrypt.hash(userData.password , 10);

    const user = new User({
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        role: userData.role || "user"
    })
    
    await user.save()
    const token = jwt.sign({ userId: user._id , role: user.role}, process.env.JWT_SECRET, { expiresIn: "3d" });

    return { user, token };
};

export const loginUserService = async (loginData)=>{
    if(!loginData.email || !loginData.password){
        throw new Error("Email and password are required");
    }
    const user = await User.findOne({email: loginData.email}).select("+password");
    if(!user){
        throw new Error("Invalid email or password");
    }
    if(!await bcrypt.compare(loginData.password , user.password)){
        throw new Error("Invalid email or password");
    }
    const token = jwt.sign({userId: user._id , role: user.role} , process.env.JWT_SECRET , {expiresIn:"3d"});
    return {user , token};
}

