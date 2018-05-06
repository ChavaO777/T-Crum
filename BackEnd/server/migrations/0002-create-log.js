module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.createTable('Logs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      query: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      user_id: {
        type: Sequelize.STRING,
        allowNull:false,
        onDelete: 'CASCADE',
        references: {
          model: 'Users', //The table name, not the model name
          key: 'id',
          as: 'member_id',
        }
      }
    }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Logs'),
};