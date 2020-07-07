const userService = require('./user-getter')

const set = async (model, entity, context) => {
    if (model.name) {
        entity.name = model.name
    }

    if (model.status) {
        entity.status = model.status
    }

    if (model.services) {
        entity.services = model.services
    }

    if (model.lat && model.long) {
        let location = {
            coordinates: [Number(model.lat), Number(model.long)],
            type: 'Point'
        }
        entity.location = location
    }
}

exports.search = async (query, context, getRead = true) => {

    let where = {}

    let sort = {
        timeStamp: -1
    }

    if (query.around && query.lat && query.long) {
        where['location'] = {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: [query.lat, query.long]
                },
                $maxDistance: query.around
            }
        }
    }

    if (query.services) {
        where.services = {
            $in: query.services
        }
    }

    let items = await db.station.find(where).sort(sort).populate('owner')

    return items
}

exports.update = async (query, model, context) => {
    let entity = await this.get(query, context)
    await set(model, entity, context)
    return entity.save()
}

exports.get = async (query, context) => {
    if (!query) {
        return
    }

    if (query._bsontype === 'ObjectID') {
        query = {
            id: query.toString()
        }
    }

    let station

    if (typeof query === 'string' && query.match(/^[0-9a-fA-F]{24}$/)) {
        station = await db.station.findById(query).populate('participants owner lastMessage')
    }

    if (query.id) {
        station = await db.station.findById(query.id).populate('participants owner lastMessage')
    }

    return station
}

exports.create = async (model, context) => {
    let user = model.user ? await userService.get(model.user, context) : context.user

    let station = new db.station({
        owner: user,
        status: 'active'
    })

    await set(model, station, context)

    await station.save()
    user.station = station
    await user.save()
    return station
}