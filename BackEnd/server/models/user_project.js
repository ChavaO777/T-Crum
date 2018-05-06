module.exports = (sequelize, DataTypes) => {
    const User_project = sequelize.define('User_projects', {
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
        project_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        project_role: {
            allowNull: false,
            type: DataTypes.TEXT
        }
    });

    return User_project;
};