const mongoose = require('mongoose');

const emailListSchema = new mongoose.Schema({
    email: { 
        type: String,
        required: true, 
    },
  
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    createdAt: { 
        type: Date, 
        default: Date.now,
    }
});

module.exports = mongoose.model('EmailList', emailListSchema);
