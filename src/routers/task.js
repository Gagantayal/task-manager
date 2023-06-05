const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/task',auth,async(req,res)=>{
    //const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

   try{
       await task.save()
       res.status(201).send(task)
   }
   catch(e){
       res.status(500).send(e)
   }
   // const task = new Task(req.body)
   // task.save().then(()=>{
   //     res.status(201).send(task)
   //     console.log(task)
   // }).catch((e)=>{
   //     res.status(400).send(e)
   // })
})
router.get('/task',auth,async(req,res)=>{
   try{
   const tasks = await Task.find({owner:req.user._id})
   res.status(201).send(tasks)}
   catch(e){
       res.status(400).send()}
   // Task.find({}).then((tasks)=>{
   //     res.send(tasks)
   // }).catch((e)=>{
   //     res.status(500).send(e)
   // })
})
router.get('/task/:id',auth,async(req,res)=>{
   const _id = req.params.id
   try{
       const task = await Task.findOne({_id,'owner':req.user._id})
       if(!task){
           return res.status(404).send()
            }
          res.send(task)  
   }
   catch(e){
       res.status(400).send()
   }
 
   // const _id = req.params.id
   // console.log(_id)
   // Task.findById(_id).then((task) => {
   //     console.log(task)
   //     if(!task){
   //         return res.status(404).send()
   //     }
   //     res.send(task)
   // }).catch((e) => {
   //     res.status(500).send(e)
   // }) 
})
router.patch('/task/:id',auth,async(req,res)=>{
   const updates = Object.keys(req.body)
   const allowUpdates = ['description','completed']
   const isValid = updates.every((update)=>{
       return allowUpdates.includes(update)
   })
   if(!isValid){
       return res.status(404).send("error")
   }
   try{
        const task = await Task.findOneAndUpdate({_id:req.params._id, owner:req.user._id})
        //const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true , runValidators:true})
        if(!task){
            return res.status(404).send("gagan")
        }
        updates.forEach((update)=>task[update]=req.body[update])
        await task.save()
        res.send(task)
   }
    catch(e){
        res.status(404).send("fuck")
    }
})
router.delete('/task/:id',auth,async(req,res)=>{
   try{
       const task = await Task.findOneAndDelete({_id:req.params.id, owner:req.user._id})
       if(!task)
       {
           return res.status(404).send(task) 
       }
       res.send(task)
   }
   catch(e)
   {
       res.status(500).send(e)
   }
})
module.exports = router