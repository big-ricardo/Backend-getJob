const Dev = require('../model/Dev')
const Vaga = require('../model/Vaga')

module.exports = {
    async store(req, res) {

        const { user } = req.headers
        const { devId } = req.params

        const loggedDev = await Vaga.findById(user)
        const targetDev = await Dev.findById(devId)

        if (!targetDev) {
            return res.status(400).json({ error: `Dev not exist` })
        }


        loggedDev.deslikes.push(targetDev._id)
        await loggedDev.save()

        return res.json(loggedDev)
    }
}