const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ClassSchema = new Schema({
  name: { type:  Schema.Types.String, required: true, unique: true },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date, default: Date.now },
  teacher: { type: Schema.ObjectId, ref: 'User' },
  room: { type: Schema.ObjectId, ref: 'Room' }
});

ClassSchema.statics.isNameTaken = async function (name) {
  const foundClass = await this.findOne({ name });
  return !!foundClass;
};

module.exports = mongoose.model('Class', ClassSchema);