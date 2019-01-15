const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const {ObjectID} = require('mongodb');
const bcrypt = require('bcryptjs');

var password = '123abc!';

bcrypt.genSalt(10, (err, salt) => {
	bcrypt.hash(password, salt, (err, hash) => {
		console.log("Hash is "+hash);
	})
})

var hashedPassword = '$2a$10$J73gOUD8Lv/WV90hWf4WeubQae.bXX7BPgvvqOkGad6Ht0M2Tfqk6';

bcrypt.compare(password, hashedPassword, (err,res) => {
	console.log(res);
})
// console.log(id.toHexString().length);
// console.log(id.toString().length);

var data = {
	id:10,
	name:'niki',
}

var token = jwt.sign(data, '123abc');
console.log(token);
console.log(token.toString());

var decoded = jwt.verify(token, '123abc');
console.log(decoded);

// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log(`message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
// 	id: 10
// };


// console.log("HASH: "+SHA256(JSON.stringify(data) + 'somesecret'));


// var token = {
// 	data,
// 	hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }


// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// console.log(token.hash);
// console.log(resultHash);

// if (resultHash === token.hash) {
// 	console.log('Data was not changed');
// } else {
// 	console.log('Data was changed. Do not trust!'); 
// }