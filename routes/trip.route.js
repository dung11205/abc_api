const express = require('express');
const router = express.Router();
var tripController = require('../controllers/trip.controller');

// Lấy danh sách tất cả địa điểm
router.get('/', tripController.gettrip);

// Tạo mới một địa điểm
router.post('/create', tripController.createtrip);

// Xóa tất cả các địa điểm
router.delete('/deleteAll', tripController.deleteAlltrips);
module.exports = router;