const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

router.post('/task',async(req,res)=>{
    const task = new Task(req.body)
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
router.get('/task',async(req,res)=>{
   try{
   const tasks = await Task.find({})
   res.status(201).send(tasks)}
   catch(e){
       res.status(400).send()}
   // Task.find({}).then((tasks)=>{
   //     res.send(tasks)
   // }).catch((e)=>{
   //     res.status(500).send(e)
   // })
})
router.get('/task/:id',async(req,res)=>{
   const _id = req.params.id
   try{
       const task = await Task.findById(_id)
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
router.patch('/task/:id',async(req,res)=>{
   const updates = Object.keys(req.body)
   const allowUpdates = ['description','completed']
   const isValid = updates.every((update)=>{
       return allowUpdates.includes(update)
   })
   if(!isValid){
       return res.status(404).send("error")
   }
   try{
        const task = await Task.findById(req.params.id)
        updates.forEach((update)=>task[update]=req.body[update])
        await task.save()
       //const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true , runValidators:true})
       if(!task){
           return res.status(404).send()
       }
       res.send(task)
   }
   catch(e){
       res.status(404).send(e)
   }
})
router.delete('/task/:id',async(req,res)=>{
   try{
       const task = await Task.findByIdAndDelete(req.params.id)
       if(!task)
       {
           return res.status(404).send(task) 
       }
       res.send()
   }
   catch(e)
   {
       res.status(500).send(e)
   }
})
module.exports = router