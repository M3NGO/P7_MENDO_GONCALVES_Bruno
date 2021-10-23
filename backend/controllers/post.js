let { sequelize, Post } = require('../models')

exports.getPost = (async (req,res) => {
 
    try { 
        
        return res.json() // renvoit la réponse
    }catch(err) {
        console.log(err)
        return res.status(500).json(err)
    }
})

exports.createPost = (async (req,res) => {
 
     try { 
         
         return res.json() // renvoit la réponse
     }catch(err) {
         console.log(err)
         return res.status(500).json(err)
     }
 })

 exports.modifPost = (async (req,res) => {
 
    try { 
        
        return res.json() // renvoit la réponse
    }catch(err) {
        console.log(err)
        return res.status(500).json(err)
    }
})
exports.deletePost = (async (req,res) => {
 
    try { 
        
        return res.json() // renvoit la réponse
    }catch(err) {
        console.log(err)
        return res.status(500).json(err)
    }
})