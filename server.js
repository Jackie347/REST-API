// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var product =require('./models/product');

// MongoDB 
mongoose.connect('mongodb://localhost/product',function(err){
	if(err) {
		console.log('connection error',err);
	} else {
		console.log('connection successful');
	}
}); 

// Express
var app = express();
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
var router = express.Router();

// Routes

// Get all the products
router.route('/products').get(function (req, res) {
    product.find(function (err, products) {
        if (err) {
            res.send(err);
        }
        res.send(products);
    });
});

// Add a product by id
router.route('/products').post(function(req,res){
	console.log("in add");
    var p = new product();
    p._id = req.body._id;
    p.title = req.body.title;
    p.price = req.body.price;
    p.instock = req.body.instock;
    p.save(function (err) {
        if (err) {
            res.send(err);
        }
        console.log("added");
        res.send({ message: 'Product Created !' })
    })
});

// Find a product by id
router.route('/products/:product_id').get(function (req, res) {
    product.findById(req.params.product_id, function (err, prod) {
        if (err){
            res.send(err);
        }
        res.json(prod);
    });
});

// Update a product by id
router.route('/products/:product_id').put(function (req, res) {
    product.findOneAndUpdate({ _id : req.params.product_id },{ 
        $set: { 
                title : req.body.title,
                price : req.body.price,
                instock : req.body.instock         
            }
        }, function (err, prod) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully updated'});
        }
    );
});

// Delete a product by id
router.route('/products/:product_id').delete(function (req, res) {
    product.findOneAndRemove({ _id : req.params.product_id }, function (err, prod) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted' });
    });
});



// Start server
app.use(cors());
app.use('/api', router);
app.listen(3000);
console.log('Listening on port 3000...');