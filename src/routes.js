import { Router } from 'express';
import SessionController from './app/controllers/SessionController';

const routes = Router();

routes.get('/sessions', SessionController.store);

export default routes;
