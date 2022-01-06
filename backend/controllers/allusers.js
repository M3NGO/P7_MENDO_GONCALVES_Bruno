// get tous les users
let { User } = require('../models') // on invoque sequelizer et model User pour qu'ils aient besoin de ./models

//get tous les users

exports.getallusers = async(req,res)=>{
    try{
        //on va chercher tous les users actifs avec un role 1 (user) et on va envoyer au front en incluant tous les posts et commentairesdu user
        let users = await User.findAll({where: {active: true, role:1}},{include:['comment','post']})
        return res.json(users)
    }catch(err){
        // console.log(err)
        return res.status(500).json({message: err.message})
    }
}//FIN - get tous les users

