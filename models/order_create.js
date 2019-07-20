const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    id : String,
    data: String
});

const User = module.exports = mongoose.model('order_create', postSchema);
