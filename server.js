var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const cors = require('cors')
global.config = process.env.NODE_ENV || "local"

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(cors())
app.use((err, req, res, next) => {
    if (err) {
        res.writeHead(500)
        res.end()
        return
    }
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
})

var port = process.env.PORT || 8080;
require('./settings/database').configure(process.env.NODE_ENV || "local")

const users = require('./api/users')
const bookings = require('./api/bookings')
const stations = require('./api/stations')
const userValidation = require('./validators/user')
const uploadFiles = require('./api/fileUpload')

var router = express.Router();

router.route('/users')
    .post(async function (req, res) {
        try {
            let response = await users.create(req)
            res.json({
                isSuccess: true,
                data: response
            })
        } catch (err) {
            res.json({
                isSuccess: false,
                error: err.message
            })
        }
    })

router.route('/users/login')
    .post(async function (req, res) {
        try {
            let response = await users.login(req)
            res.json({
                isSuccess: true,
                data: response
            })
        } catch (err) {
            res.json({
                isSuccess: false,
                error: err.message
            })
        }
    })

router.route('/users/codeExists/:id')
    .get(async function (req, res) {
        try {
            let response = await users.codeExists(req)
            res.json({
                isSuccess: true,
                data: response
            })
        } catch (err) {
            res.json({
                isSuccess: false,
                error: err.message
            })
        }
    })

router.route('/users/phoneExists/:id')
    .get(async function (req, res) {
        try {
            let response = await users.phoneExists(req)
            res.json({
                isSuccess: true,
                data: response
            })
        } catch (err) {
            res.json({
                isSuccess: false,
                error: err.message
            })
        }
    })

router.use('/users/logout/:id', userValidation.isUser);

router.route('/users/logout/:id')
    .get(async function (req, res) {
        try {
            let response = await users.logout(req)
            res.json({
                isSuccess: true,
                data: response
            })
        } catch (err) {
            res.json({
                isSuccess: false,
                error: err.message
            })
        }
    })

router.use('/users/:id', userValidation.isUser);

router.route('/users/:id')
    .put(async function (req, res) {
        try {
            let response = await users.update(req)
            res.json({
                isSuccess: true,
                data: response
            })
        } catch (err) {
            res.json({
                isSuccess: false,
                error: err.message
            })
        }
    }).get(async function (req, res) {
        try {
            let response = await users.get(req)
            res.json({
                isSuccess: true,
                data: response
            })
        } catch (err) {
            res.json({
                isSuccess: false,
                error: err.message
            })
        }
    })

router.use('/users/changePassword', userValidation.isUser);

router.route('/users/changePassword')
    .post(async function (req, res) {
        try {
            let response = await users.changePassword(req)
            res.json({
                isSuccess: true,
                data: response
            })
        } catch (err) {
            res.json({
                isSuccess: false,
                error: err.message
            })
        }
    })

router.use('/bookings/:id', userValidation.isUser);

router.route('/bookings/:id')
    .put(async function (req, res) {
        try {
            let response = await bookings.update(req)
            res.json({
                isSuccess: true,
                data: response
            })
        } catch (err) {
            res.json({
                isSuccess: false,
                error: err.message
            })
        }
    }).get(async function (req, res) {
        try {
            let response = await bookings.get(req)
            res.json({
                isSuccess: true,
                data: response
            })
        } catch (err) {
            res.json({
                isSuccess: false,
                error: err.message
            })
        }
    })

router.use('/bookings', userValidation.isUser);

router.route('/bookings')
    .post(async function (req, res) {
        try {
            let response = await bookings.create(req)
            res.json({
                isSuccess: true,
                data: response
            })
        } catch (err) {
            res.json({
                isSuccess: false,
                error: err.message
            })
        }
    }).get(async function (req, res) {
        try {
            let response = await bookings.search(req)
            res.json({
                isSuccess: true,
                data: response
            })
        } catch (err) {
            res.json({
                isSuccess: false,
                error: err.message
            })
        }
    })

router.use('/stations/:id', userValidation.isEmployee);

router.route('/stations/:id')
    .put(async function (req, res) {
        try {
            let response = await stations.update(req)
            res.json({
                isSuccess: true,
                data: response
            })
        } catch (err) {
            res.json({
                isSuccess: false,
                error: err.message
            })
        }
    }).get(async function (req, res) {
        try {
            let response = await stations.get(req)
            res.json({
                isSuccess: true,
                data: response
            })
        } catch (err) {
            res.json({
                isSuccess: false,
                error: err.message
            })
        }
    }).delete(async function (req, res) {
        try {
            let response = await stations.remove(req)
            res.json({
                isSuccess: true,
                data: response
            })
        } catch (err) {
            res.json({
                isSuccess: false,
                error: err.message
            })
        }
    })

router.use('/stations/create', userValidation.isOwner);

router.route('/stations/create')
    .post(async function (req, res) {
        try {
            let response = await stations.create(req)
            res.json({
                isSuccess: true,
                data: response
            })
        } catch (err) {
            res.json({
                isSuccess: false,
                error: err.message
            })
        }
    })

router.use('/stations', userValidation.isUser);
router.route('/stations')
    .get(async function (req, res) {
        try {
            let response = await stations.search(req)
            res.json({
                isSuccess: true,
                data: response
            })
        } catch (err) {
            res.json({
                isSuccess: false,
                error: err.message
            })
        }
    })

router.use('/upload', userValidation.isEmployee);

router.route('/upload')
    .post(async function (req, res) {
        try {
            let response = await uploadFiles.upload(req, res)
            res.json({
                isSuccess: true,
                data: response
            })
        } catch (err) {
            res.json({
                isSuccess: false,
                error: err.message
            })
        }
    })

router.route('/download/:id')
    .get(async function (req, res) {
        const file = `./public/${req.params.id}`;
        res.download(file); // Set disposition and send it.
    })

app.use('/api', router);

app.listen(port);
console.log('Running on port ' + port);