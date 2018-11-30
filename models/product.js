// Dependencies
var restful = require('node-restful'); 
var mongoose = restful.mongoose;

// Schema
var ProductSchema = new mongoose.Schema({
	_id: Number,
	title: String,
    price: Number,
    instock: Boolean
});

// Return model
module.exports = restful.model('Products', ProductSchema);