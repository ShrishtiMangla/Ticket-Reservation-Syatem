import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

export const registerUserService = async (userData) => {
    if(!userData.name || !userData.email || !userData.password){
        throw new AppError("Name, email and password are required" , 400);
        
    }

    const existingUser = await User.findOne({email: userData.email});
    if(existingUser){
        throw new AppError("User with this email already exists",409);
    }
    if(userData.password.length < 6){
        throw new AppError("Password must be at least 6 characters long",400);
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
        throw new AppError("Email and password are required",400);
    }
    const user = await User.findOne({email: loginData.email}).select("+password");
    if(!user){
        throw new AppError("Invalid email or password",401);
    }
    if(!await bcrypt.compare(loginData.password , user.password)){
        throw new AppError("Invalid email or password",401);
    }
    const token = jwt.sign({userId: user._id , role: user.role} , process.env.JWT_SECRET , {expiresIn:"3d"});
    return {user , token};
}

