import dotenv from "dotenv"; //to use env
import app from "./src/app.js";

import connectDB from "./src/config/database.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

connectDB();

app.listen(PORT , ()=>{
    console.log(`🚀 Server is running on port ${PORT}`);
})