const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

// Đăng ký Admin mới
router.post('/create', adminController.registerAdmin);

// Lấy tất cả Admins
router.get('/adm', adminController.getAllAdmins);

// Xóa Admin theo username
router.delete('/:username', adminController.deleteAdmin);

module.exports = router;
