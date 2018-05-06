module.exports = (sequelize, DataTypes) => {
    const User_task = sequelize.define('User_tasks', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        user_id: {
            allowNull: false,
            type: DataTypes.STRING
        },
        task_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
    });

    return User_task;
};