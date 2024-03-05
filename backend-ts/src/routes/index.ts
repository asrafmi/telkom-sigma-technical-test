import { Router } from 'express';
import UserCtrl from '../controller/user.controller';
import UserValidation from '../middleware/validation/user.validation';
import AuthUtils from '../utils/auth';

const apiRouter = Router();

apiRouter.get('/user', AuthUtils.Authenticated, UserCtrl.fetchUser);
apiRouter.post('/user/login', UserCtrl.login);
apiRouter.post('/user/register',  UserValidation.RegisterValidation, UserCtrl.register);
apiRouter.get('/user/logout', AuthUtils.Authenticated, UserCtrl.logout);

export default apiRouter;
