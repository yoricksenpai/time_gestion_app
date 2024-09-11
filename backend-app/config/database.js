import mongoose from 'mongoose';


/**
 * Connects to MongoDB using the connection string provided in the environment variables.
 *
 * @return {Promise<void>} A Promise that resolves when the connection is established,
 *                         and rejects with an error if it fails.
 */
const connectDB = async () => {
    mongoose.set('strictQuery', true);
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;