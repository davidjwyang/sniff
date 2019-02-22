import express from 'express'
import Mongo from 'mongodb'

function wags(db) {
	const app = express.Router()

	app.get('/:userId', (req, res) => {
		let query = { userId : req.params.userId }
		let proj = { projection : { userId : 1, wags : 1, _id : 0 } }
		db.collection('users').findOne(query, proj).then(wag => {
			res.json(wag)
		}).catch(error => {
			console.log(error)
			res.status(500).json({ message: `Internal Server Error: ${error}` })
		})
	})

	app.post('/:userId', (req, res) => {
		const userId = req.params.userId
		const otherId = req.body.userId 
		let query = { userId }
		let update = { '$push' : { 'wags.to' : otherId } }
		//insert newWag into wagTo list.
		db.collection('users').update(query, update).then(result => {
			//insert the userId into the wag from list of wagTo.
			query = { userId : otherId }
			update = { '$push' : { 'wags.from' : userId } }
			return db.collection('users').update(query, update)
		}).then(result => {
			res.json({ userId })
		}).catch(error => {
			console.log(error)
			res.status(500).json({ message : `Internal Server Error ${error}` })
		})
	})

	app.put('/:userId', (req, res) => {
		const otherId = req.body.otherId 
		let query = { userId : req.params.userId }
		let remove = { '$pull' : { 'wags.to' : otherId } }
		//remove otherId from wag.to list of user specified by userId.	
		db.collection('users').update(query, remove).then(result => {
			//delete the userId from wag.from of user specified by otherId. 
			query = { userId : otherId }
			remove = { '$pull' : { 'wags.from' : req.params.userId } }
			return db.collection('users').update(query, remove)
		}).then(result => {
			res.json(otherId)
		}).catch(error => {
			console.log(error)
			res.status(500).json({ message : `Internal Server Error ${error}` })
		})
	})
	
	return app
}

export default wags