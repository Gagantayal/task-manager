const mongoose = require("mongoose")
const db_link=process.env.CONNECT_LINK
mongoose.connect(db_link)
.then(function(db){
    console.log('db connect');
})
.catch(function(err){
    console.log(err);
}); 