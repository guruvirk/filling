
const validator = require('validator')

exports.get = async (query, context) => {
    console.log('services/user-getter:get')
    if (!query) {
        return null
    }

    if (query._doc) {
        return query
    }

    if (typeof query === 'string') {
        if (query === 'my') {
            return context.user
        }

        if (query.match(/^[0-9a-fA-F]{24}$/)) {
            return db.user.findById(query)
        }

        if (validator.isEmail(query)) {
            return exports.getByEmail(query, context)
        }

        if (validator.isMobilePhone(query, 'any')) {
            return exports.getByPhone(query, context)
        }

        return exports.getByCode(query, context)
    } else if (query.id) {
        if (query.id === 'my') {
            return db.user.findById(context.user.id)
        }

        return db.user.findById(query.id)
    } else if (query.code) {
        return exports.getByCode(query.code, context)
    }

    if (query.email) {
        return exports.getByEmail(query.email, context)
    }

    if (query.phone) {
        return exports.getByPhone(query.phone, context)
    }

    return null
}

exports.getByCode = async (code, context) => {
    console.log('services/users:getByCode')

    let user = await db.user.findOne({
        code: code
    })

    return user
}

exports.getByEmail = async (emailId, context) => {
    console.log('services/users:getByEmail')
    let user = db.user.findOne({
        email: emailId    
    })

    return user
}

exports.getByPhone = async (phoneNumber, context) => {
    console.log('services/users:getByPhone')

    let user = db.user.findOne({
        phone: phoneNumber
    })

    return user
}
