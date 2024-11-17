const bcrypt = require('bcrypt');
const saltRounds = 10;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        email: 'user1@mail.ru',
        password: await bcrypt.hash("123", 10)
      },
      {
        email: 'user2@mail.ru',
        password: await bcrypt.hash("456", 10)
      },
      {
        email: 'user3@mail.ru',
        password: await bcrypt.hash("789", 10)
      }
  ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
