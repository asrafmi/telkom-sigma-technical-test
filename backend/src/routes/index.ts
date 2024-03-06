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
apiRouter.put('/user/:username', AuthMiddleware.Authenticated, UserValidation.UpdateValidation, UserCtrl.update);
apiRouter.delete('/user/:username', AuthMiddleware.Authenticated, AuthMiddleware.AdminRole, UserCtrl.remove);

// Event routes
apiRouter.get('/event', EventCtrl.fetch);
apiRouter.post('/event', EventValidation.CreateValidation, AuthMiddleware.Authenticated, AuthMiddleware.AdminRole, EventCtrl.create);
apiRouter.post('/event-user', AuthMiddleware.Authenticated, EventCtrl.createEventWithUser);
apiRouter.put('/event/:id', AuthMiddleware.Authenticated, AuthMiddleware.AdminRole, EventCtrl.update);
apiRouter.delete('/event/:id', AuthMiddleware.Authenticated, EventCtrl.remove);
apiRouter.get('/event/:user_id', AuthMiddleware.Authenticated, EventCtrl.fetchByUser);

export default apiRouter;
