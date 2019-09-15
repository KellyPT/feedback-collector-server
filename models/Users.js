const mongoose = require('mongoose');
// const Schema = mongoose.Schema; this is equivalent to the next line
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String
});

// telling mongoose to create a 'users' collection/model class with userSchema. loading a model class into mongoose with 2 arguments
mongoose.model('users', userSchema);
