'use strict'
var mongoose = require('mongoose')
module.exports = {
    date: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    station: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'station'
    },
    items: [{
        vehicle: String,
        service: String
    }],
    status: {
        type: String,
        default: 'new',
        enum: ['new', 'inProgress', 'done', 'cancelled']
    },
    total: Number
}