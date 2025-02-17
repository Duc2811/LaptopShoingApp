const express = require('express');
const routes = express.Router();
const controller = require('../../controllers/client/cart.controller');
const authorization = require('../../../middleware/user.middleware');


routes.get('/getCart', authorization.Authorization, controller.getCartByUserID);

routes.post('/addToCart', authorization.Authorization, controller.addToCart);
routes.put('/updateCart/:id', authorization.Authorization, controller.updateCart);
routes.delete('/clearCart/:id', authorization.Authorization, controller.clearCart);

module.exports = routes;