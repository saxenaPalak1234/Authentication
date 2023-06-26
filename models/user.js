const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    accessToken: {
        type: String,
        default: 'abc'
    },
    isTokenValid: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

// hash the password
userSchema.methods.generateHash = function (password) {
    try {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    } catch (error) {
        console.log('Error***', error)
    }
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('user', userSchema);
module.exports = User;