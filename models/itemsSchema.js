const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    price:{
        type: String,
        required: true,
    },
})
const item = mongoose.model('Item', itemSchema);
module.exports = item;