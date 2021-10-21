const { model, Schema } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    email: String,
    password: String,
    name: String,
    social_id: String,
    date: { type: Date, default: Date.now },
    provider: { type: String, default: 'local' },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
        delete ret.__v;
        delete ret._id;
        return ret;
      },
    },
  }
);

userSchema.statics.generateHash = function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.verifyPassword = function verifyPassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = model('User', userSchema);
