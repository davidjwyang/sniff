import express from 'express'
import Mongo from 'mongodb'

function users(db) {
	const app = express.Router()
	
	app.get('/search/:userId', (req, res) => {
		let query = { userId : { '$ne' : req.params.userId } } 
		let proj = { projection : { userId : 1, 'descrip.human.first name' : 1, 'descrip.dog.name' : 1, _id : 0 } }
		db.collection('users').find(query, proj).toArray().then(users => {
			let metadata = { total_count: users.length }
			res.json({ _metadata: metadata, records: users })
		}).catch(error => {
			console.log(error)
			res.status(500).json({ message: `Internal Server Error: ${error}` })
		})
	})
	
	//Use user email to query userData
	app.get('/email/:email', (req, res) => {
		let query = { email : req.params.email }
		db.collection('userDatas').findOne(query).then(user => {
			if (user == null) {
				res.json(null)
			} else {
			 	res.json(user)	
			}
		}).catch(error => {
			console.log(error)
			res.status(500).json({ message : `Internal Server Error ${error}` })
		})
	})
	
	//User userId to query userData
	app.get('/userId/:userId', (req, res) => {
		let query = { userId: req.params.userId }
		db.collection('userDatas').findOne(query).then(profile => {
			res.json(profile)
		}).catch(error => {
			console.log(error)
			res.status(500).json({ message: `Internal Server Error: ${error}` })
		})
	})
	
	app.post('/', (req, res) => {
		const newUser = { 
			email : req.body.email,
			userId : req.body.userId, 
			wags : { to : [],  from : [] },
			descrip : req.body.descrip
		}
		// newProfile.created = new Date()
		// When creating new profile, also create new wag document for user. 
		db.collection('users').insertOne(newUser).then(result => { 
			db.collection('userDatas').findOne({ _id: result.insertedId }).then(userData => {
				res.json(userData)
			})
		}).catch(error => {
			console.log(error)
			res.status(500).json({ message: `Internal Server Error: ${error}` })
		})
	})

	return app
}

export default users