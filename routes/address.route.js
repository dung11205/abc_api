const express = require('express');
const router = express.Router();
var addressController = require('../controllers/address.controller');

// Lấy danh sách tất cả địa điểm
router.get('/', addressController.getaddress);

// Tạo mới một địa điểm
router.post('/create', addressController.createaddress);

// Xóa tất cả các địa điểm
router.delete('/deleteAll', addressController.deleteAlladdresss);
module.exports = router;