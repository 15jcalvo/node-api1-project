// BUILD YOUR SERVER HERE
const express = require('express')
const server = express()
const User = require('./users/model')

server.use(express.json())

server.post('/api/users', async (req, res) => {
    try {
      const { name, bio } = req.body
      console.log(name, bio)
      const newUser = await User.insert({ name, bio })
      console.log(newUser)
      res.status(201).json(newUser)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

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

server.delete('/api/users/:id', async (req, res) => {
    try {
      const deletedUser = await User.remove(req.params.id)
      if (!deletedUser) {
        res.status(404).json({ message: 'no user with that id!'})
      } else {
        res.json(deletedUser)
      }
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

  server.put('/api/users/:id', async (req, res) => {
    const { id } = req.params
    const { name, bio } = req.body
    console.log(id, name, bio)
    try {
      const updatedUser = await User.update(id, { name, bio })
      if (!updatedUser) {
        res.status(404).json({ message: `user ${id} not here` })
      } else {
        res.json(updatedUser)
      }
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

module.exports = server; // EXPORT YOUR SERVER instead of {}
