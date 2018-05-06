module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        department_major: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        photo_URL: {
            type: DataTypes.STRING,
            defaultValue: ""
        },
        password: {

            type: DataTypes.STRING,
            allowNull: false
        },
        system_role: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    //One user can belong to many project
    User.associate = function (models) {

        User.belongsToMany(models.Project, {
            through: 'User_projects',
            foreignKey: 'user_id',
            // otherKey: 'project_id'
            as: 'projects'
        })

        //One user can have many tasks
        User.belongsToMany(models.Task, {
            through: 'User_tasks',
            foreignKey: 'user_id',
            // otherKey: 'task_id',
            as: 'tasks'
        })

        //One user can be associated to many logs
        User.hasMany(models.Log, {
            foreignKey: 'user_id',
            as: 'logs'
        })

        //One user can be the scrum master of several projects
        User.hasMany(models.Project, {

            foreignKey: 'project_id',
            as: 'project'
        })
    };

    return User;
};