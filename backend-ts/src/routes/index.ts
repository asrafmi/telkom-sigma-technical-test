import { Router } from 'express';
import UserCtrl from '../controller/user.controller';
import EventCtrl from '../controller/event.controller';

import UserValidation from '../middleware/validation/user.validation';
import EventValidation from '../middleware/validation/event.validation';
import AuthMiddleware from '../middleware/auth.middleware';

const apiRouter = Router();

// User routes
apiRouter.post('/user/login', UserCtrl.login);
apiRouter.post('/user/register',  UserValidation.RegisterValidation, UserCtrl.register);
apiRouter.get('/user/logout', AuthMiddleware.Authenticated, UserCtrl.logout);
apiRouter.get('/user', AuthMiddleware.Authenticated, UserCtrl.fetchUser);
apiRouter.put('/user/:username', AuthMiddleware.Authenticated, UserCtrl.update);
apiRouter.delete('/remove/user/:username', AuthMiddleware.Authenticated, AuthMiddleware.AdminRole, UserCtrl.remove);

// Event routes
apiRouter.get('/event', AuthMiddleware.Authenticated, EventCtrl.fetch);
apiRouter.post('/create/event', EventValidation.CreateValidation, AuthMiddleware.Authenticated, AuthMiddleware.AdminRole, EventCtrl.create);
apiRouter.put('/update/event/:id', AuthMiddleware.Authenticated, AuthMiddleware.AdminRole, EventCtrl.update);
apiRouter.delete('/remove/event/:id', AuthMiddleware.Authenticated, EventCtrl.remove);

export default apiRouter;
