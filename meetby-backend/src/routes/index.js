module.exports = (app) => {
    require('./auth')(app)
    require('./meet')(app)
    require('./user')(app)
}
