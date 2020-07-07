'use strict'

const userMapper = require('./user')
const stationMapper = require('./station')

exports.toModel = (entity, context) => {
    var model = {
        id: entity.id,
        user: entity.user ? userMapper.toModel(entity.user, context) : null,
        station: entity.station ? stationMapper.toModel(entity.station, context) : null,
        date: entity.date,
        status: entity.status,
        total: entity.total
    }

    if (entity.items) {
        model.items = []
        for (const item of entity.items) {
            model.items.push({
                vehicle: item.vehicle,
                service: item.service
            })
        }
    }

    return model
}

exports.toSearchModel = (entities, context) => {
    return entities.map(entity => {
        return exports.toModel(entity, context)
    })
}