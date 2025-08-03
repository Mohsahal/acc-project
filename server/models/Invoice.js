const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    required: [true, 'Invoice number is required'],
    unique: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: [true, 'Client is required']
  },
  type: {
    type: String,
    enum: ['single', 'multiple'],
    required: true
  },
  category: {
    type: String,
    enum: ['sales', 'purchase', 'sales/purchase'],
    required: true
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount cannot be negative']
  },
  currency: {
    type: String,
    default: 'AED'
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'partially_completed', 'cancelled'],
    default: 'pending'
  },
  dueDate: {
    type: Date,
    required: [true, 'Due date is required']
  },
  issueDate: {
    type: Date,
    default: Date.now
  },
  description: String,
  files: [{
    filename: String,
    path: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  vatAmount: {
    type: Number,
    default: 0
  },
  totalAmount: {
    type: Number,
    required: true
  },
  notes: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  processedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  processedAt: Date
}, {
  timestamps: true
});

// Calculate total amount before saving
invoiceSchema.pre('save', function(next) {
  this.totalAmount = this.amount + this.vatAmount;
  next();
});

// Index for better query performance
invoiceSchema.index({ invoiceNumber: 1 });
invoiceSchema.index({ client: 1, status: 1 });
invoiceSchema.index({ issueDate: 1 });
invoiceSchema.index({ dueDate: 1 });

module.exports = mongoose.model('Invoice', invoiceSchema); 