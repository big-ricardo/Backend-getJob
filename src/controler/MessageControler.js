const Mensa = require('../model/Mensagem')

module.exports = {

    async store(req,res){
        const { user, op } = req.headers
        const { Id } = req.params
        const message = req.body

        if(op === 'emp'){
            const mns = await Mensa.findOne({idEmp: user, idDev: Id})
            mns.mensagens.push(message)
            mns.save()
        }else{
            if(op === 'dev'){
                const mnsa = await Mensa.findOne({idEmp: Id, idDev: user})
                if(mnsa){
                    console.log(mnsa)
                }
                mnsa.mensagens.push(message)
                mnsa.save()
            }
        }
        const targetSocket = req.connectedUsers[Id]
        const loggedSocket = req.connectedUsers[user]
        if(loggedSocket){
            req.io.to(loggedSocket).emit('message', message)
        }

        if(targetSocket){
            req.io.to(targetSocket).emit('message', message)
        }

        return res.json({s: "ok"})

    },

    async index(req,res){
        const { user, op } = req.headers
        const { Id } = req.params

        if(op === 'emp'){
            const mns = await Mensa.findOne({idEmp: user, idDev: Id})
            return res.json(mns.mensagens)
        }else{
            const mns = await Mensa.findOne({idEmp: Id, idDev: user})
            return res.json(mns.mensagens)
        }

    }

}