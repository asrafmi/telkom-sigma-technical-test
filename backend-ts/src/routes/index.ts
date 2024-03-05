import { Router } from 'express';
import userCtrl from '../controller/user.controller';
import userValidation from '../middleware/validation/user.validation';

const apiRouter = Router();

apiRouter.get('/user', userCtrl.fetchUser);
apiRouter.post('/user/login', userCtrl.login);
apiRouter.post(
  '/user/register',
  userValidation.RegisterValidation,
  userCtrl.register
);
export default apiRouter;
