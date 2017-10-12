const express = require('express');
const request = require('request');
const fs = require('fs');
const User = require('mongoose').model('User');
const pdf = require('html-pdf');
const mongoose = require('mongoose');
const Base64 = require('js-base64').Base64;

const router = new express.Router();
const clientID = '2a94qrb5uvst6wrg29pzwu2q';
const clientSecret = 'qnp7CX4HjK';

var apiHost = ''
if (process.env.NODE_ENV == 'production') {
	apiHost = 'http://api-elb.wgworkshops.net:8080'
} else {
	apiHost = 'http://localhost:8080'
}

function validateRegistrantForm(payload) {
	const errors = {};
	let isFormValid = true;
	let message = '';
	if (!payload || typeof payload.fname !== 'string' || payload.fname.trim().length === 0) {
	isFormValid = false;
	errors.fname = 'Please provide your first name.';
	}

	if (!payload || typeof payload.lname !== 'string' || payload.lname.trim().length === 0) {
	isFormValid = false;
	errors.lname = 'Please provide your last name.';
	}

	if (!isFormValid) {
	message = 'Check the form for errors.';
	}

	return {
	success: isFormValid,
	message,
	errors
	};
}

function validateMessageForm(payload) {
	const errors = {};
	let isFormValid = true;
	let message = '';
	if (!payload || typeof payload.Subject !== 'string' || payload.Subject.trim().length === 0) {
	isFormValid = false;
	errors.subject = 'Please provide a subject.';
	}

	if (!payload || typeof payload.Message !== 'string' || payload.Message.trim().length === 0) {
	isFormValid = false;
	errors.message = 'Please provide message.';
	}

	if (!isFormValid) {
	message = 'Check the form for errors.';
	}

	return {
	success: isFormValid,
	message,
	errors
	};
}

function validateRescheduleForm(payload) {
	const errors = {};
	let isFormValid = true;
	let message = '';
	if (!payload || typeof payload !== 'string' || payload.trim().length === 0) {
	isFormValid = false;
	errors.subject = 'Please provide a reason.';
	}

	if (!isFormValid) {
	message = 'Check the form for errors.';
	}

	return {
	success: isFormValid,
	message,
	errors
	};
}


function getToken(callback, res, host) {
	var url = "http://api-elb.wgworkshops.net:8080/InfusionSoft/Token"
	var token = "";
	request(url, function(error, response, data){
		try {
			token = JSON.parse(response.body)
			var url2 = "https://api.infusionsoft.com/crm/rest/v1/contacts?limit=1&access_token=" + token.AccessToken
			request(url2, function(error2, response2, data2){
				if(data2.indexOf("Developer Inactive") != -1){
					var refreshUrl = "https://api.infusionsoft.com/token"
					var dataObj = {
						"grant_type": "refresh_token",
						"refresh_token": token.RefreshToken
					}
					var datastring = "grant_type=refresh_token&refresh_token=" + token.RefreshToken
					var header = "Basic " + Base64.encode(clientID + ":" + clientSecret)
					request({
						url:refreshUrl,
						method:"POST",
						headers:{
							"Authorization":header,
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						body: datastring
					}, function(error, response, data){
						if(error || data.indexOf("error") != -1 ){
							return error
							if(callback != undefined){
								callback("error", res, host)
							}
						} else {
							var updateURL = apiHost + "/InfusionSoft/Token";
							var newToken = JSON.parse(data)
							console.log("new token:")
							console.log(newToken)
							request({
								url: updateURL,
								method:"POST",
								headers:{
									"Content-Type":"application/json"
								},
								body:JSON.stringify({
									"AccessToken": newToken.access_token,
									"RefreshToken": newToken.refresh_token
								})
							}, function(error, response, data){
								if(error){
									return error
									if(callback != undefined){
										callback("error", res, host)
									}
								} else {
									var tokenFinal = JSON.parse(data)
									var token = {
											"AccessToken":tokenFinal.AccessToken,
											"RefreshToken":tokenFinal.RefreshToken
										}
									if(callback != undefined){
										callback(token, res, host)
									}
									return token
								}
							}
							)
						}
					})
				} else {
					if(callback != undefined){
						callback(token, res, host)
					}
					return token
				}
				
			})
		} catch(error){
			console.log(error)
			if(callback != undefined){
				callback("error",res, host)
			}
			return error
		}
	})
}

router.get('/token',(req,res,data) =>{
	var token = {}
	var token = getToken();
	if(token.AccessToken == undefined){
		res.status(500).json({
			"error":token
		})
	} else {
		res.status(200).json({
			"token":token
		})
	}
})

router.post('/createHost', (req,res,data) => {
	var host = req.body
	
	getToken(createHost, res, host)
})

function createHost(token, res, host){
	var contact = {}
	contact.opt_in_reason = "Customer opted-in through webform";
	contact.email_addresses = [
		{
			"email":host.Email,
			"field":"EMAIL1"
		}
	]

	contact.phone_numbers = [
		{
			"field":"PHONE1",
			"number":host.Phone
		}
		]
	contact.company ={
			"company_name":host.Company,
			"id":"0"
		}
	contact.custom_fields = [
		{
		"id":"44",
		"content":host.BDFMO
		}
	]
	contact.given_name = host.FirstName
	contact.family_name = host.LastName
	console.log(contact)
	if(token != "error"){
		request({
		url:"https://api.infusionsoft.com/crm/rest/v1/contacts?access_token=" + token.AccessToken,
		method:"POST",
		headers:{
			"Content-Type":"application/json",
			"Content-Length":JSON.stringify(contact).length
		},
		json: contact
	}, function(error, response, data){
		try {
			console.log("1")
			// console.log(data)
			res.status(200).json({
	     		host: response.body
	    	});
		}
		catch(error) {
			console.log("2")
			// console.log(data)
			res.status(500).json({
	     		errors: error
	    	});
		}
	})
	} else {
		res.status(500).json({
     		errors: "error"
    	});
	}
	
}

router.post('/updateHost', (req,res,date) =>{
	var host = req.body
	var mongoID = host.HostID
	console.log(mongoID)
	var url = apiHost + '/Host/' + mongoID
	request(
		{
			url: url,
			method: 'POST',
		    headers: {
		        'content-type': 'application/json',
		    },
		    json: host
		}, function(error, response, data){
			try {
				res.status(200).json({
		     		host: response.body
		    	});
			}
			catch(error) {
				res.status(500).json({
		     		errors: error
		    	});
			}
		}
	)
})

router.post('/updateRegistrant', (req, res, data) => {
	req.body.DateNumber = parseInt(req.body.DateNumber)
	var url = apiHost + '/Registrant/' + req.body.regId;
	request({
		url: url,
		method: 'POST',
	    headers: {
	        'content-type': 'application/json',
	    },
	    json: req.body
	}, function(error, response, data) {
		try {
			console.log(response)
			res.status(200).json({
	     		registrant: response.body
	    	});
		}
		catch(err) {
			console.log(err)
			res.status(500).json({
	     		errors: err
	    	});
		}
	})
})

router.post('/addTag', (req, res, data) => {
	req.body.DateNumber = parseInt(req.body.DateNumber)
	var url = apiHost + '/Registrant/' + req.body._id;
	request({
		url: url,
		method: 'POST',
	    headers: {
	        'content-type': 'application/json',
	    },
	    json: req.body
	}, function(error, response, data) {
		try {
			console.log(response)
			res.status(200).json({
 				registrant: response
			});
		}
		catch(err) {
			console.log(err)
			res.status(500).json({
	     		errors: err
	    	});
		}
	})
})

router.post('/addTag/dates', (req, res, data) => {
	var url = apiHost + '/Event/' + req.body._id;
	request({
		url: url,
		method: 'POST',
	    headers: {
	        'content-type': 'application/json',
	    },
	    json: req.body
	}, function(error, response, data) {
		try {
			res.status(200).json({
	 			registrant: response
			});
		}
		catch(err) {
			console.log(err)
			res.status(500).json({
	     		errors: err
	    	});
		}
	})
})

router.get('/tag/infusionsoft/:isid/:value', () => {
	var urlOne = '/token'
	request(urlOne, function(error, response, data) {
		try {
			console.log(response.AccessToken)
			var url = 'https://api.infusionsoft.com/crm/rest/v1/contacts/' + req.params.isid + '/tags'
			request({
				url: url,
				method: 'POST',
			    headers: {
			        'Content-Type': 'application/json',
			        'Authorization': 'Bearer ' + response.AccessToken
			    },
			    json: {tagIds: [parseInt(req.params.value)]}
			}, function(errorTwo, responseTwo, dataTwo) {
				var parsedThree;
				try {
					console.log(dataTwo)
					res.status(200).json({
			     		registrant: responseTwo.body
			    	});
				} 
				catch(err) {
					console.log(err)
				}
			})
		}
		catch(err) {
			console.log(err)
			res.status(500).json({
	     		errors: err
	    	});
		}
	})  
})

router.get('/reRegister/infusionsoft/:isid/:value', () => {
	var urlOne = '/token'
	request(urlOne, function(error, response, data) {
		try {
			console.log(response.AccessToken)
			var url = 'https://api.infusionsoft.com/crm/rest/v1/contacts/' + req.params.isid + '/tags/'+req.params.value
			request({
				url: url,
				method: 'DELETE',
			    headers: {
			        'Authorization': 'Bearer ' + response.AccessToken
			    }
			}, function(errorTwo, responseTwo, dataTwo) {
				var parsedThree;
				try {
					console.log(dataTwo)
					res.status(200).json({
			     		registrant: responseTwo.body
			    	});
				} 
				catch(err) {
					console.log(err)
				}
			})
		}
		catch(err) {
			console.log(err)
			res.status(500).json({
	     		errors: err
	    	});
		}
	})  
})
router.get('/unRegister/:regId', (req, res, data) => {
	var url = apiHost + '/UnRegister/' + req.params.regId;
	request(url, function(error, response, data) {
		try {
			console.log(response)
			res.status(200).json({
	     		registrant: response
	    	});
		}
		catch(err) {
			console.log(err)
			res.status(500).json({
	     		errors: err
	    	});
		}
	}) 
})

router.get('/reRegister/:regId', (req, res, data) => {
	var url = apiHost + '/ReRegister/' + req.params.regId;
	request(url, function(error, response, data) {
		console.log(response)
		try {
			console.log(response)
			res.status(200).json({
	     		registrant: response
	    	});
		}
		catch(err) {
			console.log(err)
			res.status(500).json({
	     		errors: err
	    	});
		}
	})
})

router.post('/registrant', (req, res, next) => {
  const validationResult = validateRegistrantForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  } else {
  	const sendJSON = {
  		FirstName: req.body.fname,
  		LastName: req.body.lname,
  		Email: req.body.email,
  		Phone: req.body.phone,
  		ZipCode: parseInt(req.body.zip),
  		Status: req.body.status,
  		Attended: Boolean(req.body.attended)
  	}
	const urlThree = apiHost+'/Register/'+req.body.eventId+'/'+req.body.dateNumber
	request({
		url: urlThree,
		method: 'POST',
	    headers: {
	        'content-type': 'application/json',
	    },
	    json: sendJSON
	}, function(error, response, data) {
		var parsedThree;
		try {
			console.log(data)
			res.status(200).json({
	     		registrant: response.body
	    	});
		} 
		catch(err) {
			console.log(err)
		}
	})
  }
});

router.post('/attendance/submit/:eventId', (req, res, next) => {
	const urlThree = apiHost+'/Event/'+req.params.eventId
	request({
		url: urlThree,
		method: 'POST',
	    headers: {
	        'content-type': 'application/json',
	    },
	    json: req.body
	}, function(error, response, data) {
		var parsedThree;
		try {
			res.status(200).json({
	     		event: response.body
	    	});
		} 
		catch(err) {
			console.log(err)
		}
	})
});

router.post('/guest', (req, res, next) => {
  const validationResult = validateRegistrantForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  } else {
  	const sendJSON = {
  		FirstName: req.body.fname,
  		LastName: req.body.lname,
  		Email: req.body.email,
  		Phone: req.body.phone,
  		ZipCode: parseInt(req.body.zip),
  	}
	const urlThree = apiHost+'/RegisterGuest/'+req.body.regId
	request({
		url: urlThree,
		method: 'POST',
	    headers: {
	        'content-type': 'application/json',
	    },
	    json: sendJSON
	}, function(error, response, data) {
		var parsedThree;
		try {
			console.log(data)
			res.status(200).json({
	     		registrant: response.body
	    	});
		} 
		catch(err) {
			console.log(err)
		}
	})
  }
});

router.post('/guest/edit', (req, res, next) => {
  const validationResult = validateRegistrantForm(req.body.guest);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  } else {
  	const sendJSON = req.body.guests
	const urlThree = apiHost+'/EditGuest/'+req.body.regId
	request({
		url: urlThree,
		method: 'PUT',
	    headers: {
	        'content-type': 'application/json',
	    },
	    json: sendJSON
	}, function(error, response, data) {
		var parsedThree;
		try {
			console.log(data)
			res.status(200).json({
	     		registrant: response.body
	    	});
		} 
		catch(err) {
			console.log(err)
		}
	})
  }
});

router.post('/sendMessage', (req, res, next) => {
  const validationResult = validateMessageForm(req.body.Message);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  } else {
	const urlThree = apiHost+'/CustomEmail'
	request({
		url: urlThree,
		method: 'POST',
	    headers: {
	        'content-type': 'application/json',
	    },
	    json: req.body
	}, function(error, response, data) {
		var parsedThree;
		try {
			console.log(data)
			res.status(200).json({
	     		response: response.body
	    	});
		} 
		catch(err) {
			console.log(err)
		}
	})
  }
});

router.get('/host/:hostId', (req, res) => {
	var url = apiHost+'/Host/'+req.params.hostId
	request(url, function(error, response, data) {
		if(error == null){
			var response = JSON.parse(data)
			res.status(200).json({
	     		host: response
	    	});
		} else {
			console.log(error)
		}
	})
});

router.post('/order', (req,res)=>{
	var url = 'http://localhost:8080/PlaceOrder'
	request({
		url:url,
		method:'POST',
		headers:{
			'Content-Type':'application/json'
		},
		json:req.body
	}, function(error,response,data){
		console.log(error)
		console.log(response)
		console.log(data)
		res.status(200).json({
			'data':data
		})
	})
})

router.get('/dashboard/:type/:hostId', (req, res) => {
	var url = '';
	if(req.params.type == 'host'){
		url = apiHost+'/ExpandedEvents?Host='+req.params.hostId;
	} else {
		url = apiHost+'/ExpandedEvents';
	}
	request(url, function(error, response, data) {
		if(error == null){
			var response = JSON.parse(data)
			res.status(200).json({
	     		events: response
	    	});
		} else {
			console.log(error)
		}
	})
});

router.get('/dashboard/orders', (req, res) => {
	var url = apiHost+'/GetExpandedOrders'
	request(url, function(error, response, data) {
		console.log(data)
		if(error == null){
			var response = JSON.parse(data)
			console.log(response)
			res.status(200).json({
	     		events: response
	    	});
		} else {
			console.log(error)
		}
	})
});

router.post('/dashboard/pdf', (req, res) => {
	console.log(req.body.registrants)
	var returnString = '<div>'
	returnString += "<p class='title'>SIGN IN SHEET</p>"
	returnString += "<p class='location'>"+req.body.location+"</p>"
	returnString += "<p class='date'>"+req.body.date+"</p>"
	returnString += "<p class='sign-below'>***ALL ATTENDEES MUST SIGN BELOW***</p>"
	var splitArr = req.body.type.split('&')
	if (req.body.type.includes('&')) {
		returnString += "<table style='width:100%' border='1'><tr><th>HH</th><th>Last Name</th> <th>First Name</th><th>Signature</th><th>Spouse/Partner Signature</th><th>Guest Signature</th><th>'+splitArr[splitArr.length-1]+'</th></tr>"
		for (var i=0; i < req.body.registrants.length; i++) {
			returnString += '<tr><td>'+(i+1)+'</td><td>'+req.body.registrants[i].LastName+'</td><td>'+req.body.registrants[i].FirstName+'</td><td></td><td></td><td></td><td></td></tr>'
		}
	} else {
		returnString += "<table style='width:100%' border='1'><tr><th>HH</th><th>Last Name</th> <th>First Name</th><th>Signature</th><th>Spouse/Partner Signature</th><th>Guest Signature</th></tr>"
		for (var i=0; i < req.body.registrants.length; i++) {
			returnString += '<tr><td>'+(i+1)+'</td><td>'+req.body.registrants[i].LastName+'</td><td>'+req.body.registrants[i].FirstName+'</td><td></td><td></td><td></td></tr>'
		}
	}

	returnString += '</table>'
	returnString += "<p class='fine-print'>By attending this class, I understand that the presenter and 567 Workshops are not affiliated with any government agency, including, but not limited to the Social Security Administration. This class is porvided for educational purposes only and does not constitute as advice. The information contained within this class is based on current laws and rules, which may change in future. 567 Workshops cannot be held responsible for any direct or incidental loss resulting from apllying any of the information provided in this publication or from any other source mentioned.<p>"
	returnString += '</div>'
	returnString += "<style>.title{font-size:36px;font-weight:700;font-family:'Century Gothic';text-align:center;margin:auto}.location{font-family:'Century Gothic';font-size:14px;text-align:left;position:absolute;top:15px}.date{font-family:'Century Gothic';font-size:14px;text-align:right;position:absolute;top:15px;right:5px;}.sign-below{left:0px;font-family:'Century Gothic';font-size:18px;text-align:center;background-color:yellow;position:absolute;top:30px;width:100%;color:#4f4749}th{font-family:'Trebuchet MS';font-weight:700;font-size:14px}td{font-family:'Trebuchet MS';font-size:16px;text-align:center;height:30px}.fine-print{font-family:'Century Gothic';font-size:12px;text-align:center}table{border-collapse:collapse;margin-top:20px}table td:nth-child(4){column-width:150px;min-width:150px;}table td:nth-child(5){column-width:150px;min-width:150px;}table td:nth-child(6){column-width:150px;min-width:150px;}</style>"
	fs.writeFile('./server/templates/'+req.body.location+'.html', returnString, function(err) {
    if(err) {
        return console.log(err);
    }

	var html = fs.readFileSync('./server/templates/'+req.body.location+'.html', 'utf8');
	var options = {height: (req.body.registrants.length*30 + 180)+'px', width: '1000px'};
	 
	pdf.create(html, options).toFile('./server/templates/'+req.body.location+'.pdf', function(err, resTwo) {
	  if (err) return console.log(err);
	  res.send('./tmp/'+req.body.location+'.pdf'+'?q='+req.headers.authorization.split(' ')[1])
	});
	});
});

router.post('/attendance', (req, res) => {
	var completionArray = []
	for (var i = 0; i < req.body.length; i++) {
		const urlThree = apiHost+'/Registrant/'+req.body[i]._id
		if (req.body[i].ISID != undefined) {
	      var arr = [746, 2038, 2128, 2100, 2974, 2972]
	      val = arr[req.body[i].DateNumber]
	      	request({
				url:'/api/tag/infusisoft/'+req.body[i].ISID +'/' + val,
				method:'GET',
				headers:{
					'Content-Type':'application/x-www-form-urlencoded',
					'Auth': `bearer ${Auth.getToken()}`
				},
				json:req.body
			}, function(error,response,data){
				console.log(error)
				console.log(response)
				console.log(data)
				res.status(200).json({
					'data':data
				})
			})
	    }
		request({
			url: urlThree,
			method: 'POST',
		    headers: {
		        'content-type': 'application/json',
		    },
		    json: req.body[i]
		}, function(error, response, data) {
			var parsedThree;
			try {
				completionArray.push('1')
				if (completionArray.length == req.body.length){
					res.send('Done')
				}
			} 
			catch(err) {
				console.log(err)
			}
		})
	}
});	

router.post('/reschedule', (req, res) => {
	  const validationResult = validateRescheduleForm(req.body.reason);
	  if (!validationResult.success) {
	    return res.status(400).json({
	      success: false,
	      message: validationResult.message,
	      errors: validationResult.errors
	    });
	  } else {
		const urlThree = apiHost+'/Reschedule/'+req.body.event+'/'+req.body.dateChosen+'/'+req.body.date+'/'+req.body.dateNumber+'/'+req.body.reason
		request({
			url: urlThree,
			method: 'GET',
		    headers: {
		        'content-type': 'application/json',
		    }
		}, function(error, response, data) {
			var parsedThree;
			try {
				res.send('Done')
			} 
			catch(err) {
				console.log(err)
			}
		})
	}
});

router.post('/fullAttendance', (req, res) => {
	const urlThree = apiHost+'/MarkAttendance'
	request({
		url: urlThree,
		method: 'POST',
	    headers: {
	        'content-type': 'application/json',
	    },
	    json: req.body
	}, function(error, response, data) {
		var parsedThree;
		try {
			res.send('Done')
		} 
		catch(err) {
			console.log(err)
		}
	})
});	

router.post('/check', (req, res) => {
	var sendData = req.body
	sendData.HostID = mongoose.Types.ObjectId(sendData.HostID)
	sendData.RegistrantID = mongoose.Types.ObjectId(sendData.RegistrantID)
	sendData.EventID = mongoose.Types.ObjectId(sendData.EventID)
	const urlThree = apiHost+'/Check'
	request({
		url: urlThree,
		method: 'POST',
	    headers: {
	        'content-type': 'application/json',
	    },
	    json: req.body
	}, function(error, response, data) {
		var parsed = JSON.parse(JSON.stringify(data))
		try {
			res.status(200).json({
				check: parsed
			});
		}
		catch(err) {
			console.log(err)
		}
	})
});	

router.post('/general-agreement/submit', (req, res) => {
	console.log(req.body)
	fs.writeFile('./server/templates/'+req.body.host+'.html', req.body.html, function(err) {
	    if(err) {
	        return console.log(err);
	    }
		var html = fs.readFileSync('./server/templates/'+req.body.host+'.html', 'utf8');
		var options = {orientation: 'portrait'};
		 
		pdf.create(html, options).toFile('./server/templates/'+req.body.host+'.pdf', function(err, resTwo) {
		  if (err) return console.log(err);
		 // res.send('./tmp/'+req.body.location+'.pdf'+'?q='+req.headers.authorization.split(' ')[1])
		});
	});
	const urlThree = apiHost+'/Host/'+req.body.hostId
	request({
		url: urlThree,
		method: 'POST',
	    headers: {
	        'content-type': 'application/json',
	    },
	    json: {'SignedGeneralAgreement': true}
	}, function(error, response, data) {
		var parsedThree;
		try {
			var url = apiHost+'/Host/'+req.body.hostId
			request(url, function(error, response, dataTwo) {
				if(error == null){
					var responseTwo = JSON.parse(dataTwo)
					res.status(200).json({
	     				user: responseTwo
	    			});
				} else {
					console.log(error)
				}
			})
		} 
		catch(err) {
			console.log(err)
		}
	})
})

router.get('/event/search/:query/:type', (req, res) => {
	var collection = ''
	var url = ''
	if(req.params.type == '0'){
		const split = req.params.query.split(',')
		url = apiHost+'/search/venues?City='+split[0].trim()+'&State='+split[1].trim()
		request(url, function(error, response, data) {
		if(error == null){
			var response = JSON.parse(data)
			res.status(200).json({
	     		events: response
	    	});
		} else {
			console.log(error)
		}
		})
	} else if(req.params.type == '1'){
		url = apiHost+'/search/events?Zips.Included='+req.params.query.trim()
		request(url, function(error, response, data) {
		if(error == null){
			var response = JSON.parse(data)
			res.status(200).json({
	     		events: response
	    	});
		} else {
			console.log(error)
		}
		})
	} else if(req.params.type == '2'){
		url = apiHost+'/search/venues?Name='+req.params.query.trim()
		request(url, function(error, response, data) {
		if(error == null){
			var response = JSON.parse(data)
			res.status(200).json({
	     		events: response
	    	});
		} else {
			console.log(error)
		}
		})
	} else if(req.params.type == '3'){
		const split = req.params.query.split(' ')
		url = apiHost+'/search/hosts?FName='+split[0].trim()+'&LName='+split[1].trim()
		request(url, function(error, response, data) {
		if(error == null){
			var response = JSON.parse(data)
			res.status(200).json({
	     		events: response
	    	});
		} else {
			console.log(error)
		}
	})
	}
});

router.get('/targeting/:adSetId', (req, res) => {
	request('https://graph.facebook.com/v2.10/'+req.params.adSetId+'?fields=targeting&access_token=EAARUOeABWOEBAG9biTnvKWp8s6rTwI9x3i9aNG7zloKrBXAnhVOWPgOszm75TucOOBKaI97cZB53De2NKRmjbg6xLGZCGaKStJ0cqwoifoqs3GQ4gt33s7XZBARkHfqXQ68XyZARvSo6bk5fKN8yIkgyHKw6kvYZD', function(error, response, data) {
		if(error == null){
			var response = JSON.parse(data)
			res.status(200).json({
	     		targeting: response
	    	});
		} else {
			console.log(error)
		}
	})
});

router.get('/messageTemplate', (req, res) => {
	request({
		url: 'https://api.postmarkapp.com/templates/3338742',
		headers:{
			"Accept": "application/json",
  			"X-Postmark-Server-Token": "cce7392b-fb70-494f-b5e8-c31c9029cf15"
		}
	}, function(error, response, data) {
		if(error == null){
			var response = JSON.parse(data)
			res.status(200).json({
	     		template: response
	    	});
		} else {
			console.log(error)
		}
	})
});

router.get('/users', (req, res) => {
	var collection = ''
	var url = ''
	if(req.params.type == '0'){
		const split = req.params.query.split(',')
		url = apiHost+'/search/venues?City='+split[0].trim()+'&State='+split[1].trim()
	} else if(req.params.type == '1'){
		url = apiHost+'/search/events?Zips.Included='+req.params.query.trim()
	} else if(req.params.type == '2'){
		url = apiHost+'/search/venues/Name'+req.params.query.trim()
	} else if(req.params.type == '3'){
		const split = req.params.query.split(' ')
		url = apiHost+'/search/hosts?FName='+split[0].trim()+'&LName='+split[1].trim()
	}
	request(url, function(error, response, data) {
		if(error == null){
			var response = JSON.parse(data)
			res.status(200).json({
	     		events: response
	    	});
		} else {
			console.log(error)
		}
	})
});

module.exports = router;
