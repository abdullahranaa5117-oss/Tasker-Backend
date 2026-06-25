const mongoose = require('mongoose');
const { Schema, SchemaTypes, model } = require("mongoose");

const TaskSchema = new mongoose.Schema({
    Title: {
        type: SchemaTypes.String,
        required: true
    },
    Description: {
        type: SchemaTypes.String,
        required: true
    },
    DueDate: {
        type: SchemaTypes.Date,
        required: true
    },
    DueTime: {
        type: SchemaTypes.String,
        required: true
    },
    Progress: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    Status: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: 'Status'
    },
    Category: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: 'Category'
    },
    User: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: 'User'
    }
}, { timestamps: true });

const Task = model('Task', TaskSchema);
module.exports = Task;