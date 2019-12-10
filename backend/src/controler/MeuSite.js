const Mens = require('../model/FaleConosco')

module.exports = {

    async store(req, res) {
        const { nome, email, cidade, mensagen } = req.body;

        const fale = await Mens.create({
            nome,
            email,
            cidade,
            mensagen,
            m: 1
        })

        return res.json(fale)
    },

    async index(req, res) {

        const mensagens = await Mens.find()

        return res.json(mensagens)
    }

}