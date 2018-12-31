var {mongoose} = require('./db/mongoose.js');



var newTodo = new Todo({
	text: 'Cook dinner',
})

newTodo.save().then((doc) => {
	console.log('Saved todo',doc);
},(e) => {
	console.log('Inable to save todo');
}); 


var otherTodo = new Todo({
	text: '    Feed the cat',
	completed: true,
	completedAt: 123
});

otherTodo.save().then((doc) => {
	console.log(JSON.stringify(doc,undefined,2));
},(e) => {
	console.log('Unable to save', e);
})

var user = new user({
	name: 'Nikita',
	email: 'nikitagupta5566@gmail.com'
})

user.save((doc) => {
	console.log('User saved',doc);
},(e) => {
	console.log('Unable to save user',e);
})

