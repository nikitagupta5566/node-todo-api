const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


// Todo.remove({}).then((result) => {
// 	console.log(result);
// });


// Todo.findOneAndRemove
// Todo.findByIdAndRemove

// Todo.findOneAndDelete({
// 	_id: '5c2cb0bb4d19e582be6387f8',
// }).then((todo) => {
// 	console.log(todo);
// });

Todo.findByIdAndDelete('5c2cb0bb4d19e582be6387f8').then((todo) => {
	console.log(todo);
})