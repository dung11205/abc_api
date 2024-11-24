const express = require('express');
const router = express.Router();
const User = require('../models/users.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Secret key để tạo JWT token
const SECRET_KEY = 'your_secret_key_here'; // Bạn có thể thay đổi giá trị này nếu cần

// Đăng ký người dùng mới
router.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    // Kiểm tra và log thông tin để kiểm tra có được gửi đầy đủ không
    console.log('Received data:', req.body);

    if (!email || !password || !firstName || !lastName || !role) {
        console.log('Missing required fields!');
        return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin!' });
    }

    // Tiến hành các bước còn lại
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ firstName, lastName, email, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});


// Đăng nhập người dùng
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // So sánh mật khẩu đã mã hóa trong DB với mật khẩu người dùng nhập
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Tạo JWT token nếu đăng nhập thành công
        const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

module.exports = router;
//