const address = require('../models/address.model');

const addressController = {
    // Lấy danh sách tất cả các địa điểm
    getaddress: async (req, res) => {
        try {
            const addresss = await address.find();
            res.status(200).json(addresss);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching addresss', error: err.message });
        }
    },

    // Tạo mới một địa điểm
    createaddress: async (req, res) => {
        try {
            const newAddress = new address(req.body);
            const savedaddress = await newAddress.save();
            res.status(201).json(savedaddress);
        } catch (err) {
            res.status(500).json({ message: 'Error creating address', error: err.message });
        }
    },

    // Xóa tất cả các địa điểm
    deleteAlladdresss: async (req, res) => {
        try {
            await address.deleteMany({});
            res.status(200).json({ message: 'All addresss deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: 'Error deleting addresss', error: err.message });
        }
    }
};

module.exports = addressController;
