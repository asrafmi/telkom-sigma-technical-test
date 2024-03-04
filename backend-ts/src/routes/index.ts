import { Router } from 'express';
import userCtrl from '../controller/user.controller';

const apiRouter = Router();

apiRouter.get('/users', userCtrl.fetchUser);
apiRouter.post('/login', userCtrl.login);
apiRouter.post('/register', userCtrl.register);
export default apiRouter;
