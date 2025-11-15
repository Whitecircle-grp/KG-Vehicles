const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  vehicleNumber: { type: String, required: true },
  ownerName: { type: String, required: true },
  vehicleType: { type: String, required: true },
  insuranceExpiry: { type: Date },
  fitnessExpiry: { type: Date },
  permitExpiry: { type: Date },
  pollutionExpiry: { type: Date },
taxExpiry: { 
  type: String, // store date as string or 'Lifetime'
//   validate: {
//     validator: function(v) {
//       if (!v) return true; // empty is allowed
//       if (v.toLowerCase() === 'lifetime') return true;
//       return !isNaN(Date.parse(v)); // valid date
//     },
//     message: props => `${props.value} must be a valid date, 'Lifetime', or empty`
//   }
},
  documentStatus: {
    type: String,
    enum: ['Active', 'Expired', 'Warning'],
    default: 'Active',
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  oldVehicle: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Vehicle', vehicleSchema);