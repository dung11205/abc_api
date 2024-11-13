const mongoose = require('mongoose');

// Tạo schema cho thông tin thành phố (city)
const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  imagecity: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
    unique: true, // Đảm bảo rằng id là duy nhất
  },
}, { timestamps: true });

// Xuất model
module.exports = mongoose.model('address', addressSchema);