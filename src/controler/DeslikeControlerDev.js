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


        loggedDev.deslikes.push(targetVag._id)
        await loggedDev.save()

        return res.json(loggedDev)
    }
}