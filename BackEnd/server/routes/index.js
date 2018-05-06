const authMiddleware = require('../middlewares/authentication');

const tasksController = require('../controllers').tasks;
const logsController = require('../controllers').logs;
const sprintsController = require('../controllers').sprints;
const usersController = require('../controllers').users;
const acceptance_criteriaController = require('../controllers').acceptance_criteria;
const user_taskController = require('../controllers').user_task;
const user_projectController = require('../controllers').user_project;
const projectsController = require('../controllers').projects;
const project_technologyController = require('../controllers').project_technology;
const userStoriesController = require('../controllers').user_stories;
const authenticationController = require('../controllers').authentication;
const technologiesController = require('../controllers').technologies;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the TCRUM Project API!',
  }));

  //Autentication routes
  app.post('/api/login', authenticationController.login);

  //Routes for the TASKS table
  app.post('/api/tasks', tasksController.create);  
  app.get('/api/tasks', tasksController.list);
  app.get('/api/tasks-users/:id', tasksController.listTaskWithUsers);
  app.get('/api/tasks/:id', tasksController.retrieve);
  app.put('/api/tasks/:id', tasksController.update);
  app.delete('/api/tasks/:id', tasksController.destroy);

  //Routes for the LOGS table
  app.post('/api/logs', logsController.create);  
  app.get('/api/logs', logsController.list);
  app.get('/api/logs/:id', logsController.retrieve);

  //Routes fot the SPRINTS table
  app.post('/api/sprints', sprintsController.create);  
  app.get('/api/sprints', sprintsController.list);
  app.get('/api/sprints/:id', sprintsController.retrieve);
  app.put('/api/sprints/:id', sprintsController.update);
  app.delete('/api/sprints/:id', sprintsController.destroy);

  //Routes for the USERS table
  app.post('/api/users', usersController.create);
  app.get('/api/users', usersController.list);
  app.get('/api/users/:id', usersController.retrieve);
  app.put('/api/users/:id', usersController.update);
  app.delete('/api/users/:id', usersController.destroy);

  //Routes for the PROJECTS table
  app.post('/api/projects', projectsController.create);  
  app.get('/api/projects', projectsController.list);
  app.get('/api/projects/:id', projectsController.retrieve);
  app.put('/api/projects/:id', projectsController.update);
  app.delete('/api/projects/:id', projectsController.destroy);
  
  //Routes for the ACCEPTANCE_CRITERIA table
  app.post('/api/acceptance-criteria', acceptance_criteriaController.create);  
  app.get('/api/acceptance-criteria', acceptance_criteriaController.list);
  app.get('/api/acceptance-criteria/:id', acceptance_criteriaController.retrieve);
  app.put('/api/acceptance-criteria/:id', acceptance_criteriaController.update);
  app.delete('/api/acceptance-criteria/:id', acceptance_criteriaController.destroy);

  //Routes for the USER_TASKS table
  app.post('/api/user-task', user_taskController.create);  
  app.get('/api/user-task', user_taskController.list);
  app.get('/api/user-task/:id', user_taskController.retrieve);
  app.put('/api/user-task/:id', user_taskController.update);
  app.delete('/api/user-task/:id', user_taskController.destroy);

  //Routes for the USER_PROJECT table
  app.post('/api/user-project', user_projectController.create);  
  app.get('/api/user-project', user_projectController.list);
  app.get('/api/user-project/:id', user_projectController.retrieve);
  app.put('/api/user-project/:id', user_projectController.update);
  app.delete('/api/user-project/:id', user_projectController.destroy);

  //Routes for the PROJECT_TECHNOLOGIES table
  app.post('/api/project-technology', project_technologyController.create);  
  app.get('/api/project-technology', project_technologyController.list);
  app.get('/api/project-technology/:id', project_technologyController.retrieve);
  app.put('/api/project-technology/:id', project_technologyController.update);
  app.delete('/api/project-technology/:id', project_technologyController.destroy);

  //Routes for the USER_STORIES table
  app.post('/api/user-stories', userStoriesController.create);  
  app.get('/api/user-stories', userStoriesController.list);
  app.get('/api/user-stories/:id', userStoriesController.retrieve);
  app.put('/api/user-stories/:id', userStoriesController.update);
  app.delete('/api/user-stories/:id', userStoriesController.destroy);
  
  //Routes for the TECHNOLOGIES table
  app.post('/api/technologies', technologiesController.create);  
  app.get('/api/technologies', technologiesController.list);
  app.get('/api/technologies/:id', technologiesController.retrieve);
  app.put('/api/technologies/:id', technologiesController.update);
  app.delete('/api/technologies/:id', technologiesController.destroy);
};