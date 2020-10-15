var express = require('express');
var router = express.Router();
var Prod = require('save')('product')

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("Get request made for all products")
    Prod.find({}, function(err, data){
        res.send({"data":data});
    });
});

router.get('/:id', function(req, res, next) {
    console.log("Get request made for product with Id "+ req.params.id)
    Prod.findOne({_id:req.params.id}, {}, function(err, data){
        if(err){
            res.send({"Error":err.message})
        }
        res.send({"data":data});


    });
});
router.post('/add', function(req, res, next) {
    console.log("Post request made add product")
    Prod.create(req.body, function(err, data){
        res.json(data);
    })

});

Prod.on('create', function() {
    console.log('New product created!')
})

module.exports = router;
