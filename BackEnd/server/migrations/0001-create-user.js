module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      department_major: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['ITC', 'ISD', 'INT', 'Departamento de Tecnologias de Informacion']
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      photo_URL: {
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      system_role: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['root', 'user']
      },
      uuid: {
        type: Sequelize.UUID
      },
      confirmed: {
        type: Sequelize.BOOLEAN
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};