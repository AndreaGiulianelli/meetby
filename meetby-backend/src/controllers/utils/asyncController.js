exports.asyncController = function(controller) {
    return (req, res) => {
        controller(req, res).catch(() => { return res.status(500).send() })
    }
}