let { sequelize, Comment } = require('../models')

exports.getComment = (async (req,res) => {
 
    try { 
        
        return res.json() // renvoit la réponse
    }catch(err) {
        console.log(err)
        return res.status(500).json(err)
    }
})

exports.createComment = (async (req,res) => {
 
     try { 
         
         return res.json() // renvoit la réponse
     }catch(err) {
         console.log(err)
         return res.status(500).json(err)
     }
 })

 exports.modifComment = (async (req,res) => {
 
    try { 
        
        return res.json() // renvoit la réponse
    }catch(err) {
        console.log(err)
        return res.status(500).json(err)
    }
})
exports.deleteComment = (async (req,res) => {
 
    try { 
        
        return res.json() // renvoit la réponse
    }catch(err) {
        console.log(err)
        return res.status(500).json(err)
    }
})