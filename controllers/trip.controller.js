const trip = require('../models/trip.model');

const tripController = {
    // Lấy danh sách tất cả các địa điểm
    gettrip: async (req, res) => {
        try {
            const trips = await trip.find();
            res.status(200).json(trips);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching trips', error: err.message });
        }
    },

    // Tạo mới một địa điểm
    createtrip: async (req, res) => {
        try {
            const trip = new trip(req.body);
            const savedtrip = await trip.save();
            res.status(201).json(savedtrip);
        } catch (err) {
            res.status(500).json({ message: 'Error creating trip', error: err.message });
        }
    },

    // Xóa tất cả các địa điểm
    deleteAlltrips: async (req, res) => {
        try {
            await trip.deleteMany({}); // Xóa tất cả địa điểm
            res.status(200).json({ message: 'All trips deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: 'Error deleting trips', error: err.message });
        }
    }
};

module.exports = tripController;