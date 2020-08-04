const express = require('express')
const router = express.Router()

const Data = require('../data/db');
const { remove } = require('../data/db');



router.get('/', (req,res)=> {
    Data.find( req.query)
    .then( posts => {
        res.status(200).json(posts)
    })
    .catch( err => {
        console.log(err)
        res.status(500).json({
            message: "The posts information could not be retrieved."
        });
    });
});

router.get('/:id', (req, res)=>{
    Data.findById(req.params.id)
    .then( post => {
        if(post){
        res.status(200).json(post)
       } else {
           res.status(404).json({
               message: "The post with the specified ID does not exist."
           })
       }
    })
    .catch( err => {
        console.log(err)
        res.status(500).json({
            message: "The post information could not be retrieved."
        });
    });
});

router.get('/:id/comments', (req,res)=> {
    Data.findPostComments(req.params.id)
    .then( post => {
        if(post){
            res.status(200).json(post)
        } else{
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }
    })
    .catch( err => {
        console.log(err)
        res.status(500).json({
            message: "The comments information could not be retrieved."
        })
    })
})

router.post('/', (req, res)=> {
    Data.insert(req.body)
   .then( newPost => {
        if(newPost){
        res.status(201).json(newPost)
    } else if(!newPost.title || !newPost.contents){
        res.status(400).json({
            message: "Please provide title and contents for the post." 
        })
    }
   })
   .catch( err => {
       console.log(err)
       res.status(500).json({
           message: "There was an error while saving the post to the database"
       })
   })
})

router.post('/:id/comments', (req, res)=> {
    Data.insertComment(req.body)
    .then( newComment => {
        if(newComment){
            res.status(201).json(newComment)
        } else if( !newComment.text){
            res.status(400).json({
                message: "Please provide text for the comment." 
            })
        }else{
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }
    })
    .catch( err => {
        console.log(err)
        res.status(500).json({
            message: "There was an error while saving the comment to the database"
        })
    })

})

router.delete('/:id', (req,res)=>{
    Data.remove(req.params.id)
    .then( removed => {
        if(removed){
            res.status(200).json(removed)
        } else{
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }
    })
    .catch( err=>{
        console.log(err)
        res.status(500).json({
            message: "The post could not be removed"
        })
    })
})

router.put('/:id', (req, res)=>{
    Data.update(req.params.id, req.body)
    .then( updated => {
        if(updated){
            res.status(200).json(updated)
        } else if(!updated.title || !updated.contents){
            res.status(400).json({
                message: "Please provide title and contents for the post."
            })
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }
    })
    .catch( err=>{
        console.log(err)
        res.status(500).json({
            message: "The post information could not be modified."
        })
    })
})






module.exports = router