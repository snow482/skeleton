const { Book } = require('../db/models')

module.exports = class BookService {
  static async addBook({ title, description, cover, user_id}) {
    try {
      const newBook = await Book.create({
        title,
        description,
        cover, 
        user_id,
      })
      return newBook ? newBook.get() : null
    } catch (error) {
      throw new Error(error)
    }
  }

  static async getAllBooks() {
    try {
      const books = (await Book.findAll()).map((el) => el.get())
      return books ? books : null
    } catch (error) {
      throw new Error(error)
    }
  }

  static async getBooksByUser(user_id) {
    try {
      const books = (await Book.findAll({ where: { user_id }})).map((el) => el.get())
      return books ? books : null
    } catch (error) {
      throw new Error(error)
    }
  }

  static async getBookById(id) {
    try {
      const book = await Book.findOne({ where: { id } })
      return book ? book.get() : null
    } catch (error) {
      throw new Error(error)
    }
  }

  static async updateBookByUser(id, user_id, data) {
    try {
      const book = await Book.findOne({ where: { id, user_id } })
      if (book) {
        return book.update(data)
      }
      return null
    } catch (error) {
      throw new Error(error)
    }
  }

  static async deleteBookByUser(id, user_id) {
    try {
      const book = await Book.findOne({ where: { id, user_id } })
      if (book) {
        return book.destroy()
      }
      return null
    } catch (error) {
      throw new Error(error)
    }
  }
}