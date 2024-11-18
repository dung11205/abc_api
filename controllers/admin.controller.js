const Admin = require('../models/admin.model'); // Đảm bảo đã import đúng mô hình
const bcrypt = require('bcryptjs');  // Import bcryptjs
const jwt = require('jsonwebtoken');

// Secret key để tạo JWT token
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key_here';

const adminController = {
    // Đăng ký Admin mới
    registerAdmin: async (req, res) => {
        const { username, email, password } = req.body;

        try {
            // Kiểm tra nếu Admin đã tồn tại với username hoặc email
            const existingAdmin = await Admin.findOne({ $or: [{ username }, { email }] });
            if (existingAdmin) {
                return res.status(400).json({ message: 'Username or email already exists' });
            }

            // Mã hóa mật khẩu trước khi lưu
            const hashedPassword = await bcrypt.hash(password, 10);

            // Tạo Admin mới
            const newAdmin = new Admin({ username, email, password: hashedPassword });
            await newAdmin.save();

            res.status(201).json({ message: 'Admin registered successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error registering admin', error: error.message });
        }
    },

    // Đăng nhập Admin
    loginAdmin: async (req, res) => {
        const { username, password } = req.body;

        try {
            const admin = await Admin.findOne({ username });
            if (!admin) {
                return res.status(404).json({ message: 'Admin not found' });
            }

            const isPasswordValid = await bcrypt.compare(password, admin.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Invalid password' });
            }

            const token = jwt.sign({ id: admin._id }, SECRET_KEY, { expiresIn: '1h' });

            res.status(200).json({ message: 'Admin login successful', token });
        } catch (error) {
            res.status(500).json({ message: 'Error logging in', error: error.message });
        }
    },

    // Lấy danh sách Admin
    getAllAdmins: async (req, res) => {
        try {
            const admins = await Admin.find();
            res.status(200).json(admins);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching admins', error: error.message });
        }
    },

    // Xóa Admin theo username
    deleteAdmin: async (req, res) => {
        const { username } = req.params; // Lấy username từ params
    
        try {
            const admin = await Admin.findOneAndDelete({ username });
            if (!admin) {
                return res.status(404).json({ message: 'Admin not found' });
            }
    
            res.status(200).json({ message: 'Admin deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting admin', error: error.message });
        }
    }
    
};

module.exports = adminController;
