exports.asyncController = function(controller) {
    return (req, res) => {
        controller(req, res).catch((err) => { 
            console.log(err)
            return res.status(500).send() 
        })
    }
}