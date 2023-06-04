const express = require("express")
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/user',async (req,res)=>{
    const user = new User(req.body)
    try{
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({user,token})
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
router.post('/user/login', async (req,res)=>{
   // try{
       const user = await User.findByCredentials(req.body.email,req.body.password) 
       const token = await user.generateAuthToken()
       res.send({user,token})
    //}
    //catch(e){
    //    res.status(404).send(e)
   // }
})

router.post('/user/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/user/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/user/me', auth, async (req, res) => {
    res.send(req.user)
})

// router.get('/user', async(req,res)=>{
//     try{
//             const users = await User.find({})
//             res.send(users) 
//         }
//     catch(e){
//         res.status(500).send()
//     }})

    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((e) => {
    //     res.status(500).send()
    // })

// router.get('/user/:id',async(req,res)=>{
//     const _id = req.params.id
//     try{
//         const user = await User.findById(_id)
//         if(!user){
//             return res.status(404).send()
//             }
//             res.send(user)
//     }
//     catch(e){
//         res.status(500).send()
//     }

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
//})

router.patch('/user/me',auth,async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowUpdates = ['name', 'email']
    const isValid = updates.every((update)=>{
        return allowUpdates.includes(update)
    })
    if(!isValid){
        return res.status(404).send("error")
    }
    try{
        //const user = await User.findById(req.params.id)
        updates.forEach((update)=>req.user[update]=req.body[update])
        await req.user.save()
        //const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true , runValidators:true})
        // if(!user){
        //     return res.status(404).send()
        // }
        res.send(req.user)
    }
    catch(e){
        res.status(404).send(e)
    }
})
router.delete('/user/me', auth, async(req,res)=>{
   // console.log(req.user)
    try{
        //await req.user.remove()
        //res.send(req.user)
        const user = await User.findByIdAndDelete(req.user._id)
        if(!user)
        {
            return res.status(404).send(user) 
        }
        res.send(user)
    }
    catch(e)
    {
        console.log("hj")
        res.status(500).send(e)
    }
})



module.exports = router