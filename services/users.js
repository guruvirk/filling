const crypto = require('../helpers/crypto')
const userGetter = require('./user-getter')
const sessions = require('./sessions')
const stations = require('./stations')

const set = async (model, entity, context) => {
    if (model.password) {
        entity.password = crypto.toHash(model.password)
    }

    if (model.code && entity.code !== model.code) {
        const existingUser = await userGetter.getByCode(model.code, context)
        if (existingUser) {
            console.error(`code ${model.code} is already taken`)
            throw new Error(`code ${model.code} is already taken`)
        }
        entity.code = model.code.toLowerCase()
    }

    if (model.name) {
        entity.name = model.name
    }

    if (model.station) {
        entity.station = await stations.get(model.station, context)
    }

    if (model.type) {
        entity.type = model.type
    }

    if (model.status) {
        entity.status = model.status
    }

    if (model.picUrl) {
        entity.picUrl = model.picUrl
    }

    return entity
}

exports.create = async (model, context) => {
    console.log('services/users:create')

    let user = await userGetter.get(model, context)

    if (user) {
        console.error(`USER_ALREADY_EXIST`)
        throw new Error(`USER_ALREADY_EXIST`)
    }

    user = new db.user({
        status: 'active',
    })

    if (model.phone) {
        user.phone = model.phone
    }

    if (model.email) {
        user.email = model.email
    }

    await set(model, user, context)
    await user.save()

    return user
}

exports.changePassword = async (model, context) => {
    console.log('changePassword')

    if (!model.user) {
        console.error('USER_INVALID')
        throw new Error('USER_INVALID')
    }

    if (!model.newPassword) {
        console.error('NEW_PASSWORD_REQUIRED')
        throw new Error('NEW_PASSWORD_REQUIRED')
    }

    let entity = await userGetter.get(model.user, context)

    if (!entity) {
        console.error('USER_INVALID')
        throw new Error('USER_INVALID')
    }

    if (!crypto.compareHash(model.password, entity.password)) {
        throw new Error('PASSWORD_INVALID')
    }

    model.password = model.newPassword

    entity = await set(model, entity, context)

    await entity.save()

    return entity
}

exports.update = async (id, model, context) => {
    console.log('update')

    let entity = await userGetter.get(id, context)

    if (!entity) {
        throw new Error('USER_INVALID')
    }

    entity = await set(model, entity, context)

    await entity.save()

    return entity
}

exports.login = async (model, context) => {
    console.log('login')

    let entity = await userGetter.get(model, context)

    if (!entity) {
        throw new Error('USER_INVALID')
    }

    if (entity.status !== 'active') {
        throw new Error('USER_BLOCKED')
    }

    if (!entity.password) {
        throw new Error('PASSWORD_NOT_SET')
    }

    if (!crypto.compareHash(model.password, entity.password)) {
        throw new Error('PASSWORD_INVALID')
    }

    entity = await set(model, entity, context)

    await entity.save()

    entity.session = await sessions.create(entity, context)

    return entity
}

exports.get = userGetter.get

exports.logout = sessions.logout