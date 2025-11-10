const mongoose = require('mongoose');

const phoneListSchema = new mongoose.Schema({
    phone: { 
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

module.exports = mongoose.model('PhoneList', phoneListSchema);