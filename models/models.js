const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        require: true
    },
    stack: {
        type: String,
        enum: ["Backend", "Frontend"],
        require: true
    },
    profilePicture: {
        type: String,
        require: true
    },
}, {timestamps: true})

const User = mongoose.model("User", userSchema)
module.exports = User