/**
 * @author MarioDu <dujiakun@gmail.com>
 */

var dbName   = 'id_autoinc_example',
    mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    db       = mongoose.createConnection('127.0.0.1', dbName),
    autoinc  = require('../index');

autoinc.init(db);

var UserSchema = new Schema({
  name:  String,
  email: String
});

UserSchema.plugin(autoinc.plugin, {
  model: 'User',
  field: 'seqnumber',
  start: 100,
  step: 10
});

var User = db.model('User', UserSchema);

console.log('Database:   ' + dbName);
console.log('Collection: ' + User.collection.name);

var user_1 = new User({
  name:  'LiuBei',
  email: 'liubei@xishu.com'
});

user_1.save(function (err, res) {

  console.log('New record added:');
  console.log(res);
});

var user_2 = new User({
  name:  'ZhouYu',
  email: 'zhouyu@wu.com'
});

user_2.save(function (err, res) {

  console.log('New record added:');
  console.log(res);
  mongoose.disconnect();
});