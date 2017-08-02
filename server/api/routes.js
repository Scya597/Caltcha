import PostsController from './controllers/posts_controller';

module.exports = (server) => {
  server.get('/api/profile/:userId', PostsController.getteamanduser);
  server.get('/api/project/data/:userId', PostsController.getprojects);
  server.post('/api/project/new/', PostsController.createnewproject);
  server.post('/api/project/update/:userId', PostsController.updateproject);
  server.get('/api/project/stats/:projectId/:userId', PostsController.getstats);
  server.post('/api/project/vote/:userId', PostsController.uservote);
  server.delete('/api/project/remove/:userId', PostsController.rmproject);
};
