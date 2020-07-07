'use strict'
var mongoose = require('mongoose')
module.exports = {
    code: String,
    picUrl: String,
    email: {
        type: String,
        lowercase: true
    },
    phone: String,
    name: {
        type: String,
        lowercase: true
    },
    password: String,
    type: {
        type: String,
        default: 'user',
        enum: ['user', 'owner', 'employee']
    },
    station: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'station'
    },
    status: {
        type: String,
        default: 'active',
        enum: ['active', 'inactive', 'blocked']
    }
}