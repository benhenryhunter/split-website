const express = require('express');
const request = require('request');
const router = new express.Router();



// router.post('/updateHost', (req,res,date) =>{
// 	var host = req.body
// 	var mongoID = host.HostID
// 	console.log(mongoID)
// 	var url = apiHost + '/Host/' + mongoID
// 	request(
// 		{
// 			url: url,
// 			method: 'POST',
// 		    headers: {
// 		        'content-type': 'application/json',
// 		    },
// 		    json: host
// 		}, function(error, response, data){
// 			try {
// 				res.status(200).json({
// 		     		host: response.body
// 		    	});
// 			}
// 			catch(error) {
// 				res.status(500).json({
// 		     		errors: error
// 		    	});
// 			}
// 		}
// 	)
// })


// router.get('/tag/infusionsoft/:isid/:value', () => {
// 	var urlOne = '/token'
// 	request(urlOne, function(error, response, data) {
// 		try {
// 			console.log(response.AccessToken)
// 			var url = 'https://api.infusionsoft.com/crm/rest/v1/contacts/' + req.params.isid + '/tags'
// 			request({
// 				url: url,
// 				method: 'POST',
// 			    headers: {
// 			        'Content-Type': 'application/json',
// 			        'Authorization': 'Bearer ' + response.AccessToken
// 			    },
// 			    json: {tagIds: [parseInt(req.params.value)]}
// 			}, function(errorTwo, responseTwo, dataTwo) {
// 				var parsedThree;
// 				try {
// 					console.log(dataTwo)
// 					res.status(200).json({
// 			     		registrant: responseTwo.body
// 			    	});
// 				} 
// 				catch(err) {
// 					console.log(err)
// 				}
// 			})
// 		}
// 		catch(err) {
// 			console.log(err)
// 			res.status(500).json({
// 	     		errors: err
// 	    	});
// 		}
// 	})  
// })


module.exports = router;
