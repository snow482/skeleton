const {
  createBookController,
  getAllBooksController,
  updateBookController,
  deleteBookController,
} = require('../controllers/Book.controller')

const router = require('express').Router()
const verifyAccessToken = require('../middleware/varifyAccessToken')

module.exports = router
  .post('/', verifyAccessToken, createBookController)
  .get('/', getAllBooksController)
  // параметризированные запросы
  .put("/:id", verifyAccessToken, updateBookController)
  .delete("/:id", verifyAccessToken, deleteBookController)

