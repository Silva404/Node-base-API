import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';

const sessionController = new SessionsController();
const sessionRouter = Router();

sessionRouter.post('/', sessionController.create);

export default sessionRouter;
