import { error } from "console";
import mongoose from "mongoose";

export async function Connect(){
    try {
        mongoose.connect(process.env.MONGO_URL!);

        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log('Mongodb Connected')
        })

        connection.on('error', () => {
            console.log('MongoDB Connection error, please make sure db is up and running' + error)
            process.exit()
        })

    } catch (error) {
        console.log(error);
    }
}
