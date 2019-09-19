const Emp = require('../model/Emp')

module.exports = {
    
    async store(req, res){
        
        const image = req.file.filename

        return res.json({avatar : image})

    }

}