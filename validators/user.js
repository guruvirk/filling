const sessions = require('../services/sessions')
const users = require('../services/user-getter')
var moment = require('moment')

exports.isUser = async (req, res, next) => {
  console.log('Checking Session Validation');
  try {
    if (!req.headers['x-session'] && !req.body['x-session'] && !req.params['x-session']) {
      console.error('Session is Required')
      throw new Error('Session is Required')
    }
    let session = await sessions.get(req.headers['x-session'] || req.body['x-session'] || req.params['x-session'])
    if (!session) {
      console.error('Invalid Session')
      throw new Error('Invalid Session')
    }
    if (!session.user) {
      console.error('Invalid Session')
      throw new Error('Invalid Session')
    }
    if (session.expiry < moment().toDate()) {
      console.error('Invalid Session')
      throw new Error('Invalid Session')
    }
    let user = await users.get(session.user)
    req.context = {
      session: session,
      user: user
    }
    next();
  } catch (err) {
    res.json({
      isSuccess: false,
      error: err.message
    })
    throw new Error(err.message)
  }
}

exports.isOwner = async (req, res, next) => {
  console.log('Checking Session Validation');
  try {
    if (!req.headers['x-session'] && !req.body['x-session'] && !req.params['x-session']) {
      console.error('Session is Required')
      throw new Error('Session is Required')
    }
    let session = await sessions.get(req.headers['x-session'] || req.body['x-session'] || req.params['x-session'])
    if (!session) {
      console.error('Invalid Session')
      throw new Error('Invalid Session')
    }
    if (!session.user) {
      console.error('Invalid Session')
      throw new Error('Invalid Session')
    }
    if (session.user.type != "owner") {
      console.error('Only Owner Request')
      throw new Error('Only Owner Request')
    }
    if (session.expiry < moment().toDate()) {
      console.error('Invalid Session')
      throw new Error('Invalid Session')
    }
    let user = await users.get(session.user)
    req.context = {
      session: session,
      user: user
    }
    next();
  } catch (err) {
    res.json({
      isSuccess: false,
      error: err.message
    })
    throw new Error(err.message)
  }
}

exports.isEmployee = async (req, res, next) => {
  console.log('Checking Session Validation');
  try {
    if (!req.headers['x-session'] && !req.body['x-session'] && !req.params['x-session']) {
      console.error('Session is Required')
      throw new Error('Session is Required')
    }
    let session = await sessions.get(req.headers['x-session'] || req.body['x-session'] || req.params['x-session'])
    if (!session) {
      console.error('Invalid Session')
      throw new Error('Invalid Session')
    }
    if (!session.user) {
      console.error('Invalid Session')
      throw new Error('Invalid Session')
    }

    if (session.user.type != "employee") {
      console.error('Only Employee Request')
      throw new Error('Only Employee Request')
    }

    if (session.expiry < moment().toDate()) {
      console.error('Invalid Session')
      throw new Error('Invalid Session')
    }

    let user = await users.get(session.user)
    req.context = {
      session: session,
      user: user
    }
    next();
  } catch (err) {
    res.json({
      isSuccess: false,
      error: err.message
    })
    throw new Error(err.message)
  }
}