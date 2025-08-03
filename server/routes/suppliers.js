const express = require('express');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);

// @desc    Get all suppliers
// @route   GET /api/suppliers
// @access  Private
router.get('/', async (req, res) => {
  try {
    // Placeholder for supplier functionality
    res.json({
      success: true,
      data: [],
      message: 'Supplier functionality coming soon'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router; 