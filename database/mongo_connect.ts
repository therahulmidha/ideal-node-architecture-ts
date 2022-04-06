import mongoose from 'mongoose';

export class MongoConnect {
    public static connection: typeof mongoose;

    public static async initializeConnection() {
        try {
            MongoConnect.connection = await mongoose.connect(process.env.MONGO_CONN_STRING!);
            console.log("Connected to mongodb");
        } catch (error) {
            console.log("Unable to connect to mongo db");
            console.log(error);
            throw new Error("Unable to connect to mongo db");
        }
    }
}