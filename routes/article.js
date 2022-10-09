const express = require('express');
const router = express.Router();
const Article = require('../models/article')

//Home route
router.get('/',async (req,res) =>{
    //requiring the db and all items\
    //its asyn so yeah..
    const articles = await Article.find().sort({createdAt:"desc"})
    try{

        res.render('articles/index',{ articles:articles })
    }catch(e){
        console.log(e);
    }
})

//new article page route
router.get('/new',(req,res) =>{
    res.render('articles/new')
})

router.get('/edit/:id',async (req,res) =>{
    const article = await Article.findById(req.params.id)
    res.render('articles/edit',{article : article})
})
//new article after being saved  route
router.get('/:id',async (req,res) =>{
     const article = await Article.findById(req.params.id)
     if(article == null){
        res.redirect('/articles');
     } else{

         try {
             res.render('articles/article',{article:article})
            }
            catch(e){
                console.log(e);
            }
        }
        })
        
        //post route for the new article value
        router.post('/',async (req,res)=>{
            console.log("new journal insert request");
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
    })
    // console.log(article);
    try{
       article = await article.save()
       res.redirect(`/articles/${article.id}`)
    }catch(e){
        console.log(e);
        res.redirect('/articles/new')
    }
})


//route for delete
//link gives only get so we use a libray called method-override
router.delete('/:id',async (req,res) =>{
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/articles')
})


//Update || put route
router.put('/:id',async (req,res) =>{
    const article = await Article.findByIdAndUpdate(req.params.id)
    try{
        article.title = req.body.title;
        article.description = req.body.description;
        article.markdown = req.body.markdown;
        await article.save()
        res.redirect(`/articles/${article.id}`)
    }
    catch(e){
        console.log(e);
    }
});


module.exports = router