const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Kết nối MongoDB với cấu hình tối ưu
mongoose.connect('mongodb+srv://dung:dung1234@dung.dhy4z.mongodb.net/?retryWrites=true&w=majority&appName=dung', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

// Middleware
app.use(cors({
    origin: '*', // Cấu hình cho phép tất cả các nguồn, có thể thay đổi cho bảo mật tốt hơn
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));
app.use(express.json()); // Middleware để parse JSON requests 

// Định nghĩa route cho các API
const tripRoute = require('./routes/trip.route');
const addressRoute = require('./routes/address.routes');
const adminRoute = require('./routes/adm.router'); 
const userRoute = require('./routes/users.route');



// Định nghĩa các routes cho API
app.use('/user', userRoute);
app.use('/admin', adminRoute);  
app.use('/address', addressRoute);
app.use('/trip', tripRoute);

// Route chính
app.get('/', (req, res) => res.send('API is running - dung123-aa'));

// Khởi động server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
