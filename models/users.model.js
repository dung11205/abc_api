// api/models/users.model.js
const mongoose = require('mongoose');

// Định nghĩa schema cho người dùng
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Đảm bảo email là duy nhất
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'user' // Mặc định role là 'user'
    }
});

// Xuất mô hình User
module.exports = mongoose.model('User', userSchema);
