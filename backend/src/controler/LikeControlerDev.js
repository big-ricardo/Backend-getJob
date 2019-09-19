const Dev = require('../model/Dev')
const Vaga = require('../model/Vaga')

module.exports = {
    async store(req, res) {


        const { user } = req.headers
        const { empId } = req.params
        
        const targetVag = await Vaga.findById(empId)
        const loggedDev = await Dev.findById(user)

        if (!targetVag) {
            return res.status(400).json({ error: `Dev not exist` })
        }

        if (targetVag.likes.includes(loggedDev._id)) {
            const loggedSocket = req.connectedUsers[user]
            const targetSocket = req.connectedUsers[empId]
            loggedDev.matchs.push(targetVag)
            targetVag.matchs.push(loggedDev)
            targetVag.save()

            if(loggedSocket){
                req.io.to(loggedSocket).emit('match', targetVag)
            }

            
            if(targetSocket){
                req.io.to(targetSocket).emit('match', loggedDev)
            }
        }

        loggedDev.likes.push(targetVag._id)
        await loggedDev.save()

        return res.json(loggedDev)
    }
}