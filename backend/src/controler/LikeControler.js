const Dev = require('../model/Dev')
const Vaga = require('../model/Vaga')
const mns = require('../model/Mensagem')

module.exports = {
    async store(req, res) {


        const { user } = req.headers
        const { devId } = req.params

        const loggedVag = await Vaga.findById(user)
        const targetDev = await Dev.findById(devId)

        if (!targetDev) {
            return res.status(400).json({ error: `Dev not exist` })
        }

        if (targetDev.likes.includes(loggedVag._id)) {
            const loggedSocket = req.connectedUsers[user]
            const targetSocket = req.connectedUsers[devId]
            loggedVag.matchs.push(targetDev)
            targetDev.matchs.push(loggedVag)
            targetDev.save()

            await mns.create({
                idEmp:user,
                idDev: devId
            })

            if(loggedSocket){
                req.io.to(loggedSocket).emit('match', targetDev)
            }

            
            if(targetSocket){
                req.io.to(targetSocket).emit('match', loggedVag)
            }
        }
        
        loggedVag.likes.push(targetDev._id)
        await loggedVag.save()
       
        return res.json(loggedVag)
    }
}