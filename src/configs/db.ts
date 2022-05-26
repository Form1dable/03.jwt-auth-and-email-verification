import mongoose, { ConnectOptions } from "mongoose";

export default async function connectDB() {
    try {
        mongoose.connect(
            process.env.MONGO_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            } as ConnectOptions,
            () => {
                console.log("DATABASE CONNECTED");
            }
        );
    } catch (error) {
        console.error(error);
    }
}
