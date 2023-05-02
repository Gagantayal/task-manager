const mongoose = require("mongoose")
const db_link = 'mongodb+srv://gagan:12345gagan@cluster0.zydht5n.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
    console.log('db connect');
})
.catch(function(err){
    console.log(err);
});