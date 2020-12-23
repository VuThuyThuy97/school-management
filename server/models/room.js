const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  name: { 
    type:  Schema.Types.String,
    required: true,
    unique: true
  },
});

RoomSchema.statics.isNameTaken = async function (name) {
  const room = await this.findOne({ name });
  return !!room;
};

// RoomSchema.pre('remove', function(next) {
//   // const imager = new Imager(imagerConfig, 'S3');
//   // const files = this.image.files;

//   // if there are files associated with the item, remove from the cloud too
//   // imager.remove(files, function (err) {
//   //   if (err) return next(err);
//   // }, 'article');

//   next();
// });

module.exports = mongoose.model('Room', RoomSchema);