'use_strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Logs', 
    [
      {
        query: 'CREATE project',
        user_id: 'a00000000',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        query: 'CREATE acceptance_criteria',
        user_id: 'a11111111',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        query: 'DELETE project',
        user_id: 'a00000000',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        query: 'UPDATE project',
        user_id: 'a22222222',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        query: 'CREATE sprint',
        user_id: 'a33333333',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Logs', 
    [
      {
        id: 1
      },
      {
        id:2
      },
      {
        id:3
      },
      {
        id:4
      },
      {
        id:5
      }
    ], {});
  }
};
