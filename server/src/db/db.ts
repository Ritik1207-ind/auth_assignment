import mongoose from "mongoose";

const connectDB = async () : Promise<void> => {
    try {
        let url : string | undefined = process.env.MONGODB_URL;
        if (!url){
            throw new Error("URL Not Defined")
        }
        await mongoose.connect(url)
        console.log("database connected")
    } catch (error) {
        console.log("Error in Connecte DB :" , error)
    }
}

export default connectDB;