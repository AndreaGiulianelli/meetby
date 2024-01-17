module.exports = (app) => {
    require('./auth')(app)
    require('./meet')(app)
}
