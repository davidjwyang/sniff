import Mongo from 'mongodb'

let MongoClient = Mongo.MongoClient
MongoClient.connect('mongodb://localhost').then(connection => {
	let db = connection.db('sniff')

	let query = { n: 1 }
	let update = { '$push': { a : 4 } }
	db.collection('test').updateOne(query, update).then(result => {
		return db.collection('test').findOne({ n:1 })
	}).then(obj => {
		console.log(JSON.stringify(obj))
		connection.close()
	}).catch(error => {
		console.log('Error: ', error)
	})
}).catch(error => {
	console.log('Error: ', error)
})

