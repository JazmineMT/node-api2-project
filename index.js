const express = require('express')
const server = express()

server.use(express.json())
const port = 8002
const PostsRouter = require('./posts/posts-router')

server.get('/', (req, res)=> {
    res.send('<h1> Server is up and running! </h1>')
})

server.use('/api/posts' , PostsRouter);







server.listen(port, () => console.log('server running...'))