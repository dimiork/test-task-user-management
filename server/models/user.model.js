const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true, },
  lastName: { type: String, required: true },
  role: {
    type: String,
    enum : ['ARTIST', 'DESIGNER', 'ART_MANAGER'],
    async validate(role) {
      if (role === 'ART_MANAGER') {
        let isPresent;

        try {
          isPresent = await User.findOne({ role })
        } catch (e) {
          console.error('[User Model] An error occurred during validation.')
          console.error(e)
          throw e;
        }

        if (!!isPresent) throw new Error(`A user with role ${role} already exists.`)
      }
    }
  },
  created_at: Date,
  updated_at: Date
});

userSchema.methods.dudify = function () {
  this.name = this.name + '-dude';

  return this.name;
};

userSchema.pre('save', function (next) {
  const currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at)
    this.created_at = currentDate;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
