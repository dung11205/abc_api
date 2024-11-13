const User = require('../models/users.model');

const userController = {
    // Lấy danh sách tất cả người dùng
    getuser: async (req, res) => {
        try {
            const users = await User.find(); // Lấy danh sách người dùng từ DB
            res.status(200).json(users); // Trả về danh sách người dùng
        } catch (err) {
            res.status(500).json({ message: 'Error fetching users', error: err.message });
        }
    },

    // Tạo mới một người dùng
    createuser: async (req, res) => {
        try {
            const newUser = new User(req.body);
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        } catch (err) {
            res.status(500).json({ message: 'Error creating user', error: err.message });
        }
    },

    // Xóa tất cả người dùng
    deleteAllusers: async (req, res) => {
        try {
            await User.deleteMany({});
            res.status(200).json({ message: 'All users deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: 'Error deleting users', error: err.message });
        }
    }
};

module.exports = userController;
