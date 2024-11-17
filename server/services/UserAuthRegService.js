const { User } = require('../db/models')

class UserAuthRegService {
  static async addUser({ name, email, password }) {
    try {
      const user = await User.create({name, email, password})
      return user ? user.get() : null
    } catch(error) {
      throw new Error(error)
    }
  }
  
  static async getUserByEmail(email) {
    try {
      const user = await User.findOne({where: { id }})
      return user ? user.get() : null
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = UserAuthRegService

