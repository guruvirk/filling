const entityService = require('../services/users')
const entityMapper = require('../mappers/user')

exports.create = async (req) => {
    const entity = await entityService.create(req.body, req.context)
    return entityMapper.toTempModel(entity, req.context)
}

exports.confirm = async (req) => {
    const entity = await entityService.confirm(req.body, req.context)
    return entityMapper.toSessionModel(entity, req.context)
}

exports.sendOtp = async (req) => {
    const entity = await entityService.sendOtp(req.body, req.context)
    return "Otp Sent"
}

exports.changePasswordWithOtp = async (req) => {
    const entity = await entityService.changePasswordWithOtp(req.body, req.context)
    return entityMapper.toModel(entity, req.context)
}

exports.changePassword = async (req) => {
    const entity = await entityService.changePassword(req.body, req.context)
    return entityMapper.toModel(entity, req.context)
}

exports.changeCode = async (req) => {
    const entity = await entityService.changeCode(req.body, req.context)
    return entityMapper.toModel(entity, req.context)
}

exports.logout = async (req) => {
    const entity = await entityService.logout(req.params.id, req.context)
    return "Logged Out Successfully"
}

exports.login = async (req) => {
    const entity = await entityService.login(req.body, req.context)
    return entityMapper.toSessionModel(entity, req.context)
}

exports.get = async (req) => {
    const entity = await entityService.get(req.params.id, req.context)
    return entityMapper.toTempModel(entity, req.context)
}

exports.update = async (req) => {
    const entity = await entityService.update(req.params.id, req.body, req.context)
    return entityMapper.toTempModel(entity, req.context)
}

exports.codeExists = async (req) => {
    let id = req.params.id
    if (!id) {
        throw new Error("Code Required")
    }
    const entity = await entityService.get(req.params.id, req.context)
    if (entity) {
        return {
            exists: true
        }
    } else {
        return {
            exists: false
        }
    }
}

exports.phoneExists = async (req) => {
    let id = req.params.id
    if (!id) {
        throw new Error("Phone Required")
    }
    const entity = await entityService.get(req.params.id, req.context)
    if (entity) {
        return {
            exists: true
        }
    } else {
        return {
            exists: false
        }
    }
}