// get tous les users (a voir si utile pour l'appli)
let { User } = require('../models') // on invoque sequelizer et model User pour qu'ils aient besoin de ./models

//get tous les users (a voir si utile pour l'appli)

exports.getallusers = async(req,res)=>{
    try{
        let users = await User.findAll()
        return res.json(users)
    }catch(err){
        console.log(err)
        return res.status(500).json({message: err.message})
    }
}
//FIN - get tous les users (a voir si utile pour l'appli)