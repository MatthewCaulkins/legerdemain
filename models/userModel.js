const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    email: {
        type : String,
        required : true,
        unique : true
    },
    password: {
        type : String,
        required : true
    },
    name: {
        type: String,
        required: true
    },
    units: [{
        unit: String,
        num: Number
    }],
    tutorials: [{
        type: String
    }],
    resetToken: {
        type: String
    },
    resetTokenExp: {
        type: Date
    }
});

UserSchema.pre('save', async function (next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;  

    // Can add value here
    this.units.push(
        {"unit": 'axe', "num": 2}, {"unit": 'bow', "num": 2}, {"unit": 'control', "num": 1}, 
        {"unit": 'dagger', "num": 2}, {"unit": 'healing', "num": 1}, {"unit": 'lance', "num": 2}, 
        {"unit": 'shield', "num": 3}, {"unit": 'sorcery', "num": 1}, {"unit": 'sword', "num": 2}
    );

    // Test if email already exist
    UserModel.find({email: user.email}, function(err, docs) {
        if (!docs.length) {
            next();
        } else {
            console.log('user email exists: ', docs);
            next(new Error('Email already exists'));
        }
    })
});

UserSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}

const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;