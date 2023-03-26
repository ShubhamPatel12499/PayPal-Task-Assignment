const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    email: {
        type: String, unique: true, require: true
    },
    name: {
        type: String, require: true
    },
    password: {
        type: String, require: true
    }
})

const userModel = model("user", userSchema);

module.exports = userModel;