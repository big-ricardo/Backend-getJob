const Emp = require('../model/Emp')
const Vaga = require('../model/Vaga')

module.exports = {

    async index(req, res) {
        const { user } = req.headers
        const users = await Vaga.find({ idEmp: user })
        return res.json(users)
    },


    async store(req, res) {

        const {type } = req.body;

        if(type == true){
            const {username,senha} = req.body
            const userExist = await Emp.findOne({ user: username});

            if (userExist) {
                if(userExist.senha == senha){
                    const avat = userExist.avatar
                    userExist.avatar = avat
                    return res.json(userExist)
                }else{
                    return res.json({ message: "Senha errada"})
                }
            }
        }else{
            const { user,cidade, email, avatar,senha} = req.body

            const emp = await Emp.create({
                user,
                avatar,
                cidade,
                email,
                senha
            })

            const avat = 'localhost:3333/image/' + emp.avatar
            emp.avatar = avat
            console.log(avat)
            return res.json(emp)
        }
    },

    async emp(req,res){

        const {user} = req.headers
        const emp = await Emp.findById(user)
        return res.json(emp)
    }

}
