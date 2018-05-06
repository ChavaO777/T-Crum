const User_project = require('../models').User_projects;

module.exports = {
  create(req, res) {

    if (!req.body.user_id)
      return res.status(400).send({message: 'El atributo user_id no puede estar vacío y debe ser un número entero.'});

    if (!req.body.project_id)
      return res.status(400).send({message: 'El atributo project_id no puede estar vacío y debe ser un número entero.'});

    return User_project
      .create({
        user_id: req.body.user_id,
        project_id: req.body.project_id,
        project_role: req.body.project_role
      })
      .then(User_project => res.status(200).send(User_project))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return User_project
      .findAll( {
      })
      .then(User_project => res.status(200).send(User_project))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {

    if (!req.params.id)
      return res.status(400).send({message: 'El atributo id no puede estar vacío y debe ser un número entero.'});

    return User_project
      .findById(req.params.id, {
      })
      .then(User_project => {
        if (!User_project) {
          return res.status(400).send({
            message: 'User_project not found',
          });
        }
        return res.status(200).send(User_project);
      })
      .catch(error => res.status(400).send(User_project));
  },
  update(req, res) {

    if (!req.body.user_id)
      return res.status(400).send({message: 'El atributo user_id no puede estar vacío y debe ser un número entero.'});

    if (!req.body.project_id)
      return res.status(400).send({message: 'El atributo project_id no puede estar vacío y debe ser un número entero.'});

    return User_project
      .findById(req.params.id, {
      })
      .then(User_project => {
        if (!User_project) {
          return res.status(400).send({
            message: 'User_project not found',
          });
        }
        return User_project
          .update({
            user_id: req.body.user_id,
            project_id: req.body.project_id,
          })
          .then(() => res.status(200).send(User_project))  // Send back the updated tuple.
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  destroy(req, res) {

    if (!req.params.id)
      return res.status(400).send({message: 'El atributo id no puede estar vacío y debe ser un número entero.'});

    return User_project
      .findById(req.params.id)
      .then(User_project => {
        if (!User_project) {
          return res.status(400).send({
            message: 'User_project not found',
          });
        }
        return User_project
          .destroy()
          .then(() => res.status(200).send({message: 'User_project deleted.'}))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};