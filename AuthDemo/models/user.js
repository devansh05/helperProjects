const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username cannot be left blank.']
    },
    //hashed password is stored here not actual one
    password: {
        type: String,
        required: [true, 'Password cannot be left blank']
    }
});

userSchema.statics.findAndValidate = async function(username, password) {
    const foundUser = await this.findOne({ username });
    if(foundUser){
        const isValid = await bcrypt.compare(password, foundUser.password);
        return isValid ? foundUser : false;
    } else {
        return false;
    }
}

userSchema.pre('save', async function(next){
    //before saving change the password to hash key
    //check if the password was modified then dont hash else hash
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

module.exports = mongoose.model('User', userSchema);