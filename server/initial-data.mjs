import MongoClient from 'mongodb'

//Will return promise to connection. 
const connection = MongoClient.connect('mongodb://localhost/sniff2')

connection.then(db => {
	//create database sniff if it doesnt already exist
})
