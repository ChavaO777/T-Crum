module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define('Log', {
    query: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});

  Log.associate = (models) => {
    // associations can be defined here
    Log.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
      as: 'user'
    });
  };

  return Log;
};