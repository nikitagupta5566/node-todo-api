var mongoose = require('mongoose');

var user = mongoose.model('User', {
	name: {
		type: String
	},
	email: {
		type: String,
		required: true,
		trim: true,
		minlength: 1
	},

})


module.exports = {user};