import Mongo from 'mongodb'

let MongoClient = Mongo.MongoClient
MongoClient.connect('mongodb://localhost').then(connection => {
	let db = connection.db('sniff')
	db.collection('test').insertOne({ n : 3, a : [1,2,3], b : [1,2,3] }).then(result => {
		return db.collection('test').findOne({ _id: result.insertedId })
	}).then(sample => {
		console.log(JSON.stringify(sample))
		connection.close()
	})
}).catch(error => {
	console.log('Error: ', error)
})
