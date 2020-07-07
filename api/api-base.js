'use strict'

const inflate = (flattened) => {
    let model = {}

    Object.getOwnPropertyNames(flattened).forEach(key => {
        const value = flattened[key]

        if (!value) {
            return
        }

        let parts = key.split('-')
        let index = 0
        let obj = model

        for (const part of parts) {
            if (index === parts.length - 1) {
                obj[part] = value
            } else {
                obj[part] = obj[part] || {}
            }

            obj = obj[part]
            index++
        }
    })

    return model
}

module.exports = (serviceName, mapperName) => {
    let name = serviceName
    mapperName = mapperName || name
    const entityService = require(`../services/${name}`)
    const entityMapper = require(`../mappers/${mapperName}`)

    if (!entityService) {
        throw new Error(`services.${name} does not exist`)
    }

    if (!entityMapper) {
        throw new Error(`mappers.${mapperName} does not exist`)
    }

    return {
        get: async (req) => {
            if (!entityService.get) {
                throw new Error(`METHOD_NOT_SUPPORTED`)
            }
            let entity = await entityService.get(req.params.id, req.context)

            if (!entity) {
                throw new Error(`RESOURCE_NOT_FOUND`)
            }
            return entityMapper.toModel(entity, req.context)
        },
        search: async (req) => {
            if (!entityService.search) {
                throw new Error(`METHOD_NOT_SUPPORTED`)
            }

            let query = inflate(req.query)
            console.log(query)
            const entities = await entityService.search(query, req.context)

            return entities.map(i => {
                return (entityMapper.toSummary || entityMapper.toModel)(i, req.context)
            })
        },

        update: async (req) => {
            if (!entityService.update) {
                throw new Error(`METHOD_NOT_SUPPORTED`)
            }
            const entity = await entityService.update(req.params.id, req.body, req.context)
            return entityMapper.toModel(entity, req.context)
        },

        create: async (req) => {
            if (!entityService.create) {
                throw new Error(`METHOD_NOT_SUPPORTED`)
            }
            const entity = await entityService.create(req.body, req.context)
            return entityMapper.toModel(entity, req.context)
        },
        
        delete: async (req) => {
            if (!entityService.remove) {
                throw new Error(`METHOD_NOT_SUPPORTED`)
            }
            await entityService.remove(req.params.id, req.context)

            return 'Removed'
        }
    }
}
