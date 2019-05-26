const mongoose = require('mongoose');
const OrderId = new mongoose.Schema({
    orderid:String
})
var order = mongoose.model('order',OrderId);
module.exports = order;
