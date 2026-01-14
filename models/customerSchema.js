const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    username: { type: String, required: true, trim: true, index:true },
    discount: { type: Number, required: true, min: 0, max: 100 },

})
const customer = mongoose.model('Customers', customerSchema);
module.exports = customer;