const express = require("express")
const User = require('../models/user')
const router = new express.Router()

router.post('/user',async (req,res)=>{
    const user = new User(req.body)
    try{
    await user.save()
    res.status(201).send(user)
    }
    catch(e){
        res.status(400).send(e)  
    }

    // user.save().then(()=>{
    //     res.status(201).send(user)
    //     console.log(user)
    // }).catch((e)=>{
    //     res.status(400).send(e)
    // }
    // )
})

router.get('/user', async(req,res)=>{
    try{
        const users = await User.find({})
        res.send(users) 
    }
    catch(e){
        res.status(500).send()
    }

    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})
router.get('/user/:id',async(req,res)=>{
    const _id = req.params.id
    try{
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send()
            }
            res.send(user)
    }
    catch(e){
        res.status(500).send()
    }

    // const _id = req.params.id
    // console.log(_id)
    // User.findById(_id).then((user) => {
    //     console.log(user)
    //     if(!user){
    //         return res.status(404).send()
    //     }
    //     res.send(user)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

router.patch('/user/:id',async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowUpdates = ['name', 'email']
    const isValid = updates.every((update)=>{
        return allowUpdates.includes(update)
    })
    if(!isValid){
        return res.status(404).send("error")
    }
    try{
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true , runValidators:true})
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }
    catch(e){
        res.status(404).send(e)
    }
})
router.delete('/user/:id',async(req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user)
        {
            return res.status(404).send(user) 
        }
        res.send()
    }
    catch(e)
    {
        res.status(500).send(e)
    }
})



module.exports = router