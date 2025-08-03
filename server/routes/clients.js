const express = require('express');
const { body, validationResult } = require('express-validator');
const { protect, authorize } = require('../middleware/auth');
const { uploadFields } = require('../middleware/upload');
const Client = require('../models/Client');

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);

// @desc    Get all clients
// @route   GET /api/clients
// @access  Private
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, search, status } = req.query;
    
    const query = {};
    if (search) {
      query.$or = [
        { clientName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { trnNumber: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (status) {
      query.status = status;
    }

    const clients = await Client.find(query)
      .populate('createdBy', 'username email')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Client.countDocuments(query);

    res.json({
      success: true,
      data: clients,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Get single client
// @route   GET /api/clients/:id
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id)
      .populate('createdBy', 'username email');

    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }

    res.json({
      success: true,
      data: client
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Create new client
// @route   POST /api/clients
// @access  Private
router.post('/', uploadFields, [
  body('clientName')
    .notEmpty()
    .withMessage('Client name is required'),
  body('legalEntity')
    .notEmpty()
    .withMessage('Legal entity is required'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('phone1')
    .notEmpty()
    .withMessage('Phone number is required'),
  body('address')
    .notEmpty()
    .withMessage('Address is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const clientData = {
      ...req.body,
      createdBy: req.user.id
    };

    // Handle file uploads
    if (req.files) {
      if (req.files.tradeLicense) {
        clientData.documents.tradeLicense = {
          filename: req.files.tradeLicense[0].filename,
          path: req.files.tradeLicense[0].path,
          uploadedAt: new Date()
        };
      }
      
      if (req.files.agreement) {
        clientData.documents.agreement = {
          filename: req.files.agreement[0].filename,
          path: req.files.agreement[0].path,
          uploadedAt: new Date()
        };
      }
    }

    // Handle tax periods
    if (req.body.taxPeriods) {
      clientData.taxPeriods = JSON.parse(req.body.taxPeriods);
    }

    const client = await Client.create(clientData);

    res.status(201).json({
      success: true,
      data: client
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Update client
// @route   PUT /api/clients/:id
// @access  Private
router.put('/:id', uploadFields, async (req, res) => {
  try {
    let client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }

    const updateData = { ...req.body };

    // Handle file uploads
    if (req.files) {
      if (req.files.tradeLicense) {
        updateData.documents = {
          ...updateData.documents,
          tradeLicense: {
            filename: req.files.tradeLicense[0].filename,
            path: req.files.tradeLicense[0].path,
            uploadedAt: new Date()
          }
        };
      }
      
      if (req.files.agreement) {
        updateData.documents = {
          ...updateData.documents,
          agreement: {
            filename: req.files.agreement[0].filename,
            path: req.files.agreement[0].path,
            uploadedAt: new Date()
          }
        };
      }
    }

    // Handle tax periods
    if (req.body.taxPeriods) {
      updateData.taxPeriods = JSON.parse(req.body.taxPeriods);
    }

    client = await Client.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    res.json({
      success: true,
      data: client
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Delete client
// @route   DELETE /api/clients/:id
// @access  Private (Admin only)
router.delete('/:id', authorize('admin'), async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }

    await client.remove();

    res.json({
      success: true,
      message: 'Client deleted successfully'
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