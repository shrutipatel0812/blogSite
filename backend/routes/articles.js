const express = require('express');
const router = express.Router();
const Articles = require("../models/articles");

router.get("/get", (req,res)=>{
    Articles.find()
    .then(article=> res.json(article))
    .catch(err => res.status(400)
                .json(`Error : ${err} `))
})

router.post("/create", async  (req,res)=>{
    const{title , article ,authorename}= req.body;

   const newArticle = new Articles({
       title,
       article,
       authorename
   })
    newArticle.save()
        .then(() =>res.json("The new Article posted successfully ."))
        .catch(err => res.status(400).json(`Error ${err}`));
})

router.get('/:id' , (req,res)=>{
    Articles.findById(req.params.id)
        .then(article => { res.json(article)})
        .catch(err => res.status(400).json(`Error: ${err}`))
})

router.put('/update/:id' , (req,res)=>{
    Articles.findById(req.params.id)
        .then(article => {
            article.title= req.body.title;
            article.article=req.body.article;
            article.authorename=req.body.authorename;
            
            article.save()
                .then(() => res.json("The article is updated Successfully"))
                .catch(err => res.status(400).json(`Error: ${err}`))
        })
        .catch(err => res.status(400).json(`Error: ${err}`))

})

router.delete('/delete/:id' ,(req,res)=>{
    Articles.findByIdAndDelete(req.params.id)
        .then(()=> res.json("The article is deleted successfully"))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

module.exports = router;
