import server from 'express';
import PostsController from './controllers/posts_controller';

function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    console.log(`Authenticated user ${req.user} is calling APIs(routes.js).`);
    next();
  } else {
    res.redirect('/login');
    console.log(`isLogin: ${typeof req.user !== 'undefined'}`);
    console.log('Someone not Authenticated tries to call APIs.(routes.js)');
  }
}

const router = server.Router();
router.get('/profile/:userId', isAuth, PostsController.getteamanduser);
router.get('/project/data/:userId', isAuth, PostsController.getprojects);
router.post('/project/new/', isAuth, PostsController.createnewproject);
router.post('/project/update/:userId', isAuth, PostsController.updateproject);
router.get('/project/stats/:projectId/:userId', isAuth, PostsController.getstats);
router.post('/project/vote/:userId', isAuth, PostsController.uservote);
router.delete('/project/remove/:userId', isAuth, PostsController.rmproject);

module.exports = router;
