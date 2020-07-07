'use strict'
var mongoose = require('mongoose')

module.exports.configure = function (config) {
    var dbConfig = require(`../${config}.json`);
    console.log('settings/database:configure')
    mongoose.Promise = global.Promise

    let connect = function () {
        console.log('connecting to', dbConfig)
        mongoose.connect(dbConfig.host)
    }

    connect()

    let db = mongoose.connection

    db.on('connected', function () {
        console.log('DB Connected')
    })

    db.on('error', function (err) {
        console.error('connection error: ' + err)
    })

    db.on('disconnected', function () {
        console.info('connecting again')
        connect()
    })

    global.db = require('../models')
    return global.db
}
