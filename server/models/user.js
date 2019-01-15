const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		unique: true,
		validate: {
			// validator: (value) => {
			// 	return validator.isEmail(value);
			// },
			validator: validator.isEmail,  // this function will be passed the vale on its own 
			message: '{value} is not a valid email',
		}
	},

	password: {
		type: String,
		require: true,
		minlength: 6
	},

	tokens: [{
		access: {
			type: String,
			required: true,
		},

		token: {
			type: String,
			required: true
		}
	}]

});

UserSchema.methods.toJSON = function () {
	var user = this;
	var userObject = user.toObject();    

	console.log(user);
	console.log();
	console.log(userObject);
//The user object has a lot of prototype methods that you can't see which is why you can call stuff like .save() on it.
//Calling toObject on it, gets rid of all those other methods leaving you with just a regular object.
	return _.pick(userObject, ['_id', 'email']);
}

UserSchema.pre('save', function (next) {
	var user = this;

	if(user.isModified('password')) {
		 bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash;
				next();
			})
		})

	} else {
		next();
	}
})

UserSchema.statics.findByToken = function (token) {
	var User = this;
	var decoded;

	try {
		decoded = jwt.verify(token, 'abc123');
	} catch (e) {
		// return new Promise((resolve,reject) => {
		// 	reject(); or this can also be done as follows

		return Promise.reject();
		}

	// console.log("decoded");
	// console.log(decoded);
	return User.findOne({
		_id: decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'
	});

	// in user.findOne() function,why we used token and access property, when we could uniquely identify a user with only id.
	// It's because the token might not exist anymore (it could've been deleted for whatever reason) so just 
	// searching for the user isn't sufficient, we need to find their token as well.

};

UserSchema.methods.generateAuthToken = function () {
	var user = this;
	var access = 'auth';
	var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
	user.tokens = user.tokens.concat([{access, token}])
	
	return user.save().then(() => {     // to chain promises
		return token;
	});
};

var User = mongoose.model('User', UserSchema);


module.exports = {User};


// https://www.udemy.com/the-complete-nodejs-developer-course-2/learn/v4/questions/1930840