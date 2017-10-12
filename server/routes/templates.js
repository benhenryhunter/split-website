const express = require('express');
const request = require('request');
const fs = require('fs');
const path = require('path');

const router = new express.Router();

router.get('/:fileName', (req, res) => {
	  fs.readFile(path.join(__dirname, '../templates/'+req.params.fileName), function (err,data){
	     res.contentType("application/pdf");
	     res.send(data);
	  });
})

module.exports = router;