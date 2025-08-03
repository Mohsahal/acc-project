const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: [true, 'Client name is required'],
    trim: true
  },
  legalEntity: {
    type: String,
    required: [true, 'Legal entity is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  phone1: {
    type: String,
    required: [true, 'Phone number is required']
  },
  phone2: String,
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  trnNumber: {
    type: String,
    unique: true,
    sparse: true
  },
  giban: String,
  ftaUsername: String,
  ftaPassword: String,
  vatReturnDueDate: Date,
  location: {
    type: String,
    enum: ['dubai', 'abu-dhabi', 'sharjah', 'ajman', 'rak', 'fujairah', 'uaq']
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending'],
    default: 'pending'
  },
  documents: {
    tradeLicense: {
      filename: String,
      path: String,
      uploadedAt: Date
    },
    agreement: {
      filename: String,
      path: String,
      uploadedAt: Date
    }
  },
  taxPeriods: [{
    period: {
      type: Number,
      required: true
    },
    fromDate: {
      type: Date,
      required: true
    },
    toDate: {
      type: Date,
      required: true
    }
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for better query performance
clientSchema.index({ clientName: 1, trnNumber: 1 });
clientSchema.index({ status: 1 });

module.exports = mongoose.model('Client', clientSchema); 