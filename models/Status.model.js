const mongoose = require('mongoose');

const StatusSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Icon: {
        type: String,
        required: true
    }
});

const Status = mongoose.model("Status", StatusSchema);
module.exports = Status;