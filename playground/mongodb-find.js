// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log("hello",obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
	if (err) {
		console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to mongodb server');

	const db = client.db('TodoApp');

	db.collection('Todos').find({
		_id: new ObjectID('5c224b0067a276a5749738bb'),
	}).toArray().then((docs) => {
		console.log('Todos');
		console.log(JSON.stringify(docs,undefined,2));
	}, (err) => {
		console.log('Unable to fetch todos',err);
	});


	db.collection('Todos').find().count().then((count) => {
		console.log('Todos count : '+count);
	})

	db.collection('Users').find({
		name: 'Nik',
	}).toArray().then((docs) => {
		console.log('Users');
		// console.log(JSON.stringify(docs,undefined,2));
		console.log(docs);
	}, (err) => {
		console.log('Unable to fetch users',err);
	})

	client.close();
});