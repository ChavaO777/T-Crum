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
  app.post('/api/tasks',authMiddleware.ensureAuth, tasksController.create);  
  app.get('/api/tasks', authMiddleware.ensureAuth,  tasksController.list);
  app.get('/api/tasks-users/:id', authMiddleware.ensureAuth,  tasksController.listTaskWithUsers);
  app.get('/api/tasks/:id', authMiddleware.ensureAuth,  tasksController.retrieve);
  app.put('/api/tasks/:id', authMiddleware.ensureAuth,  tasksController.update);
  app.delete('/api/tasks/:id', authMiddleware.ensureAuth,  tasksController.destroy);

  //Routes for the LOGS table
  app.post('/api/logs', authMiddleware.ensureAuth, logsController.create);  
  app.get('/api/logs', authMiddleware.ensureAuth, logsController.list);
  app.get('/api/logs/:id', authMiddleware.ensureAuth, logsController.retrieve);

  //Routes fot the SPRINTS table
  app.post('/api/sprints', authMiddleware.ensureAuth, sprintsController.create);  
  app.get('/api/sprints', authMiddleware.ensureAuth, sprintsController.list);
  app.get('/api/sprints/:id', authMiddleware.ensureAuth, sprintsController.retrieve);
  app.put('/api/sprints/:id', authMiddleware.ensureAuth, sprintsController.update);
  app.delete('/api/sprints/:id', authMiddleware.ensureAuth, sprintsController.destroy);

  //Routes for the USERS table
  app.post('/api/users', authMiddleware.ensureAuth,  usersController.create);
  app.get('/api/users', authMiddleware.ensureAuth,  usersController.list);
  app.get('/api/users/confirm/:uuid', authMiddleware.ensureAuth,  usersController.confirm);
  app.get('/api/users/:id', authMiddleware.ensureAuth,  usersController.retrieve);
  app.put('/api/users/:id', authMiddleware.ensureAuth,  usersController.update);
  app.delete('/api/users/:id', authMiddleware.ensureAuth,  usersController.destroy);

  //Routes for the PROJECTS table
  app.post('/api/projects', authMiddleware.ensureAuth,  projectsController.create);  
  app.get('/api/projects', authMiddleware.ensureAuth,  projectsController.list);
  app.get('/api/projects/:id', authMiddleware.ensureAuth,  projectsController.retrieve);
  app.put('/api/projects/:id', authMiddleware.ensureAuth,  projectsController.update);
  app.delete('/api/projects/:id', authMiddleware.ensureAuth,  projectsController.destroy);
  
  //Routes for the ACCEPTANCE_CRITERIA table
  app.post('/api/acceptance-criteria', authMiddleware.ensureAuth, acceptance_criteriaController.create);  
  app.get('/api/acceptance-criteria', authMiddleware.ensureAuth, acceptance_criteriaController.list);
  app.get('/api/acceptance-criteria/:id', authMiddleware.ensureAuth, acceptance_criteriaController.retrieve);
  app.put('/api/acceptance-criteria/:id', authMiddleware.ensureAuth, acceptance_criteriaController.update);
  app.delete('/api/acceptance-criteria/:id', authMiddleware.ensureAuth, acceptance_criteriaController.destroy);

  //Routes for the USER_TASKS table
  app.post('/api/user-task', authMiddleware.ensureAuth,  user_taskController.create);  
  app.get('/api/user-task', authMiddleware.ensureAuth,  user_taskController.list);
  app.get('/api/user-task/:id', authMiddleware.ensureAuth,  user_taskController.retrieve);
  app.put('/api/user-task/:id', authMiddleware.ensureAuth,  user_taskController.update);
  app.delete('/api/user-task/:id', authMiddleware.ensureAuth,  user_taskController.destroy);

  //Routes for the USER_PROJECT table
  app.post('/api/user-project', authMiddleware.ensureAuth,  user_projectController.create);  
  app.get('/api/user-project', authMiddleware.ensureAuth,  user_projectController.list);
  app.get('/api/user-project/:id', authMiddleware.ensureAuth,  user_projectController.retrieve);
  app.put('/api/user-project/:id', authMiddleware.ensureAuth,  user_projectController.update);
  app.delete('/api/user-project/:id', authMiddleware.ensureAuth,  user_projectController.destroy);

  //Routes for the PROJECT_TECHNOLOGIES table
  app.post('/api/project-technology', authMiddleware.ensureAuth,  project_technologyController.create);  
  app.get('/api/project-technology', authMiddleware.ensureAuth,  project_technologyController.list);
  app.get('/api/project-technology/:id', authMiddleware.ensureAuth,  project_technologyController.retrieve);
  app.put('/api/project-technology/:id', authMiddleware.ensureAuth,  project_technologyController.update);
  app.delete('/api/project-technology/:id', authMiddleware.ensureAuth,  project_technologyController.destroy);

  //Routes for the USER_STORIES table
  app.post('/api/user-stories', authMiddleware.ensureAuth, userStoriesController.create);  
  app.get('/api/user-stories', authMiddleware.ensureAuth, userStoriesController.list);
  app.get('/api/user-stories/:id', authMiddleware.ensureAuth, userStoriesController.retrieve);
  app.put('/api/user-stories/:id', authMiddleware.ensureAuth, userStoriesController.update);
  app.delete('/api/user-stories/:id', authMiddleware.ensureAuth, userStoriesController.destroy);
  
  //Routes for the TECHNOLOGIES table
  app.post('/api/technologies', authMiddleware.ensureAuth, technologiesController.create);  
  app.get('/api/technologies', authMiddleware.ensureAuth, technologiesController.list);
  app.get('/api/technologies/:id', authMiddleware.ensureAuth, technologiesController.retrieve);
  app.put('/api/technologies/:id', authMiddleware.ensureAuth, technologiesController.update);
  app.delete('/api/technologies/:id', authMiddleware.ensureAuth, technologiesController.destroy);
};