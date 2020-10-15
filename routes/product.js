var express = require('express');
var router = express.Router();
var Prod = require('save')('product')
var countGet = 0;
var countPost = 0;

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(" > Get request made for all products")
    countGet++
    Prod.find({}, function(err, data){
        console.log("< Sending GET Request Response")
        res.send({"data":data});
    });
    console.log(`Processed Request Count--> Get:${countGet}, Post:${countPost}`)
});

router.get('/:id', function(req, res, next) {
    console.log(" > Get request made for product with Id "+ req.params.id)
    countGet++;
    Prod.findOne({_id:req.params.id}, {}, function(err, data){
        if(err){
            res.send({"Error":err.message})
        }
        console.log("< Sending GET Request Response")
        res.send({"data":data});
        console.log(`Processed Request Count--> Get:${countGet}, Post:${countPost}`)

    });
});
router.post('/add', function(req, res, next) {
    console.log(" >  Post request made to add product")
    countPost++
    if (req.body != undefined){
        Prod.create(req.body, function(err, data){
            console.log(" < Sending POST request Response")
            res.json(data);
        })
    }
    console.log(`Processed Request Count--> Get:${countGet}, Post:${countPost}`)
});

router.delete('/remove_all', function(req, res, next) {
    console.log(" >  Delete request made to delete all products")
    Prod.find({}, function (err, data){
        for(i=0;i<data.length;i++){
            console.log(data[i])
            Prod.deleteMany(data[i], function (err){
                if (err){
                    console.log(err)
                }
            })
        }
        res.send({"Message":"All data deleted"})
    })
    console.log(`Processed Request Count --> Get:${countGet}, Post:${countPost}`)
});

Prod.on('create', function() {
    console.log('New product created!')
})

module.exports = router;
