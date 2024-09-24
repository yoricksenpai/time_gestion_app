import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/database.js';
import authRoutes from './routes/auth.js';
import activityRoutes from './routes/activity.js';

const app = express();

// Connect to database
connectDB().then(r => 'Login to the  DB was successful');

// CORS Configuration
const corsOptions = {
    /**
     * CORS origin function
     * @param {string} origin - The value of the Origin header
     * @param {function} callback - The callback function to be called with the result
     */
    origin: function (origin, callback) {
        const allowedOrigins = ['http://localhost:19006','http://localhost:8081', 'exp://192.168.1.100:19000', 'exp://192.168.1.176:8081'];
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/auth', (req, res, next) => {
    console.log('Received auth request:', req.method, req.url, req.body);
    next();
}, authRoutes);

app.use('/activity', (req, res, next) =>{
    console.log('Received activity request:', req.method, req.url, req.body);
    next();
}, activityRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));