const Dev = require('../model/Dev')
const Vaga = require('../model/Vaga')

module. exports = {

    async store(req,res){
        const { user } = req.headers
        const { Id } = req.params
        const message = req.body
        
        const targetSocket = req.connectedUsers[Id]
        const loggedSocket = req.connectedUsers[user]
        if(loggedSocket){
            req.io.to(loggedSocket).emit('message', message)
        }

        if(targetSocket){
            req.io.to(targetSocket).emit('message', message)
        }

        return res.json({s: "ok"})

    }

}