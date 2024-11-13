const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Kết nối MongoDB với async/await
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000, // Thời gian chờ tối đa để kết nối
            appName: 'dungApp', // Đặt tên ứng dụng MongoDB
        });
        console.log('Connected to MongoDB Atlas');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1); // Dừng server nếu kết nối thất bại
    }
};
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Middleware để parse JSON requests

// Định nghĩa route cho các API
const tripRoute = require('./routes/trip.route');
const addressRoute = require('./routes/address.route');
const userRoute = require('./routes/users.route');

app.use('/user', userRoute);
app.use('/address', addressRoute);
app.use('/trip', tripRoute);

// Route chính
app.get('/', (req, res) => res.send('Nguyen Dung'));

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
