const userRoute = require('./user.router')
const productRoute = require('./product.router')
const categoryRoute = require('./category.router')
const saleRoute = require('./sale.router')
const orderRoute = require('./order.router')
const paymentRoute = require('./payment.router')

module.exports = (app) => {
    const api = '/api'
    app.use(api + '/user', userRoute);
    app.use(api + '/product', productRoute);
    app.use(api + '/category', categoryRoute);
    app.use(api + '/sale', saleRoute);
    app.use(api + '/order', orderRoute);
    app.use(api + '/payment', paymentRoute);
}