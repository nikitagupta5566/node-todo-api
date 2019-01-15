const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res) => {
	// console.log(res);
	var todo = new Todo({
		text: req.body.text,
	});

	console.log(todo);

	todo.save().then((doc) => {
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/todos', (req,res) => {
	Todo.find().then((todos) => {
		res.send(
			{todos}
		)
	},(e) => {
		res.status(400).send(e);
	})
});


app.get('/todos/:id', (req,res) => {
	var id = req.params.id;

	if (!ObjectID.isValid(id)){
		return res.status(404).send();
	}

	Todo.findById(id).then((todo) => {
		if (!todo) {
			return res.status(404).send();
		}

		return res.status(200).send({todo});
	}, (e) => {
		return res.status(400).send();
	})
});

app.delete('/todos/:id', (req,res) => {
	var id = req.params.id;

	if(!ObjectID.isValid(id)){
		res.status(404).send();
	}

	Todo.findByIdAndDelete(id).then((todo) => {
		if(!todo){
			res.status(404).send();
		}

		res.status(200).send({todo});
	}, (e) => {
		res.status(400).send();
	})
});

app.patch('/todos/:id', (req,res) => {
	var id = req.params.id;
	var body = _.pick(req.body, ['text','completed']);

	if(!ObjectID.isValid(id)) {
		res.status(404).send();
	}

	if (_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
		if (!todo) {
			res.status(404).send();
		}

		res.send({todo});
	},(e) => {
		res.status(404).send();
	})
});


app.post('/users', (req,res) => {
	var body = _.pick(req.body, ['email', 'password']);
	// console.log("hello");
	var user = new User(body);
	console.log(user);

	user.save().then(() => {
		// console.log("looo");
		return user.generateAuthToken();
	}).then((token) => {
		res.header('x-auth', token).send(user);  // x- indicates that it is a user defined header
	}).catch((e) => {
		res.status(400).send(e);
	})
});



app.get('/users/me',authenticate, (req, res) => {
	// var token = req.header('x-auth');
	// // console.log(token);
	// User.findByToken(token).then((user) => {
	// 	// console.log(user);
	// 	if(!user) {
	// 		return Promise.reject();
	// 	}

	// 	req.user = user;
	// 	req.token = token;

	// 	next();

	// 	res.send(user);
	// }).catch((e) => {
	// 	res.status(401).send();
	// })

	res.send(req.user);
})

app.post('/users/login', (req, res) => {
	var body = _.pick(req.body, ['email', 'password']);

	User.findByCredentials(body.email, body.password).then((user) => {
		console.log(user);
		 return user.generateAuthToken().then((token) => {
			res.header('x-auth', token).send(user);
		})
		// res.send(user);
	}).catch((e) => {
		res.status(400).send();
	})

	// console.log(user);
	// res.send(user);
})

app.listen(3000, () => {
	console.log('Started on port 3000');
});
