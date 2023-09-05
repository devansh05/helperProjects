const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// const users = [{username: 'test', password: 'test'}];

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
  });

  UserSchema.plugin(passportLocalMongoose);

  const UserModel = mongoose.model('User', UserSchema);

  module.exports = UserModel;