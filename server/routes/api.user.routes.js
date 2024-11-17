const router = require('express').Router();
const { User } = require('../db/models');

router.route('/')
  .get( async (req, res) => {
    try {
      const allUsers = await User.findAll()
      res.status(200).json(allUsers)
    } catch(error) {
      res.status(500).json({ message: error.message })
    }
  })
  .post( async (req, res) => {
    try {
      const {email, password} = req.body
      const newUser = await User.create({ email, password })

      res.status(201).json(newUser)
    } catch(error) {
      res.status(500).json({ message: error.message })
    }
  })

// параметризированные запросы
router.route('/:id')
  .get( async (req, res) => {
    try {
      const { id } = req.params
      const oneUser = await User.findOne({where: {id}})
      res.status(200).json(oneUser)
    } catch(error) {
      res.status(500).json({ message: error.message })
    }
  })
  .put(async (req, res) => {
    try {
      const { id } = req.params
      const { email } = req.body
      const [updeteUser] = await User.update({ email }, {where: {id}})

      res.status(201).json(updeteUser)
    } catch(error) {
      res.status(500).json({ message: error.message })
    }
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.params
      const deletedUserStatus = await User.destroy({where: {id}})
      deletedUserStatus ? res.status(201).json({delete: true}) : res.status(404).json({delete: false})
    } catch(error) {
      res.status(500).json({ message: error.message })
    }
  })

  module.exports = router;