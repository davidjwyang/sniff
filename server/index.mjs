import Express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import fetch from 'node-fetch'
import session from 'express-session'
import Mongo from 'mongodb'

import users from './userDatas.mjs'
import descrips from './descrips.mjs'
import wags from './wags.mjs'

const app = Express()

let db
let MongoClient = Mongo.MongoClient
MongoClient.connect('mongodb://localhost').then(connection => {
	db = connection.db('sniff') 
	
	app.listen(3000, () => {
		console.log('App started on port 3000')
	})

	app.use(Express.static('static'))
	app.use(bodyParser.json())
	app.use(session({ secret: 'h7e3f5s6', resave: false, saveUninitialized: true }))

	app.all('/app/api/*', (req, res, next) => {
		if (req.method === 'DELETE' || req.method === 'POST' || req.method === 'PUT') {
			if (!req.session || !req.session.user) {
				res.status(403).send({
					message: 'You are not authorized to perform the operation'
				})
			} else {
				next()
			}
		} else {
			next()
		}
	})

	app.use('/app/api/userDatas/', users(db))
	app.use('/app/api/descrips', descrips(db))
	app.use('/app/api/wags', wags(db)) 

	app.post('/app/auth/signin', (req, res) => {
	 	if (!req.body.id_token) {
	   		res.status(400).send({ code: 400, message: 'Missing Token.' });
	    	return;
	  	}
	  	fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${req.body.id_token}`)
	  	.then(response => {
	    	if (!response.ok) response.json().then(error => Promise.reject(error));	
	    	return response.json()
	  	}).then(data => {
			let query = { email : data.email }
			let proj = { projection : { userId : 1, _id : 0 } }    	
	    	//Check if user is already in database.  
	    	let userData = db.collection('userDatas').findOne(query, proj
	    	).then(userData => {
	    		req.session.user = {
    				signedIn : true, email : data.email
  				}
	    		//User object stored in session. 
	    		if (!userData)
	    			req.session.user.new = true
	    		else 		
    				req.session.user.new = false
	    		res.json(req.session.user)
	    	})
	    }).catch(error => {
	    	console.log(error);
	    	res.status(500).json({ message: `Internal Server Error: ${error}` });
	  	})
	})

	app.post('/app/auth/signout', (req, res) => {
	  	if (req.session) req.session.destroy();
	  	res.json({ status: 'ok' });
	});

	app.get('/app/auth/sessionUser', (req, res) => {
		if (req.session.user) 
			res.json(req.session.user)
		else 
			res.json({ signedIn : false })
	})

	app.get('*', (req, res) => {
		res.sendFile(path.resolve('./static/index.html'))
	})

}).catch(error => {
	console.log('ERROR: ', error)
})




