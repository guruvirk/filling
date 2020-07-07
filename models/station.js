var mongoose = require('mongoose')

module.exports = {
    name: String,
    services: [String],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: false,
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: false,
            default: [0, 0]
        }
    },
    status: {
        type: String,
        default: 'active',
        enum: ['active', 'in-active']
    }
}