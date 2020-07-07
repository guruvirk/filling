let userMapper = require('./user')

exports.toModel = (entity, context) => {
    var model = {
        id: entity.id,
        name: entity.name,
        services: entity.services,
        status: entity.status,
        owner: entity.owner ? userMapper.toModel(entity.owner, context) : null
    }

    if (entity.location && entity.location.coordinates && entity.location.coordinates.length == 2) {
        model.lat = entity.location.coordinates[0]
        model.long = entity.location.coordinates[1]
    }

    return model
}