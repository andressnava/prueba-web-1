const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const schemaUser = new Schema({
    mail: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    date: {type: Date, default: new Date()}
});

schemaUser.methods.encryptPassword = async password =>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

schemaUser.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}



module.exports = model("User", schemaUser);