const express = require('express')
const routes = express.Router()
const authorization = require('../../../middleware/user.middleware')

const controller = require('../../controllers/client/product.controller')

routes.post('/addProduct', authorization.Authorization, controller.addProduct)
routes.get('/getAllProduct', controller.getAllProducts)
routes.put('/updateProduct/:id', authorization.Authorization, controller.updateProduct)
routes.delete('/managerDelete/:id', authorization.Authorization, controller.managerDeleteProduct)
routes.delete('/adminDelete/:id', authorization.Authorization, controller.adminDeleteProduct)

routes.get('/getProductByCategory/:category', controller.getProductByCategory)

module.exports = routes;