import { Router } from 'express';
import UserCtrl from '../controller/user.controller';
import UserValidation from '../middleware/validation/user.validation';
import AuthMiddleware from '../middleware/auth.middleware';

const apiRouter = Router();

// User routes
apiRouter.post('/user/login', UserCtrl.login);
apiRouter.post('/user/register',  UserValidation.RegisterValidation, UserCtrl.register);
apiRouter.get('/user/logout', AuthMiddleware.Authenticated, UserCtrl.logout);
apiRouter.get('/user', AuthMiddleware.Authenticated, UserCtrl.fetchUser);
apiRouter.post('/user/:username', AuthMiddleware.Authenticated, UserCtrl.update);
apiRouter.delete('/user/:username', AuthMiddleware.Authenticated, AuthMiddleware.AdminRole, UserCtrl.remove);

export default apiRouter;
