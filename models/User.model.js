const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({

    FullName:    {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique : true
    },
    Password: {
        type: String,
        required: true,
      select: false,
    },
    Contact: {
        type: String,
        required: true
    },
    Image : {
        type :String,
        required:true
    }

},  { timestamps: true }
);

const User = mongoose.model("User", UserSchema)
module.exports = User;