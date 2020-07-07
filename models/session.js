'use strict'
var mongoose = require('mongoose')

module.exports = {
    status: {
        type: String,
        default: 'active',
        enum: [
            'active', 'expired', 'awaiting', 'inactive'
        ]
    },
    expiry: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}
