var mongoose = require('mongoose');
exports.mongoose = mongoose;

exports.init = function(){
  var db = exports.db = mongoose.createConnection('localhost','test');
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('mongodb connected!');
  });
  
  //define schema
  userSchema = mongoose.Schema({
    name: { type: String, unique: true},
    password: String
  });
  exports.userSchema = userSchema;
  //index using name
  userSchema.index({name: 1});
  //userSchema.set('autoIndex', false);
  exports.User = db.model('testuser', userSchema);
}