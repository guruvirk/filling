'use strict'
const users = require('./users')
const stations = require('./stations')

let populate = 'user station'

const set = async (model, entity, context) => {
    if (model.status) {
        entity.status = model.status
    }

    if (model.total) {
        entity.total = Number(model.total)
    }

    if (model.items && model.items.length) {
        entity.items = []
        for (const item of model.items) {
            entity.items.push({
                vehicle: item.vehicle,
                service: item.service
            })
        }
    }

}

exports.create = async (model, context) => {

    console.log('create')

    let entity = new db.booking({
        date: new Date(),
        user: context.user,
        station: await stations.get(model.station, context)
    })
    await set(model, entity, context)

    await entity.save()
    return entity
}


exports.search = async (query, context) => {
    let where = {}

    var sortQuery = {
        date: -1
    };

    if (context.user) {
        if (context.user.type == "owner") {
            where['station'] = context.user.station
        }
        if (context.user.type == "employee") {
            where['station'] = context.user.station
        }
        if (context.user.type == "user") {
            where['user'] = context.user
        }
    }

    if (query.status) {
        where['status'] = query.status
    }

    if (query.station) {
        where['station'] = await stations.get(query.station, context)
    }

    if (query.user && context.user.type != "user") {
        where['user'] = await users.get(query.user, context)
    }

    return db.booking.find(where).sort(sortQuery).populate(populate)

}

exports.update = async (id, model, context) => {
    let entity = await db.booking.findById(id)
    await set(model, entity, context)
    return entity.save()
}

exports.get = async (query, context) => {

    if (typeof query === 'string') {
        if (query.isObjectId()) {
            return db.booking.findById(query).populate('station user')
        }
    }
    if (query.id) {
        return db.booking.findById(query.id).populate('station user')
    }

    return null

}