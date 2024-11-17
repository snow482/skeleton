
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Books', [
      {
        title: "Dune",
        description: "bla bla",
        cover: "https://upload.wikimedia.org/wikipedia/ru/f/f1/%D0%94%D1%8E%D0%BD%D0%B0_%D0%BE%D1%84%D0%B8%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9_%D0%BF%D0%BE%D1%81%D1%82%D0%B5%D1%80.jpg",
        user_id: 1,
      },
      {
        title: "Lord Of The Rings",
        description: "bla bla",
        cover: "https://upload.wikimedia.org/wikipedia/ru/8/82/%D0%91%D1%80%D0%B0%D1%82%D1%81%D1%82%D0%B2%D0%BE_%D0%9A%D0%BE%D0%BB%D1%8C%D1%86%D0%B0.gif",
        user_id: 2,
      },
      {
        title: "The Last Samura",
        description: "bla bla",
        cover: "https://upload.wikimedia.org/wikipedia/ru/f/f6/TLSPoster.jpg",
        user_id: 3,
      }
  ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Books', null, {});
  }
};
