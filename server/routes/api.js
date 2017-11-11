const express = require('express');
const request = require('request');
const fileUpload = require('express-fileupload');
const router = new express.Router();
const MongoClient = require('mongodb').MongoClient

router.use(fileUpload())

var url = 'mongodb://localhost:27017/destanee';



router.post('/upload', (req,res,data) =>{

	if (!req.files)
	  return res.status(400).send('No files were uploaded.');
	
	// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file


	req.files.image.mv(__dirname + "/../static/images/" + req.files.image.name, function(err) {
	  if (err){
	  	res.status(500).send(err);
	  } else {
		newTile({
			"Title":req.body.title,
			"Description":req.body.description,
			"Image":"/images/"+req.files.image.name,
		},res)
	  }
	});
})

function newTile(data, response){
	MongoClient.connect(url, function(err, db) {
		var col = db.collection('test');
		col.insertOne(data,function(err,res){
			if(err){
				response.status(500).json({
					errors: err
				})
			} else {
				response.status(200).json({
					status: res
				})
			}
		})
		db.close();
	})
}


router.get('/items', (req,res) => {
	MongoClient.connect(url, function(err, db) {
		var col = db.collection('test');
		col.find({}).toArray(function(err, items) {
			if(!err){
				res.status(200).json({
			 		items: items
				});
			} else {
				res.status(500).json({
			 		errors: err
				});
			}
		  });
		db.close();
	})
})




module.exports = router;
