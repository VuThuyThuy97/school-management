const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type:  Schema.Types.String },
  username: { type:  Schema.Types.String, unique: true },
  isAdmin: { type: Boolean, default: false },
  password: { type: String },
  img: { type: Schema.Types.String, default: 'default.jpg' }
});

UserSchema.statics.isUsernameTaken = async function (username) {
  const user = await this.findOne({ username });
  return !!user;
};

module.exports = mongoose.model('User', UserSchema);