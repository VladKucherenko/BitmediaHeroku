const express = require('express')


const usersRoute = require('../controllers/users-controller.js')

const router = express.Router()

router.get('/users-list', usersRoute.usersList)

router.get('/user/:id', usersRoute.usersStatistic)

module.exports = router;