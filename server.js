const express = require('express');
const app = express();
const mongoose = require('mongoose');
const articleRouter = require('./routes/article')
const methodOverride = require('method-override');

//connecting to database
mongoose.connect('mongodb://localhost/blog',()=>{
    console.log("connected to db");
})


app.use(methodOverride('_method'));
//body data access 
app.use(express.urlencoded({extended:false}))
//seting view engine to ejs
app.set('view engine','ejs');
//using article router
app.use('/articles', articleRouter)


app.listen(3000,() => {
    console.log("runnning on port 3000");
});