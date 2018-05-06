const User_story = require('../models').User_story;
const Sprint = require('../models').Sprint;

module.exports = {
  create(req, res) {

    if (!req.body.weight)
      return res.status(400).send({message: 'weight attribute can not be empty.'});

    if (!req.body.scrum_board_status)
      return res.status(400).send({message: 'scrum_board_status attribute can not be empty.'});

    if (!req.body.description)
      return res.status(400).send({message: 'description attribute can not be empty.'});

    if (!req.body.priority)
      return res.status(400).send({message: 'priority attribute can not be empty.'});

    if (!req.body.sprint_id)
      return res.status(400).send({message: 'sprint_id attribute can not be empty.'});


    return User_story
      .create({
        weight: req.body.weight,
        scrum_board_status: req.body.scrum_board_status,
        description: req.body.description,
        priority: req.body.priority,
        sprint_id: req.body.sprint_id,
      })
      .then(user_story => res.status(200).send(user_story))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return User_story
            .findAll({
              include: [
                { model: Sprint, as: 'sprint' }  
              ],
            })
            .then(user_story => res.status(200).send(user_story))
            .catch(error => res.status(400).send(error));
  },
  retrieve(req, res){
    // check that id is not null, undefined, not an integer nor 0
     if(!req.params.id && req.body.id === parseInt(req.body.id,10)) { 
            return res.status(400).send({message: 'The request must contain the parameter id field.'});
          }

    return User_story
      .findById(req.params.id, {
        include: [
          { model: Sprint, as: 'sprint' },
        ],
      })
      .then(user_story => {
        if (!user_story) {
          return res.status(400).send({
            message: 'User_story not found',
          });
        }
        return res.status(200).send(user_story);
      })
      .catch(error => res.status(400).send(user_story));
  },
  update(req, res) {

    if (!req.params.id || (req.params.id === parseInt(req.params.id,10)))
      return res.status(400).send({message: 'attribute id can not be empty and must be an integer.'});

    /*if (!req.body.weight)
      return res.status(400).send({message: 'weight attribute cant be empty.'});

    if (!req.body.scrum_board_status)
      return res.status(400).send({message: 'scrum_board_status attribute can not be empty.'});

    if (!req.body.description)
      return res.status(400).send({message: 'description attribute can not be empty.'});

    if (!req.body.priority)
      return res.status(400).send({message: 'priority attribute can not be empty.'});

    if (!req.body.sprint_id && req.body.sprint_id === parseInt(req.body.id,10))
      return res.status(400).send({message: 'sprint_id attribute can not be empty and must be an integer.'});

    if (!req.body.project_id && req.body.project_id === parseInt(req.body.id,10))
      return res.status(400).send({message: 'project_id attribute can not be empty and must be an integer.'});
*/

    return User_story
      .findById(req.params.id, {
        include: [ { model: Sprint, as: 'sprint'}]
      })
      .then(user_story => {
        if (!user_story) {
          return res.status(400).send({
            message: 'User_story not found',
          });
        }
        return User_story
          .update({
            weight: req.body.weight || User_story.weight,
            scrum_board_status: req.body.scrum_board_status || User_story.scrum_board_status,
            description: req.body.description || User_story.description,
            priority: req.body.priority || User_story.priority,
            sprint_id: req.params.sprint_id || User_story.sprint_id,
          })
          .then(() => res.status(200).send(user_story))  // Send back the updated tuple.
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  destroy(req, res) {
    return User_story
      .findById(req.params.id)
      .then(user_story => {
        if (!user_story) {
          return res.status(400).send({
            message: 'User Story not found',
          });
        }
        return User_story
          .destroy()
          .then(() => res.status(200).send({message: 'Successful Delete YAY!.'}))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};