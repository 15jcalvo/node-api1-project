// BUILD YOUR SERVER HERE
const express = require('express')
const server = express()
const User = require('./users/model')

server.use(express.json())

server.get('/api/users', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

server.get('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        if (!user) {
            res.status(404).json({ message: 'no user' })
          } else {
            res.status(200).json(user)
          }
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
