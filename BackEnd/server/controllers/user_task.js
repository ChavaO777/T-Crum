const User_task = require('../models').User_tasks;

module.exports = {
  create(req, res) {

    if (!req.body.user_id)
      return res.status(400).send({
        message: 'The post body must contain a valid user_id field.'
      });

    if (!req.body.task_id)
      return res.status(400).send({
        message: 'The post body must contain a valid task_id field.'
      });

    return User_task
      .create({
        user_id: req.body.user_id,
        task_id: req.body.task_id,
      })
      .then(user_task => res.status(200).send(user_task))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return User_task
      .findAll()
      .then(user_task => res.status(200).send(user_task))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {

    if (!req.params.id)
      return res.status(400).send({
        message: 'The post body must contain a valid id field.'
      });

    return User_task
      .findById(req.params.id, {})
      .then(user_task => {
        if (!user_task) {
          return res.status(400).send({
            message: 'User_task not found',
          });
        }
        return res.status(200).send(user_task);
      })
      .catch(error => res.status(400).send(user_task));
  },
  update(req, res) {

    if (!req.body.user_id)
      return res.status(400).send({
        message: 'The post body must contain a valid user_id field.'
      });

    if (!req.body.task_id || !Number.isNaN(req.body.task_id))
      return res.status(400).send({
        message: 'The post body must contain a valid task_id field.'
      });

    return User_task
      .findById(req.params.id, {})
      .then(user_task => {
        if (!user_task) {
          return res.status(400).send({
            message: 'User_task not found',
          });
        }
        return User_task
          .update({
            user_id: req.body.user_id,
            task_id: req.body.task_id,
          })
          .then(() => res.status(200).send(user_task)) // Send back the updated tuple.
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  destroy(req, res) {

    if (!req.params.id || !Number.isNaN(req.params.id))
      return res.status(400).send({
        message: 'The post body must contain a valid id field.'
      });

    return User_task
      .findById(req.params.id)
      .then(user_task => {
        if (!user_task) {
          return res.status(400).send({
            message: 'User_task not found',
          });
        }
        return User_task
          .destroy()
          .then(() => res.status(200).send({
            message: 'User_task deleted.'
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};