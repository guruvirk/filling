'use strict'

exports.toTempModel = (entity, context) => {
    let user = {
        id: entity.id,
        code: entity.code,
        email: entity.email,
        phone: entity.phone,
        type: entity.type,
        picUrl: entity.picUrl
    }

    return user

}

exports.toSessionModel = (entity) => {
    let model = {
        id: entity.id,
        code: entity.code,
        email: entity.email,
        phone: entity.phone,
        name: entity.name,
        type: entity.type,
        picUrl: entity.picUrl
    }

    if (entity.session) {
        model.session = {
            id: entity.session.id,
            timeStamp: entity.session.timeStamp,
            status: entity.session.status,
            expiry: entity.session.expiry
        }
    }

    return model
}

exports.toModel = (entity, context) => {
    let model = {
        id: entity.id,
        code: entity.code,
        name: entity.name,
        email: entity.email,
        phone: entity.phone,
        status: entity.status,
        type: entity.type,
        picUrl: entity.picUrl
    }

    return model
}

exports.toSearchModel = (entities, context) => {
    return entities.map((entity) => {
        return exports.toModel(entity, context)
    })
}
