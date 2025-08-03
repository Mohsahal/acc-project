const express = require('express');
const { body, validationResult } = require('express-validator');
const { protect } = require('../middleware/auth');
const { uploadMultiple } = require('../middleware/upload');
const Invoice = require('../models/Invoice');
const Client = require('../models/Client');

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);

// @desc    Get all invoices
// @route   GET /api/invoices
// @access  Private
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, search, status, client, type } = req.query;
    
    const query = {};
    if (search) {
      query.$or = [
        { invoiceNumber: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (status) {
      query.status = status;
    }

    if (client) {
      query.client = client;
    }

    if (type) {
      query.type = type;
    }

    const invoices = await Invoice.find(query)
      .populate('client', 'clientName email')
      .populate('createdBy', 'username')
      .populate('processedBy', 'username')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Invoice.countDocuments(query);

    res.json({
      success: true,
      data: invoices,
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

// @desc    Get single invoice
// @route   GET /api/invoices/:id
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate('client', 'clientName email phone1 address')
      .populate('createdBy', 'username email')
      .populate('processedBy', 'username email');

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found'
      });
    }

    res.json({
      success: true,
      data: invoice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Create new invoice
// @route   POST /api/invoices
// @access  Private
router.post('/', uploadMultiple, [
  body('invoiceNumber')
    .notEmpty()
    .withMessage('Invoice number is required'),
  body('client')
    .isMongoId()
    .withMessage('Valid client ID is required'),
  body('type')
    .isIn(['single', 'multiple'])
    .withMessage('Invalid invoice type'),
  body('category')
    .isIn(['sales', 'purchase', 'sales/purchase'])
    .withMessage('Invalid category'),
  body('amount')
    .isFloat({ min: 0 })
    .withMessage('Valid amount is required'),
  body('dueDate')
    .isISO8601()
    .withMessage('Valid due date is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    // Check if client exists
    const client = await Client.findById(req.body.client);
    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }

    const invoiceData = {
      ...req.body,
      createdBy: req.user.id
    };

    // Handle file uploads
    if (req.files && req.files.length > 0) {
      invoiceData.files = req.files.map(file => ({
        filename: file.filename,
        path: file.path,
        uploadedAt: new Date()
      }));
    }

    const invoice = await Invoice.create(invoiceData);

    res.status(201).json({
      success: true,
      data: invoice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Update invoice
// @route   PUT /api/invoices/:id
// @access  Private
router.put('/:id', uploadMultiple, async (req, res) => {
  try {
    let invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found'
      });
    }

    const updateData = { ...req.body };

    // Handle file uploads
    if (req.files && req.files.length > 0) {
      const newFiles = req.files.map(file => ({
        filename: file.filename,
        path: file.path,
        uploadedAt: new Date()
      }));
      
      updateData.files = [...(invoice.files || []), ...newFiles];
    }

    invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    ).populate('client', 'clientName email');

    res.json({
      success: true,
      data: invoice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Process invoice
// @route   PATCH /api/invoices/:id/process
// @access  Private
router.patch('/:id/process', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found'
      });
    }

    invoice.status = 'completed';
    invoice.processedBy = req.user.id;
    invoice.processedAt = new Date();

    await invoice.save();

    res.json({
      success: true,
      data: invoice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Delete invoice
// @route   DELETE /api/invoices/:id
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found'
      });
    }

    await invoice.remove();

    res.json({
      success: true,
      message: 'Invoice deleted successfully'
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