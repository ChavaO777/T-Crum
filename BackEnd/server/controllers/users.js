const User = require('../models').User;
const Task = require('../models').Task;
const Log = require('../models').Log;
const Project = require('../models').Project;
const bcrypt = require('bcrypt-nodejs');
//const Validation = require('../helpers/validations').Validation;

function isAValidUserId(userId) {

    var userIdStr = String(userId).toLowerCase();
    var userIdStrSize = userIdStr.length;
    var userIdFirstChar = userIdStr.charAt(0);

    //All student or professor ids have 9 characters and start with 'A' or 'L'
    return userIdStrSize == 9 && (userIdFirstChar == 'a' || userIdFirstChar == 'l');
}

function isAValidDepartment_Major(department_major) {

    //TODO: implement this function to validate against the department_major enum
    return true;
}

module.exports = {

    //Method for creating a user
    create(req, res) {

        if (!req.body.id || !isAValidUserId(req.body.id))
            return res.status(400).send({
                message: 'The attribute id must match the format of a student or professor id: 9 characters long and starting with a letter A or L'
            });

        if (!req.body.department_major)
            return res.status(400).send({
                message: 'The attribute department_major is invalid. It must match a value in the enum.'
            });

        if (!req.body.name)
            return res.status(400).send({
                message: 'The attribute name cannot be null or empty.'
            });

        if (!req.body.password)
            return res.status(400).send({
                message: 'The attribute password cannot be null or empty.'
            });

        bcrypt.hash(req.body.password, null, null, (err, hash) => {
            let hashed = hash;

            return User
                .create({
                    id: String(req.body.id).toLowerCase(), //Store this as lower case
                    department_major: req.body.department_major,
                    name: req.body.name,
                    photo_URL: req.body.photo_URL,
                    password: hashed,
                    system_role: 'user'
                })
                .then(user => res.status(201).send(user))
                .catch(error => res.status(400).send(error));
        });
    },

    //Method for listing users
    list(req, res) {

        return User
            .findAll( {

                include: [
                    {
                        model: Log,
                        as: 'logs',
                    },
                    {
                        // association: 'tasks'
                        model: Task,
                        as: 'tasks',
                        required: false,
                    },
                    {
                        // association: 'projects'
                        model: Project,
                        as: 'projects',
                        through: {

                            attributes: ['project_role'],
                        },
                        required: false,
                        //Without this line of attributes, it fails!!
                        attributes : ['id', 'vision', 'name', 'begin_date', 'end_date', 'background', 'risks', 'reach', 'createdAt', 'updatedAt', 'scrum_master_id']
                    },
                ],
            })
            .then(users => res.status(200).send(users))
            .catch(error => res.status(400).send(error));
    },

    //Method for retrieving a single user
    retrieve(req, res) {

        return User
            .findById(req.params.id, {

                include: [
                    {
                        model: Log,
                        as: 'logs',
                    },
                    {
                        // association: 'tasks'
                        model: Task,
                        as: 'tasks',
                        required: false,
                    },
                    {
                        // association: 'projects'
                        model: Project,
                        as: 'projects',
                        through: {

                            attributes: ['project_role'],
                        },
                        required: false,
                        //Without this line of attributes, it fails!!
                        attributes : ['id', 'vision', 'name', 'begin_date', 'end_date', 'background', 'risks', 'reach', 'createdAt', 'updatedAt', 'scrum_master_id']
                    },
                ],
            })
            .then(user => {

                if (!user) {

                    return res.status(404).send({

                        message: 'User Not Found',
                    });
                }

                return res.status(200).send(user);
            })
            .catch(error => res.status(404).send(error));
    },

    //Method to update a user
    update(req, res) {

        //If I'm trying to update the department_major, it has to exist in the department_major enum
        if (req.body.department_major && !isAValidDepartment_Major(req.body.department_major))
            return res.status(400).send({
                message: 'The attribute department_major is invalid. It must match a value in the enum.'
            });

        return User
            .findById(req.params.id, {})
            .then(user => {

                if (!user) {

                    return res.status(404).send({

                        message: 'User Not Found',
                    });
                }

                return user
                    .update({

                        department_major: req.body.department_major || user.deparment_major,
                        name: req.body.name || user.name,
                        photo_URL: req.body.photo_URL || user.photo_URL,
                        password: req.body.password || user.password,
                    })
                    .then(() => res.status(200).send(user)) // Send back the updated user
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    //Method to delete a user
    destroy(req, res) {

        return User
            .findById(req.params.id)
            .then(user => {

                if (!user) {

                    return res.status(400).send({

                        message: 'User Not Found',
                    });
                }

                return user
                    .destroy()
                    .then(() => res.status(200).send({

                        message: 'User deleted successfully',
                    }))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(404).send(error));
    }
};