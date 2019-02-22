import express from 'express'
import Mongo from 'mongodb'

function descrips(db) {
	const app = express.Router()

	app.get('/:userId', (req, res) => {
		let query = { userId: req.params.userId }
		let proj = { projection : { userId : 1, descrip : 1, _id : 0 } }
		db.collection('users').findOne(query, proj).then(profile => {
			res.json(profile)
		}).catch(error => {
			console.log(error)
			res.status(500).json({ message: `Internal Server Error: ${error}` })
		})
	})

	app.put('/:userId', (req, res) => {
		let query = { userId : req.params.userId }
		let update = { descrip : req.body }
		db.collection('users').updateOne(query, update).then(result => {
			return db.collection('profiles').findOne({ _id : result.insertedId }, { descrip : 1, _id : 0 })
		}).then(profile => {
			res.json(profile)
		}).catch(error => {
			console.log(error)
			res.status(500).json({ message : `Internal Server Error: ${error}` })
		})
	})

	return app
}

export default descrips