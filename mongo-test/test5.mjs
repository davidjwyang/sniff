import Mongo from 'mongodb'

let MongoClient = Mongo.MongoClient
MongoClient.connect('mongodb://localhost').then(connection => {
	let db = connection.db('sniff')
	db.collection('test').findOne({ userId : 'user2' }).then(sample => {
		console.log(JSON.stringify(sample))
		connection.close()
	})
}).catch(error => {
	console.log('Error: ', error)
})
