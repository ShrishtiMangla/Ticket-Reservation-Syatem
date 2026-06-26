import dotenv from "dotenv"; //to use env
import app from "./src/app.js";
import logger from "./src/utils/logger.js";

import connectDB from "./src/config/database.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

const startServer = async ()=>{
    try{
        await connectDB();
        app.listen(PORT, ()=>{
            logger.info(`Server running on port ${PORT}`);
        });
    }catch(error){
        logger.error(error);
        process.exit(1);
    }
};

startServer();