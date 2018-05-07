'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users',

      [
        {
          id: "l00000000",
          department_major: 'ITC',
          name: 'Dan Perez',
          photo_URL: 'test_url',
          password: '$2a$10$Ke6Aa11a.k2fu3UZ1zEL9.UqM63U720h/EwJ.DZMoXIA8ZRMNPY6y',
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW'),
          system_role: 'root',
          confirmed: true,
          uuid: "cf8e17a0-518b-11e8-a3d8-3be89ca651f0"
        },
        {
          id: "a00000000",
          department_major: 'ITC',
          name: 'John Doe',
          photo_URL: 'test_url',
          password: '$2a$10$Ke6Aa11a.k2fu3UZ1zEL9.UqM63U720h/EwJ.DZMoXIA8ZRMNPY6y',
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW'),
          system_role: 'user',
          confirmed: true,
          uuid: "cf8e17a0-518b-11e8-a3d8-3be89ca651f1"
        },
        {
          id: "a11111111",
          department_major: 'INT',
          name: 'Billy Joel',
          photo_URL: 'test_url',
          password: '$2a$10$Ke6Aa11a.k2fu3UZ1zEL9.UqM63U720h/EwJ.DZMoXIA8ZRMNPY6y',
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW'),
          system_role: 'user',
          confirmed: true,
          uuid: "cf8e17a0-518b-11e8-a3d8-3be89ca651f2"
        },
        {
          id: "a22222222",
          department_major: 'ITC',
          name: 'Billy Joel',
          photo_URL: 'test_url',
          password: '$2a$10$Ke6Aa11a.k2fu3UZ1zEL9.UqM63U720h/EwJ.DZMoXIA8ZRMNPY6y',
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW'),
          system_role: 'user',
          confirmed: true,
          uuid: "cf8e17a0-518b-11e8-a3d8-3be89ca651f3"
        },
        {
          id: "a33333333",
          department_major: 'ISD',
          name: 'Juanito Banana',
          photo_URL: 'test_url',
          password: '$2a$10$Ke6Aa11a.k2fu3UZ1zEL9.UqM63U720h/EwJ.DZMoXIA8ZRMNPY6y',
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW'),
          system_role: 'user',
          confirmed: true,
          uuid: "cf8e17a0-518b-11e8-a3d8-3be89ca651f4"
        },
        {
          id: "a44444444",
          department_major: 'INT',
          name: 'Mary Vargas',
          photo_URL: 'test_url',
          password: '$2a$10$Ke6Aa11a.k2fu3UZ1zEL9.UqM63U720h/EwJ.DZMoXIA8ZRMNPY6y',
          createdAt: Sequelize.fn('NOW'),
          updatedAt: Sequelize.fn('NOW'),
          system_role: 'user',
          confirmed: true,
          uuid: "cf8e17a0-518b-11e8-a3d8-3be89ca651f5"
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Users', 
    [
      {
        id: "l00000000"
      },
      {
        id: "a00000000"
      },
      {
        id: "a11111111"
      },
      {
        id: "a22222222"
      },
      {
        id: "a33333333"
      },
      {
        id: "a44444444"
      },
    ]);
  }
};