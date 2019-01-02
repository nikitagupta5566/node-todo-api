const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

var id = '5c2a178afbc1d748602ca645553';

if (!ObjectID.isValid(id)) {
	console.log('ID is not valid');
}

// // Todo.find({
// // 	_id: id,
// // }).then((doc) => {
// // 	console.log(doc);
// // },(e) => {
// // 	console.log(e);
// // });

// Todo.findOne({
// 	_id: id,
// }).then((doc) => {
// 	console.log(doc);
// },(e) => {
// 	console.log(e);
// });

Todo.findById(id).then((todo) => {
	if (!todo) {
		return console.log('Id not found');
	}
	console.log(todo);
},(e) => {
	console.log(e);
}).catch((e) => {});
