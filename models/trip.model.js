const mongoose = require('mongoose');

// Tạo schema cho hành động (actions)
const actionsSchema = new mongoose.Schema({
  Detail: {
    type: String,
    default: "",
  },
  Chat: {
    type: String,
    default: "",
  },
  Pay: {
    type: String,
    default: "",
  },
});

// Tạo schema cho thông tin chuyến đi (trip)
const tripSchema = new mongoose.Schema({
  tripName: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  guide: {
    type: String,
    required: true,
  },
  actions: actionsSchema, // Sử dụng actionsSchema cho các hành động
});

// Tạo schema cho thông tin địa điểm (location)
const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  trip: tripSchema, // Sử dụng tripSchema cho các thông tin về chuyến đi
}, { timestamps: true });

module.exports = mongoose.model('Trip', locationSchema);