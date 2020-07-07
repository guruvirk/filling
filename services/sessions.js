var moment = require('moment')

exports.create = async (user, context) => {

    let expiry = moment().add(1, 'week')

    let session = new db.session({
        status: 'active',
        user: user,
        expiry: expiry
    })

    await session.save()

    return session

}

exports.logout = async (id, context) => {

    let session = await exports.get(id, context)

    session.status = "inactive"

    await session.save()

    return session

}

exports.get = async (query, context) => {
    let entity
    if (typeof query === 'string' && query.match(/^[0-9a-fA-F]{24}$/)) {
        entity = await db.session.findById(query).populate('user user.station')
    }
    if (query.id) {
        entity = await db.session.findById(query.id).populate('user')
    }

    return entity
}