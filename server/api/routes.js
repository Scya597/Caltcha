import server from 'express';
import PostsController from './controllers/posts_controller';

function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    console.log(`Authenticated user ${req.user.username} is calling APIs(routes.js).`);
    next();
  } else {
    res.redirect('/login');
    console.log(`isLogin: ${typeof req.user !== 'undefined'}`);
    console.log('Someone not Authenticated tries to call APIs.(routes.js)');
  }
}

const router = server.Router();
router.get('/profile', isAuth, PostsController.getteamanduser);
router.get('/project/data', isAuth, PostsController.getprojects);
router.post('/project/new/', isAuth, PostsController.createnewproject);
router.post('/project/update', isAuth, PostsController.updateproject);
router.get('/project/stats/:projectId', isAuth, PostsController.getstats);
router.post('/project/vote', isAuth, PostsController.uservote);
router.post('/project/remove', isAuth, PostsController.rmproject);
router.get('/project/:projectId', isAuth, PostsController.getproject);

module.exports = router;
