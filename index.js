const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Kết nối MongoDB
mongoose
  .connect('mongodb+srv://dung:dung1234@dung.dhy4z.mongodb.net/mydatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true, // Sử dụng parser URL mới
    useUnifiedTopology: true, // Dùng engine phát hiện máy chủ mới
    ssl: true,
    authSource: 'admin', // Nguồn xác thực
    replicaSet: 'atlas-w0m6ls-shard-0' // Đảm bảo cấu hình replicaSet
  })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Middleware
app.use(cors());
app.use(express.json());

// Định nghĩa route cho các API
const tripRoute = require('./routes/trip.route');
const addressRoute = require('./routes/address.route');
const userRoute = require('./routes/users.route');

app.use('/user', userRoute);
app.use('/address', addressRoute);
app.use('/trip', tripRoute);

// Route chính
app.get('/', (req, res) => res.send('Node.js API is running'));

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
