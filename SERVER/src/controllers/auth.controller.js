import {
    registerUserService,
    loginUserService
} from "../services/auth.service.js";


export const registerUser = async (req,res) => {
    try {
        const {user , token} = await registerUserService(req.body);

        res.cookie("token" , token);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data:user.isSelected("-password")
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const loginUser = async(req , res)=>{
    try{
        const{user , token}= await loginUserService(req.body);
        res.cookie("token",token);
        res.status(200).json({
            success:true,
            message:"User logged in successfully",
            data:user.isSelected("-password")
        })
    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

export const logoutUser = async (req,res)=>{
    try{
        res.clearCookie("token");
        res.status(200).json({
            success:true,
            message:"User logged out successfully"
        })
    }catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}